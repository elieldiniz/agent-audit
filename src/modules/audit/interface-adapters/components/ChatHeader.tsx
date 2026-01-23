"use client";

import { Shield } from "lucide-react";

export function ChatHeader() {
  return (
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-10 h-10 bg-[#0F172A] border border-[#1E293B] rounded-lg flex items-center justify-center shadow-ai-glow">
        <Shield className="w-6 h-6 text-[#BC62FF]" />
      </div>
      <div>
        <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
          AuditAI Intelligence
        </h2>
      </div>
    </div>
  );
}
