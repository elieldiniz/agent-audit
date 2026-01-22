

# 🎨 DESIGN DO ADMINLAYOUT (Painel Administrativo)

## 1️⃣ PRINCÍPIOS DE DESIGN

* **Clareza total**: Admin deve enxergar métricas e usuários de forma rápida
* **Diferente do mercado**:

  * Sem dashboards “poluídos”
  * Cards compactos, visual leve
  * Microanimações discretas
* **Responsivo**: Desktop prioritário, mas mobile suportado
* **Segurança visual**: elementos críticos destacados (erros IA, quota, alerts)

---

## 2️⃣ ESTRUTURA VISUAL

```txt
+---------------------------------------------------------+
| TopBar (Header)                                         |
|  - Logo pequeno                                        |
|  - Breadcrumb / Página atual                           |
|  - Admin info / avatar                                 |
|  - Alertas críticos (erros IA, quotas)                |
|  - Logout                                              |
+---------------------------------------------------------+
| Sidebar (colapsável)                                   |
|  - Dashboard Metrics                                   |
|  - Users Management                                    |
|  - Reports (Auditorias globais)                        |
|  - Billing / Subscriptions                              |
|  - Settings                                            |
+---------------------------------------------------------+
| Main Content Area                                      |
|  - Dashboard Cards (KPIs: auditorias/dia, top deps)   |
|  - Tabela de usuários (sortable, filterable)          |
|  - Tabela de auditorias globais                        |
|  - Charts interativos (histórico, tendências)          |
+---------------------------------------------------------+
| Footer opcional                                        |
|  - Links legais / copyright                            |
+---------------------------------------------------------+
```

---

## 3️⃣ COMPONENTES INTERNOS

### 🔹 TopBar

* Avatar do admin + dropdown (Perfil, Logout)
* Breadcrumb: mostra página atual (ex: Users, Reports)
* Alertas críticos com cores fortes (vermelho/laranja)
* Microinterações: hover em alertas mostra detalhes

---

### 🔹 SidebarNavigation

* Links principais: Dashboard, Users, Reports, Billing, Settings
* Ícones personalizados e intuitivos
* Colapsável: apenas ícones em mobile
* Sticky para fácil navegação

---

### 🔹 MainContent

* **Dashboard Cards**:

  * Auditorias por dia
  * Custo de tokens IA
  * Top dependências analisadas
* **Tabela de usuários**:

  * Nome, email, plano, quota usada, status
  * Sorting e filtering
* **Tabela de auditorias globais**:

  * Usuário, dependência, health score, risco
* **Charts** (opcional para métricas):

  * Evolução de auditorias
  * Distribuição de risco

---

### 🔹 Footer

* Minimalista, apenas links legais ou copyright
* Visual consistente com DashboardLayout

---

## 4️⃣ DIFERENCIAIS DE DESIGN

* **Foco no que importa**: admin vê métricas e problemas imediatamente
* **Cards interativos com hover**
* **Alertas críticos destacados**
* **Tabelas com microanimações e sorting/filtering**
* **Visual clean e moderno**, sem excesso de cores

---

## 5️⃣ CORES & TIPOGRAFIA

* **Fundo**: branco ou cinza claro
* **Cards**: branco, sombra suave, borda arredondada
* **CTA principal / alertas**: cores vibrantes (roxo neon para ações, vermelho para alertas)
* **Textos**: cinza escuro, títulos com pesos variados
* **Charts**: cores consistentes, não conflitantes com alertas

---

## 6️⃣ UX & INTERAÇÕES

* **Sidebar**: collapsible com animação suave
* **Cards**: hover eleva suavemente
* **Botões**: hover gradiente ou ripple
* **Tabelas**: sort/filter sem reload total (React Query)
* **Alertas críticos**: tooltip com detalhes ao hover
* **Charts interativos**: hover sobre dados mostra tooltip com valor

---

## 7️⃣ RESPONSABILIDADE DE CADA CAMADA

| Camada               | Responsabilidade                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| **UI / Layout**      | Render TopBar, Sidebar, Cards, Tabelas, Charts                                                  |
| **Server Component** | Buscar métricas, usuários e auditorias globais via ReportRepositoryPort e ProfileRepositoryPort |
| **Client Component** | Interações: collapse sidebar, filtros tabelas, dropdowns                                        |
| **Use Cases**        | AdminListUsersUseCase, AdminListAuditsUseCase, AdminGetMetricsUseCase                           |
| **Edge Functions**   | Validar token + role admin, executar auditorias sensíveis, gerar relatórios                     |

---

💡 **Resumo Estratégico**

* Layout foca **na experiência do admin**, não na lógica de negócio
* Microanimações + feedbacks visuais tornam o painel **intuitivo e responsivo**
* Todos os dados são carregados via **Server Components e Use Cases**, mantendo Clean Architecture

---

