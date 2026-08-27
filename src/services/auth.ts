// FocusZone authentication service.
// Thin, readable wrappers around Supabase Auth. No custom JWT logic.
import { supabase } from "@/lib/supabase";

export async function registerUser(email: string, password: string, username: string) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

  return supabase.auth.signUp({
    email,
    password,
    options: {
      // Where the user lands after clicking the verification email.
      emailRedirectTo: `${window.location.origin}/auth`,
      data: { username, timezone },
    },
  });
}

export async function loginUser(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function logoutUser() {
  return supabase.auth.signOut();
}

export async function sendPasswordReset(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
}

export async function updatePassword(password: string) {
  return supabase.auth.updateUser({ password });
}

/** Turns Supabase errors into short, safe, user-friendly messages. */
export function friendlyAuthError(message: string): string {
  const text = message.toLowerCase();

  if (text.includes("invalid login credentials")) {
    return "Email or password is incorrect.";
  }
  if (text.includes("email not confirmed")) {
    return "Please verify your email address first, then sign in.";
  }
  if (text.includes("user already registered")) {
    return "An account with this email already exists. Try signing in instead.";
  }
  if (text.includes("weak") || text.includes("pwned") || text.includes("easy to guess")) {
    return "That password has appeared in a data breach. Please choose a different one.";
  }
  if (text.includes("should be at least") || text.includes("password")) {
    return "Password must be at least 8 characters.";
  }
  if (text.includes("rate limit") || text.includes("too many")) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  return "Something went wrong. Please try again.";
}
