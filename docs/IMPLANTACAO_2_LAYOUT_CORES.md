# Implementação 2: Layout e Cores (Design System)

Esta etapa foca na conformidade visual com o guia de design.

## Princípios Visuais

- **Dark-First**: Fundo escuro profundo (Slate-950).
- **Vibe Segura**: Uso de azuis vibrantes e roxos neon para destacar elementos de IA e Auditoria.
- **Acessibilidade**: Contrastes altos e tipografia clara.

## Esquema de Cores Ajustado

- **Primary (Blue Vibrant)**: `#0EA5E9` (Sky-500) - Usado para ações principais.
- **Accent (Purple Neon)**: `#A855F7` (Purple-500) - Usado para indicações de IA e destaques.
- **Background**: `#020617` (Slate-950).
- **Card**: `#0F172A` (Slate-900).

## Implementação Técnica

As cores são gerenciadas via `tailwind.config.ts` e variáveis CSS em `app/globals.css`.

### Tokens de Cores
- `bg-primary`: Azul vibrante.
- `bg-accent`: Roxo neon.
- `shadow-ai-glow`: Brilho azulado para elementos de IA.
