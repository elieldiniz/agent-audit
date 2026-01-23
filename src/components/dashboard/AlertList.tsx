import { Alert } from "@/application/services/DashboardService";
import { AlertTriangle, AlertCircle, Info, ChevronRight } from "lucide-react";

interface AlertListProps {
  alerts: Alert[];
}

export function AlertList({ alerts }: AlertListProps) {
  const getIcon = (type: Alert['type']) => {
    switch(type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBg = (type: Alert['type']) => {
    switch(type) {
      case 'warning': return 'bg-amber-500/10';
      case 'error': return 'bg-red-500/10';
      default: return 'bg-blue-500/10';
    }
  };

  return (
    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl p-6">
      <h3 className="font-semibold mb-6">Alertas Recentes</h3>
      <div className="space-y-6">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 -mx-2 rounded-lg transition-colors">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getBg(alert.type)}`}>
                {getIcon(alert.type)}
              </div>
              <div>
                <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">{alert.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{alert.message}</p>
              </div>
            </div>
            <div className="flex items-center text-xs text-slate-400">
              <span>{alert.time}</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
