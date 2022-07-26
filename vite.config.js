import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import styleImport from 'vite-plugin-style-import';
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import {
  NaiveUiResolver
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
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        }
      ],
    }),
    styleImport({
      resolves: [],
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
  },
  server: {
    port: 3000,
    open: false,
    // host: "0.0.0.0",
    https: false,
    hotOnly: false,
    proxy: {
      "/account-book": {
        // target: "http://account.jiayupearl.shop",
        target: "http://localhost:9901",
        changeOrigin: true,
      },
    },
  }
})
