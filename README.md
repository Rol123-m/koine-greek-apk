# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


koine-greek-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Game/
│   │   │   ├── GameCard.jsx
│   │   │   ├── Mascot.jsx
│   │   │   ├── OptionsGrid.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── ResultsScreen.jsx
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PrivateRoute.jsx
│   │   └── UI/
│   │       ├── Button.jsx
│   │       ├── LoadingSpinner.jsx
│   │       └── Modal.jsx
│   ├── pages/
│   │   ├── Student/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Game.jsx
│   │   │   └── Profile.jsx
│   │   ├── Professor/
│   │   │   ├── Dashboard.jsx
│   │   │   └── StudentProgress.jsx
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── Home.jsx
│   ├── data/
│   │   ├── vocabulary.js
│   │   └── auth.js
│   ├── hooks/
│   │   ├── useUserProgress.js
│   │   └── useAuth.js
│   ├── utils/
│   │   ├── gameLogic.js
│   │   ├── animations.js
│   │   └── constants.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
