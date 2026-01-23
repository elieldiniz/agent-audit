
Baseado na arquitetura Clean Architecture + Use Cases definida no seu skill (v1.5.0), na visão do produto (MVP com Next.js App Router, Supabase, Edge Functions, IA via OpenAI, e billing com Stripe), e nas telas/fluxos descritos (público, autenticado, admin), aqui está a estrutura completa e exaustiva de todos os Use Cases necessários para o MVP.
Estruturei-os de forma clara e escalável:

Localização: Todos em core/application/use-cases/ (puros TS/JS, independentes de framework).
Padrão por Use Case: Cada um é uma classe ou função pura que recebe ports como dependências (injeção via factory em lib/composition/).
Entrada/Saída: Usam DTOs imutáveis (em core/domain/dtos/) para input/output.
Ports envolvidos: Interfaces definidas em core/ports/ (implementadas por adapters em infrastructure/adapters/ como SupabaseRepositoryAdapter, EdgeAnalyzerAdapter, StripeBillingAdapter).
Critérios de inclusão: Apenas fluxos de negócio críticos (não UI ou infra details). Cobrem auth, análise core, billing, admin, e observabilidade mínima.
Quantidade: 14 Use Cases principais (para MVP utilizável e escalável, sem over-engineering).

Os Use Cases são agrupados por domínio (Autenticação, Auditoria, Billing, Admin, Usuário).
1. Domínio: Autenticação e Onboarding
Esses Use Cases lidam com acesso e setup inicial, integrando com Supabase Auth via adapter.

AuthenticateUserUseCase
Descrição: Autentica o usuário via email/senha ou OAuth, gera sessão.
Atores: Usuário anônimo.
Pré-condições: Input válido (email, senha ou provider token).
Pós-condições: Sessão criada, profile inicial gerado se novo usuário.
Fluxo Principal:
Validar credenciais via AuthPort.
Checar se usuário existe; se não, criar profile default (role: 'user').
Retornar sessão DTO.

Fluxos Alternativos: Erro de credenciais → throw InvalidCredentialsError; OAuth falha → redirect.
Ports: AuthPort (para Supabase signIn), ProfileRepositoryPort (para upsert profile).
Chamada típica: De Server Action em /login/page.tsx.

RegisterUserUseCase
Descrição: Registra novo usuário, envia verificação de email.
Atores: Usuário anônimo.
Pré-condições: Email único, senha válida.
Pós-condições: Usuário criado no Supabase Auth, profile inicial (free plan).
Fluxo Principal:
Criar usuário via AuthPort.
Enviar email de verificação.
Criar profile via ProfileRepositoryPort.

Fluxos Alternativos: Email duplicado → throw DuplicateEmailError.
Ports: AuthPort, ProfileRepositoryPort.
Chamada típica: De Server Action em /register/page.tsx.

ResetPasswordUseCase
Descrição: Envia link de reset de senha.
Atores: Usuário anônimo.
Pré-condições: Email existe.
Pós-condições: Email de reset enviado.
Fluxo Principal:
Verificar email via AuthPort.
Gerar e enviar token de reset.

Fluxos Alternativos: Email não encontrado → throw UserNotFoundError.
Ports: AuthPort.
Chamada típica: De Server Action em /reset-password/page.tsx.

OnboardUserUseCase
Descrição: Configura profile inicial após primeiro login (ex: aceitar termos, set name).
Atores: Novo usuário autenticado.
Pré-condições: Sessão válida, profile incompleto.
Pós-condições: Profile atualizado, redirecionado para dashboard.
Fluxo Principal:
Atualizar profile via ProfileRepositoryPort.
Ativar plano free via BillingPort.

Fluxos Alternativos: Dados inválidos → throw ValidationError.
Ports: ProfileRepositoryPort, BillingPort.
Chamada típica: De Server Action em /onboarding/page.tsx.


2. Domínio: Auditoria de Dependências (Core do Produto)
Esses são os Use Cases centrais, integrando Edge Functions para análise IA.

