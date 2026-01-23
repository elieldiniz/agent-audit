
---

## Parte 1: Wireframe Visual Completo do BillingLayout

Baseado nos princípios que você descreveu (clareza, ações claras, cards estilizados, progressão de uso, responsivo, confiança), criei um wireframe visual. Ele é "único, limpo e moderno", evitando padrões genéricos: cards com microgradientes, barra de progresso animada, checkout integrado aos cards, tabela interativa para faturas, e feedbacks visuais.

### Visão Geral em Desktop (Grid Layout)
Usando Markdown + ASCII art para representar (copie para um editor como Figma ou implemente em code).

```
+------------------------------------------------------------+
| Header (TopBar)                                            |
| [Logo]  > Billing > Checkout / Histórico                  |
|                                                          |
| [Avatar: Eliel]  [Quota Alerta: 80% usado - Upgrade?]     |
| [Logout]                                                   |
+------------------------------------------------------------+
| Sidebar (Reutilizado do Dashboard) | Main Content Area    |
| - Auditorias                       | 1. Plano Atual & Quota|
| - Histórico                        | +-------------------+ |
| - Comparar                         | | Plano Pro         | |
| - Perfil                           | | Auditorias: 80/100| |
| - Billing (ativo)                  | | [Barra Progresso: | |
|                                    | | 80% - Laranja]    | |
|                                    | | CTA: Upgrade Agora| |
|                                    | +-------------------+ |
|                                    |                       |
|                                    | 2. Seleção de Planos  |
|                                    | +-------+ +-------+ +-------+ |
|                                    | | Free  | | Pro   | | Enterprise| |
|                                    | | $0/mês| | $19/mês| | $99/mês  | |
|                                    | | 10 aud| | Ilimit| | +SLA    | |
|                                    | | [CTA] | | [CTA] | | [CTA]   | |
|                                    | +-------+ +-------+ +-------+ |
|                                    | [Checkout Form Integrado ao Card Selecionado] |
|                                    |                       |
|                                    | 3. Histórico de Faturas |
|                                    | +-------------------+ |
|                                    | | Invoice ID | Data | Valor | Status | Download |
|                                    | | #123      | Jan 21 | $19   | Pago   | [PDF]   |
|                                    | | #124      | Jan 15 | $19   | Pendente| [PDF]  |
|                                    | | [Filtros: Data/Status] | [Sortable] |
|                                    | +-------------------+ |
+------------------------------------------------------------+
| Footer                                             |
| [Links Legais]  © 2026 Seu SaaS                    |
+------------------------------------------------------------+
```

### Visão em Mobile (Empilhado)
Em telas menores, sidebar colapsa em menu hamburger, cards empilham verticalmente.

```
[Header Compacto: Logo + Breadcrumb + Avatar + Quota Alerta]

[Menu Hamburger: Sidebar itens]

Main Content (Vertical Stack):
1. Plano Atual Card (full-width, barra progresso)
2. Planos Cards (empilhados, com checkout integrado ao selecionado)
3. Faturas Lista (cards ou tabela responsiva, scroll horizontal se necessário)

[Footer Compacto]
```

### Detalhes de Implementação em Tailwind + shadcn/ui
- **Plano Atual Card**: Use shadcn Card + Progress (com variantes laranja/vermelho/verde).
  - Código esboço: `<Card className="shadow-md border-0 bg-gradient-to-r from-gray-50 to-gray-100"> <Progress value={80} className="w-full h-2 rounded-full" /> <Button variant="primary" className="mt-4 bg-purple-600 hover:bg-purple-700">Upgrade</Button> </Card>`
- **Planos Cards**: Grid com 3 Cards (grid-cols-3 desktop, col-span-1 mobile).
  - Diferencial: Hover eleva (transition-shadow), gradiente no CTA.
  - Checkout: Use Stripe Elements dentro do card selecionado (state client-side).
- **Faturas Tabela**: shadcn Table ou DataTable (com sortable columns via React Query).
  - Filtros: shadcn Input + Select.
- **Animações**: Framer Motion para progress bar e hover (ex: animate={ { scale: 1.05 } }).
- **Cores/Tipografia**: Tailwind classes: text-gray-800, font-semibold para títulos; bg-green-100 para seguro.

### Como Implementar no Seu Projeto
- Reutilize DashboardLayout: Envolva em <ProtectedLayout> (auth check).
- Data Fetch: Server Component + React Query para invoices/quota (revalidate on focus).
- Mobile: Tailwind responsive (md:grid-cols-3 → flex-col).

