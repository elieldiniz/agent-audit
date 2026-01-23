"use client";

import React, { useState } from 'react';
import { Paperclip, Send } from "lucide-react";

interface ChatInputProps {
  onSend: (content: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value);
      setValue('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center bg-[#0A101F] border border-[#1E293B] rounded-2xl p-2 pl-4 shadow-2xl focus-within:border-[#3B82F6]/50 transition-colors"
    >
      <button
        type="button"
        className="p-2 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <Paperclip className="w-5 h-5" />
      </button>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Digite uma dependência ou anexe um package.json..."
        className="flex-1 bg-transparent border-none focus:ring-0 text-slate-300 placeholder:text-slate-600 text-sm px-4"
      />

      <button
        type="submit"
        disabled={!value.trim()}
        className="flex items-center space-x-2 bg-[#254EDB] hover:bg-[#1E3A8A] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl transition-all font-bold text-sm"
      >
        <span>Enviar</span>
        <Send className="w-4 h-4 rotate-[-45deg] translate-y-[-1px]" />
      </button>
    </form>
  );
}
