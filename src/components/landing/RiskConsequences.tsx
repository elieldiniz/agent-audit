import { LANDING_CONTENT } from "../../constants/landing";

export function RiskConsequences() {
  const { headline, quote, subtext } = LANDING_CONTENT.riskConsequences;

  return (
    <section className="py-24 px-4 bg-landing-bg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight">
          {headline}
        </h2>
        
        <div className="relative p-8 rounded-2xl border border-landing-error/20 bg-landing-error/5 max-w-2xl mx-auto backdrop-blur-sm">
          <p className="text-2xl font-light text-landing-muted italic">
            {quote}
          </p>
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-landing-error" />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-landing-error" />
        </div>

        <p className="mt-12 text-landing-muted">
          {subtext}
        </p>
      </div>
    </section>
  );
}
