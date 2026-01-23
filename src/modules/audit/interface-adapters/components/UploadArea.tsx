"use client";

import { FileUp } from "lucide-react";

export function UploadArea() {
  return (
    <div className="w-full max-w-2xl mx-auto p-12 mt-10 border-2 border-dashed border-[#1E293B] rounded-3xl bg-[#030816]/50 flex flex-col items-center justify-center text-center group hover:border-[#3B82F6]/50 transition-colors cursor-pointer">
      <div className="w-16 h-16 bg-[#0F172A] border border-[#1E293B] rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-blue-glow transition-shadow">
        <FileUp className="w-8 h-8 text-slate-400 group-hover:text-[#3B82F6]" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">Upload package.json</h3>
      <p className="text-slate-500 text-sm max-w-xs mb-8">
        Arraste e solte o arquivo aqui para identificar vulnerabilidades conhecidas em todo o seu projeto.
      </p>

      <button className="px-6 py-2.5 bg-[#1E293B] text-slate-300 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-slate-800 transition-colors">
        Selecionar Arquivo
      </button>
    </div>
  );
}
