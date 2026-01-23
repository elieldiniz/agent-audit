import { LANDING_CONTENT } from "../../constants/landing";
import { Bot } from "lucide-react";

export function SolutionReveal() {
  const { features, headline, badge } = LANDING_CONTENT.solutionReveal;

  return (
    <section className="py-24 px-4 bg-landing-bg overflow-hidden relative">
      <div className="absolute inset-0 bg-landing-accent/5 radial-gradient" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-landing-accent/10 text-landing-accent mb-6">
            <Bot className="w-5 h-5" />
            <span className="font-semibold">{badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-2xl bg-landing-card border border-white/5 hover:border-landing-accent/30 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-landing-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-landing-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-landing-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
