"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";

export default function AuthButton({
  className = "login-link",
  onBeforeOpen
}: {
  className?: string;
  onBeforeOpen?: () => void;
}) {
  const { user, loading, openAuth } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const handleClick = () => {
    onBeforeOpen?.();
    if (user) {
      router.push("/account/");
      return;
    }
    window.setTimeout(() => openAuth("login"), 0);
  };

  return (
    <button type="button" className={className} onClick={handleClick} disabled={loading}>
      {loading ? t.auth.loading : user ? t.auth.account : t.nav.login}
    </button>
  );
}
