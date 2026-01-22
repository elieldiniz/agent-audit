

# 🏗 1️⃣ **AuthLayout** (Para login, cadastro e reset de senha)

### 🔹 Objetivo

* Organizar todas as páginas de autenticação
* Fornecer **estrutura de UI consistente**
* Gerenciar **redirecionamento automático se usuário já estiver logado**

---

### 🔹 Componentes internos

* **Logo + Header**
* **FormWrapper** (com padding/responsividade)
* **AuthForm** (Login, Register, ResetPassword como variantes)
* **Links secundários** (Ex: “Esqueceu a senha?”, “Criar conta”)
* **Toasts ou Alerts** para feedback

---

### 🔹 Responsabilidade

* Layout apenas: estilo e posicionamento
* Não faz validação de senha/email (isso é Use Case / Server Action)
* Não faz fetch de dados

---

### 🔹 Decisões técnicas

* Usar **Server Components** para renderizar layout
* **Client Components** apenas para interatividade do formulário
* **React Context** se precisar compartilhar estado do layout (ex: loading global)

---

### 🔹 Fluxo de interação

```txt
User → UI Form → Server Action → UseCase (Auth) → Core → AuthPort → Supabase
```

---

# 🏗 2️⃣ **DashboardLayout** (Usuário autenticado)

### 🔹 Objetivo

* Estrutura principal do painel de auditoria
* Navigation lateral / header superior
* Área de conteúdo dinâmica (outlet para páginas internas)

---

### 🔹 Componentes internos

* **SidebarNavigation** (links: Auditorias, Histórico, Comparar, Perfil, Billing)
* **TopBar** (informações do usuário, logout, notificações)
* **MainContent** (outlet para páginas do dashboard)
* **Footer** (opcional, copyright ou links úteis)

---

### 🔹 Responsabilidade

* Não faz fetch de auditorias → isso é Server Component da página
* Apenas renderiza layout + navegação
* Responsivo: sidebar colapsa em mobile, menu hamburguer

---

### 🔹 Decisões técnicas

* **Server Component**: DashboardLayout para SSR + SEO
* **Client Component**: Sidebar, TopBar para interações
* **React Query** usado nas páginas internas, não no layout

---

### 🔹 Observações

* Pode usar **shadcn/ui Tabs / Collapsible** para sidebar
* Layout garante consistência visual de todas as páginas do dashboard

---

# 🏗 3️⃣ **AdminLayout** (Painel administrativo)

### 🔹 Objetivo

* Layout específico para admin
* Mostra métricas, listagem de usuários, auditorias globais

---

### 🔹 Componentes internos

* **AdminSidebar** (Dashboard, Users, Reports, Billing)
* **AdminTopBar** (usuário admin, notificações críticas)
* **AdminContent** (outlet para páginas)
* **AlertBanner** (avisos críticos, ex: quota atingida)

---

### 🔹 Responsabilidade

* Layout + navegação
* Fornecer contexto de admin (role check)
* Não faz fetch de métricas ou usuários diretamente

---

### 🔹 Decisões técnicas

* **Server Component**: verifica role admin antes de renderizar
* **Edge Function** pode validar token e role para segurança extra
* Client components apenas para interações rápidas

---

# 🏗 4️⃣ **BillingLayout** (Checkout e histórico de faturas)

### 🔹 Objetivo

* Estrutura dedicada a planos, pagamentos e histórico de faturas
* Garantir fluxo seguro com Stripe

---

### 🔹 Componentes internos

* **PlanSelector** (cards de planos: free, pro)
* **CheckoutForm** (integração Stripe)
* **InvoicesList** (histórico)
* **BillingHeader** (Resumo de uso/limite do plano)

---

### 🔹 Responsabilidade

* Layout + estrutura visual
* Integrar visualmente checkout + histórico
* Não processa pagamento → isso é BillingUseCase

---

### 🔹 Decisões técnicas

* Client Component apenas no **CheckoutForm** (Stripe Elements)
* Server Component para listar invoices do usuário (supabase/stripe port)
* Edge Functions podem validar quotas e criar sessões seguras

---

# 🏗 5️⃣ **ProfileLayout** (Perfil do usuário)

### 🔹 Objetivo

* Layout para gerenciamento de perfil
* Atualização de avatar, nome, preferências

---

### 🔹 Componentes internos

* **ProfileHeader** (Avatar + Nome + Planos)
* **ProfileForm** (UpdateProfileUseCase)
* **PreferencesSection** (Configurações do usuário)

---

### 🔹 Responsabilidade

* Layout + posição de componentes
* Não faz validação → Server Action e Use Case cuidam disso

---

### 🔹 Decisões técnicas

* Server Component para dados de profile via Supabase port
* Client Components para interações (upload de avatar, toggles de preferências)

---

# 🏗 6️⃣ **AuditLayout** (Página de auditoria / análise de dependência)

### 🔹 Objetivo

* Layout específico para análise de dependência
* Permite colar dependência, rodar análise e ver resultados

---

### 🔹 Componentes internos

* **DependencyInputForm** (colar nome/version)
* **AuditResultPanel** (JSON + health score + risco)
* **CompareButton** (para comparar com outro relatório)
* **SourcesPanel** (links das fontes)

---

### 🔹 Responsabilidade

* Layout + UI
* Não faz fetch → Use Case AnalyzeDependencyUseCase faz

---

### 🔹 Decisões técnicas

* Server Component → render inicial + histórico do usuário
* Client Component → formulário e interações dinâmicas
* Edge Function → chamada para IA + análise de dependência

---

💡 **Resumo estratégico:**

* **Layouts = estrutura, navegação, consistência visual**
* **Use Cases = orquestração e regras do negócio**
* **Edge Functions = segurança, IA e limites sensíveis**
* **Client Components = interatividade mínima, formulários e toggles**
* **Server Components = dados, SSR e render de páginas**

---
