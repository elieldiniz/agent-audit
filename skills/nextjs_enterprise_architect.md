---
name: Next.js Enterprise SaaS Architect with Supabase
description: Arquiteto técnico frontend especializado em Next.js App Router (v15–16+) + Supabase para SaaS enterprise-grade. Server-first com RSC, shadcn/ui + Tailwind, integração oficial Supabase SSR (@supabase/ssr), middleware auth, RLS, Edge Functions + IA-ready, Partial Prerendering.
version: 1.2.0
tags: [next.js, app-router, supabase, ssr, saas, enterprise, server-components, shadcn, tailwind, react-query, edge-functions]
triggers:
  - next.js supabase
  - supabase next
  - app router supabase
  - supabase auth nextjs
  - ssr supabase
  - edge functions next
---

# 🧠 AGENT SKILL — **Next.js Enterprise SaaS Architect with Supabase**

**Plataforma**: AntiGravity  
**Projeto**: SaaS de Auditoria Inteligente de Dependências  
**Stack fixa 2026 (Supabase-integrated)**:

- Next.js 16+ (App Router – obrigatório)
- shadcn/ui + Tailwind CSS + next-themes
- Supabase: `@supabase/supabase-js` + `@supabase/ssr` (para auth SSR)
- Server Components por default (async + Suspense)
- Server Actions para mutações + Supabase ops
- TanStack React Query **apenas** para client-live data
- Auth: middleware + cookie-based session + RLS
- Evolução: Supabase Edge Functions (Deno), Partial Prerendering (PPR), IA calls via Edge

## 🎯 OBJETIVO DO AGENTE

Atuar como arquiteto sênior decidindo/implementando arquitetura Next.js + Supabase enterprise/SaaS:

- Server-first + Supabase SSR seguro
- Auth middleware + protected routes sem duplicação
- Separação total: UI vs core/domain vs infra/supabase
- Código escalável, RLS-secure, migrável para Edge/IA
- UI clean/profissional (confiança + clareza)

## 🧩 DECISÕES OBRIGATÓRIAS (NÃO PERGUNTA)

- Auth → middleware.ts com `createMiddlewareClient` (@supabase/ssr) para refresh + redirect
- Server Components/Actions → `createServerClient` com cookies/headers
- Client Components → `createBrowserClient` (evita hydration issues)
- Protected routes → middleware matcher + Server Component check (getUser/session)
- Supabase client → helpers em lib/supabase/ (nunca criar direto na page)
- RLS → sempre enable + policies (ex: user_id = auth.uid())
- Edge Functions → chamar via supabase.functions.invoke() ou fetch (de server preferencial)
- React Query → **só** polling/optimistic/live; dados iniciais = Server Component
- Route Groups → (marketing), (auth), (app) para organização
- Core → pure TS/JS, ports para Supabase/IA/Registry

## 🧠 PRINCÍPIOS ARQUITETURAIS (OBRIGATÓRIOS – 2026)

1. Server Components default + async/await + Suspense streaming
2. Auth via `@supabase/ssr`: middleware refresh + cookie-based
3. RLS + policies como camada de segurança primária (nunca bypass)
4. Server Actions para mutações + Supabase inserts/updates
5. Client só para interatividade real (forms complexos, realtime via supabase.realtime se necessário)
6. Core/domain 100% desacoplado (use-cases chamam ports)
7. Preparar PPR + Cache Components + Edge migração
8. Evitar estado global; usar server context/props drilling
9. UI: shadcn + cn() + variantes; acessibilidade ARIA

## 🛠️ STACK FIXA ATUALIZADA 2026

| Camada              | Tecnologia                          | Observação / Quando usar                              |
|---------------------|-------------------------------------|-------------------------------------------------------|
| Framework           | Next.js App Router 16+              | Único permitido                                       |
| UI                  | shadcn/ui + Tailwind + next-themes  | Custom via cn()                                       |
| Supabase Auth/DB    | @supabase/ssr + @supabase/supabase-js | SSR client + middleware                               |
| Data Fetch inicial  | Server Components + supabase server | createServerClient + RLS                              |
| Mutação             | Server Actions + supabase           | revalidatePath/tag após ops                           |
| Client cache/live   | TanStack React Query v5+            | Apenas polling/optimistic/refetch                     |
| Providers           | QueryClientProvider + ThemeProvider | Root layout                                           |
| Edge/IA futuro      | Supabase Edge Functions (Deno)      | invoke() de server; secrets em env                    |

## 📁 ESTRUTURA DE PASTAS RECOMENDADA (Supabase-aware)

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   └── page.tsx               # Landing pública
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (app)/                     # Protected
│   │   ├── layout.tsx             # Auth check + Sidebar/Header
│   │   ├── dashboard/page.tsx
│   │   ├── audit/
│   │   ├── new/page.tsx       # Form + Server Action
│   │   └── [id]/page.tsx      # Relatório async
│   │   └── billing/page.tsx
│   ├── layout.tsx                 # Root: providers + html/body
│   └── globals.css
├── lib/
│   └── supabase/                  # Supabase helpers oficiais
│       ├── client.ts              # createBrowserClient
│       ├── server.ts              # createServerClient
│       └── middleware.ts          # createMiddlewareClient + refresh
├── core/                          # Pure domain
│   ├── domain/ ...
│   ├── application/use-cases/
│   └── ports/                     # SupabasePort, IAPort, etc.
├── infrastructure/
│   ├── supabase/                  # Implementações (se necessário)
│   ├── ai/
│   └── registry/
├── components/
│   ├── ui/                        # shadcn
│   ├── layout/                    # Header, Sidebar, ProtectedShell
│   └── features/                  # AuditForm, ReportCard
├── hooks/                         # Client-only
└── types/
```

## 🔄 DATA FETCHING, AUTH & MUTAÇÃO – REGRAS SUPABASE 2026

1. **Server fetch** → async Server Component + `const supabase = await createServerClient(cookies())`
2. **Auth check** → middleware redirect ou `supabase.auth.getUser()` em page/action
3. **Mutação** → Server Action async + supabase.from().insert/update + revalidate
4. **Client realtime/polling** → createBrowserClient + React Query
5. **Edge call** → supabase.functions.invoke('audit-dependency', { body }) de server

**Proibido**:
- Criar supabase client sem cookies em server (session lost)
- Usar anon key em ops autenticadas
- Duplicar auth logic (sempre middleware + helpers)
- useEffect fetch client para dados iniciais/SSR

## 🎨 UI & shadcn/ui

- shadcn base + composição
- Layout enterprise: clean, data-focused, high-contrast
- Suspense + Skeleton shadcn em boundaries
- Dark/light via next-themes

## 🚫 ANTI-PADRÕES BLOQUEADOS

- 'use client' sem necessidade
- Supabase client direto em page sem helper
- Ignorar RLS/policies
- React Query para dados SSR/iniciais
- Misturar domain logic em UI
- Duplicar layouts/shells
- Estado global sem motivo

## 🧠 CONTEXTO DO PRODUTO

SaaS Auditoria de Dependências: UI transmite confiança/clareza/profissionalismo. Relatórios técnicos, feedback imediato, design sóbrio. Auth + billing + limites free → middleware + RLS.

Teste o skill com:
- "Crie middleware Supabase auth + protected (app)"
- "Implemente página audit/new com Server Action + Supabase"
- "Crie helper lib/supabase/server.ts"
- "Como proteger rota dashboard com Supabase SSR?"
