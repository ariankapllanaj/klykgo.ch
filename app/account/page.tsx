"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageProvider";

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [factorId, setFactorId] = useState<string | null>(null);
  const [mfaSetup, setMfaSetup] = useState<{ factorId: string; qrCode: string; secret: string } | null>(null);
  const [mfaCode, setMfaCode] = useState("");
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [loading, router, user]);

  useEffect(() => {
    if (!user) return;
    setFirstName(user.user_metadata?.first_name ?? "");
    setLastName(user.user_metadata?.last_name ?? "");
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      void (async () => {
        const { data } = await supabase.auth.mfa.listFactors();
        const verified = data?.totp?.find((factor) => factor.status === "verified");
        setFactorId(verified?.id ?? null);

        // A verified factor must not be bypassed by navigating directly to /account.
        if (verified) {
          const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
          if (aal?.nextLevel === "aal2" && aal.currentLevel !== "aal2") {
            await signOut();
            router.replace("/");
          }
        }
      })();
    }
  }, [router, signOut, user]);

  if (loading || !user) return <main className="account-page"><p className="account-loading">{t.auth.loading}</p></main>;

  const clearStatus = () => { setMessage(""); setError(""); };

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); clearStatus();
    if (!firstName.trim() || !lastName.trim()) return setError(t.account.required);
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return setError(t.account.genericError);
    setBusy("profile");
    const { error: updateError } = await supabase.auth.updateUser({ data: { first_name: firstName.trim(), last_name: lastName.trim() } });
    setBusy("");
    if (updateError) setError(updateError.message); else setMessage(t.account.saved);
  };

  const changePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); clearStatus();
    if (newPassword.length < 6) return setError(t.account.passwordLength);
    if (newPassword !== confirmPassword) return setError(t.account.passwordMismatch);
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return setError(t.account.genericError);
    setBusy("password");
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    setBusy("");
    if (updateError) setError(updateError.message);
    else { setNewPassword(""); setConfirmPassword(""); setMessage(t.account.passwordSaved); }
  };

  const startTwoFactorSetup = async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return setError(t.account.genericError);

    clearStatus();
    setMfaCode("");
    setBusy("2fa-setup");

    try {
      const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
      if (factorsError) throw factorsError;

      // Clear abandoned, unverified TOTP enrollments before creating a fresh QR code.
      for (const factor of factors.totp.filter((item) => item.status !== "verified")) {
        await supabase.auth.mfa.unenroll({ factorId: factor.id });
      }

      const { data, error: enrollError } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "KLYKGO Authenticator"
      });
      if (enrollError) throw enrollError;

      setMfaSetup({
        factorId: data.id,
        qrCode: data.totp.qr_code,
        secret: data.totp.secret
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t.account.genericError);
    } finally {
      setBusy("");
    }
  };

  const verifyTwoFactorSetup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!mfaSetup) return;

    clearStatus();
    if (!/^\d{6}$/.test(mfaCode.trim())) {
      setError(t.account.twoFactorCodeInvalid);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return setError(t.account.genericError);

    setBusy("2fa-verify");
    try {
      const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
        factorId: mfaSetup.factorId,
        code: mfaCode.trim()
      });
      if (verifyError) throw verifyError;

      setFactorId(mfaSetup.factorId);
      setMfaSetup(null);
      setMfaCode("");
      setMessage(t.account.twoFactorEnabledSuccess);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t.account.genericError);
    } finally {
      setBusy("");
    }
  };

  const cancelTwoFactorSetup = async () => {
    if (!mfaSetup) return;
    const supabase = getSupabaseBrowserClient();
    if (supabase) await supabase.auth.mfa.unenroll({ factorId: mfaSetup.factorId });
    setMfaSetup(null);
    setMfaCode("");
    clearStatus();
  };

  const disableTwoFactor = async () => {
    if (!factorId) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return setError(t.account.genericError);
    clearStatus(); setBusy("2fa");
    const { error: unenrollError } = await supabase.auth.mfa.unenroll({ factorId });
    setBusy("");
    if (unenrollError) setError(unenrollError.message);
    else { setFactorId(null); setMfaSetup(null); setMfaCode(""); setMessage(t.account.twoFactorRemoved); }
  };

  const handleSignOut = async () => { setBusy("logout"); await signOut(); router.replace("/"); };

  return (
    <main className="account-page">
      <header className="account-header">
        <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`} className="brand" aria-label={t.nav.homeLabel}><span className="brand-mini-symbol" aria-hidden="true"><i /><i /><i /></span><span>KLYKGO</span></a>
        <a className="account-back" href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`}>{t.account.back}</a>
      </header>
      <div className="account-content">
        <p className="eyebrow">{t.account.kicker}</p><h1>{t.account.title}</h1><p className="account-intro">{t.account.intro}</p>
        {(message || error) && <p className={`auth-message account-status ${error ? "error" : "success"}`} role={error ? "alert" : "status"}>{error || message}</p>}
        <section className="account-section"><p className="account-section-label">01</p><div><h2>{t.account.profile}</h2><form className="account-form" onSubmit={saveProfile}><label><span>{t.account.firstName}</span><input value={firstName} onChange={(event) => setFirstName(event.target.value)} autoComplete="given-name" required /></label><label><span>{t.account.lastName}</span><input value={lastName} onChange={(event) => setLastName(event.target.value)} autoComplete="family-name" required /></label><label className="account-full-field"><span>{t.account.email}</span><input value={user.email ?? ""} readOnly /></label><button className="button button-solid" type="submit" disabled={busy !== ""}>{busy === "profile" ? t.auth.working : t.account.save}<span>↗</span></button></form></div></section>
        <section className="account-section"><p className="account-section-label">02</p><div><h2>{t.account.password}</h2><form className="account-form" onSubmit={changePassword}><label><span>{t.account.newPassword}</span><input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" minLength={6} required /></label><label><span>{t.account.confirmPassword}</span><input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" minLength={6} required /></label><button className="button button-outline" type="submit" disabled={busy !== ""}>{busy === "password" ? t.auth.working : t.account.password}<span>↗</span></button></form></div></section>
        <section className="account-section">
          <p className="account-section-label">03</p>
          <div>
            <h2>{t.account.security}</h2>
            <div className="account-security-row">
              <div>
                <p>{t.account.twoFactor}</p>
                <span>{factorId ? t.account.twoFactorEnabled : t.account.twoFactorDisabled}</span>
              </div>
              {factorId ? (
                <button className="button button-outline" type="button" onClick={disableTwoFactor} disabled={busy !== ""}>
                  {busy === "2fa" ? t.auth.working : t.account.disableTwoFactor}
                </button>
              ) : (
                <button className="button button-outline" type="button" onClick={startTwoFactorSetup} disabled={busy !== "" || Boolean(mfaSetup)}>
                  {busy === "2fa-setup" ? t.auth.working : t.account.enableTwoFactor}
                </button>
              )}
            </div>

            {!factorId && !mfaSetup && <p className="account-muted account-security-copy">{t.account.noFactors}</p>}

            {mfaSetup && (
              <div className="account-mfa-setup">
                <h3>{t.account.twoFactorSetupTitle}</h3>
                <p>{t.account.twoFactorSetupCopy}</p>
                <div className="account-mfa-qr">
                  <img src={mfaSetup.qrCode} alt={t.account.twoFactorQrAlt} width={210} height={210} />
                </div>
                <div className="account-mfa-secret">
                  <span>{t.account.twoFactorManualKey}</span>
                  <code>{mfaSetup.secret}</code>
                </div>
                <form className="account-mfa-form" onSubmit={verifyTwoFactorSetup}>
                  <label>
                    <span>{t.account.twoFactorCode}</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={mfaCode}
                      onChange={(event) => setMfaCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="000000"
                      required
                    />
                  </label>
                  <div className="account-mfa-actions">
                    <button className="button button-solid" type="submit" disabled={busy !== ""}>
                      {busy === "2fa-verify" ? t.auth.working : t.account.twoFactorConfirm}
                      <span>↗</span>
                    </button>
                    <button className="button button-outline" type="button" onClick={cancelTwoFactorSetup} disabled={busy !== ""}>
                      {t.account.twoFactorCancel}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
        <button className="account-logout" type="button" onClick={handleSignOut} disabled={busy !== ""}>{busy === "logout" ? t.auth.working : t.account.logout}</button>
      </div>
    </main>
  );
}