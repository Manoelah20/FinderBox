// apps/web/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// ⚠️ É necessário importar o módulo 'path' do Node.js
import * as path from 'path';

// O __dirname pode não estar disponível no ES Modules por padrão,
// mas o path.resolve é o que importa.

export default defineConfig({
  plugins: [react()],
  // Adicione a seção 'resolve'
  resolve: {
    alias: {
      // 🎯 Aqui está a correção: mapear '@' para a pasta 'src'
      '@': path.resolve(__dirname, './src'),
    },
  },
});

