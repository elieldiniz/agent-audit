


Vou quebrar em **estrutura visual, UX, componentes internos, interações e diferenciais de design**.

---

# 🎨 DESIGN DO DASHBOARDLAYOUT (Usuário autenticado)

## 1️⃣ PRINCÍPIOS DE DESIGN

* **Clareza absoluta**: o usuário sabe exatamente o que pode fazer
* **Foco na ação principal**: análise de dependência
* **Diferente do padrão genérico de dashboards SaaS**:

  * Evitar menus gigantes
  * Evitar páginas sobrecarregadas
  * Preferir **cards, cores suaves e microanimações**
* **Responsivo e Mobile First**: sidebar colapsável em mobile, menu hamburguer

---

## 2️⃣ ESTRUTURA VISUAL

```txt
+-------------------------------------------------------+
| TopBar (Header)                                       |
|  - Logo pequeno                                      |
|  - Breadcrumb / Página atual                         |
|  - User Info / Avatar                                |
|  - Notificações / Alertas                            |
|  - Botão Logout                                      |
+-------------------------------------------------------+
| Sidebar (colapsável)                                 |
|  - Auditorias                                        |
|  - Histórico                                         |
|  - Comparar                                         |
|  - Perfil                                           |
|  - Billing                                          |
+-------------------------------------------------------+
| Main Content Area                                    |
|  - Cards / Widgets                                   |
|  - Tabela de Auditorias recentes                     |
|  - Botão “Nova Auditoria” destacado                  |
|  - Resumo de quota / plano                            |
+-------------------------------------------------------+
| Footer opcional (uso mínimo)                         |
|  - Links úteis / copyright                            |
+-------------------------------------------------------+
```

---

## 3️⃣ COMPONENTES INTERNOS

### 🔹 TopBar

* Avatar do usuário com dropdown (Perfil, Logout)
* Breadcrumb: mostra a página atual
* Alertas visuais (ex: quota quase acabando)
* Microinterações: hover, tooltip, animações suaves

---

### 🔹 SidebarNavigation

* Links principais (Audit, History, Compare, Profile, Billing)
* Ícones customizados para cada link
* Colapsável: só ícones em mobile, expandido no desktop
* Sticky: permanece visível ao rolar página

---

### 🔹 MainContent

* **Cards de destaque**:

  * Auditoria mais recente
  * Health Score
  * Risco alto/deprecado
* **Tabela de auditorias**: histórico recente, filtrável e paginado
* **CTA principal**: “Nova Auditoria” — botão destacado
* **Quota visual**: barra de progresso mostrando auditorias usadas

---

### 🔹 Footer

* Minimalista: apenas links legais ou copyright
* Apenas visível em desktop

---

## 4️⃣ DIFERENCIAIS DE DESIGN

* **Dashboard limpo e leve**: sem excesso de cores ou informações
* **Microanimações**:

  * Cards flutuam levemente ao hover
  * Tooltip suave em botões
  * Tabela com hover row highlight
* **Visualização de health score**: barras coloridas, circulares ou radiais
* **Mobile First**: sidebar colapsável, cards empilhados, tabela scroll horizontal

---

## 5️⃣ CORES & TIPOGRAFIA

* **Fundo**: branco ou cinza muito claro
* **Cards**: branco com sombra suave e bordas arredondadas
* **CTA principal**: roxo neon / azul vibrante
* **Textos**: tons de cinza escuro, títulos com 1–2 pesos diferentes
* **Indicadores de risco**: cores consistentes (verde → seguro, laranja → atenção, vermelho → crítico)

---

## 6️⃣ UX & INTERAÇÕES

* **Sidebar**: abre/fecha suavemente, animação de collapse
* **Cards**: hover eleva sutilmente
* **Botões**: ripple ou hover gradiente
* **Tabela**: sort/filter rápido, sem reload total (React Query)
* **Feedback**: toastrs para sucesso, erro, alertas de quota

---

## 7️⃣ RESPONSABILIDADE DE CADA CAMADA

| Camada               | Responsabilidade                                                      |
| -------------------- | --------------------------------------------------------------------- |
| **UI / Layout**      | Renderizar TopBar, Sidebar, Cards, Tabela                             |
| **Server Component** | Buscar auditorias recentes via ReportRepositoryPort, quota do usuário |
| **Client Component** | Interações: collapse sidebar, filtros tabela, botão “Nova Auditoria”  |
| **Use Cases**        | AnalyzeDependencyUseCase, ListUserAuditsUseCase                       |
| **Edge Functions**   | Apenas para chamadas sensíveis (IA, limite de auditorias)             |

---

💡 **Resumo estratégico**

* Layout foca **na experiência do usuário** e **não em lógica de negócio**
* Use Cases chamam o Core, retornam DTOs, que o layout consome
* Mobile e desktop possuem **mesmo estilo, diferente apenas na estrutura**
* Diferencial: **visual leve, cards interativos e health score intuitivo**

---

Se você quiser, posso **fazer um wireframe visual completo do DashboardLayout**, mostrando **TopBar, Sidebar, MainContent, Cards, tabela e CTA principal**, pronto para passar direto para **Tailwind + shadcn/ui**.

