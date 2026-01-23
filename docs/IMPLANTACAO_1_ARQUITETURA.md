# Implementação 1: Arquitetura e Estrutura

Esta etapa foca na consolidação da Clean Architecture conforme as diretrizes do projeto.

## Estrutura Atual vs Objetivo (Modular)

O projeto está migrando para uma estrutura de **Módulos**, onde cada domínio (Audit, Auth, Billing) contém sua própria Clean Architecture:

- **src/modules/[modulo]/domain**: Entidades e regras de negócio puras.
- **src/modules/[modulo]/application**: Use Cases, DTOs e Portas.
- **src/modules/[modulo]/infrastructure**: Adaptores e Repositórios específicos.

Isso permite que diferentes agentes ou desenvolvedores trabalhem em módulos distintos sem conflitos.

## Status da Implementação

- [x] Estrutura de pastas modular criada em `src/modules`.
- [x] Documentação dividida em fases de implantação.
- [x] Injeção de dependência via Server Actions.
- [/] Migração dos Use Cases existentes para dentro de `src/modules/audit`.


## Próximos Passos
1. Mover toda a lógica de `src/lib/supabase` para o adaptador correto em `src/infrastructure/adapters/supabase`.
2. Garantir que nenhum Use Case ou Entidade importe nada de `infrastructure` diretamente (usar Portas).
3. Consolidar o uso de `proxy.ts` (conforme nova recomendação do framework).
