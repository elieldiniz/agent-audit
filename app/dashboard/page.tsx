import { MockDashboardService } from "@/infrastructure/services/MockDashboardService";
import { StatCard } from "@/components/dashboard/StatCard";
import { AuditChart } from "@/components/dashboard/AuditChart";
import { AlertList } from "@/components/dashboard/AlertList";
import { AuditTable } from "@/components/dashboard/AuditTable";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";
import { ShieldCheck, AlertTriangle, XCircle, Zap } from "lucide-react";



export default async function DashboardPage() {
  const service = new MockDashboardService();
  const data = await service.getDashboardData();

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold">Bem-vindo, {data.user.name.split(' ')[0]}!</h1>
          <p className="text-slate-500 dark:text-slate-400">Painel de Auditoria Inteligente</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Dependências Seguras" 
          value={data.stats.safeDependencies} 
          subtext="Atualizadas" 
          icon={ShieldCheck} 
          variant="emerald" 
        />
        <StatCard 
          title="Alertas de Risco" 
          value={data.stats.riskAlerts} 
          subtext="Potenciais Problemas" 
          icon={AlertTriangle} 
          variant="amber" 
        />
        <StatCard 
          title="Falhas Críticas" 
          value={data.stats.criticalFailures} 
          subtext="Vulnerabilidades" 
          icon={XCircle} 
          variant="red" 
        />
        <StatCard 
          title="Análises da IA" 
          value={data.stats.aiInsights} 
          subtext="Insights Gerados" 
          icon={Zap} 
          variant="blue" 
        />
      </div>

      {/* Chart & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-full">
          <AuditChart status={data.auditStatus} />
        </div>
        <div className="h-full">
          <AlertList alerts={data.recentAlerts} />
        </div>
      </div>

      {/* Table & AI Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AuditTable dependencies={data.analyzedDependencies} />
        <AIInsightCard insight={data.latestInsight} />
      </div>
    </div>
  );
}
