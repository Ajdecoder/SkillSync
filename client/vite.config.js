// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'eslint'

export default defineConfig({
  plugins: [
    react()
  ]
});
