import { DependencyAudit } from "@/application/services/DashboardService";
import { MoreHorizontal, CheckSquare, MinusSquare, XCircle } from "lucide-react";

interface AuditTableProps {
  dependencies: DependencyAudit[];
}

export function AuditTable({ dependencies }: AuditTableProps) {
  const getStatusBadge = (status: DependencyAudit['status']) => {
    switch(status) {
      case 'healthy':
        return (
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase rounded-full border border-emerald-500/20">
            Saudável
          </span>
        );
      case 'warning':
        return (
          <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase rounded-full border border-amber-500/20">
            Atenção
          </span>
        );
      case 'critical':
        return (
          <span className="px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase rounded-full border border-red-500/20">
            Crítico
          </span>
        );
    }
  };

  const getIcon = (status: DependencyAudit['status']) => {
    switch(status) {
      case 'healthy': return <CheckSquare className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <MinusSquare className="w-5 h-5 text-amber-500" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="lg:col-span-2 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h3 className="font-semibold">Dependências Analisadas</h3>
        <MoreHorizontal className="w-5 h-5 text-slate-400 cursor-pointer" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/50">
              <th className="px-6 py-4">Dependência</th>
              <th className="px-6 py-4">Nível de Risco</th>
              <th className="px-6 py-4">Última Análise</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {dependencies.map((dep, idx) => (
              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {getIcon(dep.status)}
                    <span className="text-sm font-medium">{dep.name}@{dep.version}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(dep.status)}
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{dep.lastCheck}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
