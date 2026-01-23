# 🛡️ Agent Audit AI

**Painel de Auditoria Inteligente de Dependências**

O Agent Audit AI é uma plataforma de segurança enterprise para auditoria automatizada de dependências (npm, JSR, etc.) utilizando IA para detectar riscos latentes, depreciações e vulnerabilidades em tempo real.

## 🚀 Tecnologias
- **Framework**: Next.js 16 (App Router + Turbopack)
- **Backend/Auth**: Supabase
- **IA**: OpenAI (via Edge Functions)
- **Arquitetura**: Clean Architecture
- **Estilização**: Tailwind CSS (Dark Mode First)

## 🏗️ Documentação de Implementação

Dividimos o projeto em módulos para facilitar a colaboração entre múltiplos agentes e desenvolvedores:

1. [**Arquitetura e Estrutura**](docs/IMPLANTACAO_1_ARQUITETURA.md)
2. [**Design System e Cores**](docs/IMPLANTACAO_2_LAYOUT_CORES.md)
3. [**Casos de Uso (Back-end Core)**](docs/IMPLANTACAO_3_USE_CASES.md)
4. [**Supabase Edge Functions**](docs/IMPLANTACAO_4_EDGE_FUNCTIONS.md)

## 🏁 Como Começar

1. Clone o repositório.
2. Configure o `.env` com suas chaves do Supabase.
   ```env
   NEXT_PUBLIC_SUPABASE_URL=seu_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_chave
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o desenvolvimento:
   ```bash
   npm run dev
   ```

---
💡 *Este projeto segue rigorosamente os princípios de Clean Architecture descritos no módulo de arquitetura.*
