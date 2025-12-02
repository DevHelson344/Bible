# Devocional Diário ✨

Sistema web de devocional diário da Bíblia construído com React e Tailwind CSS, integrado com API pública da Bíblia. Design moderno com glassmorphism e animações suaves.

## ✨ Funcionalidades

- 🌅 **Versículo do Dia Fixo** - Versículo especial que permanece o dia todo (atualiza automaticamente à meia-noite)
- 📖 **Leitor de Bíblia Completo** - Navegue por todos os livros e capítulos da Bíblia
- ✍️ Sistema de reflexões pessoais
- 💾 Histórico de reflexões salvo localmente
- ⭐ Sistema de favoritos
- 🔄 Versículos aleatórios da API Bible
- 🔍 Busca por versículos específicos
- 📱 Design responsivo e moderno
- 🎨 Interface com glassmorphism e gradientes
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
