import { AlertTriangle, Bot, Clock, Copy, Lock, Search, Shield, ShieldAlert, ShieldCheck, Terminal, Zap } from "lucide-react";

export const LANDING_CONTENT = {
  hero: {
    badge: "Risco Silencioso Detectado",
    headline: {
      prefix: "Suas dependências estão",
      highlight: "silenciosamente",
      suffix: "se tornando um risco.",
    },
    subheadline: "A maioria dos projetos só descobre que está sentada em uma bomba-relógio depois do incidente.",
    cta: {
      primary: "Ver riscos ocultos agora",
      secondary: "Sem instalar nada. Análise passiva e segura.",
    },
  },
  invisibleRisk: {
    risks: [
      {
        icon: Clock,
        title: "Abandono Silencioso",
        desc: "Dependência crítica sem manutenção há 2 anos.",
        color: "text-landing-warning",
        bg: "bg-landing-warning/10",
        border: "border-landing-warning/20",
      },
      {
        icon: ShieldAlert,
        title: "CVE Crítico Ativo",
        desc: "Vulnerabilidade descoberta ontem em pacote popular.",
        color: "text-landing-error",
        bg: "bg-landing-error/10",
        border: "border-landing-error/20",
      },
      {
        icon: AlertTriangle,
        title: "Configuração Insegura",
        desc: "Permissões excessivas herdadas em cascata.",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        border: "border-orange-400/20",
      },
    ],
  },
  solutionReveal: {
    badge: "Inteligência Ativa",
    headline: "AuditAI revela o que ferramentas tradicionais não mostram.",
    features: [
      {
        title: "Depreciação Silenciosa",
        desc: "Identifica pacotes que não recebem commits há meses, antes de virarem legacy.",
        icon: Search,
      },
      {
        title: "Risco Contextual",
        desc: "Não apenas 'tem CVE?', mas 'essa CVE afeta como você usa a lib?'.",
        icon: Zap,
      },
      {
        title: "Análise de Profundidade",
        desc: "Investiga a árvore de dependências, não apenas o topo do package.json.",
        icon: Bot,
      },
    ],
  },
  howItWorks: {
    steps: [
      {
        step: 1,
        title: "Cole a Dependência",
        desc: "package.json ou nome do pacote.",
        icon: Copy,
      },
      {
        step: 2,
        title: "IA Analisa Contexto",
        desc: "Cruzamento com CVEs, GH Issues e manutenção.",
        icon: Search,
      },
      {
        step: 3,
        title: "Veja o Risco Real",
        desc: "Score de risco e recomendação de ação.",
        icon: ShieldCheck,
      },
    ],
  },
  trustLayer: {
    items: [
      {
        icon: Terminal,
        title: "Sem Instalar Nada",
        desc: "Não sujamos seu package.json. Rode via npx ou CLI.",
      },
      {
        icon: Lock,
        title: "Código Seguro",
        desc: "Não lemos seu código-fonte. Apenas o manifesto de dependências.",
      },
      {
        icon: Shield,
        title: "Análise Isolada",
        desc: "Seus dados de dependência não treinam nossa IA sem permissão.",
      },
    ],
  },
  riskConsequences: {
    headline: "A maioria das falhas catastróficas começa assim.",
    quote: '"Uma dependência ignorada por 3 sprints vira um root exploit na sexta-feira à noite."',
    subtext: "Você não precisa procurar problemas. Eles já estão aí, esperando um gatilho.",
  },
  finalCTA: {
    headline: "Descubra riscos ocultos agora.",
    cta: "Começar Análise Gratuita",
    subtext: "Leva menos de 30 segundos. Sem cartão de crédito.",
  },
};
