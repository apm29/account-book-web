import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import {
  VantResolver, NaiveUiResolver
} from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    Pages(),
    Components({
      resolvers: [
        VantResolver(),
        NaiveUiResolver()
      ]
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
      ],
    }),
    styleImport({
      resolves: [VantResolve()],
    }),
    Unocss()
  ],
  /* CSS 预处理器 */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/assets/styles/var.scss";'
      }
    }
  }
})
