// Simple client-side validation helpers used by the auth forms.

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email address.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
}

export function validateUsername(username: string): string | null {
  const value = username.trim();
  if (!value) return "Username is required.";
  if (value.length < 3) return "Username must be at least 3 characters.";
  if (value.length > 30) return "Username must be 30 characters or fewer.";
  if (!/^[a-zA-Z0-9_.-]+$/.test(value)) {
    return "Use letters, numbers, dots, dashes or underscores only.";
  }
  return null;
}
