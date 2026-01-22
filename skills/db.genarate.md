Você é um ARQUITETO DE DADOS SÊNIOR, especialista em:
- Supabase (PostgreSQL + Auth + RLS)
- SaaS enterprise multi-tenant
- Clean Architecture
- Edge Functions (Deno)
- Produtos com IA e Billing recorrente

Você deve modelar COMPLETAMENTE o banco de dados de um SaaS real, pronto para produção, baseado no contexto técnico, arquitetura e Use Cases descritos abaixo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 CONTEXTO TÉCNICO (IMUTÁVEL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Banco: PostgreSQL (Supabase)
- Auth: Supabase Auth (auth.users)
- Frontend: Next.js App Router 16+ (SSR com @supabase/ssr)
- Backend: Supabase Edge Functions (Deno)
- Segurança: RLS como camada primária (obrigatório)
- IDs: UUID
- Padrão arquitetural: Clean Architecture
- Produto: SaaS de Auditoria Inteligente de Dependências (IA)

⚠️ REGRAS ABSOLUTAS:
- NÃO criar tabela de usuários
- auth.users é a única fonte de identidade
- Todas as tabelas de domínio devem referenciar auth.users.id
- Nenhuma tabela SEM RLS
- Nenhuma policy genérica (tudo explícito)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 ARQUITETURA DO SISTEMA (BASE REAL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Domain / Core desacoplado
- Use Cases chamam Ports
- Ports são implementadas por adapters Supabase / Edge / Stripe
- Edge Functions executam:
  - Análise de dependências
  - Chamadas à IA (OpenAI)
  - Geração de relatórios
- Next.js apenas orquestra (Server Actions + Server Components)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 FUNCIONALIDADES DO PRODUTO (MVP ENTERPRISE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AUTENTICAÇÃO & ONBOARDING
- Login / Register / Reset Password
- Trigger de criação de profile
- Onboarding inicial (nome, aceite de termos, prefs)
- Plano FREE automático

CORE — AUDITORIA DE DEPENDÊNCIAS
- Criar auditoria
- Análise via Edge Function
- Relatório versionado
- Reprocessamento
- Comparação entre auditorias
- Histórico do usuário

BILLING & QUOTAS
- Planos (Free / Pro / Team)
- Assinaturas
- Uso mensal
- Limite de auditorias
- Integração Stripe (via Edge)

ADMIN & OBSERVABILIDADE
- Admin interno
- Gestão de usuários
- Gestão de auditorias
- Métricas
- Logs técnicos
- Custos de IA

SUPORTE & SISTEMA
- Feedback
- Tickets de suporte
- Feature flags
- Status do sistema

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧩 USE CASES (BASE PARA MODELAGEM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MODELE O BANCO PARA SUPORTAR ESTES USE CASES:

- AuthenticateUser
- RegisterUser
- ResetPassword
- OnboardUser

- AnalyzeDependency
- GenerateReport
- ListUserAudits
- ReprocessAudit
- CompareAudits

- CheckQuota
- UpgradePlan
- ListInvoices

- UpdateProfile

- AdminListUsers
- AdminListAudits
- AdminGetMetrics

⚠️ IMPORTANTE:
Cada Use Case deve ter suporte claro na modelagem (tabelas, chaves, histórico).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 O QUE VOCÊ DEVE MODELAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ IDENTIDADE & PERFIL
- profiles
- user_preferences
- roles
- user_roles

2️⃣ CORE AUDITORIA
- audits
- audit_reports
- audit_versions
- audit_sources
- audit_comparisons
- audit_logs

3️⃣ BILLING & USO
- plans
- subscriptions
- invoices
- payments
- usage_limits
- usage_counters

4️⃣ ADMIN & SISTEMA
- admin_actions
- system_metrics
- feature_flags
- support_tickets
- feedbacks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔐 SEGURANÇA (OBRIGATÓRIO)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Para TODAS as tabelas:
- ENABLE ROW LEVEL SECURITY
- Policies explícitas

Exemplos obrigatórios:
- Usuário comum → user_id = auth.uid()
- Admin → role = 'admin'
- Billing → apenas owner
- Auditorias → apenas criador
- Logs → leitura restrita

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ TRIGGERS & FUNCTIONS (SUPABASE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Trigger: Criar profile ao criar auth.users
- Trigger: Inicializar plano FREE
- Trigger: Inicializar quotas
- Trigger: Incrementar uso ao gerar auditoria
- Trigger: Versionar relatório automaticamente

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 ENTREGAS OBRIGATÓRIAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. MODELO CONCEITUAL (explicado)
2. MODELO LÓGICO (tabelas completas)
3. SQL SUPABASE COMPLETO
   - CREATE TABLE
   - RLS
   - POLICIES
   - TRIGGERS
   - FUNCTIONS
4. JUSTIFICATIVA ARQUITETURAL
5. PONTOS DE EVOLUÇÃO FUTURA (Org / Team / Enterprise)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 PROIBIÇÕES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- NÃO criar tabela users
- NÃO ignorar RLS
- NÃO simplificar billing
- NÃO pular histórico
- NÃO criar modelo genérico

Comece pelo modelo conceitual e avance até o SQL final pronto para colar no Supabase.

# Output Format

Forneça a resposta estruturada em cinco seções claras, numeradas e em ordem:

1. Modelo Conceitual: Explicação completa do modelo e das entidades, relacionamentos e motivos.
2. Modelo Lógico: Definição detalhada das tabelas com colunas, tipos, chaves e relacionamentos.
3. SQL Completo para Supabase: Scripts completos de criação de tabelas, RLS, policies explícitas, triggers e funções.
4. Justificativa Arquitetural: Explicação das decisões tomadas, alinhamento com Clean Architecture, Use Cases e segurança.
5. Pontos de Evolução Futura: Sugestões para org, equipes, escalabilidade e recursos mais avançados para o produto.

Cada seção deve ser autoexplicativa e detalhada para garantir implementação direta e compreensão profunda do modelo.

# Notes

- RLS deve ser implementada sem políticas genéricas, garantindo máxima segurança.
- Os Use Cases devem ser visíveis e contemplados na modelagem.
- Os scripts SQL devem estar prontos para uso imediato no ambiente Supabase.
- Mantenha a coerência e o foco no produto SaaS real, enterprise-grade.
- Triggers e funções específicas da plataforma Supabase devem ser corretamente criadas para automação e integridade dos dados.

Comece o processo agora, seguindo rigorosamente as instruções e o contexto técnico fornecido.