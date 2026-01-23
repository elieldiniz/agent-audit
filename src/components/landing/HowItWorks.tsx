import { LANDING_CONTENT } from "../../constants/landing";
import { ArrowDown } from "lucide-react";

export function HowItWorks() {
  const { steps } = LANDING_CONTENT.howItWorks;

  return (
    <section className="py-20 px-4 bg-landing-bg border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-landing-accent/20 to-transparent" />
            
            {steps.map((item, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-landing-card border border-landing-accent/30 flex items-center justify-center z-10 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <item.icon className="w-8 h-8 text-landing-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-landing-muted text-sm">{item.desc}</p>
                
                {index < 2 && (
                  <ArrowDown className="md:hidden w-6 h-6 text-landing-muted mt-8 opacity-20" />
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
