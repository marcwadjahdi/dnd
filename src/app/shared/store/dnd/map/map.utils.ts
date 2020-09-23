import Map from 'ol/Map';
import {layersProperties} from './map.layers';
import BaseLayer from 'ol/layer/Base';

export namespace Maps {
  export function getExtent(map: Map) {
    return map.getView().calculateExtent();
  }

  export function getLayerByTitle(map: Map, title: string): BaseLayer {
    return map.getLayers().getArray().find(it => it.get(layersProperties.title) === title);
  }
}
