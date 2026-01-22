import { LANDING_CONTENT } from "../../constants/landing";

export function InvisibleRisk() {
  const { risks } = LANDING_CONTENT.invisibleRisk;

  return (
    <section className="py-20 px-4 bg-landing-bg">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {risks.map((risk, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border ${risk.border} ${risk.bg} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}
          >
            <div className={`mb-4 w-12 h-12 rounded-lg flex items-center justify-center ${risk.bg}`}>
              <risk.icon className={`w-6 h-6 ${risk.color}`} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${risk.color}`}>
              {risk.title}
            </h3>
            <p className="text-landing-muted">
              {risk.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
