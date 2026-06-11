import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/proting-prototype/',
  plugins: [react()],
});
