import {Injectable} from '@angular/core';

import Map from 'ol/Map';
import {Vector as VectorLayer} from 'ol/layer';
import ImageLayer from 'ol/layer/Image';
import {MapInitializer} from './map.initializer';


@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: Map;
  private basemapLayer: ImageLayer;
  private gridLayer: ImageLayer;
  private environmentLayer: VectorLayer;
  private characterLayer: VectorLayer;

  constructor() {
  }

  getMap(): Map {
    return this.map;
  }

  changeLayer(basemap: string) {

  }

  initialize() {
    if (!this.map) {
      Object.assign(this, MapInitializer.initialize());
    }
  }
}
