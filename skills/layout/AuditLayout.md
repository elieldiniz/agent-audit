

---

# 🎨 DESIGN DO AUDITLAYOUT (Página de Auditoria / Análise de Dependência)

## 1️⃣ PRINCÍPIOS DE DESIGN

* **Foco na ação principal:** colar dependência → gerar análise
* **Feedback instantâneo:** IA processando → barra de progresso / loading
* **Informação clara:** health score, risco, mercado, depreciação
* **Diferente do padrão genérico:** cards interativos, relatórios estruturados, cores codificadas por risco
* **Responsivo:** Mobile first, mas desktop aproveitando grid para múltiplos insights

---

## 2️⃣ ESTRUTURA VISUAL

```txt
+----------------------------------------------------------+
| TopBar (Header)                                         |
|  - Logo pequeno                                         |
|  - Breadcrumb / Página atual                             |
|  - Avatar / Logout                                       |
+----------------------------------------------------------+
| Sidebar (reutilizável)                                  |
|  - Dashboard                                           |
|  - Histórico                                           |
|  - Comparar                                           |
|  - Perfil                                             |
|  - Billing                                            |
|  - Auditoria (ativo)                                   |
+----------------------------------------------------------+
| Main Content Area                                       |
|  1️⃣ Input de Dependência                               |
|     - Campo grande para colar dependency (npm, jsr, etc)|
|     - Botão “Analisar” com loading integrado            |
|                                                          |
|  2️⃣ Resultados da Auditoria                            |
|     - Cards resumidos:                                  |
|        - Health Score                                   |
|        - Risk Level                                     |
|        - Última atualização                             |
|        - Sugestão de upgrade / substituição             |
|                                                          |
|  3️⃣ Relatório Detalhado                                 |
|     - Seções: Overview, Depreciações, Segurança, Mercado|
|     - Links para fontes verificáveis                     |
|     - Botão “Exportar JSON / PDF”                        |
|                                                          |
|  4️⃣ Histórico rápido (últimas auditorias do usuário)   |
|     - Cards ou tabela compacta                           |
+----------------------------------------------------------+
| Footer opcional                                         |
|  - Links legais / copyright                               |
+----------------------------------------------------------+
```

---

## 3️⃣ COMPONENTES INTERNOS

### 🔹 Input de Dependência

* Campo grande, auto-expand, placeholder “Cole sua dependência…”
* Botão CTA “Analisar”
* Loading integrado no botão durante análise

---

### 🔹 Cards Resumidos

* **Health Score:** barra circular ou radial animada
* **Risk Level:** color coding (verde, laranja, vermelho)
* **Última Atualização:** timestamp atualizado automaticamente
* **Sugestão IA:** pequenas recomendações ou flags

---

### 🔹 Relatório Detalhado

* **Seções organizadas em tabs ou accordion**: Overview, Depreciação, Segurança, Mercado
* **Links de fontes verificáveis**: GitHub, NPM, changelog
* **Botão Exportar**: JSON ou PDF (download direto ou Storage link)

---

### 🔹 Histórico rápido

* Últimas auditorias do usuário
* Cards pequenos ou tabela scroll horizontal
* Health score + risco resumido

---

### 🔹 Footer

* Minimalista, consistente com Dashboard / Billing

---

## 4️⃣ DIFERENCIAIS DE DESIGN

* **Cards interativos**: hover mostra tooltip com detalhe do score
* **Progress bar animada** durante análise
* **Seções detalhadas IA** com links diretos para fontes
* **Export funcional**: JSON e PDF integrados
* **Mobile friendly**: input e resultados empilhados, cards roláveis

---

## 5️⃣ CORES & TIPOGRAFIA

* **Fundo**: branco / cinza muito claro
* **Cards**: branco, sombra soft, borda arredondada
* **Health Score / Risco**: cores codificadas por nível (verde → seguro, laranja → atenção, vermelho → crítico)
* **Botões**: roxo neon / azul vibrante
* **Textos**: cinza escuro, títulos com pesos variados

---

## 6️⃣ UX & INTERAÇÕES

* **Loading integrado ao botão** → feedback imediato
* **Cards animados** → hover aumenta leveza e destaca dados
* **Tabs / Accordion** para relatório detalhado
* **Export JSON/PDF** → confirmação visual de sucesso
* **Histórico rápido** → scroll horizontal suave em mobile
* **Responsivo** → input sempre visível e CTA fixo

---

## 7️⃣ RESPONSABILIDADE DE CADA CAMADA

| Camada               | Responsabilidade                                                          |
| -------------------- | ------------------------------------------------------------------------- |
| **UI / Layout**      | Renderiza Input, Cards, Relatório, Histórico                              |
| **Server Component** | Fetch de análises via AnalyzeDependencyUseCase, ListUserAuditsUseCase     |
| **Client Component** | Interações: submit, hover cards, tabs, export PDF/JSON                    |
| **Use Cases**        | AnalyzeDependencyUseCase, GenerateReportUseCase                           |
| **Edge Functions**   | Chamadas IA para análise, validação input, geração de relatório detalhado |

---

💡 **Resumo Estratégico**

* Layout foca **na experiência de auditoria**, **feedback instantâneo** e **relatórios claros**
* Diferencial: **cards interativos, health score animado, links diretos para fontes, export fácil**
* Mobile first, desktop aproveita grid para múltiplos insights
* Integrado com Clean Architecture: Use Cases → DTOs → Layout

---

