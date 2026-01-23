import { LANDING_CONTENT } from "../../constants/landing";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const { badge, headline, subheadline, cta } = LANDING_CONTENT.hero;

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-landing-bg overflow-hidden px-4">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-landing-accent/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        
        {/* Badge / Signal */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-landing-accent/10 border border-landing-accent/20 text-landing-accent text-sm font-medium animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-landing-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-landing-accent"></span>
          </span>
          {badge}
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          {headline.prefix} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
            {headline.highlight}
          </span>{" "}
          {headline.suffix}
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-landing-muted max-w-2xl mx-auto font-light leading-relaxed">
          {subheadline}
        </p>

        {/* CTA */}
        <div className="pt-8">
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-landing-accent text-white rounded-lg text-lg font-semibold tracking-wide hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
          >
            {cta.primary}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-4 text-sm text-landing-muted/60">
            {cta.secondary}
          </p>
        </div>
      </div>
    </section>
  );
}
