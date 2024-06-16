import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto habilita el host para que el servidor sea accesible externamente
    port: 3000  // Este es el puerto que queremos usar para el servidor de desarrollo
  },
  preview: {
    host: true, // Habilita el host para que el servidor de preview sea accesible externamente
    port: 3000  // Este es el puerto que queremos usar para el servidor de preview
  }
});
