import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlifyAdapter from "@tanstack/start-adapter-netlify";

export default defineConfig({
  tanstackStart: {
    server: { 
      entry: "server", 
      adapter: netlifyAdapter() // ده هيخلي النتليفي يفهم كود السيرفر
    },
  },
  // أضف الجزء ده عشان يجبره يطلع ملفات ثابتة:
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html'
    }
  }
});