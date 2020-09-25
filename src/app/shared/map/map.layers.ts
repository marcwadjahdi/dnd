import {extent as DefaultExtent, projection} from './map.constants';
import Static from 'ol/source/ImageStatic';
import {Extent} from 'ol/extent';

export const layersProperties = {
  title: 'title',
};

export const LayersConfigs = {
  basemap: {title: 'Basemap', zIndex: 1},
  environment: {title: 'Environment', zIndex: 2},
  hexGrid: {title: 'Hex Grid', zIndex: 3},
  characters: {title: 'Characters', zIndex: 4},
};

export const layerPathPrefix = '/assets/map/layers/';

export const Basemaps = [
  'Irrandia.png',
  'magamar/angmar/keep/keep_catacombs.jpg',
  'magamar/angmar/keep/keep_groud_floor.jpg',
  'magamar/angmar/keep/keep_first_floor.jpg',
  'magamar/angmar/mines/west_mine.png',
  'magamar/angmar/mines/north_mine.png',
  'magamar/angmar/mines/south_east_mine.png',
  'magamar/angmar/passage/passage.png',
];

export const HexGridImage = 'grid.png';

function toUrlLayer(url) {
  return `${layerPathPrefix}${url}`;
}

export function newImageSource(conf: { url: string, extent?: Extent }) {
  return new Static({
    url: toUrlLayer(conf.url),
    projection,
    imageExtent: conf.extent || DefaultExtent,
  });
}
