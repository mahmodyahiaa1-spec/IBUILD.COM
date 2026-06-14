import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    ssr: false // السطر السحري اللي هيحل الأزمة ويجبره يطلع ملفات ثابتة
  }
});