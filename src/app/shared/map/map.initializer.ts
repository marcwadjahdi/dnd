import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import {getCenter} from 'ol/extent';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';

import {battleMapID, extent, maxZoom, minZoom, projection} from './map.constants';
import {Basemaps, HexGridImage, LayersConfigs, newImageSource} from './map.layers';
import {STYLES} from './map.styles';
import ImageLayer from 'ol/layer/Image';

export namespace MapInitializer {
  function createBasemapLayer() {
    return new ImageLayer({
      source: newImageSource({url: Basemaps[0]}),
      ...LayersConfigs.basemap
    });
  }

  function createGridLayer() {
    return new ImageLayer({
      source: newImageSource({url: HexGridImage}),
      ...LayersConfigs.hexGrid
    });
  }

  function createEnvironmentLayer() {
    return new VectorLayer({
      source: new VectorSource(),
      style: (feature: Feature, resolution) => STYLES[feature.getGeometry().getType()],
      ...LayersConfigs.environment,
    });
  }

  function createCharacterLayer() {
    return new VectorLayer({
      source: new VectorSource(),
      ...LayersConfigs.characters,
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
        zoom: maxZoom / 2,
        minZoom,
        maxZoom,
      }),
      controls: [],
    });

    return map;
  }
}
