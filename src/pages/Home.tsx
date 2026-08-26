import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-foreground">FocusZone</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Group your tasks into focus areas and work on one thing at a time.
        </p>
        {!loading && (
          <div className="mt-6">
            {isAuthenticated ? (
              <Button asChild>
                <Link to="/dashboard">Go to your FocusZone</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/auth">Sign in</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
