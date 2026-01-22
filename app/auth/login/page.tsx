import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="layout-container flex h-full grow flex-col w-full max-w-[1440px] px-6 py-12 items-center justify-center relative z-10">
      <LoginForm />

      <div className="mt-8 flex items-center gap-6 text-slate-400 dark:text-slate-600 text-[10px] uppercase tracking-widest font-bold">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>System Operational</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-xs">public</span>
          <span>Global Node: London-01</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-xs">encrypted</span>
          <span>AES-256 Ready</span>
        </div>
      </div>

      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
}
