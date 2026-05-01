# Pokédex - Pokémon Database Application

![Pokédex](https://img.shields.io/badge/Pokédex-Application-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=flat&logo=vite)
![Status](https://img.shields.io/badge/Status-Online-brightgreen)

Uma aplicação web interativa de Pokédex construída com React, que permite aos usuários explorar e pesquisar Pokémon da primeira geração (Kanto).

## 🔗 Link para a Aplicação Online

**Acesse agora:** https://folkss1.github.io/pokedex/

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|-------------|--------|-----------|
| **React** | 18.2.0 | Biblioteca JavaScript para construção de interfaces |
| **Vite** | 5.0.0 | Build tool rápida para desenvolvimento |
| **React Router** | 6.20.0 | Roteamento Single Page Application |
| **PokéAPI** | - | API pública de dados Pokémon |
| **CSS Modules** | - | Estilização componentizada |

### Dependências do Projeto

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

---

## 📋 Funcionalidades

- ✅ **Home Page** - Apresentação da aplicação com Pokémon em destaque
- ✅ **Pokédex** - Lista completa de Pokémon com paginação e busca
- ✅ **Detalhes do Pokémon** - Informações completas (tipos, stats, habilidades)
- ✅ **Busca por Nome** - Pesquisa rápida de Pokémon
- ✅ **Design Responsivo** - Funciona em dispositivos móveis e desktop
- ✅ **Efeitos Visuais** - Animações e transições suaves

---

## 🏗️ Arquitetura da Aplicação

```
pokedex/
├── public/
│   └── pokeball.svg          # Ícone da Pokébola
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Navegação principal
│   │   ├── Navbar.module.css
│   │   ├── Footer.jsx        # Rodapé
│   │   └── Footer.module.css
│   ├── pages/
│   │   ├── HomePage.jsx       # Página inicial
│   │   ├── HomePage.module.css
│   │   ├── PokedexPage.jsx   # Lista de Pokémon
│   │   ├── PokedexPage.module.css
│   │   ├── PokemonDetail.jsx # Detalhes do Pokémon
│   │   └── PokemonDetail.module.css
│   ├── App.jsx               # Componente principal
│   ├── main.jsx              # Entry point React
│   └── index.css             # Estilos globais
├── index.html                # HTML entry
├── package.json              # Dependências
├── vite.config.js           # Configuração Vite
└── netlify.toml             # Configuração deploy Netlify
```

### Fluxo de Navegação

```
HomePage (/)
    │
    ├───> PokedexPage (/pokedex)
    │        │
    │        └───> PokemonDetail (/pokemon/:id)
    │
    └───> Search (via query parameter)
```

### Integrações Externas

- **PokéAPI**: `https://pokeapi.co/api/v2/`
  - Endpoint principal: `/pokemon/{id ou name}`
  - Dados: nome, tipos, habilidades, stats, sprites

---

## 💻 Como Instalar e Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Folkss1/pokedex.git

# Entre no diretório
cd pokedex

# Instale as dependências
npm install
```

### Executar em Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# O aplicativo estará disponível em http://localhost:5173
```

### Build para Produção

```bash
# Cria a build de produção
npm run build

# Os arquivos serão gerados na pasta dist/
```

### Preview da Build

```bash
# Visualiza a build de produção localmente
npm run preview
```

---

## 📱 Screenshots

### Home Page
A página inicial apresenta um design Hero com a Pokébola clássica, efeito de digitação "Gotta Catch 'Em All!" e botões de navegação.

![Home Page](https://via.placeholder.com/800x400?text=Home+Page+-+Hero+Section)

### Pokedex Page
Lista paginada de Pokémon com卡片 (cards) contendo imagem, nome e número na Pokédex.

![Pokedex](https://via.placeholder.com/800x400?text=Pokedex+Page+-+Pokemon+Grid)

### Pokemon Detail
Página detalhada com informações completas do Pokémon selecionado.

![Pokemon Detail](https://via.placeholder.com/800x400?text=Pokemon+Detail+Page)

---

## 📄 Estrutura de Arquivos React

### Entry Point - main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
```

### Componente Principal - App.jsx
```jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PokedexPage from './pages/PokedexPage'
import PokemonDetail from './pages/PokemonDetail'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
```

---

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run preview` | Visualiza build localmente |

---

## 📦 Deploy

### GitHub Pages (Automático)
O projeto está configurado com GitHub Actions para deploy automático:

1. A cada push para `main`, o workflow é executado
2. O código é buildado e deployado para GitHub Pages
3. Aplicação disponível em: https://folkss1.github.io/pokedex/

### Netlify (Alternativo)
O projeto também possui configuração para deploy via Netlify:

```bash
# Instale o Netlify CLI
npm install -g netlify-cli

# Faça login
netlify login

# Deploy
netlify deploy --prod
```

---

## 👨‍💻 Autores

- **Folkss1** - Desenvolvedor principal

---

## 📚 Referências

- [Documentação React](https://react.dev/)
- [Documentação Vite](https://vitejs.dev/)
- [PokéAPI](https://pokeapi.co/)
- [React Router](https://reactrouter.com/)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
