import {extent, projection} from './map.constants';

import {Vector as VectorLayer} from 'ol/layer';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';

export const layersIndex = {
  basemap: 1,
  grid: 2,
  environment: 3,
  characters: 4,
};

export const layerPathPrefix = '/assets/map/layers/';

export const basemaps = [
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
  'magamar/angmar/passage/passage.png',
];

export const blank = 'blank.png';

function toUrlLayer(url) {
  return `${layerPathPrefix}${url}`;
}

export function toImageLayer(title, url, zIndex): ImageLayer {
  return new ImageLayer({
    title,
    source: new Static({
      url: toUrlLayer(url),
      projection,
      imageExtent: extent,
    }),
    zIndex,
  });
}
