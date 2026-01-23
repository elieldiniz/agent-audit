import Link from "next/link";
import { Shield, LayoutDashboard, Search, FileText, Settings, ShieldCheck, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: true },
  { name: 'Auditorias', href: '#', icon: Search, current: false },
  { name: 'Relatórios', href: '#', icon: FileText, current: false },
  { name: 'Configurações', href: '#', icon: Settings, current: false },
  { name: 'Administração', href: '#', icon: ShieldCheck, current: false },
];

export function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-6 flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Shield className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight">AuditAI</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 mt-6">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group",
              item.current
                ? "bg-purple-neon text-white shadow-ai-glow"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"

            )}
          >
            <item.icon className={cn("w-5 h-5", item.current ? "text-white" : "text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200")} />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
