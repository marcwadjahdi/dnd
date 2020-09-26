import Map from 'ol/Map';
import View from 'ol/View';
import Projection from 'ol/proj/Projection';
import {Extent, getCenter} from 'ol/extent';
import Feature from 'ol/Feature';
import GeometryType from 'ol/geom/GeometryType';
import BaseLayer from 'ol/layer/Base';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';


export namespace Maps {

  export const battleMapID = 'battle_map';

  export const extent: Extent = [0, 0, 1920, 1920];

  export const projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent,
  });

  export const minZoom = 1;
  export const maxZoom = 8;

  export function getExtent(map: Map) {
    return map.getView().calculateExtent();
  }

  export namespace Tools {
    export const edit = 'edit';
    export const trash = 'trash';
    export const eraser = 'eraser';
    export const point = GeometryType.POINT;
    export const line = GeometryType.LINE_STRING;
    export const polygon = GeometryType.POLYGON;
    export const circle = GeometryType.CIRCLE;
  }

  export namespace Layers {

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

    export const BasemapStore = Basemaps.map(id => Object.assign({}, {id, label: basemapName(id)}));

    export const HexGridImage = 'grid.png';

    export const pathPrefix = '/assets/map/layers/';

    export const properties = {
      title: 'title',
    };

    export const config = {
      basemap: {title: 'Basemap', zIndex: 1},
      environment: {title: 'Environment', zIndex: 2},
      hexGrid: {title: 'Hex Grid', zIndex: 3},
      characters: {title: 'Characters', zIndex: 4},
    };

    function toUrlLayer(url) {
      return `${pathPrefix}${url}`;
    }

    export function getLayerByTitle(map: Map, title: string): BaseLayer {
      return map.getLayers().getArray().find(it => it.get(Layers.properties.title) === title);
    }

    export function newImageSource(conf: { url: string, extent?: Extent }) {
      return new Static({
        url: toUrlLayer(conf.url),
        projection,
        imageExtent: conf.extent || Maps.extent,
      });
    }

    export function basemapName(b: string) {
      return b
        .replace('/assets/layers', '')
        .split('.')[0]
        .split('/')
        .filter(it => !!it)
        .map(it => `${it[0].toUpperCase()}${it.substr(1).toLocaleLowerCase()}`)
        .join(' ');
    }
  }

  export namespace Styles {
    const defaultPointRadius = 15;
    const defaultFill = '#cccccc99';
    const defaultStroke = '#ffcc33';

    export const friendlyNPC = new CircleStyle({
      radius: defaultPointRadius,
      fill: new Fill({color: '#33ff3333'}),
      stroke: new Stroke({color: '#33ff33', width: 2})
    });

    export const hostileNPC = new CircleStyle({
      radius: defaultPointRadius,
      fill: new Fill({color: '#ff333333'}),
      stroke: new Stroke({color: '#ff3333', width: 2})
    });

    export const Point = new Style({
      image: new CircleStyle({
        radius: defaultPointRadius,
        fill: new Fill({color: defaultFill}),
        stroke: new Stroke({color: defaultStroke, width: 2})
      })
    });
    export const LineString = new Style({
      fill: new Fill({color: defaultFill}),
      stroke: new Stroke({color: defaultStroke, width: 2}),
    });

    export const Polygon = new Style({
      fill: new Fill({color: defaultFill}),
      stroke: new Stroke({color: defaultStroke, width: 2}),
    });

    export const Circle = new Style({
      fill: new Fill({color: defaultFill}),
      stroke: new Stroke({color: defaultStroke, width: 2}),
    });
  }

  export namespace Initializer {
    function createBasemapLayer() {
      return new ImageLayer({
        source: Layers.newImageSource({url: Layers.Basemaps[0]}),
        ...Layers.config.basemap
      });
    }

    function createGridLayer() {
      return new ImageLayer({
        source: Layers.newImageSource({url: Layers.HexGridImage}),
        ...Layers.config.hexGrid
      });
    }

    function createEnvironmentLayer() {
      return new VectorLayer({
        source: new VectorSource(),
        style: (feature: Feature, resolution) => Styles[feature.getGeometry().getType()],
        ...Layers.config.environment,
      });
    }

    function createCharacterLayer() {
      return new VectorLayer({
        source: new VectorSource(),
        ...Layers.config.characters,
      });
    }

    export function initialize() {
      const basemapLayer = createBasemapLayer();
      const gridLayer = createGridLayer();
      const environmentLayer = createEnvironmentLayer();
      const characterLayer = createCharacterLayer();

      return new Map({
        target: battleMapID,
        layers: [
          basemapLayer,
          gridLayer,
          environmentLayer,
          characterLayer,
        ],
        view: new View({
          projection,
          center: getCenter(extent),
          zoom: maxZoom / 2,
          minZoom,
          maxZoom,
        }),
        controls: [],
      });
    }
  }
}
