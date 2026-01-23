# Implementação: Interface de Chat para Auditoria (Audit Chat)

Esta documentação detalha a implementação da nova interface de chat para auditoria de segurança, conforme solicitado.

## 1. Arquitetura

Seguindo os princípios de **Clean Architecture** e a migração para uma estrutura **Modular**, a implementação está localizada em `src/modules/audit`.

### Estrutura de Pastas
- `src/modules/audit/domain/entities`: Definição de entidades como `ChatMessage`.
- `src/modules/audit/interface-adapters/components`: Componentes UI específicos para o chat de auditoria.

## 2. Componentes UI

A interface foi decomposta nos seguintes componentes para garantir modularidade e reuso:

- **AuditChat**: Container principal que gerencia o estado das mensagens e a composição da tela.
- **ChatHeader**: Cabeçalho com a identificação "AUDITAI INTELLIGENCE".
- **ChatMessage**: Renderiza mensagens da IA e do Usuário com estilos distintos.
- **UploadArea**: Área de drag-and-drop para arquivos `package.json`.
- **QuickActions**: Botões de sugestão rápida (ex: "Audit lodash@latest").
- **ChatInput**: Barra inferior para entrada de texto e anexos.
- **ChatFooter**: Rodapé com indicadores de segurança e processamento.

## 3. Design System

- **Cores**:
  - Fundo principal: `Slate-950` (#020617)
  - Cards de mensagem: `Slate-900` (#0F172A)
  - Primária (Ações): `Blue-500` (#3B82F6)
  - Accent (Destaques IA): `Purple-Neon` (#BC62FF)
- **Efeitos**:
  - `shadow-ai-glow`: Brilho roxo para elementos de IA.
  - `shadow-blue-glow`: Brilho azul para ações principais.

## 4. Fluxo de Usuário

1. O usuário acessa a página de Auditoria através da barra lateral.
2. A IA inicia a conversa solicitando o `package.json` ou o nome de uma dependência.
3. O usuário pode arrastar um arquivo para a `UploadArea` ou digitar no `ChatInput`.
4. As `QuickActions` oferecem atalhos para tarefas comuns.
