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
import {Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text} from 'ol/style';
import {Modify, Select, Snap} from 'ol/interaction';
import Transform from 'ol-ext/interaction/Transform';
import {click} from 'ol/events/condition';
import {Characters} from '../dnd/character/characters';
import {Character} from '../dnd/character/character.model';

export namespace Maps {

  export const battleMapID = 'battle_map';
  export const battleMapHolder = 'battle_map_holder';

  export const extent: Extent = [0, 0, 1920, 1920];

  export const projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent,
  });

  export const minZoom = 1;
  export const maxZoom = 8;
  export const battleZoom = 4;

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

    function getLayerByTitle(map: Map, title: string): BaseLayer {
      return map.getLayers().getArray().find(it => it.get(Layers.properties.title) === title);
    }

    export function getBasemapLayer(map: Map) {
      return getLayerByTitle(map, config.basemap.title) as ImageLayer;
    }

    export function getGridLayer(map: Map) {
      return getLayerByTitle(map, config.hexGrid.title) as ImageLayer;
    }

    export function getCharacterLayer(map: Map) {
      return (getLayerByTitle(map, config.characters.title) as VectorLayer);
    }

    export function getEnvironmentLayer(map: Map) {
      return (getLayerByTitle(map, config.environment.title) as VectorLayer);
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
    const defaultPointRadius = 25;
    const defaultFill = '#cccccc99';
    const defaultStroke = '#ffcc33';

    const colors = {
      Barbarian: '#d48369',
      Bard: '#b087b1',
      Cleric: '#a2a3a5',
      Druid: '#889253',
      Fighter: '#6e4e43',
      Monk: '#78bcd6',
      Paladin: '#c7b47d',
      Ranger: '#2d8558',
      Rogue: '#555650',
      Sorcerer: '#cd7c7b',
      Warlock: '#7745ac',
      Wizard: '#376abc',
      FriendlyNPC: '#33ff33',
      Neutral: '#ffd333',
      HostileNPC: '#ff3333',
    };

    export function fronCharacter(character: Character) {
      const color = colors[character.characterClass.name];
      const text = new Text({
        font: '16px Calibri,sans-serif',
        fill: new Fill({color: '#000000'}),
        stroke: new Stroke({
          color: '#fff', width: 5
        }),
        offsetX: 0,
        offsetY: 0,
        textBaseline: 'bottom',
        text: character.name
      });
      const shape = new RegularShape({
        fill: new Fill({color}),
        stroke: new Stroke({color: '#000000aa', width: 2}),
        points: 6,
        radius: defaultPointRadius,
        angle: 0,
      });
      return new Style({
        image: shape,
        text,
      });
    }

    export const Point = new Style({
      image: new RegularShape({
        fill: new Fill({color: defaultFill}),
        stroke: new Stroke({color: defaultStroke, width: 2}),
        points: 6,
        radius: defaultPointRadius,
        angle: 0,
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

  export namespace Ineractions {

    export function transformInteraction(layer: VectorLayer) {
      return new Transform({
        enableRotatedTransform: true,
        layers: [layer],
        hitTolerance: 2,
        translateFeature: true,
        scale: true,
        rotate: true,
        keepAspectRatio: (evt) => true,
        translate: true,
        stretch: true,
      });
    }

    export function eraserInteraction(layer: VectorLayer) {
      const eraser = new Select({
        layers: [layer],
        condition: (mapBrowserEvent) => click(mapBrowserEvent),
      });
      eraser.on('select', event => {
        if (event.selected && event.selected.length !== 0) {
          event.selected.forEach(feature => {
            layer.getSource().removeFeature(feature);
          });
        }
      });
      return eraser;
    }
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
        opacity: 0,
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

      const characterLayer = createCharacterLayer();
      const characterSource = characterLayer.getSource();
      const charactersInteractions = {
        snap: new Snap({source: characterSource}),
        modify: new Modify({source: characterSource}),
      };

      const environmentLayer = createEnvironmentLayer();
      const environmenInteractions = {
        snap: new Snap({source: environmentLayer.getSource()}),
        edit: Maps.Ineractions.transformInteraction(environmentLayer),
        eraser: Maps.Ineractions.eraserInteraction(environmentLayer),
      };

      const map = new Map({
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
        target: battleMapHolder,
      });

      map.addInteraction(charactersInteractions.snap);
      map.addInteraction(charactersInteractions.modify);

      return {map, interactions: {characters: charactersInteractions, environment: environmenInteractions}};
    }
  }
}
