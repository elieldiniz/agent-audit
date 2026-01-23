# Plano de Implementação: Perfil do Usuário (Profile)

Este documento detalha as etapas para a implementação da funcionalidade de perfil do usuário, seguindo a Clean Architecture e os padrões de design estabelecidos no projeto.

## 1. Banco de Dados (Supabase)
Adicionar colunas extras na tabela `public.profiles` para suportar preferências do usuário.

- **Migração**: `supabase/migrations/20240101000003_add_preferences_to_profiles.sql`
  - `notifications_enabled`: boolean (default true)
  - `preferred_theme`: text (default 'light')
  - `preferred_language`: text (default 'pt-BR')

## 2. Camada de Domínio (Domain)
Definir a entidade de negócio.

- **Arquivo**: `src/domain/entities/Profile.ts`
  - Entidade `Profile` e `ProfileEntity` (imutável).

## 3. Camada de Aplicação (Application)
Definir contratos (ports) e fluxos de negócio (use cases).

- **Port**: `src/application/ports/IProfileRepository.ts`
- **Use Case**: `src/application/use-cases/GetProfileUseCase.ts`
  - Busca o perfil pelo ID do usuário.
- **Use Case**: `src/application/use-cases/UpdateProfileUseCase.ts`
  - Atualiza os dados do perfil (nome, avatar, preferências).

## 4. Camada de Infraestrutura (Infrastructure)
Implementar os adaptadores para o Supabase.

- **Repository**: `src/infrastructure/repositories/SupabaseProfileRepository.ts`
  - Implementa `IProfileRepository` usando o cliente Supabase.

## 5. Interface Adapters
Criação de Server Actions para comunicação entre UI e Application.

- **Actions**: `src/interface-adapters/actions/profileActions.ts`
  - `getProfileAction`
  - `updateProfileAction`

## 6. Interface de Usuário (UI)
Desenvolvimento de componentes e páginas.

- **Componente**: `src/components/dashboard/ProfileForm.tsx`
  - Formulário para edição de nome e email.
  - Upload/Preview de Avatar.
  - Toggles para notificações e tema.
  - Seleção de idioma.
- **Página**: `app/dashboard/profile/page.tsx`
  - Página protegida que carrega e exibe o formulário de perfil.
- **Header**: `src/components/dashboard/Header.tsx`
  - Adicionar link para a página de perfil no dropdown do usuário.
- **Sidebar**: `src/components/dashboard/Sidebar.tsx`
  - Garantir que o link de "Configurações" ou um novo link "Perfil" aponte para `/dashboard/profile`.

## 7. Melhores Práticas e Padrões
- Uso de **Tailwind CSS** com cores neon já estabelecidas (`purple-neon`).
- **Clean Architecture**: Separação rigorosa entre domínio, aplicação e infraestrutura.
- **Imutabilidade**: Uso de `Object.freeze` nas entidades.
- **Segurança**: Verificação de sessão via `supabase.auth.getUser()` em todas as Actions.
- **Feedback Visual**: Estados de loading e toasts para sucesso/erro.

---
*Assinado: Jules*
