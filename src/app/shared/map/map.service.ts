import {Injectable} from '@angular/core';

import Map from 'ol/Map';
import {MapInitializer} from './map.initializer';
import {LayersConfigs, newImageSource} from './map.layers';
import {Maps} from './map.utils';
import {MapInteractionService} from './interactions/map-interaction.service';
import ImageLayer from 'ol/layer/Image';
import getLayerByTitle = Maps.getLayerByTitle;


@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: Map;

  constructor(private interactions: MapInteractionService) {
  }

  initialize() {
    this.map = MapInitializer.initialize();
    this.interactions.initialize(this.map);
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
    return getLayerByTitle(this.map, LayersConfigs.basemap.title) as ImageLayer;
  }
}
