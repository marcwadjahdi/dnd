import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import {Group as GrouLayer} from 'ol/layer';
import {EXTENT, PROJECTION} from './map.constants';


const prefix = '/assets/map/layers/';
const maps = [
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

const toLayerName
const toImageLayer = (url: string) => new ImageLayer({
  title: url.split('/').reverse().shift().,
  source: new Static({
    url,
    projection: PROJECTION,
    imageExtent: EXTENT
  }),
});
const toGroupLayer = (title: string, layers: any[]) => new GrouLayer({
  openInLayerSwitcher: true,
  title,
  layers,
});



maps.map()

function basemapName(b: any) {
  return b
    .replace('/assets/layers', '')
    .replace('.jpg', '')
    .replace('.png', '')
    .split('/')
    .filter(it => !!it)
    .map(it => `${it[0].toUpperCase()}${it.substr(1).toLocaleLowerCase()}`)
    .join(' ');
};


export const BASEMAPS = new GrouLayer({
  title: 'Basemaps',
  layers: [
    toImageLayer('blank.png')
  ],
});