Se precisar do código TSX completo para esse layout (ex: BillingPage.tsx), diga!

---

## Parte 2: Pesquisa Requerida de Integração com Stripe para o Seu Projeto

Fiz uma pesquisa abrangente sobre os **requisitos e melhores práticas para integrar Stripe no seu SaaS (Next.js App Router + Supabase)**. Os resultados são baseados em fontes confiáveis como docs oficiais do Stripe, tutoriais de devs (DEV Community, Medium, Reddit), repositórios open-source (Vercel starters, GitHub templates), e vídeos/guides (YouTube, Udacity). Aqui está um guia passo a passo resumido, adaptado ao seu projeto (SaaS com auth Supabase, billing para planos Free/Pro/Enterprise, quotas de auditorias, webhooks para sync).

### Requisitos Gerais para Integração (de acordo com Stripe Docs 2026)
- **Conta Stripe**: Crie uma conta de teste (sandbox) no dashboard Stripe (gratuita). Ative Checkout e Billing (subscriptions).
- **Modos**: Use modo "Test" para dev (chaves pk_test_..., sk_test_...). Mude para "Live" em production.
- **Pacotes Necessários**: Para Next.js + Supabase:
  - `stripe` (backend/Server Actions).
  - `@stripe/stripe-js` e `@stripe/react-stripe-js` (frontend para Checkout/Elements).
  - Instale: `npm install stripe @stripe/stripe-js @stripe/react-stripe-js`.
- **Env Vars**: No `.env.local` (e Vercel):
  - `STRIPE_SECRET_KEY=sk_test_...`
  - `STRIPE_PUBLISHABLE_KEY=pk_test_...`
  - `STRIPE_WEBHOOK_SECRET=whsec_...` (para verificar webhooks).
- **Integração com Supabase**: Use Supabase para armazenar users/subscriptions (tabelas: customers, subscriptions, products). Sync via webhooks.
- **Segurança**: Use RLS no Supabase (ex: row user_id = auth.uid()). Nunca exponha secret keys no client-side.
- **Requisitos Técnicos**: Node.js 18+, Stripe API v2024-10-29 ou superior. Para webhooks, use rota dedicada em Next.js (`/api/stripe/webhook`).
- **Custo**: Stripe cobra 2.9% + $0.30 por transação (test grátis). Para subscriptions, use Billing Portal para customer self-service (cancel/upgrade).

### Guia Passo a Passo de Integração (Adaptado ao Seu SaaS)
Baseado em tutoriais como Vercel's Next.js Subscription Starter, DEV Community guides, e repos como KolbySisk/next-supabase-stripe-starter.

1. **Configurar Tabelas no Supabase** (Docs Supabase + Stripe Integration):
   - Crie tabelas via SQL Editor ou CLI:
     ```sql
     -- customers (associa Supabase users a Stripe customers)
     create table customers (
       id uuid references auth.users not null primary key,
       stripe_customer_id text unique not null
     );

     -- products (planos do Stripe – sync via fixture ou webhook)
     create table products (
       id text primary key, -- Stripe product ID
       name text not null, -- 'Pro'
       description text,
       price_id text, -- Stripe price ID
       active boolean default true
     );

     -- subscriptions (plano atual do user)
     create table subscriptions (
       id text primary key, -- Stripe subscription ID
       user_id uuid references auth.users not null,
       status text not null, -- 'active', 'canceled'
       product_id text references products(id),
       current_period_end timestamp
     );
     ```
   - Ative RLS: Para subscriptions, `user_id = auth.uid()` ou admin policy.
   - Trigger: Crie trigger para novo user → criar Stripe customer (use Supabase Edge Function ou webhook).

2. **Instalar e Configurar Stripe no Next.js**:
   - Adicione env vars (acima).
   - Crie lib/stripe.ts (cliente Stripe):
     ```ts
     import Stripe from 'stripe';

     export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
       apiVersion: '2024-10-29',
     });
     ```
   - Para frontend: Use <Elements> de @stripe/react-stripe-js em componentes de checkout.

3. **Criar Produtos e Preços no Stripe Dashboard**:
   - Vá para Products → Add Product: Crie "Pro" ($19/mês), "Enterprise" ($99/mês).
   - Obtenha IDs (product_id, price_id).
   - Fixture: Rode script para sync products para Supabase tabela (use Stripe API list products).

