# MobilePush Legado - SFMC Custom Activity POC

POC de Custom Activity para Salesforce Marketing Cloud Journey Builder, destinada ao disparo de mensagens via integração com a BU legado de MobilePush.

## Visão Geral

Este projeto implementa uma Custom Activity que permite aos marketers configurar e disparar mensagens através do Journey Builder, com suporte a comunicação com a API legada de MobilePush.

### Arquitetura

```
Journey Builder
    ↓
MobilePush Legado Custom Activity (UI estática)
    ↓
CloudPage SFMC (backend com lógica de integração)
    ↓
OAuth BU Legado
    ↓
MobilePush REST API
```

## Estrutura do Projeto

- **index.html** - Interface de configuração da Custom Activity
- **customActivity.js** - Lógica de inicialização e comunicação com Journey Builder via Postmonger
- **config.json** - Definição da Custom Activity conforme padrão SFMC

## Segurança

⚠️ **IMPORTANTE:** Este repositório é público e **NÃO deve conter**:
- Client Secrets
- Access Tokens
- Senhas
- JWT Secrets
- Credenciais de qualquer tipo

Todas as credenciais e lógica sensível devem ser gerenciadas no backend (CloudPage SFMC).

## Hospedagem

Este repositório foi preparado para ser publicado via **GitHub Pages**, servindo apenas a interface estática (UI) da Custom Activity.

A configuração dinâmica, integração OAuth e chamadas à API legada são gerenciadas exclusivamente no backend SFMC.

## Instalação no SFMC

1. Publicar este repositório via GitHub Pages
2. Criar um Installed Package no SFMC
3. Criar uma Custom Activity apontando para a URL do `index.html` publicada
4. Substituir o valor de `applicationExtensionKey` em `config.json` pela Unique Key do Installed Package

## Status

🔧 POC - Pronto para desenvolvimento e testes

---

**BU Destino:** Campana  
**Data de Criação:** Outubro 2026
