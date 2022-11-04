import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import shimReactPdf from 'vite-plugin-shim-react-pdf';
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), shimReactPdf()],
  build: {
    chunkSizeWarningLimit: 2600,
  },
  // plugins: [react()]
})
// vite build --base=/my/public/path/