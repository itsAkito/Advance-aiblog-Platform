"use client";

import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import ConsentModal from "@/components/ConsentModal";

interface Profile {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: any;
  profile: Profile | null;
  session: any;
  loading: boolean;
  role: string;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const { signOut: clerkSignOut } = useClerk();
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>("user");
  const [showConsent, setShowConsent] = useState(false);
  const router = useRouter();
  const CONSENT_KEY = "aiblog_user_consent_accepted";

  // Don't show consent modal for admin routes
  const isAdminRoute = pathname?.includes("/admin");
  const isAuthRoute = pathname?.startsWith("/auth");

  const syncUserToSupabase = useCallback(async () => {
    if (!clerkUser) {
      setLoading(false);
      return;
    }

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@gmail.com";
    const email = clerkUser.primaryEmailAddress?.emailAddress || "";
    const userRole = email.toLowerCase() === adminEmail.toLowerCase() ? "admin" : "user";

    const fallbackProfile: Profile = {
      id: clerkUser.id,
      email,
      name: clerkUser.fullName || clerkUser.firstName || "User",
      avatar_url: clerkUser.imageUrl || undefined,
      role: userRole,
    };

    try {
      const res = await fetch("/api/user/profile/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: clerkUser.id,
          email,
          name: clerkUser.fullName || clerkUser.firstName || "User",
          avatar_url: clerkUser.imageUrl || null,
          role: userRole,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.profile) {
          setProfile(data.profile);
          setRole(data.profile.role || "user");
          setLoading(false);
          return;
        }
      }

      setProfile(fallbackProfile);
      setRole(userRole);
      setLoading(false);
    } catch (error) {
      // Network hiccups should not surface as hard console errors in normal auth flow.
      setProfile(fallbackProfile);
      setRole(userRole);
      setLoading(false);
    }
  }, [clerkUser, isAdminRoute]);

  // Check for OTP-based login from database session
  const loadOtpUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/otp/session", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        const { user } = data;
        
        const profile: Profile = {
          id: user.id,
          email: user.email,
          name: user.name || user.email?.split("@")[0] || "User",
          avatar_url: user.avatar_url,
          role: user.role || "user",
        };
        
        setProfile(profile);
        setRole(profile.role);
        
        setLoading(false);
        return true;
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("Error loading OTP session:", errorMsg);
    }
    
    // Fallback for password-based admin session (httpOnly cookie).
    try {
      const adminProbe = await fetch("/api/admin/activity?limit=1", {
        method: "GET",
        credentials: "include",
      });

      if (adminProbe.ok) {
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@gmail.com";
        const adminProfile: Profile = {
          id: "admin-session",
          email: adminEmail,
          name: "Administrator",
          role: "admin",
        };
        setProfile(adminProfile);
        setRole("admin");
        setLoading(false);
        return true;
      }
    } catch {
      // Ignore and continue to unauthenticated state.
    }

    // If no OTP session found, just finish loading
    setLoading(false);
    return false;
  }, [isAdminRoute]);

  // Lifecycle: Load auth state once
  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && clerkUser) {
      syncUserToSupabase();
      return;
    }

    // Avoid noisy 401 session probes on the auth entry route when user is logged out.
    if (isAuthRoute) {
      setLoading(false);
      return;
    }

    loadOtpUser().catch(() => {
      // If OTP load fails, just finish loading
      setLoading(false);
    });
  }, [isLoaded, isSignedIn, clerkUser, syncUserToSupabase, loadOtpUser, isAuthRoute]);

  useEffect(() => {
    if (loading) return;
    if (isAdminRoute) {
      setShowConsent(false);
      return;
    }

    const activeUserRole = role;
    if (activeUserRole !== "user") {
      setShowConsent(false);
      return;
    }

    const onDashboardRoute = pathname?.startsWith("/dashboard");
    if (!onDashboardRoute) {
      setShowConsent(false);
      return;
    }

    const hasConsent = typeof window !== "undefined" && localStorage.getItem(CONSENT_KEY) === "true";
    setShowConsent(!hasConsent);
  }, [loading, role, pathname, isAdminRoute]);

  const isAuthenticated = !!isSignedIn || !!profile;

  const handleConsentAccept = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CONSENT_KEY, "true");
    }
    setShowConsent(false);
    setLoading(false);
  };

  const handleConsentDeny = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(CONSENT_KEY);
    }
    setShowConsent(false);
    if (isSignedIn) {
      await clerkSignOut();
    }
    setProfile(null);
    setRole("user");
    setLoading(false);
    router.push("/");
  };

  const signOut = async () => {
    // Clear local state first so UI updates immediately (no spinner)
    setProfile(null);
    setRole("user");

    // Fire-and-forget: revoke OTP session and Clerk session in the background
    void fetch("/api/auth/otp/session", { method: "DELETE", credentials: "include" }).catch(() => {});
    if (isSignedIn) {
      clerkSignOut().catch(() => {});
    }

    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user: clerkUser
          ? {
              id: clerkUser.id,
              email: clerkUser.primaryEmailAddress?.emailAddress,
              name: clerkUser.fullName || clerkUser.firstName,
            }
          : profile
          ? { id: profile.id, email: profile.email, name: profile.name }
          : null,
        profile,
        session: isSignedIn ? { user: clerkUser } : profile ? { user: profile } : null,
        loading,
        role,
        signOut,
        logout: signOut,
        isAuthenticated,
        isAdmin: role === "admin",
      }}
    >
      <ConsentModal
        isOpen={showConsent}
        onAccept={handleConsentAccept}
        onDeny={handleConsentDeny}
      />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
