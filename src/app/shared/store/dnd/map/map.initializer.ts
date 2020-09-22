import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import {getCenter} from 'ol/extent';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';

import {battleMapID, extent, maxZoom, minZoom, projection} from './map.constants';
import {basemaps, blank, layersIndex, toImageLayer} from './map.layers';
import {STYLES} from './map.styles';

export namespace MapInitializer {

  function createBasemapLayer() {
    return toImageLayer('Basemap', basemaps[0], layersIndex.basemap);
  }

  function createGridLayer() {
    return toImageLayer('Hex Grid', blank, layersIndex.grid);
  }

  function createEnvironmentLayer() {
    return new VectorLayer({
      title: 'Environment',
      source: new VectorSource(),
      style: (feature: Feature, resolution) => STYLES[feature.getGeometry().getType()],
      zIndex: layersIndex.environment,
    });
  }

  function createCharacterLayer() {
    return new VectorLayer({
      title: 'Characters',
      source: new VectorSource(),
      zIndex: layersIndex.characters,
    });
  }

  export function initialize() {
    const basemapLayer = createBasemapLayer();
    const gridLayer = createGridLayer();
    const environmentLayer = createEnvironmentLayer();
    const characterLayer = createCharacterLayer();
    const map = new Map({
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
        zoom: maxZoom,
        minZoom,
        maxZoom,
      }),
      controls:[],
    });

    return {
      map,
      basemapLayer,
      environmentLayer,
      characterLayer,
    };
  }
}
