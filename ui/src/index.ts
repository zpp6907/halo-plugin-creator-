import { definePlugin } from "@halo-dev/console-shared";
import HomeView from "./views/MyHomeView.vue";
import { IconPlug } from "@halo-dev/components";
import { markRaw } from "vue";
import { BoxExtension } from "./extensions/mapnode";

export default definePlugin({
  components: {
  },
  
  routes: [
    {
      parentName: "Root",
      route: {
        path: "/todo",
        name: "Example",
        component: HomeView,
        meta: {
          title: "TODO",
          searchable: true,
          menu: {
            name: "地图相册",
            group: "TODO",
            icon: markRaw(IconPlug),
            priority: 0,
          },
        },
      },
    },
  ],
  extensionPoints: {
    "default:editor:extension:create": () => {
      return [BoxExtension];
    }
  }
});
