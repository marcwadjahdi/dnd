import {Injectable} from '@angular/core';

import Map from 'ol/Map';
import {Maps} from './maps';
import ImageLayer from 'ol/layer/Image';
import newImageSource = Maps.Layers.newImageSource;
import getLayerByTitle = Maps.Layers.getLayerByTitle;


@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: Map;

  constructor() {
  }

  initialize() {
    this.map = Maps.Initializer.initialize();
  }

  changeBasemap(url: string) {
    this.getBasemapLayer().setSource(newImageSource({
      url,
    }));
  }

  /* Utils */

  getMap(): Map {
    return this.map;
  }

  getBasemapLayer() {
    return getLayerByTitle(this.map, Maps.Layers.config.basemap.title) as ImageLayer;
  }
}
