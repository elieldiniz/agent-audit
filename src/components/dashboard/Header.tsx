"use client";

import { Menu, ChevronDown, Bell } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface HeaderProps {
  user: {
    name: string;
    avatar: string;
    plan: string;
    usage: {
      current: number;
      limit: number;
    }
  }
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-30 ml-64">
      <div className="flex items-center">
        <Menu className="w-6 h-6 text-slate-400 dark:text-slate-500 cursor-pointer hover:text-slate-600 md:hidden" />
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">
            Plano: <span className="text-primary cursor-pointer hover:underline">{user.plan}</span>
          </span>
          <div className="flex items-center mt-1">
            <span className="text-xs text-slate-400 mr-2">Uso: {user.usage.current}/{user.usage.limit} análises</span>
            <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full" 
                style={{ width: `${(user.usage.current / user.usage.limit) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />

        <ThemeSwitcher />

        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold leading-none">{user.name}</p>
          </div>
          <img 
            alt={`${user.name} Avatar`} 
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" 
            src={user.avatar} 
          />
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
        </div>
      </div>
    </header>
  );
}
