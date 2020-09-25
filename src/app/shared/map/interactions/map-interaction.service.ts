import {Injectable} from '@angular/core';

import Map from 'ol/Map';
import {Draw, Modify, Select, Snap} from 'ol/interaction';
import {LayersConfigs} from '../map.layers';
import {Maps} from '../map.utils';
import GeometryType from 'ol/geom/GeometryType';
import VectorLayer from 'ol/layer/Vector';
import {click} from 'ol/events/condition';
import Transform from 'ol-ext/interaction/Transform';

@Injectable({
  providedIn: 'root',
})
export class MapInteractionService {

  map: Map;

  characters: {
    snap: Snap;
    modify: Modify;
  } = {snap: null, modify: null};
  environment: {
    edit: Transform;
    draw: Draw;
    eraser: Select;
  } = {edit: null, draw: null, eraser: null};

  constructor() {
  }

  initialize(map: Map) {
    this.map = map;

    this.initCharactersInteractions();
    this.initEnvironmentInteractions();
    this.deactivateInteractions();
    this.activateCharactersInteractions();
  }

  initCharactersInteractions() {
    const layer = Maps.getLayerByTitle(this.map, LayersConfigs.characters.title) as VectorLayer;
    const source = layer.getSource();

    this.characters.snap = this.addInteraction(new Snap({source}));
    this.characters.modify = this.addInteraction(new Modify({source}));
  }

  initEnvironmentInteractions() {
    const layer = Maps.getLayerByTitle(this.map, LayersConfigs.environment.title) as VectorLayer;
    const source = layer.getSource();

    this.environment.edit = new Transform({
      enableRotatedTransform: true,
      layers: [layer],
      hitTolerance: 2,
      translateFeature: true,
      scale: true,
      rotate: true,
      keepAspectRatio: (evt) => true,
      translate: true,
      stretch: true
    });

    this.environment.eraser = new Select({
      layers: [layer],
      condition: (mapBrowserEvent) => click(mapBrowserEvent),
    });
    this.environment.eraser.on('select', event => {
      if (event.selected && event.selected.length !== 0) {
        event.selected.forEach(feature => {
          source.removeFeature(feature);
        });
      }
    });
    this.map.addInteraction(this.environment.eraser);
  }


  addInteraction(interaction) {
    if (interaction) {
      this.map.addInteraction(interaction);
    }
    return interaction;
  }

  removeInteraction(interaction) {
    if (interaction) {
      this.map.removeInteraction(interaction);
    }
  }

  deactivateInteractions() {
    [this.characters, this.environment].forEach(o => {
      Object.keys(o).forEach(k => {
        this.removeInteraction(o[k]);
      });
    });
  }

  activateCharactersInteractions() {
    Object.keys(this.characters).forEach(k => {
      this.addInteraction(this.characters[k]);
    });
  }

  edit() {
    this.addInteraction(this.environment.edit);
  }

  eraser() {
    this.addInteraction(this.environment.eraser);
  }

  draw(type: GeometryType) {
    this.environment.draw = this.addInteraction(new Draw({source: this.getEnvLayer().getSource(), type}));
  }

  deleteAllEnvironment() {
    this.getEnvLayer().getSource().clear();
  }

  private getEnvLayer() {
    return (Maps.getLayerByTitle(this.map, LayersConfigs.environment.title) as VectorLayer);
  }
}
