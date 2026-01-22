export function DemoInsight() {
  return (
    <section className="py-24 px-4 bg-landing-bg/50">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-xl bg-[#0F1117] border border-white/10 shadow-2xl overflow-hidden group">
          {/* Fake Browser Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="ml-4 text-xs text-landing-muted font-mono">audit-ai-analysis.log</div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 font-mono text-sm md:text-base">
            <div className="space-y-4">
              <div className="flex gap-3 text-landing-muted/50">
                <span>$</span>
                <span className="text-landing-accent">ai-audit analyze --deep react-legacy-lib</span>
              </div>
              
              <div className="space-y-1 animate-pulse">
                <div className="text-landing-muted">Analyzing dependency graph...</div>
                <div className="text-landing-muted">Checking maintainer activity...</div>
              </div>

              <div className="pt-4 space-y-2 border-l-2 border-landing-error/50 pl-4">
                <div className="text-landing-error font-bold flex items-center gap-2">
                  <span>⚠ CRITICAL RISK DETECTED</span>
                </div>
                <div className="text-landing-muted">
                  Package has <span className="text-white">0 commits</span> in last 18 months.
                </div>
                <div className="text-landing-muted">
                  Maintainer marked repo as <span className="text-landing-warning">archived</span>.
                </div>
              </div>

              <div className="pt-4 text-landing-accent">
                {">"} Recommendation: Migrating to 'react-modern-lib' is strongly advised.
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute -bottom-[20%] -right-[10%] w-[400px] h-[400px] bg-landing-accent/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-landing-accent/10 transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
}
