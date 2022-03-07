export const data = {
  "key": "v-57603dbc",
  "path": "/database/mysql/Mysql%E9%A1%B9%E7%9B%AE-%E6%96%B0%E9%9B%B6%E5%94%AE%E6%95%B0%E6%8D%AE%E5%BA%93%E8%AE%BE%E8%AE%A1.html",
  "title": "Mysql 数据库设计",
  "lang": "en-Zh",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "数据模型",
      "slug": "数据模型",
      "children": [
        {
          "level": 3,
          "title": "瀑布模型",
          "slug": "瀑布模型",
          "children": []
        },
        {
          "level": 3,
          "title": "螺旋模型",
          "slug": "螺旋模型",
          "children": []
        },
        {
          "level": 3,
          "title": "使用 visio 图制定ER图",
          "slug": "使用-visio-图制定er图",
          "children": []
        },
        {
          "level": 3,
          "title": "数据库模型图",
          "slug": "数据库模型图",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "数据库引擎",
      "slug": "数据库引擎",
      "children": []
    },
    {
      "level": 2,
      "title": "数据库常用操作",
      "slug": "数据库常用操作",
      "children": [
        {
          "level": 3,
          "title": "忽略错误，继续执行",
          "slug": "忽略错误-继续执行",
          "children": []
        },
        {
          "level": 3,
          "title": "存在就更新，不存在则插入",
          "slug": "存在就更新-不存在则插入",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "主要概念",
      "slug": "主要概念",
      "children": []
    },
    {
      "level": 2,
      "title": "SKU与权重",
      "slug": "sku与权重",
      "children": []
    },
    {
      "level": 2,
      "title": "相关设计关系图",
      "slug": "相关设计关系图",
      "children": [
        {
          "level": 3,
          "title": "品类和参数绑定",
          "slug": "品类和参数绑定",
          "children": []
        },
        {
          "level": 3,
          "title": "参数和SKU(商品)关系",
          "slug": "参数和sku-商品-关系",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "订单号和流水号的区别",
      "slug": "订单号和流水号的区别",
      "children": []
    },
    {
      "level": 2,
      "title": "商品秒杀业务",
      "slug": "商品秒杀业务",
      "children": [
        {
          "level": 3,
          "title": "数据库事务隔离级别 Serializable",
          "slug": "数据库事务隔离级别-serializable",
          "children": []
        },
        {
          "level": 3,
          "title": "乐观锁",
          "slug": "乐观锁",
          "children": []
        },
        {
          "level": 3,
          "title": "使用redis库存",
          "slug": "使用redis库存",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "数据库解决购物纠纷",
      "slug": "数据库解决购物纠纷",
      "children": [
        {
          "level": 3,
          "title": "如何避免篡改商品信息?",
          "slug": "如何避免篡改商品信息",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "防止XSS攻击",
      "slug": "防止xss攻击",
      "children": [
        {
          "level": 3,
          "title": "AntiSamy",
          "slug": "antisamy",
          "children": []
        },
        {
          "level": 3,
          "title": "Jsoup（推荐使用）",
          "slug": "jsoup-推荐使用",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "订单号和流水号",
      "slug": "订单号和流水号",
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
  "filePathRelative": "database/mysql/Mysql项目-新零售数据库设计.md"
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
