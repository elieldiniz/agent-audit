export function ProofSignals() {
  return (
    <section className="py-24 px-4 bg-landing-bg">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Nada disso aparece no build.
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-landing-muted/50 tracking-tight">
            Nada disso quebra o deploy.
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-landing-error tracking-tight animate-pulse">
            Mas tudo isso quebra produção.
          </h2>
        </div>
        
        <p className="text-lg text-landing-muted max-w-2xl mx-auto">
          Ferramentas tradicionais olham para o código que você escreveu. 
          Nós olhamos para o código que você importou e esqueceu.
        </p>
      </div>
    </section>
  );
}