4. **Implementar Checkout e Subscriptions** (BillingLayout):
   - **Plano Atual & Upgrade**: Server Component fetch subscription via Supabase + Stripe API.
     - Use-case: CheckSubscriptionUseCase chama BillingRepositoryPort (adapter Supabase + Stripe).
     - CTA Upgrade: Cria sessão Stripe Checkout:
       ```ts
       const session = await stripe.checkout.sessions.create({
         customer: user.stripe_customer_id,
         mode: 'subscription',
         payment_method_types: ['card'],
         line_items: [{ price: priceId, quantity: 1 }],
         success_url: `${origin}/billing/success`,
         cancel_url: `${origin}/billing`,
       });
       ```
   - **Histórico de Faturas**: ListInvoicesUseCase via Stripe.invoices.list({ customer: stripe_customer_id }).
     - Tabela: Use shadcn DataTable com colunas ID/Data/Valor/Status/Download (Stripe PDF via invoice.pdf_link).

5. **Webhooks para Sync (Crítico)**:
   - Crie rota `/api/stripe/webhook` em Next.js (raw body, verify signature):
     ```ts
     import { stripe } from '@/lib/stripe';

     export async function POST(req: Request) {
       const body = await req.text();
       const sig = req.headers.get('stripe-signature');
       const event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

       if (event.type === 'customer.subscription.updated') {
         // Sync Supabase subscription
         await supabase.from('subscriptions').upsert({ id: event.data.object.id, status: event.data.object.status });
       }

       return new Response('OK', { status: 200 });
     }
     ```
   - Configure webhook no Stripe Dashboard: Pointe para sua URL (ex: yourapp.com/api/stripe/webhook).
   - Eventos: customer.subscription.created/updated/deleted, invoice.paid/failed.

6. **Integração com Supabase Auth**:
   - Trigger Supabase: Ao criar user, insira em customers + crie Stripe customer via API.
     - Use Edge Function para isso (chamada HTTP do Next.js).
   - Quotas: CheckQuotaUseCase consulta subscriptions tabela + conta auditorias no período.

7. **Testes e Segurança**:
   - Teste com Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
   - RLS: Proteja tabelas (ex: subscriptions user_id = auth.uid()).
   - Erros: Use Sentry para monitorar falhas de pagamento.

8. **Melhores Práticas Adicionais** (de fontes pesquisadas):
   - Use Stripe Customer Portal para self-service (cancel/upgrade) – integre via sessão.
   - Para quotas: Use Supabase triggers ou cron para reset mensal.
   - Open-source starters: Use Vercel/nextjs-subscription-payments ou KolbySisk/next-supabase-stripe-starter como base (adaptados ao seu Clean Arch).
   - Custo: Comece com Stripe Billing (subscriptions automáticas).
   - Problemas comuns: Webhook falhas (use re-tries), timezone sync (use UTC).

