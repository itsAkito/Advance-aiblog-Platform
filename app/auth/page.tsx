"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SignIn, SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const nextParam = searchParams.get("next");
  const [showLogin, setShowLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<"clerk" | "otp">("clerk");
  const [otpMode, setOtpMode] = useState<"otp" | "password">("otp");
  const [otpStep, setOtpStep] = useState<"email" | "verify" | "setPassword" | "resetRequest" | "resetConfirm">("email");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [devResetToken, setDevResetToken] = useState<string | null>(null);

  const nextPath = nextParam && nextParam.startsWith("/") ? nextParam : "/";

  useEffect(() => {
    setShowLogin(mode !== "signup");
  }, [mode]);

  const sendOtp = async () => {
    if (!otpEmail) {
      setOtpError("Email is required");
      return;
    }

    try {
      setOtpLoading(true);
      setOtpError("");
      const response = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail }),
      });

      const data = await response.json();
      if (!response.ok && !data.otp) {
        throw new Error(data.error || "Failed to send OTP");
      }

      setDevOtp(data.otp || null);
      setOtpStep("verify");
      if (!response.ok && data.error) {
        setOtpError(`${data.error} Using development OTP fallback.`);
      }
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otpEmail || !otpCode) {
      setOtpError("Email and OTP code are required");
      return;
    }

    try {
      setOtpLoading(true);
      setOtpError("");
      const response = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail, code: otpCode }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "OTP verification failed");
      }

      if (!data.passwordConfigured) {
        setOtpStep("setPassword");
        return;
      }

      router.push(nextPath || "/");
      router.refresh();
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "OTP verification failed");
    } finally {
      setOtpLoading(false);
    }
  };

  const setOtpPassword = async () => {
    if (!password || !confirmPassword) {
      setOtpError("Both password fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setOtpError("Passwords do not match.");
      return;
    }
    // Client-side password strength check so the user gets instant feedback
    if (password.length < 8) {
      setOtpError("Password must be at least 8 characters.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setOtpError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setOtpError("Password must contain at least one lowercase letter.");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setOtpError("Password must contain at least one number.");
      return;
    }

    try {
      setOtpLoading(true);
      setOtpError("");
      const response = await fetch("/api/auth/otp/password/set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to set password");
      }

      router.push(nextPath || "/");
      router.refresh();
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "Failed to set password");
    } finally {
      setOtpLoading(false);
    }
  };

  const skipPasswordSetup = () => {
    // Allow user to skip and go directly to the app — they can set password later from settings
    router.push(nextPath || "/");
    router.refresh();
  };

  const loginWithPassword = async () => {
    if (!otpEmail || !password) {
      setOtpError("Email and password are required");
      return;
    }

    try {
      setOtpLoading(true);
      setOtpError("");
      const response = await fetch("/api/auth/otp/password/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: otpEmail, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Password login failed");
      }

      router.push(nextPath || "/");
      router.refresh();
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "Password login failed");
    } finally {
      setOtpLoading(false);
    }
  };

  const requestPasswordReset = async () => {
    if (!otpEmail) {
      setOtpError("Email is required");
      return;
    }

    try {
      setOtpLoading(true);
      setOtpError("");
      const response = await fetch("/api/auth/otp/password/reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to request reset");
      }

      setDevResetToken(data.resetToken || null);
      setOtpStep("resetConfirm");
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "Failed to request reset");
    } finally {
      setOtpLoading(false);
    }
  };

  const confirmPasswordReset = async () => {
    if (!resetToken || !password || !confirmPassword) {
      setOtpError("Reset token, password, and confirmation are required");
      return;
    }

    if (password !== confirmPassword) {
      setOtpError("Passwords do not match");
      return;
    }

    try {
      setOtpLoading(true);
      setOtpError("");
      const response = await fetch("/api/auth/otp/password/reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, newPassword: password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Password reset failed");
      }

      setOtpStep("email");
      setOtpMode("password");
      setResetToken("");
      setDevResetToken(null);
      setConfirmPassword("");
      setOtpError("Password reset successful. You can now login with password.");
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "Password reset failed");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-primary/10 via-background to-secondary/5 items-center justify-center p-12">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/4 w-100 h-100 bg-primary/8 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-75 h-75 bg-secondary/6 rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-md">
          <Link href="/" className="text-2xl font-extrabold font-headline tracking-tighter bg-linear-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent">
            AiBlog
          </Link>
          <h2 className="mt-8 text-4xl font-extrabold font-headline tracking-tighter leading-[1.1]">
            Where AI Meets
            <br />
            <span className="text-gradient">Editorial Excellence</span>
          </h2>
          <p className="mt-4 text-on-surface-variant leading-relaxed">
            Join 120K+ creators leveraging generative intelligence to build professional authority and transform their careers.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { icon: "auto_awesome", label: "AI Content Generation" },
              { icon: "timeline", label: "Career Progression" },
              { icon: "groups", label: "Community Network" },
              { icon: "analytics", label: "Deep Insights" },
            ].map((f) => (
              <Card key={f.label} className="bg-surface-container-low/50 border-outline-variant/10">
                <CardContent className="flex items-center gap-3 p-3">
                  <span className="material-symbols-outlined text-primary text-lg">{f.icon}</span>
                  <span className="text-xs font-semibold text-on-surface-variant">{f.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md flex flex-col items-center">

          {/* Clerk Sign In / Sign Up toggle */}
          <div className="flex gap-2 mb-3">
            <Button
              onClick={() => setAuthMethod("clerk")}
              variant={authMethod === "clerk" ? "default" : "outline"}
              className="rounded-full px-5"
              size="sm"
            >
              Google / Clerk
            </Button>
            <Button
              onClick={() => setAuthMethod("otp")}
              variant={authMethod === "otp" ? "default" : "outline"}
              className="rounded-full px-5"
              size="sm"
            >
              Email OTP
            </Button>
          </div>

          {authMethod === "clerk" && (
            <div className="flex gap-2 mb-6">
            <Button
              onClick={() => setShowLogin(true)}
              variant={showLogin ? "default" : "outline"}
              className={`rounded-full px-6 ${showLogin ? "shadow-lg shadow-primary/20" : ""}`}
              size="sm"
            >
              Sign In
            </Button>
            <Button
              onClick={() => setShowLogin(false)}
              variant={!showLogin ? "default" : "outline"}
              className={`rounded-full px-6 ${!showLogin ? "shadow-lg shadow-primary/20" : ""}`}
              size="sm"
            >
              Sign Up
            </Button>
            </div>
          )}

          {authMethod === "clerk" && showLogin ? (
            <SignIn
              appearance={{
                baseTheme: dark,
                elements: {
                  rootBox: "w-full",
                  cardBox: "w-full shadow-none",
                  card: "bg-surface-container-low border border-outline-variant/20 shadow-none",
                },
              }}
              routing="hash"
              forceRedirectUrl={nextPath}
            />
          ) : authMethod === "clerk" ? (
            <SignUp
              appearance={{
                baseTheme: dark,
                elements: {
                  rootBox: "w-full",
                  cardBox: "w-full shadow-none",
                  card: "bg-surface-container-low border border-outline-variant/20 shadow-none",
                },
              }}
              routing="hash"
              forceRedirectUrl={nextPath}
            />
          ) : (
            <Card className="w-full bg-surface-container-low border-outline-variant/20">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-bold">User Email Login</h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    {otpMode === "otp" ? "Use one-time code sign-in" : "Use saved password sign-in"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={otpMode === "otp" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => {
                      setOtpMode("otp");
                      setOtpStep("email");
                      setOtpError("");
                    }}
                  >
                    OTP Login
                  </Button>
                  <Button
                    type="button"
                    variant={otpMode === "password" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => {
                      setOtpMode("password");
                      setOtpStep("email");
                      setOtpError("");
                    }}
                  >
                    Password Login
                  </Button>
                </div>

                {otpError && (
                  <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                    {otpError}
                  </div>
                )}

                <div className="space-y-3">
                  <Input
                    type="email"
                    value={otpEmail}
                    onChange={(e) => setOtpEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={otpMode === "otp" && otpStep === "verify"}
                  />

                  {otpMode === "otp" && otpStep === "verify" && (
                    <Input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                    />
                  )}

                  {otpMode === "password" && otpStep !== "resetConfirm" && (
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  )}

                  {(otpStep === "setPassword" || otpStep === "resetConfirm") && (
                    <>
                      <p className="text-[11px] text-on-surface-variant bg-surface-container-high rounded-lg px-3 py-2 leading-relaxed">
                        Password must be <strong className="text-on-surface">8+ characters</strong>, include an{" "}
                        <strong className="text-on-surface">uppercase letter</strong>,{" "}
                        <strong className="text-on-surface">lowercase letter</strong>, and a{" "}
                        <strong className="text-on-surface">number</strong>.
                      </p>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create password  (e.g. MyPass123)"
                      />
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                      />
                    </>
                  )}

                  {otpStep === "resetConfirm" && (
                    <Input
                      type="text"
                      value={resetToken}
                      onChange={(e) => setResetToken(e.target.value)}
                      placeholder="Enter reset token"
                    />
                  )}

                  {devOtp && (
                    <p className="text-[11px] text-yellow-300">Dev OTP: {devOtp}</p>
                  )}

                  {otpMode === "otp" && otpStep === "email" ? (
                    <Button onClick={sendOtp} disabled={otpLoading} className="w-full">
                      {otpLoading ? "Sending..." : "Send OTP"}
                    </Button>
                  ) : otpMode === "otp" && otpStep === "verify" ? (
                    <div className="flex gap-2">
                      <Button onClick={verifyOtp} disabled={otpLoading} className="flex-1">
                        {otpLoading ? "Verifying..." : "Verify OTP"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setOtpStep("email");
                          setOtpCode("");
                          setDevOtp(null);
                          setOtpError("");
                        }}
                        disabled={otpLoading}
                      >
                        Edit
                      </Button>
                    </div>
                  ) : otpStep === "setPassword" ? (
                    <div className="space-y-2">
                      <Button onClick={setOtpPassword} disabled={otpLoading} className="w-full">
                        {otpLoading ? "Saving..." : "Set Password & Continue"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full text-xs text-on-surface-variant"
                        onClick={skipPasswordSetup}
                        disabled={otpLoading}
                      >
                        Skip for now — I&apos;ll set a password later
                      </Button>
                    </div>
                  ) : otpMode === "password" && otpStep === "email" ? (
                    <div className="space-y-2">
                      <Button onClick={loginWithPassword} disabled={otpLoading} className="w-full">
                        {otpLoading ? "Signing in..." : "Login with Password"}
                      </Button>
                      <Button
                        type="button"
                        variant="link"
                        className="w-full text-xs"
                        onClick={() => {
                          setOtpStep("resetRequest");
                          setOtpError("");
                        }}
                      >
                        Forgot password?
                      </Button>
                    </div>
                  ) : otpStep === "resetRequest" ? (
                    <div className="space-y-2">
                      <Button onClick={requestPasswordReset} disabled={otpLoading} className="w-full">
                        {otpLoading ? "Requesting..." : "Request Password Reset"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setOtpStep("email")} className="w-full">
                        Back
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button onClick={confirmPasswordReset} disabled={otpLoading} className="w-full">
                        {otpLoading ? "Resetting..." : "Confirm Reset"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setOtpStep("email")} className="w-full">
                        Back to Login
                      </Button>
                    </div>
                  )}

                  {devResetToken && (
                    <p className="text-[11px] text-emerald-300">Dev reset token: {devResetToken}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <p className="mt-6 text-center text-xs text-on-surface-variant">
            By continuing, you agree to our{" "}
            <Link href="/privacy" className="text-primary hover:underline">Terms</Link> and{" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </p>

          <div className="mt-8 text-center text-sm text-on-surface-variant">
            <p>Admin?{" "}
            <Link href="/admin/login" className="text-primary hover:underline font-semibold">
              Access Admin Portal
            </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
