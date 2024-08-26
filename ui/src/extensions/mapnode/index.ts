import {
  Editor,
  Node,
  ToolboxItem,
} from "@halo-dev/richtext-editor";
import { markRaw, shallowRef, } from "vue";
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Paragraph from '@tiptap/extension-paragraph';
import MdiFormatBold from "~icons/mdi/image-album";
import { MapNode } from './MapNode'; // 确保正确引入
import { createI18n } from "vue-i18n";
export type TextDiagramOptions = {
  HTMLAttributes: Record<string, any>;
};
const editor = new Editor({
  extensions: [
    Text,
    Paragraph,
    Document,
    MapNode, // 注册 MapNode 扩展
  ],
  content: '<p>Hello World!</p>',
});
const i18n = createI18n({
  legacy: false,
  locale: "zh-CN",
  fallbackLocale: "en",
});
export const BoxExtension = Node.create({
  addOptions() {
    return {
      ...this.parent?.(),
      getToolboxItems() {
        return [
          {
            priority: 40,
            component: markRaw(ToolboxItem),
            props: {
              editor,
              isActive: editor.isActive("bold"),
              icon: markRaw(MdiFormatBold),
              title: i18n.global.t("地图相册"),
              action: () => {
                editor
                  .chain()
                  .focus()
                  .insertContent({
                    type: "map", // "map" 必须是已注册的 MapNode 类型
                    attrs: {
                      latitude: 40.7128,
                      longitude: -74.0060,
                      zoom: 10,
                    },
                  })
                  .run();
              },
            },
          },
        ];
      },
    };
  },
});
