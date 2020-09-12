import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import {Group as GrouLayer} from 'ol/layer';
import {EXTENT, LAYER_PATH_PREFIX, PROJECTION} from './map.constants';

function toUrlLayer(url) {
  return `${LAYER_PATH_PREFIX}${url}`;
}

function toTitle(file) {
  return file.split('.').shift().split('_').map(it => `${it[0].toUpperCase()}${it.substr(1).toLocaleLowerCase()}`).join(' ');
}

function toGroupeLayer(title: string) {
  return new GrouLayer({title, layers: []});
}

export function toImageLayer({title, url, zIndex}): ImageLayer {
  return new ImageLayer({
    title,
    source: new Static({
      url: toUrlLayer(url),
      projection: PROJECTION,
      imageExtent: EXTENT,
    }),
    zIndex,
  });
}

function findLayerByTitle(group, title) {
  return group.getLayers().getArray().find(it => it.get('title') === title);
}

function addToGroupLayer(group, layer) {
  group.getLayers().extend([layer]);
}

const files = [
  'magamar/angmar/keep/lvl_0.jpg',
  'magamar/angmar/keep/lvl_1.jpg',
  'magamar/angmar/mines/mine_101.png',
  'magamar/angmar/mines/mine_201.png',
  'magamar/angmar/mines/mine_202.png',
  'magamar/angmar/mines/mine_301.png',
  'magamar/angmar/mines/mine_302.png',
  'magamar/angmar/mines/mine_401.png',
  'magamar/angmar/mines/mine_501.png',
  'magamar/angmar/passage/passage.png',
  'magamar/area.jpg',
  'Irrandia.png',
  'blank.png',
];
//
// export function buildBasemapsLayerTree() {
//   if (!Array.isArray(files)) {
//     return {};
//   }
//
//   const layerTree = new GrouLayer({
//     title: 'Basemaps',
//     layers: [],
//   });
//
//   function mergeInTree(groupLayer, path, layer) {
//     if (path.length === 0) {
//       return addToGroupLayer(groupLayer, layer);
//     }
//
//     const newPath = [...path];
//     const currentGroupTitle = toTitle(newPath.shift());
//
//     let currentGroupLayer = findLayerByTitle(groupLayer, currentGroupTitle);
//     if (!currentGroupLayer) {
//       currentGroupLayer = toGroupeLayer(currentGroupTitle);
//       addToGroupLayer(groupLayer, currentGroupLayer);
//     }
//     mergeInTree(currentGroupLayer, newPath, layer);
//   }
//
//   files.forEach(url => {
//     const path = url.split('/');
//     const title = toTitle(path.pop());
//     const layer = toImageLayer({url, title});
//
//     mergeInTree(layerTree, path, layer);
//   });
//
//   return layerTree;
// }

export const BASEMAPS = [
  'blank.png',
  'Irrandia.png',
  'magamar/area.jpg',
  'magamar/angmar/keep/lvl_0.jpg',
  'magamar/angmar/keep/lvl_1.jpg',
  'magamar/angmar/mines/mine_101.png',
  'magamar/angmar/mines/mine_201.png',
  'magamar/angmar/mines/mine_202.png',
  'magamar/angmar/mines/mine_301.png',
  'magamar/angmar/mines/mine_302.png',
  'magamar/angmar/mines/mine_401.png',
  'magamar/angmar/mines/mine_501.png',
  'magamar/angmar/passage/passage.jpg',
];


