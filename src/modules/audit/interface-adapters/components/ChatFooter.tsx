"use client";

import { ShieldCheck, Zap } from "lucide-react";

export function ChatFooter() {
  return (
    <div className="flex justify-center items-center space-x-8 mt-4">
      <div className="flex items-center space-x-2 text-[10px] font-bold tracking-widest text-slate-600 uppercase">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Análise Segura e Criptografada</span>
      </div>

      <div className="flex items-center space-x-2 text-[10px] font-bold tracking-widest text-slate-600 uppercase">
        <Zap className="w-3.5 h-3.5" />
        <span>Processamento em tempo real</span>
      </div>
    </div>
  );
}
