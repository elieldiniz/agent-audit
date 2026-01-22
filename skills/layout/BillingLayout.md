

---

# 🎨 DESIGN DO BILLINGLAYOUT (Checkout e Histórico de Faturas)

## 1️⃣ PRINCÍPIOS DE DESIGN

* **Clareza total:** Usuário deve ver **seu plano atual, quota e histórico** de forma imediata
* **Ação clara:** CTA de upgrade ou pagamento sempre visível
* **Diferente do padrão genérico:**

  * Evitar tabelas simples e cards desorganizados
  * Usar **cards estilizados com progressão de uso e cores suaves**
* **Responsivo e mobile first:** Cards empilhados em mobile, grid em desktop
* **Confiança e segurança visual:** cores e feedbacks claros em ações de pagamento

---

## 2️⃣ ESTRUTURA VISUAL

```txt
+------------------------------------------------------+
| TopBar (Header)                                      |
|  - Logo pequeno                                     |
|  - Breadcrumb / Página atual                        |
|  - User info / Avatar                                |
|  - Alertas de quota ou pagamento                     |
|  - Logout                                           |
+------------------------------------------------------+
| Sidebar (pode reutilizar do DashboardLayout)        |
|  - Auditorias                                       |
|  - Histórico                                        |
|  - Comparar                                        |
|  - Perfil                                          |
|  - Billing (ativo)                                 |
+------------------------------------------------------+
| Main Content Area                                   |
|  1️⃣ Plano Atual & Quota                            |
|    - Card com plano atual, limite de auditorias    |
|    - Barra de progresso visual do uso do plano     |
|    - Botão Upgrade destacado                        |
|                                                     |
|  2️⃣ Seleção de Planos / Checkout                   |
|    - Cards para cada plano (Free, Pro, Enterprise) |
|    - CTA de Upgrade ou Subscribe                     |
|    - Detalhes de benefícios e quotas               |
|                                                     |
|  3️⃣ Histórico de Faturas                            |
|    - Tabela ou cards listando invoices             |
|    - Status de pagamento, valor, data              |
|    - Download PDF                                   |
+------------------------------------------------------+
| Footer opcional                                     |
|  - Links legais / copyright                         |
+------------------------------------------------------+
```

---

## 3️⃣ COMPONENTES INTERNOS

### 🔹 Plano Atual & Quota

* **Card principal** mostrando:

  * Nome do plano atual
  * Uso de auditorias (barra de progresso visual)
  * CTA de upgrade
* **Indicador de quota restante**: cor codificada (verde → seguro, laranja → atenção, vermelho → crítico)

---

### 🔹 Seleção de Planos / Checkout

* Cards separados para cada plano
* **Detalhes**: preço, auditorias inclusas, benefícios extras
* **Botão CTA principal** com microanimação
* **CheckoutForm** (Stripe Elements) integrado ao card selecionado
* Feedback visual imediato de erro ou sucesso

---

### 🔹 Histórico de Faturas

* Tabela ou cards com informações:

  * Invoice ID
  * Data
  * Valor
  * Status (Pago, Pendente)
  * Download PDF
* **Filtros / Search**: por status ou data

---

### 🔹 Footer

* Minimalista, consistente com dashboard e admin
* Links legais, copyright

---

## 4️⃣ DIFERENCIAIS DE DESIGN

* **Cartões com microgradientes e sombras suaves**
* **Barra de progresso de quota** estilizada, animada
* **Checkout integrado aos cards** → evita tela separada
* **Feedback visual imediato** em botões, formulários e status de invoice

---

## 5️⃣ CORES & TIPOGRAFIA

* **Fundo**: branco ou cinza muito claro
* **Cards**: branco, borda arredondada, sombra soft
* **CTA principal (Upgrade / Pagar)**: roxo neon ou azul vibrante
* **Textos**: cinza escuro, títulos com pesos diferentes
* **Indicadores**: verde → seguro, laranja → atenção, vermelho → crítico

---

## 6️⃣ UX & INTERAÇÕES

* **Cards de plano**: hover eleva levemente + gradiente animado
* **Botões**: ripple / hover gradiente
* **Progress bar**: animação suave ao atualizar quota
* **Tabela de faturas**: sortable, filterable via React Query
* **Feedback**: toastrs para pagamento, sucesso ou erro

---

## 7️⃣ RESPONSABILIDADE DE CADA CAMADA

| Camada               | Responsabilidade                                                        |
| -------------------- | ----------------------------------------------------------------------- |
| **UI / Layout**      | Renderiza cards de planos, quota, tabela de faturas                     |
| **Server Component** | Busca plano atual, quota e invoices via BillingPort (Supabase + Stripe) |
| **Client Component** | Interações: escolher plano, abrir checkout, filtrar invoices            |
| **Use Cases**        | CheckQuotaUseCase, ListInvoicesUseCase, UpgradePlanUseCase              |
| **Edge Functions**   | Criar sessão Stripe segura, validar quotas e pagamentos                 |

---

💡 **Resumo Estratégico**

* Layout foca **em conversão e clareza de informação**
* **Checkout integrado aos cards de planos** → experiência única
* **Feedback visual consistente** mantém confiança do usuário
* Mobile e desktop: mesmos elementos, apenas reorganizados
* Diferencial: **cards animados + barra de quota + histórico de faturas interativo**

---
