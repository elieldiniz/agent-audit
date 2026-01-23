import { AIInsight } from "@/application/services/DashboardService";
import { Brain } from "lucide-react";

interface AIInsightCardProps {
  insight: AIInsight;
}

export function AIInsightCard({ insight }: AIInsightCardProps) {
  return (
    <div className="bg-white dark:bg-card-dark border border-accent-blue/50 dark:border-accent-blue/30 rounded-xl p-6 relative overflow-hidden group shadow-[0_0_15px_rgba(14,165,233,0.1)]">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 blur-3xl -mr-16 -mt-16 group-hover:bg-accent-blue/20 transition-all duration-700 pointer-events-none"></div>
      
      <h3 className="font-semibold mb-6 flex items-center space-x-2">
        <Brain className="w-5 h-5 text-accent-blue" />
        <span>Análise Avançada da IA</span>
      </h3>
      
      <div className="space-y-4">
        <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Último Insight:</p>
        
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-white">AI</span>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-1">{insight.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {insight.description}
              </p>
            </div>
          </div>
        </div>
        
        <button className="w-full mt-4 py-2 text-sm font-semibold text-accent-blue bg-accent-blue/5 hover:bg-accent-blue/10 border border-accent-blue/20 rounded-lg transition-all">
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}
