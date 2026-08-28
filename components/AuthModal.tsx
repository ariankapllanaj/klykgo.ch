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

export default function AuthModal({ open, mode, setMode, onClose, user, configured, signOut }: Props) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (mode === "register" && password !== confirmPassword) {
      setError(t.auth.passwordMismatch);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError(t.auth.notConfigured);
      return;
    }

    setBusy(true);

    try {
      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        onClose();
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
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

  return (
    <div className="modal-backdrop auth-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" aria-label={t.auth.close} onClick={onClose}>×</button>

        {user ? (
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
            <h3 id="auth-title">{mode === "login" ? t.auth.loginTitle : t.auth.registerTitle}</h3>
            <p className="auth-intro">{mode === "login" ? t.auth.loginCopy : t.auth.registerCopy}</p>

            <div className="auth-tabs" role="tablist" aria-label={t.auth.tabsLabel}>
              <button className={mode === "login" ? "active" : ""} type="button" onClick={() => setMode("login")}>{t.auth.login}</button>
              <button className={mode === "register" ? "active" : ""} type="button" onClick={() => setMode("register")}>{t.auth.register}</button>
            </div>

            <form className="auth-form" onSubmit={submit}>
              <label>
                <span>{t.auth.email}</span>
                <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@firma.ch" required />
              </label>

              <label>
                <span>{t.auth.password}</span>
                <input type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required />
              </label>

              {mode === "register" && (
                <label>
                  <span>{t.auth.confirmPassword}</span>
                  <input type="password" autoComplete="new-password" minLength={6} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
                </label>
              )}

              {error && <p className="auth-message error" role="alert">{error}</p>}
              {message && <p className="auth-message success" role="status">{message}</p>}

              <button className="button button-solid full-button" type="submit" disabled={busy}>
                {busy ? t.auth.working : mode === "login" ? t.auth.loginAction : t.auth.registerAction}
                <span>↗</span>
              </button>
            </form>

            {!configured && <p className="auth-config-note">{t.auth.notConfigured}</p>}
          </>
        )}
      </div>
    </div>
  );
}
