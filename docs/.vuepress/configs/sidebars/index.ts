import type { SidebarConfig } from "@vuepress/theme-default";
import { newApi, base, thread } from "./java";
import { springboot, springcloud } from "./back_end";
import { mysql, pxc } from "./database";
import { linux, docker } from "./other";

export const all: SidebarConfig = {
  "/java/newApi": newApi,
  "/java/base": base,
  "/java/thread": thread,
  "/backend/springboot": springboot,
  "/backend/springcloud": springcloud,
  "/database/pxc": pxc,
  "/database/mysql": mysql,
  "/other/linux": linux,
  "/other/docker": docker,
};
