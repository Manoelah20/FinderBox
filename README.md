# 📦 FinderBox

**FinderBox** é uma aplicação moderna para rastreamento de encomendas, construída com tecnologias web e mobile. O projeto permite acompanhar pacotes de diferentes transportadoras em tempo real, com uma interface intuitiva e responsiva.

---

## 🚀 Tecnologias utilizadas

- **Expo + React Native** (mobile)
- **React + Vite + TypeScript** (web)
- **Firebase** (autenticação e dados)
- **React Router DOM** (rotas web)
- **Expo Router** (rotas mobile)
- **TurboRepo** (monorepo para apps e pacotes)
- **Vercel** (deploy web)

---

## 📁 Estrutura do projeto

FinderBox/
├── apps/
│   ├── mobile/           # App mobile com Expo
│   └── web/              # App web com Vite
├── shared/               # Código compartilhado (App.tsx, telas)
│   └── screens/
│       ├── Home.tsx
│       ├── Tracking.tsx
│       └── About.tsx
├── public/               # Arquivos estáticos para web
├── .env                  # Variáveis de ambiente
├── vercel.json            # Reescrita de rotas para Vercel
└── package.json           # Dependências e scripts

---

## 🧭 Navegação

O projeto usa rotas diferentes para cada plataforma:

- **Web**: `react-router-dom` com rotas como `/`, `/tracking`, `/about`
- **Mobile**: `expo-router` com navegação via `<Stack>`

O componente `App.tsx` detecta a plataforma (`Platform.OS`) e renderiza as rotas adequadas.

---

## 🛠️ Como rodar localmente

### Web
```bash
cd apps/web
npm install
npx expo export --platform web
