"use client";

import type { User } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";
import AuthModal from "./AuthModal";

type AuthMode = "login" | "register";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const configured = isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(configured);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [configured]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    configured,
    openAuth: (nextMode = "login") => {
      setMode(nextMode);
      setOpen(true);
    },
    closeAuth: () => setOpen(false),
    signOut: async () => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;
      await supabase.auth.signOut();
    }
  }), [configured, loading, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal open={open} mode={mode} setMode={setMode} onClose={() => setOpen(false)} user={user} configured={configured} signOut={value.signOut} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
