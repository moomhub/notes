export const siteData = {
  "base": "/Notes/",
  "lang": "en-Zh",
  "title": "青衣水袖",
  "description": "记录学习信息的文档",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/images/icon/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "application-name",
        "content": "MoomHub"
      }
    ],
    [
      "meta",
      {
        "name": "apple-mobile-web-app-title",
        "content": "MoomHub"
      }
    ]
  ],
  "locales": {}
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
