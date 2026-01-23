"use client";

import { ChatMessage as ChatMessageEntity } from '../../domain/entities/ChatMessage';
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageEntity;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={cn(
      "flex w-full",
      isAssistant ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] p-4 rounded-2xl",
        isAssistant
          ? "bg-[#0A101F] border border-[#1E293B] text-slate-300 shadow-sm"
          : "bg-primary text-white"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
          {isAssistant && message.content.includes("package.json") && (
            <span className="bg-[#1E293B] px-1.5 py-0.5 rounded text-[#0EA5E9] font-mono ml-1">package.json</span>
          )}
        </p>
      </div>
    </div>
  );
}
