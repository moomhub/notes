export const data = {
  "key": "v-364066e0",
  "path": "/backend/springcloud/gateway/Hystrixs-%E6%96%AD%E8%B7%AF%E7%94%B1%E4%BD%BF%E7%94%A8.html",
  "title": "Hystrixs（断路由）使用",
  "lang": "en-Zh",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "为什么需要服务降级",
      "slug": "为什么需要服务降级",
      "children": [
        {
          "level": 3,
          "title": "服务雪崩",
          "slug": "服务雪崩",
          "children": []
        },
        {
          "level": 3,
          "title": "Hystrix",
          "slug": "hystrix",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "hystrix中的重要概念:",
      "slug": "hystrix中的重要概念",
      "children": []
    },
    {
      "level": 2,
      "title": "服务降级",
      "slug": "服务降级",
      "children": [
        {
          "level": 3,
          "title": "pom",
          "slug": "pom",
          "children": []
        },
        {
          "level": 3,
          "title": "添加注解",
          "slug": "添加注解",
          "children": []
        },
        {
          "level": 3,
          "title": "在Feign上使用熔断器",
          "slug": "在feign上使用熔断器",
          "children": []
        },
        {
          "level": 3,
          "title": "Service",
          "slug": "service",
          "children": []
        },
        {
          "level": 3,
          "title": "Controller",
          "slug": "controller",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "服务降级异常处理",
      "slug": "服务降级异常处理",
      "children": [
        {
          "level": 3,
          "title": "通用接口异常（推荐）",
          "slug": "通用接口异常-推荐",
          "children": []
        },
        {
          "level": 3,
          "title": "接口指定异常",
          "slug": "接口指定异常",
          "children": []
        },
        {
          "level": 3,
          "title": "全局异常",
          "slug": "全局异常",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "服务熔断",
      "slug": "服务熔断",
      "children": [
        {
          "level": 3,
          "title": "描述",
          "slug": "描述",
          "children": []
        },
        {
          "level": 3,
          "title": "服务熔断代码参考",
          "slug": "服务熔断代码参考",
          "children": []
        },
        {
          "level": 3,
          "title": "断路由",
          "slug": "断路由",
          "children": []
        },
        {
          "level": 3,
          "title": "熔断工作原理",
          "slug": "熔断工作原理",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "HystrixCommand配置项说明",
      "slug": "hystrixcommand配置项说明",
      "children": [
        {
          "level": 3,
          "title": "默认配置",
          "slug": "默认配置",
          "children": []
        },
        {
          "level": 3,
          "title": "commandProperties 属性",
          "slug": "commandproperties-属性",
          "children": []
        },
        {
          "level": 3,
          "title": "threadPoolProperties属性",
          "slug": "threadpoolproperties属性",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "标签备注",
      "slug": "标签备注",
      "children": []
    }
  ],
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
  "filePathRelative": "backend/springcloud/gateway/Hystrixs-断路由使用.md"
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
