// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; //这个要引入
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Unocss from "unocss/vite";
import { presetUno, presetAttributify, presetIcons } from "unocss";

/**
 * * unplugin-icons插件，自动引入iconify图标
 * unplugin-icons: https://github.com/antfu/unplugin-icons
 * 图标库: https://icones.js.org/
 */
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 这里除了引入 vue 以外还可以引入pinia、vue-router、vueuse等，
      // 甚至你还可以使用自定义的配置规则，见 https://github.com/antfu/unplugin-auto-import#configuration
      imports: ["vue", "vue-router"],
      // 第三方组件库的解析器
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({
          customCollections: ["custom"],
          componentPrefix: "icon",
        }),
      ],
      dts: "src/types/auto-imports.d.ts",
    }),
    Components({
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({
          customCollections: ["custom"],
          componentPrefix: "icon",
        }),
      ],
      dirs: ["src/components", "src/layouts/components/**/components"],
      dts: 'src/types/components.d.ts'
    }),
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
    }),
    Icons({
      compiler: "vue3",
      scale: 1,
      defaultClass: "inline-block",
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
