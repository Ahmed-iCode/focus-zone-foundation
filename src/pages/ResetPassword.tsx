// Set a new password after following the reset link.
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { friendlyAuthError, updatePassword } from "@/services/auth";
import { validatePassword } from "@/lib/validation";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Supabase turns the recovery link into a session on this page.
    const isRecoveryLink = window.location.hash.includes("type=recovery");

    supabase.auth.getSession().then(({ data }) => {
      setHasRecoverySession(!!data.session || isRecoveryLink);
      setReady(true);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setHasRecoverySession(true);
      setReady(true);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    setSubmitting(true);
    const { error: updateError } = await updatePassword(password);
    setSubmitting(false);
    if (updateError) {
      setError(friendlyAuthError(updateError.message));
      return;
    }
    setDone(true);
    setTimeout(() => navigate({ to: "/dashboard", replace: true }), 1200);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-2xl font-bold text-foreground">Choose a new password</h1>

        {!ready ? (
          <p className="mt-6 text-center text-sm text-muted-foreground">Loading...</p>
        ) : done ? (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Your password has been updated. Redirecting...
          </p>
        ) : !hasRecoverySession ? (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            This reset link is invalid or has expired. Please request a new one.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm new password</Label>
              <Input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Saving..." : "Update password"}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Request a new link
          </Link>
        </p>
      </div>
    </main>
  );
}