AnalyzeDependencyUseCase
Descrição: Analisa dependência colada, chama IA via Edge, gera relatório preliminar.
Atores: Usuário autenticado.
Pré-condições: Sessão válida, quota disponível (check via CheckQuotaUseCase).
Pós-condições: Relatório JSON gerado, salvo no DB.
Fluxo Principal:
Validar input (detectar registry: npm, jsr, etc.).
Chamar AnalyzerPort (Edge Function) para fetch metadata, changelog, security scan.
Chamar ReportGeneratorPort (IA) para avaliação risco, sugestões.
Calcular health_score e risk_level.
Salvar via ReportRepositoryPort.
Log ação via AuditLogPort.

Fluxos Alternativos: Quota excedida → throw QuotaExceededError; Dependência inválida → throw InvalidDependencyError; IA falha → retry ou fallback.
Ports: AnalyzerPort (Edge), ReportGeneratorPort (OpenAI via Edge), ReportRepositoryPort (Supabase), AuditLogPort.
Chamada típica: De Server Action em /audit/new/page.tsx (antigo /dashboard/page.tsx para análise).

GenerateReportUseCase
Descrição: Gera relatório enterprise completo a partir de análise preliminar (inclui fontes verificáveis).
Atores: Usuário autenticado.
Pré-condições: Análise inicial completa.
Pós-condições: Relatório JSON atualizado, PDF gerado (opcional via Storage).
Fluxo Principal:
Fetch análise via ReportRepositoryPort.
Normalizar dados (visão geral, depreciações, mercado, recomendações).
Adicionar fontes (GitHub, NPM, etc.).
Atualizar report no DB.

Fluxos Alternativos: Dados incompletos → throw IncompleteAnalysisError.
Ports: ReportRepositoryPort, StoragePort (Supabase Storage para PDF).
Chamada típica: Chamado internamente por AnalyzeDependencyUseCase ou de /reports/[id]/page.tsx.

ListUserAuditsUseCase
Descrição: Lista auditorias recentes ou históricas do usuário (paginada, filtrada por risco).
Atores: Usuário autenticado.
Pré-condições: Sessão válida.
Pós-condições: Lista de relatórios DTO retornada.
Fluxo Principal:
Fetch paginado via ReportRepositoryPort (RLS filtra por user_id).
Aplicar filtros (risco, data).
Ordenar por created_at desc.

Fluxos Alternativos: Nenhum relatório → return empty list.
Ports: ReportRepositoryPort.
Chamada típica: De Server Component em /history/page.tsx ou dashboard.

ReprocessAuditUseCase
Descrição: Reanalisa uma auditoria existente (ex: update dependência).
Atores: Usuário autenticado.
Pré-condições: Relatório existe, quota disponível.
Pós-condições: Relatório atualizado.
Fluxo Principal:
Fetch relatório antigo.
Chamar AnalyzeDependencyUseCase com input atualizado.
Sobrescrever relatório.

Fluxos Alternativos: Relatório não encontrado → throw NotFoundError.
Ports: ReportRepositoryPort, AnalyzerPort, ReportGeneratorPort.
Chamada típica: De Server Action em /history/page.tsx.

CompareAuditsUseCase
Descrição: Compara dois ou mais relatórios (ex: versões diferentes de dependência).
Atores: Usuário autenticado.
Pré-condições: IDs de relatórios válidos.
Pós-condições: Comparação DTO retornada (diff em risco, depreciações).
Fluxo Principal:
Fetch múltiplos relatórios.
Calcular diffs (versão, risco, etc.).

Fluxos Alternativos: IDs inválidos → throw NotFoundError.
Ports: ReportRepositoryPort.
Chamada típica: De Server Component em /compare/page.tsx.


3. Domínio: Billing e Quotas
Integra Stripe via adapter para pagamentos.

