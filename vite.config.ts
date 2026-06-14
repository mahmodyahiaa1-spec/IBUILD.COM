import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // احذف إعدادات السيرفر أو اجعلها فارغة
  tanstackStart: {
    server: { 
      entry: "client", // تغيير الـ entry إلى client بدل server
    },
  },
  build: {
    outDir: 'dist',
  }
});