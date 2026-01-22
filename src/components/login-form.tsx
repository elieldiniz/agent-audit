"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleLoginWithGitHub = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div
      className={cn(
        "w-full max-w-[440px] bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-8 md:p-10 flex flex-col",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
          <span className="material-symbols-outlined text-4xl">
            shield_lock
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          AuditAI
        </h2>
        <p className="text-slate-500 dark:text-[#9cb0ba] text-sm font-normal text-center">
          Secure intelligence at rest
        </p>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">
          Welcome back, Auditor.
        </h1>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleLogin}>
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">
            Email
          </label>
          <input
            className="form-input w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-input-dark h-12 placeholder:text-slate-400 dark:placeholder:text-[#9cb0ba] px-4 text-base font-normal"
            placeholder="Enter your corporate email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">
              Password
            </label>
            <Link
              className="text-primary text-xs font-medium hover:underline"
              href="/auth/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              className="form-input w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-input-dark h-12 placeholder:text-slate-400 dark:placeholder:text-[#9cb0ba] px-4 pr-12 text-base font-normal"
              placeholder="Enter your password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#9cb0ba] hover:text-primary transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-xl">
                visibility
              </span>
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 shadow-ai-glow"
          type="submit"
          disabled={isLoading}
        >
          <span>{isLoading ? "Signing in..." : "Sign In"}</span>
        </button>
      </form>

      <div className="flex items-center gap-4 my-8">
        <div className="h-px grow bg-slate-200 dark:bg-slate-800"></div>
        <span className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-widest">
          OR
        </span>
        <div className="h-px grow bg-slate-200 dark:bg-slate-800"></div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          className="flex w-full items-center justify-center gap-3 rounded-lg h-11 px-4 border border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-colors"
          onClick={handleLoginWithGoogle}
        >
          <svg className="size-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            ></path>
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            ></path>
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            ></path>
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
              fill="#EA4335"
            ></path>
          </svg>
          <span>Entrar com Google</span>
        </button>
        <button
          className="flex w-full items-center justify-center gap-3 rounded-lg h-11 px-4 border border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-colors"
          onClick={handleLoginWithGitHub}
        >
          <svg className="size-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
          </svg>
          <span>Entrar com GitHub</span>
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-[#9cb0ba] text-sm">
          New to AuditAI?
          <Link
            className="text-primary font-semibold hover:underline ml-1"
            href="/auth/sign-up"
          >
            Request Access
          </Link>
        </p>
      </div>
    </div>
  );
}
