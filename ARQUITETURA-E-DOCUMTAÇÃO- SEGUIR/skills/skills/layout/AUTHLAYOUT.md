
Vou detalhar **visual, UX e comportamento**, sem entrar em código ainda.

---

# 🎨 DESIGN DO AUTHLAYOUT (LOGIN, CADASTRO, RESET)

## 1️⃣ PRINCÍPIOS DE DESIGN

* **Minimalista, moderno e limpo**: poucas distrações, foco na ação principal.
* **Diferente do padrão genérico do mercado**:

  * Esquece formulários longos, cores saturadas e banners clichês.
  * Use **gradientes suaves**, **tipografia moderna** e **microanimações sutis**.
* **Acessível e responsivo**: Mobile first, mas bonito em desktop também.
* **Feedback visual imediato**: erros, loading, sucesso.

---

## 2️⃣ ESTRUTURA VISUAL

```txt
+-------------------------------------------------+
| LOGO CENTRALIZADA                               |
| Nome do SaaS estilizado com tipografia própria |
+-------------------------------------------------+
| Card de Autenticação                            |
|  - Input Email                                  |
|  - Input Password / Confirm Password           |
|  - Botão primário (Login / Registrar)         |
|  - Link secundário (Reset / Alternar)         |
+-------------------------------------------------+
| Mensagem de feedback / Error / Loading        |
+-------------------------------------------------+
| Rodapé minimalista: copyright / termos        |
+-------------------------------------------------+
```

---

## 3️⃣ LOGIN

### 🔹 Diferencial

* Campo de email **flutuante** com animação ao focar
* Password **reveal toggle** com microfeedback
* Botão de login com efeito **ripple suave** ou **hover gradiente**
* Loading spinner **integrado ao botão**, não centralizado na tela

### 🔹 UX

* Feedback inline: erro aparece próximo ao campo
* Sucesso → animação sutil e redirecionamento automático
* Redireciona para Dashboard se já estiver logado

---

## 4️⃣ CADASTRO

### 🔹 Diferencial

* Card dividido em **duas colunas sutis em desktop**:

  * Esquerda: ilustração minimalista do produto/ação
  * Direita: formulário de cadastro
* Campos:

  * Nome completo
  * Email
  * Senha
  * Checkbox de aceite de termos com microtooltip explicativo
* Botão: animação **hover + progress feedback**

### 🔹 UX

* Inline validation (sem alertas de popup)
* Password strength meter integrado ao campo
* CTA claro: “Criar Conta”

---

## 5️⃣ RESET DE SENHA

### 🔹 Diferencial

* Tela simples, sem distrações
* Campo email único
* Botão estilizado igual ao login, mas com cor diferenciada (ex: degradê laranja → azul)
* Feedback: “Email enviado com sucesso” com **microanimação de checkmark**

### 🔹 UX

* Auto-hide da mensagem após 3 segundos
* CTA secundário: voltar ao login

---

## 6️⃣ MICROANIMAÇÕES & INTERAÇÕES

* Campos flutuantes ao foco
* Botões com **gradiente animado no hover**
* Cards entram **com leve fade-in + scale** ao carregar
* Erros aparecem **deslizando suavemente** do campo
* Loading buttons integrados, nunca overlay central

---

## 7️⃣ CORES & TIPOGRAFIA

* **Fundo**: gradiente suave (ex: lilás → azul)
* **Card**: branco com borda arredondada (8–12px) e sombra soft
* **CTA principal**: cor vibrante (ex: roxo neon)
* **Campos e textos secundários**: tons de cinza escuro
* **Tipografia**: fonte sem serifa moderna, ex: Inter ou Poppins

---

## 8️⃣ DIFERENCIAL “NOSSO ESTILO”

* **Cartões flutuantes animados** (não só planos)
* **Microinterações únicas** (hover, error slide, focus)
* **Gradient branding**: cada ação tem cor própria mas consistente
* **Ilustrações minimalistas customizadas** (para desktop no cadastro)

---

