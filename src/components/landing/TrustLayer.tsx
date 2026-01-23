import { LANDING_CONTENT } from "../../constants/landing";

export function TrustLayer() {
  const { items } = LANDING_CONTENT.trustLayer;

  return (
    <section className="py-16 px-4 bg-landing-bg/50 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center gap-12 md:gap-24 opacity-70 hover:opacity-100 transition-opacity">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <item.icon className="w-5 h-5 text-landing-muted" />
            <div>
              <h4 className="font-semibold text-white text-sm">{item.title}</h4>
              <p className="text-landing-muted text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
