export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "首页",
  "lang": "en-Zh",
  "frontmatter": {
    "home": true,
    "title": "首页",
    "heroImage": "/images/png/logo.svg",
    "actions": [
      {
        "text": "进入文档",
        "link": "/java/版本特性/Java8新特性.html",
        "type": "primary"
      }
    ],
    "footer": "MIT Licensed | Copyright © 2018-present Evan You"
  },
  "excerpt": "",
  "headers": [],
  "git": {
    "updatedTime": 1646642830000,
    "contributors": [
      {
        "name": "MoomHub",
        "email": "2208300539@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "README.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
