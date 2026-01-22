import { Hero } from "@/components/landing/Hero";
import { InvisibleRisk } from "@/components/landing/InvisibleRisk";
import { ProofSignals } from "@/components/landing/ProofSignals";
import { SolutionReveal } from "@/components/landing/SolutionReveal";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { DemoInsight } from "@/components/landing/DemoInsight";
import { RiskConsequences } from "@/components/landing/RiskConsequences";
import { TrustLayer } from "@/components/landing/TrustLayer";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-landing-bg text-white selection:bg-landing-accent/30 font-sans">
      <Hero />
      <InvisibleRisk />
      <ProofSignals />
      <SolutionReveal />
      <HowItWorks />
      <DemoInsight />
      <RiskConsequences />
      <TrustLayer />
      <FinalCTA />
    </main>
  );
}
