# Devocional Diário

Sistema web de devocional diário da Bíblia construído com React e Tailwind CSS, integrado com API pública da Bíblia.

## Funcionalidades

- 📖 Versículo diário automático via API
- ✍️ Sistema de reflexões pessoais
- 💾 Histórico de reflexões salvo localmente
- 🔄 Versículos aleatórios da API Bible
- 📱 Design responsivo
- 🔗 Compartilhamento de versículos
- 🌐 Integração com Bible API (bible-api.com)

## Como executar

1. Instalar dependências:
```bash
npm install
```

2. Executar em modo desenvolvimento:
```bash
npm run dev
```

3. Abrir http://localhost:5173 no navegador

## Build para produção

```bash
npm run build
```

## Tecnologias

- React 18
- Tailwind CSS
- Vite
- Axios para requisições HTTP
- Bible API (bible-api.com)
- LocalStorage para persistência

## API da Bíblia

O sistema utiliza a Bible API (https://bible-api.com) que fornece:
- Versículos em português (tradução Almeida)
- Acesso gratuito sem autenticação
- Versículos aleatórios
- Busca por referência específica
