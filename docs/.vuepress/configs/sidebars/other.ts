const linux = [
  {
    text: "Linux 配置",
    collapsible: true,
    children: [
      "/other/linux/Ubuntu设置国内镜像软件源.md",
      "/other/linux/Ubuntu设置远程登陆.md",
      "/other/linux/Linux定时脚本.md",
      "/other/linux/Linux问题归档.md",
    ],
  },
];
const docker = [
  {
    text: "Docker 基础",
    collapsible: true,
    children: [
      "/other/docker/Docker安装.md",
      "/other/docker/Docker运行设置IP.md",
      "/other/docker/Docker命令说明.md",
    ],
  },
  {
    text: "Docker 安装应用",
    collapsible: true,
    children: [
      "/other/docker/Docker安装Web管理平台.md",
      "/other/docker/Docker安装Nacos.md",
      "/other/docker/Doker安装Redis.md",
      "/other/docker/Docker安装Mysql.md",
      "/other/docker/Docker部署haproxy.md",
    ],
  },
];

const mix = [
  {
    text: "杂七杂八",
    collapsible: false,
    children: [
      "/other/mix/PigGo+图床.md",
    ],
  }
];
export { linux, docker, mix };
