"use client";

const ACTIONS = [
  "Audit lodash@latest",
  "Check CVE-2023-45853",
  "Vulnerability report: Axios"
];

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3 mt-6 justify-center">
      {ACTIONS.map((action) => (
        <button
          key={action}
          className="px-4 py-2 rounded-full bg-[#0F172A] border border-[#1E293B] text-xs text-slate-400 hover:text-white hover:border-[#3B82F6] transition-all"
        >
          {action}
        </button>
      ))}
    </div>
  );
}
