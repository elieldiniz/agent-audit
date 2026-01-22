import { LANDING_CONTENT } from "../../constants/landing";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  const { headline, cta, subtext } = LANDING_CONTENT.finalCTA;

  return (
    <section className="py-32 px-4 bg-landing-bg relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-landing-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
          {headline}
        </h2>
        
        <div>
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-landing-accent text-white rounded-xl text-xl font-bold tracking-wide hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105"
          >
            {cta}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-6 text-landing-muted text-sm">
            {subtext}
          </p>
        </div>
      </div>
    </section>
  );
}
