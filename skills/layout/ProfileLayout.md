# 🎨 DESIGN DO PROFILELAYOUT (Perfil do Usuário)

## 1️⃣ PRINCÍPIOS DE DESIGN

* **Clareza e simplicidade:** Usuário consegue atualizar dados rapidamente
* **Consistência com Dashboard:** mesmos tons, tipografia e microanimações
* **Responsivo:** Mobile first, cards empilhados em mobile, grid em desktop
* **Acessível e confiável:** feedback imediato em alterações e validações

---

## 2️⃣ ESTRUTURA VISUAL

```txt
+----------------------------------------------------------+
| TopBar (Header)                                          |
|  - Logo pequeno                                          |
|  - Breadcrumb / Página atual                              |
|  - User avatar + nome                                     |
|  - Logout                                                |
+----------------------------------------------------------+
| Sidebar (reutilizável)                                   |
|  - Dashboard                                             |
|  - Histórico                                             |
|  - Comparar                                             |
|  - Billing                                              |
|  - Perfil (ativo)                                       |
+----------------------------------------------------------+
| Main Content Area                                        |
|  1️⃣ Profile Card                                        |
|     - Avatar com upload / crop                            |
|     - Nome completo, email                                |
|     - Botão “Editar” para modo de edição                  |
|                                                          |
|  2️⃣ Preferências / Configurações                        |
|     - Notificações (checkbox / toggle)                  |
|     - Tema (light/dark switch)                           |
|     - Idioma                                              |
|                                                          |
|  3️⃣ Segurança                                           |
|     - Alterar senha                                       |
|     - Autenticação 2FA (se aplicável)                   |
|                                                          |
|  4️⃣ Histórico rápido (opcional)                         |
|     - Últimas auditorias feitas                           |
+----------------------------------------------------------+
| Footer opcional                                         |
|  - Links legais / copyright                               |
+----------------------------------------------------------+
```

---

## 3️⃣ COMPONENTES INTERNOS

### 🔹 Profile Card

* Avatar circular, upload com preview + crop
* Nome completo e email
* Botão “Editar” que ativa modo inline (inline edit)
* Feedback imediato em alterações

---

### 🔹 Preferências / Configurações

* Notificações push/email toggle
* Tema: switch light/dark (persistir preferência)
* Idioma: dropdown com flags ou nomes

---

### 🔹 Segurança

* Alterar senha com validação de força
* Confirmação de senha
* 2FA toggle (se houver)
* Feedback: sucesso, erro, loading

---

### 🔹 Histórico rápido (opcional)

* Últimas auditorias feitas, health score e status
* Cards ou tabela compacta, filtrável

---

### 🔹 Footer

* Minimalista, mesmo estilo do Dashboard / Billing

---

## 4️⃣ DIFERENCIAIS DE DESIGN

* **Inline edit**: evita abrir modal separado para editar dados
* **Microanimações**: hover nos cards, switches animados
* **Upload de avatar moderno**: preview + crop + feedback instantâneo
* **Histórico integrado**: rápido acesso a auditorias recentes

---

## 5️⃣ CORES & TIPOGRAFIA

* **Fundo**: branco ou cinza claro
* **Cards**: branco, borda arredondada, sombra soft
* **Botões principais**: roxo neon / azul vibrante
* **Textos**: cinza escuro, títulos com pesos variados
* **Switches / toggles**: cores consistentes com branding

---

## 6️⃣ UX & INTERAÇÕES

* **Inline edit**: ativar/desativar campos suavemente
* **Botões**: ripple ou hover gradiente
* **Upload avatar**: drag & drop ou click → preview instantâneo
* **Feedback visual**: toastrs ou inline messages para sucesso/erro
* **Responsive**: cards empilhados em mobile, grid em desktop

---

## 7️⃣ RESPONSABILIDADE DE CADA CAMADA

| Camada               | Responsabilidade                                               |
| -------------------- | -------------------------------------------------------------- |
| **UI / Layout**      | Render Profile Card, Preferências, Segurança, Histórico        |
| **Server Component** | Buscar / atualizar profile via ProfileRepositoryPort           |
| **Client Component** | Interações: toggles, upload avatar, inline edit, senha         |
| **Use Cases**        | UpdateProfileUseCase, ResetPasswordUseCase, OnboardUserUseCase |
| **Edge Functions**   | Validação extra de segurança (senha, 2FA)                      |

---

💡 **Resumo Estratégico**

* Layout foca **na experiência do usuário** e **atualização de dados rápida e confiável**
* **Feedback visual instantâneo** mantém confiança e clareza
* Microinterações e inline edits tornam o perfil **moderno e fluido**
* Mobile first e consistente com Dashboard / Billing

---

