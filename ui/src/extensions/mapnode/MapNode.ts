import { Node } from "@halo-dev/richtext-editor";

export const MapNode = Node.create({
  name: 'map',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      latitude: { default: 0 },
      longitude: { default: 0 },
      zoom: { default: 10 },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="map"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'map', ...HTMLAttributes }, '地图'];
  },
  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('div');
      dom.textContent = `地图: 纬度 ${node.attrs.latitude}, 经度 ${node.attrs.longitude}, 缩放级别 ${node.attrs.zoom}`;
      dom.style.padding = '10px'; // 添加内边距
      dom.style.border = '2px solid red'; // 添加红色边框
      dom.style.backgroundColor = 'lightyellow'; // 添加背景色
      dom.style.margin = '10px 0'; // 添加外边距
      return { dom };
    };
  },
});

export default MapNode;