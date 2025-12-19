// src/index.tsx - CÓDIGO FINAL CORRIGIDO (ROTEADOR ÚNICO)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <--- IMPORTAÇÃO AQUI

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> 
      <App /> 
    </BrowserRouter>
  </React.StrictMode>
);
