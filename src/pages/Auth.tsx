// Sign in / create account page.
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { friendlyAuthError, loginUser, registerUser } from "@/services/auth";
import { validateEmail, validatePassword, validateUsername } from "@/lib/validation";

type Mode = "login" | "register";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setNotice(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const usernameError = mode === "register" ? validateUsername(username) : null;
    const firstError = emailError || passwordError || usernameError;
    if (firstError) {
      setError(firstError);
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "register") {
        const { data, error: signUpError } = await registerUser(
          email.trim(),
          password,
          username.trim(),
        );
        if (signUpError) {
          setError(friendlyAuthError(signUpError.message));
          return;
        }
        if (data.session) {
          navigate({ to: "/dashboard", replace: true });
          return;
        }
        setNotice("Check your inbox and click the verification link to activate your account.");
        setPassword("");
        return;
      }

      const { error: signInError } = await loginUser(email.trim(), password);
      if (signInError) {
        setError(friendlyAuthError(signInError.message));
        return;
      }
      navigate({ to: "/dashboard", replace: true });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-2xl font-bold text-foreground">FocusZone</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          {mode === "login" ? "Sign in to your account" : "Create your account"}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          {notice && <p className="text-sm text-muted-foreground">{notice}</p>}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <div className="mt-6 space-y-2 text-center text-sm">
          {mode === "login" ? (
            <>
              <p>
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Forgot your password?
                </Link>
              </p>
              <p className="text-muted-foreground">
                New to FocusZone?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="text-primary hover:underline"
                >
                  Create an account
                </button>
              </p>
            </>
          ) : (
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
