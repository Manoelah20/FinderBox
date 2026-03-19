import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">FinderBox 🚀</h1>
            <p className="text-lg text-gray-600">
              Plataforma para reportar e encontrar itens perdidos e achados
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔍 Reportar Item Perdido</h2>
              <p className="text-gray-600 mb-6">
                Registre itens que você perdeu para que a comunidade possa ajudar a encontrar.
              </p>
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Reportar
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">📦 Buscar Itens Achados</h2>
              <p className="text-gray-600 mb-6">
                Procure itens que foram encontrados por outras pessoas.
              </p>
              <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}
