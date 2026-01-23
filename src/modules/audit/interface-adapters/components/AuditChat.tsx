"use client";

import React, { useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { QuickActions } from './QuickActions';
import { ChatInput } from './ChatInput';
import { UploadArea } from './UploadArea';
import { ChatFooter } from './ChatFooter';
import { ChatMessage as ChatMessageEntity } from '../../domain/entities/ChatMessage';

export function AuditChat() {
  const [messages, setMessages] = useState<ChatMessageEntity[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá, João. Estou pronto para iniciar uma nova auditoria de segurança. Você pode digitar o nome de uma dependência específica ou carregar o seu arquivo package.json para uma análise completa de vulnerabilidades.',
      timestamp: new Date(),
    }
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessageEntity = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-w-5xl mx-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {messages.length === 1 && (
          <div className="mt-8">
            <UploadArea />
            <QuickActions />
          </div>
        )}
      </div>

      <div className="mt-auto pt-6">
        <ChatInput onSend={handleSendMessage} />
        <ChatFooter />
      </div>
    </div>
  );
}
