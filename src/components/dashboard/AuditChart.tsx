import { AuditStatus } from "@/application/services/DashboardService";

interface AuditChartProps {
  status: AuditStatus;
}

export function AuditChart({ status }: AuditChartProps) {
  return (
    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl p-6 h-full">
      <h3 className="font-semibold mb-6">Status das Auditorias</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-around space-y-8 md:space-y-0 h-full">
        {/* SVG Chart */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
             {/* Base Circle */}
            <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-slate-800" />
            
            {/* Approved (Green) */}
             <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="100 200" className="text-emerald-500" />
            
            {/* Warnings (Amber) */}
             <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="30 200" strokeDashoffset="-100" className="text-amber-500" />
             
            {/* Critical (Red) */}
            <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="15 200" strokeDashoffset="-130" className="text-red-500" />
          </svg>
          
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-bold">{status.complianceScore}%</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Conformidade</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-4 w-full md:w-auto">
          <div className="flex items-center justify-between space-x-12">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-slate-500">Aprovadas</span>
            </div>
            <span className="font-bold text-emerald-500">{status.approved}</span>
          </div>
          
          <div className="flex items-center justify-between">
             <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm text-slate-500">Com Alertas</span>
            </div>
            <span className="font-bold text-amber-500">{status.warnings}</span>
          </div>
          
          <div className="flex items-center justify-between">
             <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-slate-500">Críticas</span>
            </div>
            <span className="font-bold text-red-500">{status.critical}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
