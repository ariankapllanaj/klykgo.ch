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
    if (supabase) supabase.auth.mfa.listFactors().then(({ data }) => setFactorId(data?.totp?.[0]?.id ?? null));
  }, [user]);

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

  const disableTwoFactor = async () => {
    if (!factorId) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return setError(t.account.genericError);
    clearStatus(); setBusy("2fa");
    const { error: unenrollError } = await supabase.auth.mfa.unenroll({ factorId });
    setBusy("");
    if (unenrollError) setError(unenrollError.message);
    else { setFactorId(null); setMessage(t.account.twoFactorRemoved); }
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
        <section className="account-section"><p className="account-section-label">03</p><div><h2>{t.account.security}</h2><div className="account-security-row"><div><p>{t.account.twoFactor}</p><span>{factorId ? t.account.twoFactorEnabled : t.account.twoFactorDisabled}</span></div>{factorId ? <button className="button button-outline" type="button" onClick={disableTwoFactor} disabled={busy !== ""}>{busy === "2fa" ? t.auth.working : t.account.disableTwoFactor}</button> : <span className="account-muted">{t.account.noFactors}</span>}</div></div></section>
        <button className="account-logout" type="button" onClick={handleSignOut} disabled={busy !== ""}>{busy === "logout" ? t.auth.working : t.account.logout}</button>
      </div>
    </main>
  );
}