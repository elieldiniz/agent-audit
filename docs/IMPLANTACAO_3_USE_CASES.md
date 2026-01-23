# Implementação 3: Casos de Uso (Domínio e Aplicação)

Mapeamento dos fluxos de negócio implementados e pendentes.

## Domínio: Auditoria de Dependências
- [x] **AnalyzeDependencyUseCase**: Implementado com IA.
- [x] **CheckQuotaUseCase**: Implementado com limites no DB.
- [ ] **GenerateReportUseCase**: Pendente (Normalização de dados extras).
- [ ] **ReprocessAuditUseCase**: Pendente.
- [ ] **CompareAuditsUseCase**: Pendente.

## Domínio: Autenticação e Perfil
- [ ] **AuthenticateUserUseCase**: Pendente (Atualmente usa Supabase Auth direto no adapter).
- [ ] **RegisterUserUseCase**: Pendente.
- [ ] **UpdateProfileUseCase**: Pendente.
- [ ] **OnboardUserUseCase**: Pendente.

## Domínio: Billing
- [ ] **UpgradePlanUseCase**: Pendente (Integração Stripe).
- [ ] **ListInvoicesUseCase**: Pendente.

## Como Implementar Novos Use Cases
1. Definir o DTO de Entrada/Saída em `src/application/dtos`.
2. Criar a interface da Porta em `src/application/ports` (se necessário).
3. Implementar a lógica pura no `src/application/use-cases`.
4. Criar o adapter em `src/infrastructure/adapters` se envolver IO externo.
