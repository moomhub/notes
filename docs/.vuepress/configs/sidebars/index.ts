import type { SidebarConfig } from "@vuepress/theme-default";
import { newApi, base, thread } from "./java";
import { springboot, springcloud } from "./back_end";
import { mysql, pxc } from "./database";
import { linux, docker,mix } from "./other";
import { study } from "./web";

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
  "/other/mix": mix,
  "/web": study,
};