CheckQuotaUseCase
Descrição: Verifica limite de auditorias baseado no plano (free: X/mês).
Atores: Usuário autenticado (chamado antes de análise).
Pré-condições: Sessão válida.
Pós-condições: Retorna booleano (pode prosseguir?) + uso atual.
Fluxo Principal:
Fetch subscription via BillingPort.
Contar auditorias no período via ReportRepositoryPort.
Comparar com limite do plano.

Fluxos Alternativos: Excedido → throw QuotaExceededError.
Ports: BillingPort (Stripe/Supabase subscriptions), ReportRepositoryPort.
Chamada típica: Internamente antes de AnalyzeDependencyUseCase.

UpgradePlanUseCase
Descrição: Atualiza plano (free → pro), cria sessão de checkout Stripe.
Atores: Usuário autenticado.
Pré-condições: Plano atual free, payment method válido.
Pós-condições: Subscription atualizada, webhook processa.
Fluxo Principal:
Criar sessão Stripe via BillingPort.
Atualizar subscription no DB após sucesso.

Fluxos Alternativos: Pagamento falha → throw PaymentError.
Ports: BillingPort.
Chamada típica: De Server Action em /billing/checkout/page.tsx.

ListInvoicesUseCase
Descrição: Lista faturas históricas do usuário.
Atores: Usuário autenticado.
Pré-condições: Sessão válida.
Pós-condições: Lista de invoices DTO.
Fluxo Principal:
Fetch de Stripe via BillingPort.

Fluxos Alternativos: Nenhum → empty list.
Ports: BillingPort.
Chamada típica: De Server Component em /billing/invoices/page.tsx.


4. Domínio: Usuário e Profile

UpdateProfileUseCase
Descrição: Atualiza dados do profile (name, avatar, preferences).
Atores: Usuário autenticado.
Pré-condições: Sessão válida, input válido.
Pós-condições: Profile atualizado.
Fluxo Principal:
Validar changes.
Upsert via ProfileRepositoryPort.

Fluxos Alternativos: Dados inválidos → throw ValidationError.
Ports: ProfileRepositoryPort.
Chamada típica: De Server Action em /account/profile/page.tsx.


5. Domínio: Admin e Observabilidade
Role-based (check role = 'admin' via middleware ou policy).

AdminListUsersUseCase
Descrição: Lista usuários (para admin: planos, bloqueio).
Atores: Admin.
Pré-condições: Role admin.
Pós-condições: Lista de users DTO (com planos, uso).
Fluxo Principal:
Fetch todos profiles via ProfileRepositoryPort (RLS bypass para admin).
Enriquecer com billing data.

Fluxos Alternativos: Nenhum usuário → empty.
Ports: ProfileRepositoryPort, BillingPort.
Chamada típica: De Server Component em /admin/users/page.tsx.

AdminListAuditsUseCase
Descrição: Lista auditorias globais (erros IA, logs).
Atores: Admin.
Pré-condições: Role admin.
Pós-condições: Lista paginada de audits.
Fluxo Principal:
Fetch via ReportRepositoryPort + AuditLogPort.

Ports: ReportRepositoryPort, AuditLogPort.
Chamada típica: De Server Component em /admin/reports/page.tsx.

AdminGetMetricsUseCase
Descrição: Gera métricas (auditorias/dia, custo IA, top dependências).
Atores: Admin.
Pré-condições: Role admin.
Pós-condições: Metrics DTO (agregados).
Fluxo Principal:
Agregar dados via ReportRepositoryPort + AuditLogPort.
Calcular stats (ex: custo por OpenAI tokens).

Ports: ReportRepositoryPort, AuditLogPort, BillingPort (custos).
Chamada típica: De Server Component em /admin/dashboard/page.tsx.


Implementação Geral

Dependency Injection: Use factories como createAnalyzeDependencyUseCase() em lib/composition/ para injetar adapters reais (ex: new SupabaseReportRepositoryAdapter(createServerClient())).
Erros: Use domain errors custom (em core/domain/errors/) para fluxos alternativos.
Testes: Cada Use Case é 100% testável com Vitest (mock ports).
Evolução: Adicione mais se necessário (ex: ExportReportToPDFUseCase para enterprise).