Sim, Eliel, **100% baseado** nas documentações oficiais do Supabase (especialmente o **Stripe Wrapper** que você linkou) e do Stripe (https://docs.stripe.com), vou te dar uma análise clara e adaptada ao **seu caso específico** (SaaS de Auditoria Inteligente de Dependências com Next.js App Router, Supabase Auth/RLS, planos Free/Pro/Enterprise, quotas de auditorias, histórico de faturas, upgrade, e arquitetura Clean + desacoplada que construímos).

### Resumo Rápido: Stripe Wrapper é bom para o seu caso?
**Sim, mas não sozinho** — é uma ótima ferramenta para **ler e escrever dados principais do Stripe diretamente no seu banco Supabase via SQL**, mas **não substitui webhooks** para um billing completo e confiável.

Aqui está a tabela de decisão adaptada ao seu MVP:

| Necessidade no seu SaaS                        | Stripe Wrapper cobre? | Recomendação final para você (2026)                                                                 | Por quê / Limitação principal |
|------------------------------------------------|-----------------------|-----------------------------------------------------------------------------------------------------|--------------------------------|
| Listar produtos/preços (para exibir planos)   | ✅ Sim (SELECT)       | Use Wrapper (rápido e SQL nativo)                                                                   | Leitura perfeita, sem duplicação de dados |
| Criar/atualizar customers                     | ✅ Sim (INSERT/UPDATE) | Use Wrapper para criar customer no signup (via trigger ou use-case)                                | Seguro e direto no DB |
| Criar subscription (upgrade plano)            | ✅ Sim (INSERT)       | Use Wrapper + Stripe Checkout Session (Next.js) para criar subscription                            | Bom para criação inicial |
| Atualizar subscription (status, cancel, etc.) | ✅ Sim (UPDATE)       | Use Wrapper para updates manuais, mas **não confie só nele**                                       | Não reage em tempo real a eventos Stripe |
| Listar invoices / histórico de faturas        | ✅ Sim (SELECT)       | Use Wrapper para exibir histórico no BillingLayout (queries rápidas)                               | Excelente para leitura |
| Sincronizar status em tempo real (ex: pagamento falhou → bloquear quota) | ❌ Não                 | **Obrigatório webhooks** (via Edge Function ou Next.js route)                                      | Wrapper não escuta eventos Stripe |
| Gerar invoices automaticamente, trials, coupons, dunning | ❌ Parcial / Limitado | **Não cobre** — precisa Stripe Billing + webhooks para lógica completa                             | Wrapper é mais para CRUD básico |
| Verificar quota antes de auditoria            | Indireto              | Use Wrapper para ler subscription + sua tabela de auditorias (count mensal)                        | Bom + sua lógica de quota |
| Segurança / RLS                               | ✅ Sim                | Aplique RLS normal em suas tabelas (ex: subscriptions user_id = auth.uid())                        | Wrapper respeita RLS do Supabase |

**Conclusão adaptada ao seu projeto**:  
O **Stripe Wrapper** é **excelente para o seu MVP** em **leitura e escrita básica** (planos, customers, subscriptions, invoices) — evita duplicar dados no Supabase e permite queries SQL nativas e rápidas para o BillingLayout (plano atual, quota, histórico).  
Mas **não é suficiente sozinho** para um SaaS real: você **precisa de webhooks** para sincronizar eventos assíncronos do Stripe (pagamento confirmado, falha, cancelamento).  
→ **Recomendação híbrida (melhor prática 2026)**:  
- Wrapper para **consultas e operações diretas** (ex: listar faturas, criar customer no signup).  
- Edge Function (ou Next.js route) para **webhooks Stripe** (sincronização em tempo real).

### Fluxo Recomendado para o Seu SaaS (com Wrapper + Webhooks)

1. **Signup / Onboarding** (Next.js Server Action):
   - Use-case: RegisterUserUseCase → cria user no Supabase Auth.
   - Trigger ou Edge Function: Cria customer no Stripe via Wrapper (`INSERT INTO stripe.customers ...`).
   - Salva `stripe_customer_id` na tabela `customers` do Supabase.

2. **Upgrade Plano** (BillingLayout):
   - Frontend: Cards de planos → usuário clica "Upgrade Pro".
   - Server Action: Cria Checkout Session Stripe (com `stripe.checkout.sessions.create` no Next.js).
   - Após pagamento: Stripe redireciona → webhook processa.
   - Webhook: Cria/atualiza subscription via Wrapper (`INSERT INTO stripe.subscriptions ...`).
   - Seu Use-case: CheckQuotaUseCase lê subscription via Wrapper + conta auditorias.

3. **Histórico de Faturas** (BillingLayout):
   - Server Component: `SELECT * FROM stripe.invoices WHERE customer = 'cus_xxx' ORDER BY created DESC LIMIT 50;`
   - Renderiza tabela shadcn com status (pago/pendente), valor, data, link PDF.

4. **Quota Check Antes de Auditoria**:
   - Use-case: CheckQuotaUseCase → `SELECT status, current_period_end FROM stripe.subscriptions WHERE customer = 'cus_xxx';`
   - + Conta rows em sua tabela `reports` no período (via Supabase query).

5. **Webhooks Obrigatórios** (para eventos reais):
   - Crie Edge Function ou rota Next.js `/api/stripe/webhook`.
   - Eventos críticos: `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated/deleted`.
   - No webhook: Atualiza sua tabela `subscriptions` (não precisa Wrapper aqui, use supabase-js normal).
   - Exemplo de evento `invoice.paid`: Confirma pagamento → libera quota.

### Vantagens dessa Abordagem para o Seu Caso
- **Consulta rápida e nativa** — BillingLayout carrega planos/faturas direto do DB via SQL (sem API calls extras).
- **Sem duplicação desnecessária** — Dados do Stripe vivem "virtualmente" no Supabase via Wrapper.
- **Segurança** — RLS + Vault para chaves Stripe.
- **Escalável** — Wrapper para leitura/escrita básica; webhooks para real-time.
- **Limitação resolvida** — Webhooks cuidam do que o Wrapper não faz (eventos assíncronos).

### Próximos Passos Práticos para Implementar
1. Ative o Wrapper no seu projeto Supabase (SQL acima).
2. Crie as tabelas `customers`, `subscriptions`, `products` com RLS.
3. No Stripe Dashboard: Crie produtos/preços e pegue IDs.
4. Implemente Checkout Session no Next.js (Server Action).
