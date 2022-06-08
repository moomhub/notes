import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import type { ClipboardOptions } from 'vuepress-plugin-clipboard'
import { sidebars,navbar } from "./configs";


export default defineUserConfig<DefaultThemeOptions>({
  base: "/",
  head: [
    ["link", { rel: "icon", href: "/images/icon/favicon.ico" }],
    ["meta", { name: "application-name", content: "MoomHub" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "MoomHub" }],
  ],
  // 站点配置
  lang: "en-Zh",
  title: "青衣水袖",
  description: "记录学习信息的文档",

  // 主题和它的配置
  theme: "@vuepress/theme-default",
  themeConfig: {
    logo: "/images/png/logo.png",
    // 仓库地址
    repo: "https://github.com/moomhub/Notes",
    docsDir: "docs",
    navbar: [
      navbar.java,
      navbar.back_end,
      navbar.database,
      navbar.other,
      navbar.web,
    ],
    sidebar: sidebars.all,
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdatedText: "上次更新",
    contributorsText: "贡献者",
    // custom containers
    tip: "提示",
    warning: "注意",
    danger: "警告",
    // 404 page
    notFound: [
      "这里什么都没有",
      "我们怎么到这来了？",
      "这是一个 404 页面",
      "看起来我们进入了错误的链接",
    ],
    backToHome: "返回首页",
    // a11y
    openInNewWindow: "在新窗口打开",
    toggleDarkMode: "切换夜间模式",
    toggleSidebar: "切换侧边栏",
    themePlugins: {
      // only enable git plugin in production mode
      git: true,
    },
  },
  plugins: [
    [
      "@vuepress/docsearch",
      {
        appId: "Q6JY0Z6EVF",
        apiKey: "8644a38510392fdc7e0aabb51371cebd",
        indexName: "moomhub",
        locales: {
          "/": {
            placeholder: "搜索文档",
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                searchBox: {
                  resetButtonTitle: "清除查询条件",
                  resetButtonAriaLabel: "清除查询条件",
                  cancelButtonText: "取消",
                  cancelButtonAriaLabel: "取消",
                },
                startScreen: {
                  recentSearchesTitle: "搜索历史",
                  noRecentSearchesText: "没有搜索历史",
                  saveRecentSearchButtonTitle: "保存至搜索历史",
                  removeRecentSearchButtonTitle: "从搜索历史中移除",
                  favoriteSearchesTitle: "收藏",
                  removeFavoriteSearchButtonTitle: "从收藏中移除",
                },
                errorScreen: {
                  titleText: "无法获取结果",
                  helpText: "你可能需要检查你的网络连接",
                },
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                  searchByText: "搜索提供者",
                },
                noResultsScreen: {
                  noResultsText: "无法找到相关结果",
                  suggestedQueryText: "你可以尝试查询",
                  openIssueText: "你认为该查询应该有结果？",
                  openIssueLinkText: "点击反馈",
                },
              },
            },
          },
        },
      }
    ],
    [
      'vuepress-plugin-clipboard',
      {
        align: "top",
        staticIcon: true,
        successText:"复制成功！"

      } as ClipboardOptions,
    ],
  ],
});
