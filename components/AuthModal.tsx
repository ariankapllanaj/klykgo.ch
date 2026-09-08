"use client";

import { FormEvent, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { useLanguage } from "./LanguageProvider";

type AuthMode = "login" | "register";

type Props = {
  open: boolean;
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
  onClose: () => void;
  user: User | null;
  configured: boolean;
  signOut: () => Promise<void>;
};

function getAuthReturnUrl() {
  if (typeof window === "undefined") return undefined;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${window.location.origin}${basePath}/`;
}

function isStrongPassword(value: string) {
  return value.length >= 8 && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);
}

export default function AuthModal({ open, mode, setMode, onClose, user, configured, signOut }: Props) {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [mfaChallengeId, setMfaChallengeId] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, open]);

  useEffect(() => {
    setMessage("");
    setError("");
    setPassword("");
    setConfirmPassword("");
    setResetMode(false);
    setMfaFactorId(null);
    setMfaChallengeId(null);
    setMfaCode("");
  }, [mode]);

  if (!open) return null;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!configured) {
      setError(t.auth.notConfigured);
      return;
    }

    if (!resetMode && mode === "register" && password !== confirmPassword) {
      setError(t.auth.passwordMismatch);
      return;
    }

    if (!resetMode && mode === "register" && !isStrongPassword(password)) {
      setError(t.auth.passwordStrength);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError(t.auth.notConfigured);
      return;
    }

    setBusy(true);

    try {
      if (resetMode) {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${getAuthReturnUrl()}reset-password/`
        });
        if (resetError) throw resetError;
        setMessage(t.auth.resetSent);
      } else if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        const { data: factors, error: factorError } = await supabase.auth.mfa.listFactors();
        if (factorError) throw factorError;
        const factor = factors.totp.find((item) => item.status === "verified");

        if (factor) {
          const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId: factor.id });
          if (challengeError) throw challengeError;
          setMfaFactorId(factor.id);
          setMfaChallengeId(challenge.id);
          setPassword("");
          setMessage(t.auth.mfaSent);
        } else {
          onClose();
        }
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: getAuthReturnUrl(),
            data: { language }
          }
        });
        if (signUpError) throw signUpError;

        if (data.session) {
          setMessage(t.auth.registered);
        } else {
          setMessage(t.auth.checkEmail);
        }
      }
    } catch (caught) {
      const text = caught instanceof Error ? caught.message : t.auth.genericError;
      setError(text);
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    setBusy(true);
    await signOut();
    setBusy(false);
    onClose();
  };

  const verifyMfa = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
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
    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId: mfaFactorId,
      challengeId: mfaChallengeId,
      code: mfaCode
    });
    setBusy(false);

    if (verifyError) {
      setError(verifyError.message);
      return;
    }

    setMfaFactorId(null);
    setMfaChallengeId(null);
    setMfaCode("");
    onClose();
  };

  const cancelMfa = async () => {
    await signOut();
    setMfaFactorId(null);
    setMfaChallengeId(null);
    setMfaCode("");
    setError("");
    setMessage("");
  };

  const passwordRequirements = [
    { label: t.auth.passwordRequirementLength, valid: password.length >= 8 },
    { label: t.auth.passwordRequirementLowercase, valid: /[a-z]/.test(password) },
    { label: t.auth.passwordRequirementUppercase, valid: /[A-Z]/.test(password) },
    { label: t.auth.passwordRequirementNumber, valid: /\d/.test(password) },
    { label: t.auth.passwordRequirementSpecial, valid: /[^A-Za-z0-9]/.test(password) }
  ];

  return (
    <div className="modal-backdrop auth-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" aria-label={t.auth.close} onClick={onClose}>×</button>

        {mfaFactorId && mfaChallengeId ? (
          <>
            <p className="eyebrow">{t.auth.mfaTitle}</p>
            <h3 id="auth-title">{t.auth.mfaHeading}</h3>
            <p className="auth-intro">{t.auth.mfaCopy}</p>
            <form className="auth-form" onSubmit={verifyMfa}>
              <label>
                <span>{t.auth.mfaCode}</span>
                <input inputMode="numeric" pattern="[0-9]{6}" autoComplete="one-time-code" maxLength={6} value={mfaCode} onChange={(event) => setMfaCode(event.target.value.replace(/\D/g, ""))} required />
              </label>
              {error && <p className="auth-message error" role="alert">{error}</p>}
              <button className="button button-solid full-button" type="submit" disabled={busy}>
                {busy ? t.auth.working : t.auth.mfaVerify}<span>↗</span>
              </button>
            </form>
            <button className="auth-reset-link" type="button" onClick={cancelMfa}>{t.auth.mfaCancel}</button>
          </>
        ) : user ? (
          <div className="auth-account-state">
            <p className="eyebrow">{t.auth.account}</p>
            <h3 id="auth-title">{t.auth.signedIn}</h3>
            <p className="auth-email">{user.email}</p>
            <button className="button button-outline full-button" type="button" onClick={handleSignOut} disabled={busy}>
              {busy ? t.auth.working : t.auth.logout}
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">{t.auth.kicker}</p>
            <h3 id="auth-title">{resetMode ? t.auth.resetTitle : mode === "login" ? t.auth.loginTitle : t.auth.registerTitle}</h3>
            <p className="auth-intro">{resetMode ? t.auth.resetCopy : mode === "login" ? t.auth.loginCopy : t.auth.registerCopy}</p>

            {!resetMode && <div className="auth-tabs" role="tablist" aria-label={t.auth.tabsLabel}>
              <button className={mode === "login" ? "active" : ""} type="button" onClick={() => setMode("login")}>{t.auth.login}</button>
              <button className={mode === "register" ? "active" : ""} type="button" onClick={() => setMode("register")}>{t.auth.register}</button>
            </div>}

            <form className="auth-form" onSubmit={submit}>
              <label>
                <span>{t.auth.email}</span>
                <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@firma.ch" required />
              </label>

              {!resetMode && <label>
                <span>{t.auth.password}</span>
                <input type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={mode === "register" ? 8 : 6} pattern={mode === "register" ? "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}" : undefined} title={mode === "register" ? t.auth.passwordStrength : undefined} value={password} onChange={(event) => setPassword(event.target.value)} required />
                {mode === "register" && <div className="password-requirements" aria-label={t.auth.passwordStrength}>
                  {passwordRequirements.map((requirement) => (
                    <div className={`password-requirement${requirement.valid ? " valid" : ""}`} key={requirement.label}>
                      <span className="password-requirement-dot" aria-hidden="true">{requirement.valid ? "✓" : ""}</span>
                      <small>{requirement.label}</small>
                    </div>
                  ))}
                </div>}
              </label>}

              {!resetMode && mode === "register" && (
                <label>
                  <span>{t.auth.confirmPassword}</span>
                  <input type="password" autoComplete="new-password" minLength={6} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
                </label>
              )}

              {error && <p className="auth-message error" role="alert">{error}</p>}
              {message && <p className="auth-message success" role="status">{message}</p>}

              <button className="button button-solid full-button" type="submit" disabled={busy}>
                {busy ? t.auth.working : resetMode ? t.auth.resetAction : mode === "login" ? t.auth.loginAction : t.auth.registerAction}
                <span>↗</span>
              </button>
            </form>

            {mode === "login" && !resetMode && <button className="auth-reset-link" type="button" onClick={() => { setResetMode(true); setMessage(""); setError(""); }}>{t.auth.forgotPassword}</button>}
            {resetMode && <button className="auth-reset-link" type="button" onClick={() => { setResetMode(false); setMessage(""); setError(""); }}>{t.auth.backToLogin}</button>}
            {mode === "register" && !resetMode && <p className="auth-legal-copy">{t.auth.legalCopy}</p>}
            {!configured && <p className="auth-config-note">{t.auth.notConfigured}</p>}
          </>
        )}
      </div>
    </div>
  );
}
