export const data = {
  "key": "v-3ca8eb76",
  "path": "/database/pxc/PXC%E9%9B%86%E7%BE%A4%E4%B8%BB%E6%9C%BA%E5%AE%89%E8%A3%85.html",
  "title": "PXC集群安装",
  "lang": "en-Zh",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "1、Linux 主机安装",
      "slug": "_1、linux-主机安装",
      "children": [
        {
          "level": 3,
          "title": "1. 删除MariaDB程序包",
          "slug": "_1-删除mariadb程序包",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 开放防火墙端口",
          "slug": "_2-开放防火墙端口",
          "children": []
        },
        {
          "level": 3,
          "title": "3. 关闭SELINUX",
          "slug": "_3-关闭selinux",
          "children": []
        },
        {
          "level": 3,
          "title": "4. 离线安装PXC",
          "slug": "_4-离线安装pxc",
          "children": []
        },
        {
          "level": 3,
          "title": "5. 创建PXC集群",
          "slug": "_5-创建pxc集群",
          "children": []
        },
        {
          "level": 3,
          "title": "6. PXC节点启动与关闭",
          "slug": "_6-pxc节点启动与关闭",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "2、Docker 安装",
      "slug": "_2、docker-安装",
      "children": [
        {
          "level": 3,
          "title": "1.拉取镜像",
          "slug": "_1-拉取镜像",
          "children": []
        },
        {
          "level": 3,
          "title": "2.直接启动版（傻瓜操作）",
          "slug": "_2-直接启动版-傻瓜操作",
          "children": []
        },
        {
          "level": 3,
          "title": "3.挂载配置文件版（推荐）5.7 .30 版本",
          "slug": "_3-挂载配置文件版-推荐-5-7-30-版本",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "3、PXC 参数说明",
      "slug": "_3、pxc-参数说明",
      "children": []
    },
    {
      "level": 2,
      "title": "4、PXC节点上线和下线操作（安装环境下）",
      "slug": "_4、pxc节点上线和下线操作-安装环境下",
      "children": []
    },
    {
      "level": 2,
      "title": "5、Mysql常用的中间件",
      "slug": "_5、mysql常用的中间件",
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
  "filePathRelative": "database/pxc/PXC集群主机安装.md"
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
