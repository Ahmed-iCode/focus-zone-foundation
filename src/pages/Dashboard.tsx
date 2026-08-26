// Minimal signed-in landing page. Product features arrive in later steps.
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/services/auth";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await logoutUser();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
          Step 2 complete
        </p>
        <h1 className="mt-3 text-3xl font-bold text-foreground">You're signed in</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {user?.email} — areas, tasks and focus mode come in the next steps.
        </p>
        <Button onClick={handleSignOut} variant="outline" className="mt-6">
          Sign out
        </Button>
      </div>
    </main>
  );
}
