export const data = {
  "key": "v-61018508",
  "path": "/database/mysql/Mysql%E6%9F%A5%E8%AF%A2%E4%BC%98%E5%8C%96-%E8%AF%AD%E5%8F%A5%E4%BC%98%E5%8C%96.html",
  "title": "Mysql 语句优化",
  "lang": "en-Zh",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "where 查询过慢",
      "slug": "where-查询过慢",
      "children": [
        {
          "level": 3,
          "title": "如何确定合适的索引",
          "slug": "如何确定合适的索引",
          "children": []
        },
        {
          "level": 3,
          "title": "重新计数",
          "slug": "重新计数",
          "children": []
        },
        {
          "level": 3,
          "title": "强制使用某个索引",
          "slug": "强制使用某个索引",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "count() 计数优化",
      "slug": "count-计数优化",
      "children": [
        {
          "level": 3,
          "title": "count(非索引字段)",
          "slug": "count-非索引字段",
          "children": []
        },
        {
          "level": 3,
          "title": "count(索引字段)",
          "slug": "count-索引字段",
          "children": []
        },
        {
          "level": 3,
          "title": "count(1)",
          "slug": "count-1",
          "children": []
        },
        {
          "level": 3,
          "title": "count(*)",
          "slug": "count",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "order by 优化",
      "slug": "order-by-优化",
      "children": [
        {
          "level": 3,
          "title": "ORDER BY步骤原理",
          "slug": "order-by步骤原理",
          "children": []
        },
        {
          "level": 3,
          "title": "优化 order by 中间结果集",
          "slug": "优化-order-by-中间结果集",
          "children": []
        },
        {
          "level": 3,
          "title": "优化 order by 回表生成完整结果集",
          "slug": "优化-order-by-回表生成完整结果集",
          "children": []
        },
        {
          "level": 3,
          "title": "order by 进行索引覆盖",
          "slug": "order-by-进行索引覆盖",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "order by rand() 优化(随机取法进行优化)",
      "slug": "order-by-rand-优化-随机取法进行优化",
      "children": [
        {
          "level": 3,
          "title": "ORDER BY RAND()原理",
          "slug": "order-by-rand-原理",
          "children": []
        },
        {
          "level": 3,
          "title": "为什么会慢?",
          "slug": "为什么会慢",
          "children": []
        },
        {
          "level": 3,
          "title": "解决方法-临时优化方法",
          "slug": "解决方法-临时优化方法",
          "children": []
        },
        {
          "level": 3,
          "title": "解决方法-业务方案（推荐）",
          "slug": "解决方法-业务方案-推荐",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "优化联合查询",
      "slug": "优化联合查询",
      "children": [
        {
          "level": 3,
          "title": "索引下推（Version<=5.6）",
          "slug": "索引下推-version-5-6",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "索引左侧用法",
      "slug": "索引左侧用法",
      "children": [
        {
          "level": 3,
          "title": "联合索引",
          "slug": "联合索引",
          "children": []
        },
        {
          "level": 3,
          "title": "字符串前缀索引",
          "slug": "字符串前缀索引",
          "children": []
        },
        {
          "level": 3,
          "title": "字符串like只支持右模糊",
          "slug": "字符串like只支持右模糊",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "IS NULL优化",
      "slug": "is-null优化",
      "children": []
    },
    {
      "level": 2,
      "title": "尽量少用 != 运算符",
      "slug": "尽量少用-运算符",
      "children": []
    },
    {
      "level": 2,
      "title": "尽量少用 IN 和 NOT IN 运算符",
      "slug": "尽量少用-in-和-not-in-运算符",
      "children": []
    },
    {
      "level": 2,
      "title": "在表达式左侧使用运算符和函数都会让索引失效",
      "slug": "在表达式左侧使用运算符和函数都会让索引失效",
      "children": [
        {
          "level": 3,
          "title": "为什么扫描行数非常少?",
          "slug": "为什么扫描行数非常少",
          "children": []
        },
        {
          "level": 3,
          "title": "松散索引扫描（MySql 8.0 才支持）",
          "slug": "松散索引扫描-mysql-8-0-才支持",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "索引失效，不走索引",
      "slug": "索引失效-不走索引",
      "children": [
        {
          "level": 3,
          "title": "字段进行了函数操作",
          "slug": "字段进行了函数操作",
          "children": []
        },
        {
          "level": 3,
          "title": "时间函数",
          "slug": "时间函数",
          "children": []
        },
        {
          "level": 3,
          "title": "字符串与数字比较",
          "slug": "字符串与数字比较",
          "children": []
        },
        {
          "level": 3,
          "title": "隐式字符编码转换",
          "slug": "隐式字符编码转换",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "分页查询优化",
      "slug": "分页查询优化",
      "children": [
        {
          "level": 3,
          "title": "偏移量大时，效率低",
          "slug": "偏移量大时-效率低",
          "children": []
        },
        {
          "level": 3,
          "title": "优化SQL",
          "slug": "优化sql",
          "children": []
        },
        {
          "level": 3,
          "title": "要不要使用子查询",
          "slug": "要不要使用子查询",
          "children": []
        }
      ]
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
  "filePathRelative": "database/mysql/Mysql查询优化-语句优化.md"
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
