"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageProvider";

export default function ResetPasswordPage() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [mfaLoading, setMfaLoading] = useState(true);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaVerified, setMfaVerified] = useState(false);
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [mfaChallengeId, setMfaChallengeId] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [loading, router, user]);

  useEffect(() => {
    if (!user) return;

    const startMfaChallenge = async () => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        setMfaLoading(false);
        setError(t.auth.notConfigured);
        return;
      }

      const { data, error: factorsError } = await supabase.auth.mfa.listFactors();
      if (factorsError) {
        setMfaLoading(false);
        setError(factorsError.message);
        return;
      }

      const factor = data.totp.find((item) => item.status === "verified");
      if (!factor) {
        setMfaLoading(false);
        setMfaVerified(true);
        return;
      }

      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId: factor.id });
      setMfaLoading(false);
      if (challengeError) {
        setError(challengeError.message);
        return;
      }

      setMfaRequired(true);
      setMfaFactorId(factor.id);
      setMfaChallengeId(challenge.id);
    };

    void startMfaChallenge();
  }, [t.auth.notConfigured, user]);

  if (loading || !user) return <main className="account-page"><p className="account-loading">{t.auth.loading}</p></main>;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    if (mfaRequired && !mfaVerified) return setError(t.auth.mfaInvalid);
    if (password.length < 6) return setError(t.account.passwordLength);
    if (password !== confirmation) return setError(t.account.passwordMismatch);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return setError(t.account.genericError);
    setBusy(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) setError(updateError.message);
    else {
      setPassword("");
      setConfirmation("");
      setMessage(t.account.passwordSaved);
      router.replace("/");
    }
  };

  const verifyMfa = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    if (!mfaFactorId || !mfaChallengeId || mfaCode.length !== 6) {
      setError(t.auth.mfaInvalid);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError(t.auth.notConfigured);
      return;
    }

    setBusy(true);
    const { error: verifyError } = await supabase.auth.mfa.verify({ factorId: mfaFactorId, challengeId: mfaChallengeId, code: mfaCode });
    setBusy(false);

    if (verifyError) {
      setError(verifyError.message);
      return;
    }

    setMfaVerified(true);
    setMfaCode("");
    setMessage(t.auth.mfaVerified);
  };

  return (
    <main className="account-page">
      <header className="account-header">
        <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`} className="brand" aria-label={t.nav.homeLabel}><span className="brand-mini-symbol" aria-hidden="true"><i /><i /><i /></span><span>KLYKGO</span></a>
        <a className="account-back" href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`}>{t.account.back}</a>
      </header>
      <div className="reset-content">
        <p className="eyebrow">{t.auth.kicker}</p>
        <h1>{t.auth.resetTitle}</h1>
        <p className="account-intro">{t.auth.resetCopy}</p>
        {(message || error) && <p className={`auth-message ${error ? "error" : "success"}`} role={error ? "alert" : "status"}>{error || message}</p>}
        {mfaLoading && <p className="auth-message" role="status">{t.auth.working}</p>}
        {!mfaLoading && mfaRequired && !mfaVerified && <form className="account-form reset-form" onSubmit={verifyMfa}>
          <label><span>{t.auth.mfaCode}</span><input inputMode="numeric" pattern="[0-9]{6}" autoComplete="one-time-code" maxLength={6} value={mfaCode} onChange={(event) => setMfaCode(event.target.value.replace(/\D/g, ""))} required /></label>
          <button className="button button-solid" type="submit" disabled={busy}>{busy ? t.auth.working : t.auth.mfaVerify}<span>↗</span></button>
        </form>}
        {!mfaLoading && (!mfaRequired || mfaVerified) && <form className="account-form reset-form" onSubmit={submit}>
          <label><span>{t.account.newPassword}</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength={6} required /></label>
          <label><span>{t.account.confirmPassword}</span><input type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="new-password" minLength={6} required /></label>
          <button className="button button-solid" type="submit" disabled={busy}>{busy ? t.auth.working : t.account.changePassword}<span>↗</span></button>
        </form>}
        <a className="reset-back-link" href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`}>{t.account.back}</a>
      </div>
    </main>
  );
}