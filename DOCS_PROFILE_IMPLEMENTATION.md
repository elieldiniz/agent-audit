# Documentação da Implementação: Funcionalidade de Perfil (Profile)

Esta funcionalidade permite que os usuários gerenciem suas informações pessoais e preferências dentro da plataforma AntiGravity, seguindo rigorosamente os padrões de Clean Architecture e o Design System estabelecido.

## 🏗️ Arquitetura

A implementação foi dividida nas camadas da Clean Architecture:

### 1. Camada de Domínio (`src/domain`)
- **Entidade**: `Profile` e `ProfileEntity` (`src/domain/entities/Profile.ts`).
- **Regras**: Utiliza `Object.freeze` para garantir imutabilidade das instâncias da entidade.

### 2. Camada de Aplicação (`src/application`)
- **DTOs**: `ProfileDTOs.ts` define objetos de entrada e saída imutáveis para desacoplar a camada de infraestrutura/UI.
- **Ports (Interfaces)**: `IProfileRepository.ts` define o contrato para persistência de dados.
- **Use Cases**:
  - `GetProfileUseCase`: Recupera os dados do perfil do usuário.
  - `UpdateProfileUseCase`: Atualiza as informações e preferências do usuário.

### 3. Camada de Infraestrutura (`src/infrastructure`)
- **Repositório**: `SupabaseProfileRepository.ts` implementa o acesso ao banco de dados utilizando o cliente do Supabase.
- **Adaptores**: Integrado com `infrastructure/adapters/supabase/server.ts`.

### 4. Camada de Adaptadores de Interface (`src/interface-adapters`)
- **Server Actions**: `profileActions.ts` expõe funções para o frontend, gerenciando a autenticação e orquestrando os Use Cases.

## 🎨 Interface do Usuário (UI)

- **Página**: `app/dashboard/profile/page.tsx` (Server Component).
- **Componente**: `src/components/dashboard/ProfileForm.tsx` (Client Component).
- **Design System**:
  - Fundo Dark-First (`Slate-950`).
  - Cards com efeito de vidro (`backdrop-blur-xl`) e bordas suaves.
  - Tipografia clara e botões com variações de brilho para indicar ações.
  - Uso de componentes `Input`, `Label`, `Checkbox` e `Button` padronizados.

## 📊 Esquema do Banco de Dados

Tabela `profiles` no Supabase:
- `id`: uuid (Primary Key, vinculado a `auth.users`).
- `email`: text (vínculo informativo).
- `full_name`: text (opcional).
- `avatar_url`: text (opcional).
- `notifications_enabled`: boolean (default: true).
- `preferred_theme`: text (light, dark, system).
- `preferred_language`: text (pt-BR, en-US).
- `updated_at`: timestamp with time zone.

## 🔐 Segurança e RLS
- As políticas de Row Level Security (RLS) garantem que cada usuário possa ler e atualizar apenas o seu próprio perfil (`auth.uid() = id`).
- Todas as atualizações são validadas via Server Actions que verificam a sessão do usuário.
