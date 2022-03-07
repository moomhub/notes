import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("C:/Users/MOOMHUB/Desktop/新建文件夹/Notes/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("C:/Users/MOOMHUB/Desktop/新建文件夹/Notes/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
