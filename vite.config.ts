import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { 
      entry: "server", 
    },
  },
  // الإعداد ده بيضمن خروج ملفات المشروع في مجلد dist
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html'
    }
  }
});