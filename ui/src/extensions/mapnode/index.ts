import { Node, Editor,ToolboxItem  } from "@halo-dev/richtext-editor";
import { markRaw } from "vue";
import type { EditorState } from "@/tiptap/pm";
import { deleteNode } from "@/utils/index";
import MdiDeleteForeverOutline from "@/compoments/icon/MdiDeleteForeverOutline.vue";
import * as echarts from 'echarts';
import ImageView from "./ImageView1.vue";
import {
  isActive,
  VueNodeViewRenderer,
  mergeAttributes,
} from "@tiptap/vue-3";
import MdiFormatBold from "~icons/mdi/image-album";
import Maps from "~icons/mdi/air-humidifier";
import Account from "~icons/mdi/account-supervisor-circle-outline";
import MdiShare from "~icons/mdi/share";
import { createI18n } from "vue-i18n";
// 创建 i18n 实例
const i18n = createI18n({
  legacy: false,
  locale: "zh-CN",
  fallbackLocale: "en",
});


export const BoxExtension = Node.create({
  name: 'echarts',
  group: 'block',
  atom: true,
  parseHTML() {
    console.log('parseHTML');
    return [
      {
        tag: 'div[data-type="echarts"]', // 解析具有 data-type="echarts" 的 div
      },
    ];
  },
  
  addAttributes() {
    return {
      ...this.parent?.(),
      option: {
        default: '{}',
        // 存储 ECharts 的配置，默认为空对象字符串
        parseHTML: (element) => {
          console.log("element",element);
          const option = element.getAttribute('data-option');
          return option && option !== '{}' ? option : '{}'; // 解析时检查内容是否为空
        },
        renderHTML: (attributes) => {
          const option = attributes.option || '{}';
          return {
            'data-option': option,
          };
        },
      },
      width: {
        default: '400px', // 默认宽度
      },
      height: {
        default: '300px', // 默认高度
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    console.log("HTMLAttributes:",HTMLAttributes);
    return [
      'div',
      {
        'data-type': 'echarts', // 自定义属性标记这是 ECharts 节点
        style: `width: ${HTMLAttributes.width}; height: ${HTMLAttributes.height};`, // 设置宽高
        'data-option': HTMLAttributes.option, // 存储 ECharts 的配置
      },
    ];
  },
  addNodeView() {
    return VueNodeViewRenderer(ImageView);
  },
  addOptions() {
    return {
      getToolboxItems({ editor }: { editor: Editor }) {
        return [
          {
            priority: 40,
            component: markRaw(ToolboxItem),
            props: {
              editor,
              icon: markRaw(MdiFormatBold),
              title: i18n.global.t("地图相册"),
              action: () => {
                editor.commands.insertContent({
                  type: 'echarts',
                  attrs: {
                    option: JSON.stringify({
                      title: {
                        text: 'ECharts 示例',
                      },
                      tooltip: {},
                      xAxis: {
                        data: ['A', 'B', 'C', 'D', 'E', 'F'],
                      },
                      yAxis: {},
                      series: [
                        {
                          name: '销量',
                          type: 'bar',
                          data: [5, 20, 36, 10, 10, 20],
                        },
                      ],
                    }),
                    width: '500px',
                    height: '400px',
                  },
                });
              }
            },
          },
        ];
      },
      getBubbleMenu({ editor }: { editor: Editor }) {
        return {
          pluginKey: "mapNodeBubbleMenu",
          shouldShow: ({ state }: { state: EditorState }) => {
            return isActive(state,BoxExtension.name);
          },
          items: [
            {
              priority: 160,
              props: {
                icon: markRaw(MdiShare),
                title: "分享",
                action: () => {
                  deleteNode(BoxExtension.name, editor);
                },
              },
            },
            {
              priority: 160,
              props: {
                icon: markRaw(Account),
                title: "账户",
                action: () => {
                  deleteNode(BoxExtension.name, editor);
                },
              },
            },
            {
              priority: 160,
              props: {
                icon: markRaw(Maps),
                title: "添加照片",
                action: () => {
                  deleteNode(BoxExtension.name, editor);
                },
              },
            },
            {
              priority: 160,
              props: {
                icon: markRaw(MdiDeleteForeverOutline),
                title: "删除",
                action: () => {
                  console.log('删除地图');
                  deleteNode(BoxExtension.name, editor);
                },
              },
            },
          ]
        }
      },
    };
  },
});
