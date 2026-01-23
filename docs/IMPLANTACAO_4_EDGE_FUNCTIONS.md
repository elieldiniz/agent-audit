# Implementação 4: Supabase Edge Functions

Guia para implementação de lógica serverless no Edge (Deno).

## Princípios
- **Shared Kernel**: Use a pasta `supabase/functions/_shared/` para qualquer lógica reutilizável.
- **Handler Fino**: O arquivo `index.ts` ou `handler.ts` deve apenas orquestrar a chamada para os serviços.
- **Segurança**: Validação de Auth e RLS obrigatória em cada chamada via Edge.

## Estrutura Recomendada
- `supabase/functions/analyze-dependency/`: Lógica pesada de análise que não deve rodar no Next.js Server Side.
- `supabase/functions/generate-report/`: Geração de PDF/Relatórios complexos.

## Configuração
Use o arquivo `supabase/functions/deno.json` para gerenciar mapeamentos de imports internos (`@shared/*`).
