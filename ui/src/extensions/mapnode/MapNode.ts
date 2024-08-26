import { Node, mergeAttributes } from"@halo-dev/richtext-editor";

export const MapNode = Node.create({
  name: 'map',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      latitude: {
        default: 0,
      },
      longitude: {
        default: 0,
      },
      zoom: {
        default: 10,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="map"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'map' }, HTMLAttributes), '地图'];
  },

  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('div');
      dom.innerText = `地图: 纬度 ${node.attrs.latitude}, 经度 ${node.attrs.longitude}, 缩放级别 ${node.attrs.zoom}`;
      return {
        dom,
      };
    };
  },
});
