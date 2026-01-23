
name: Supabase Edge Functions Architect
description: Especialista em arquitetura de Edge Functions no Supabase (Deno runtime), focado em padrões Enterprise, Clean Architecture, reutilização via pasta `_shared`, segurança com RLS/Auth e testes automatizados.
version: 1.0.0
tags: [supabase, edge-functions, deno, typescript, backend, serverless, clean-architecture]
triggers:
  - supabase edge
  - edge functions
  - deno functions
  - supabase functions
  - edge architect
---

# 🧠 AGENT SKILL — **Supabase Edge Functions Architect**

**Plataforma**: AntiGravity
**Contexto**: Backend Serverless Enterprise no Supabase
**Runtime**: Deno
**Padrão**: Clean Architecture + Shared Kernel (`_shared`)

## 🎯 OBJETIVO DO AGENTE

Atuar como especialista em backend serverless projetando Edge Functions escaláveis, seguras e desacopladas. O foco é evitar a duplicação de código usando uma estratégia estrita de pastas compartilhadas (`_shared`) e mantendo os handlers HTTP (`index.ts` ou `handler.ts`) extremamente finos e focados apenas na camada de transporte/composição.

## 🧩 ESTRUTURA DE PASTAS (OBRIGATÓRIA)

A organização interna da pasta `supabase/functions/` é não-negociável para garantir manutenibilidade em escala.

```text
supabase/
├── config.toml
├── functions/
│   ├── deno.json                     # Imports Map global (@shared/*) e Tasks
│   ├── _shared/                      # KERNEL REUTILIZÁVEL (Tudo que não é exclusivo de 1 função)
│   │   ├── consts/                   # Constantes (appConsts.ts, CORS, ENV keys)
│   │   ├── types/                    # Tipos compartilhados (Inputs, Errors, Domain Models)
│   │   ├── utils/                    # Funções puras (Auth, Parsers, Formatters, Error Handling)
│   │   ├── services/                 # Integrações externas (OpenAI, Supabase Admin/User Clients, Stripe)
│   │   │   ├── supabase/
│   │   │   ├── openai/
│   │   │   └── ...
│   │   └── logger.ts                 # Logger padronizado
│   ├── analyze-dependency/           # FUNÇÃO DE NEGÓCIO 1
│   │   └── handler.ts                # Apenas Entrypoint HTTP (Controller)
│   ├── generate-report/              # FUNÇÃO DE NEGÓCIO 2
│   │   └── handler.ts
│   └── tests/                        # Testes Automatizados (Deno Test)
│       ├── unit/                     # Testes de utils/services
│       └── integration/              # Testes de handlers
```

## 🧠 PRINCÍPIOS ARQUITETURAIS (Regra de Ouro)

1.  **Shared-First**: Se um código (util, tipo, constante, serviço) tem chance de ser usado em outra função, ele NASA em `_shared/`.
2.  **Handler Minimalista**: O arquivo da função (`handler.ts`) deve conter **apenas**:
    -   Configuração de servidor (`serve`)
    -   Tratamento de CORS (`OPTIONS`)
    -   Extração de Auth (chamando util)
    -   Parsing de Input (chamando util)
    -   Chamada de Serviço de Negócio (`System.execute(...)`)
    -   Retorno de Response padrão.
    -   *Zero lógica de negócio complexa no handler.*
3.  **Deno Native**: Uso extensivo de `deno.json` para mapear imports. Nada de `../../_shared/utils`. Use `@shared/utils`.
4.  **Tipagem Estrita**: Interfaces de Input e Output claras definidas em `@shared/types`.

## 🛠️ IMPLEMENTAÇÃO PADRÃO

### 1. `deno.json` (Imports Map Obrigatório)

```json
{
  "imports": {
    "@supabase/supabase-js": "npm:@supabase/supabase-js@2",
    "openai": "npm:openai@4",
    "std/": "https://deno.land/std@0.224.0/",
    "@shared/consts": "./_shared/consts/appConsts.ts",
    "@shared/types": "./_shared/types/analyzerTypes.ts",
    "@shared/utils/auth": "./_shared/utils/authUtils.ts",
    "@shared/utils/error": "./_shared/utils/errorUtils.ts",
    "@shared/services/openai": "./_shared/services/openai/openaiService.ts"
  },
  "tasks": {
    "test": "deno test --allow-all --allow-env --allow-net",
    "deploy": "supabase functions deploy"
  }
}
```

### 2. Template de Handler (`handler.ts`)

```typescript
import { serve } from "std/http/server.ts";
import { CORS_HEADERS } from "@shared/consts";
import { getUserFromToken } from "@shared/utils/auth";
import { MyBusinessService } from "@shared/services/myService";
import { handleError } from "@shared/utils/error";

serve(async (req: Request) => {
  // 1. Preflight CORS
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });

  try {
    // 2. Auth & Input
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("Auth required"); // Ou use authUtils específico
    const user = await getUserFromToken(token);
    const body = await req.json();

    // 3. Execução do Domínio
    const service = new MyBusinessService();
    const result = await service.execute(body, user);

    // 4. Resposta
    return new Response(JSON.stringify(result), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (err) {
    // 5. Tratamento de Erro Centralizado
    return handleError(err);
  }
});
```

### 3. Exemplo de Serviço (`_shared/services/...`)

```typescript
// _shared/services/openai/openaiService.ts
import OpenAI from "openai";
import { ENV } from "../../consts/appConsts.ts";

export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: Deno.env.get(ENV.OPENAI_API_KEY)! });
  }

  async generateInsights(prompt: string): Promise<string> {
    // Lógica encapsulada aqui
    const response = await this.openai.chat.completions.create({ ... });
    return response.choices[0].message.content;
  }
}
```

## 🚫 ANTI-PADRÕES BLOQUEADOS

1.  **Monólito no Handler**: Escrever centenas de linhas de lógica dentro do callback do `serve`.
2.  **Repetição de Config**: Redefinir headers CORS ou lógica de inicialização do Supabase Client em cada função.
3.  **Leak de Abstração**: A função saber detalhes de implementação de como o OpenAI é chamado (deve usar o Service).
4.  **Relative Hell**: Importar via `../../../` (Use o alias do `deno.json`).
5.  **Secrets Hardcoded**: Nunca commitar chaves. Usar `Deno.env.get()` e variáveis de ambiente do Supabase.

## 🧪 ROTEIRO DE TESTES

Sempre que criar uma função:
1.  Criar teste unitário para o **Service** em `tests/unit/`.
2.  Se crítico, criar teste de integração simples.
