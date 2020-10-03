import {Injectable} from '@angular/core';

import Map from 'ol/Map';
import {Maps} from './maps';
import {Draw, Modify, Select, Snap} from 'ol/interaction';
import {Transform} from 'ol/transform';
import GeometryType from 'ol/geom/GeometryType';
import {BattleCharacter} from '../dnd/battle/battle';
import Feature from 'ol/Feature';
import {Point} from 'ol/geom';
import {BattleFacade} from '../store/dnd/battle/battle.facade';
import newImageSource = Maps.Layers.newImageSource;
import getBasemapLayer = Maps.Layers.getBasemapLayer;
import getEnvironmentLayer = Maps.Layers.getEnvironmentLayer;
import getCharacterLayer = Maps.Layers.getCharacterLayer;
import getGridLayer = Maps.Layers.getGridLayer;
import battleZoom = Maps.battleZoom;
import minZoom = Maps.minZoom;
import maxZoom = Maps.maxZoom;


@Injectable({
  providedIn: 'root',
})
export class MapService {
  private readonly gridOpacity = 0.9;
  private readonly gridHidden = 0;

  private map: Map;
  private interactions: {
    characters: {
      snap: Snap;
      modify: Modify;
    };
    environment: {
      edit: Transform;
      draw: Draw;
      eraser: Select;
    };
  };

  constructor(private battleFacade: BattleFacade) {
  }

  initialize() {
    Object.assign(this, Maps.Initializer.initialize());
    this.battleFacade.sync();
  }

  /* Layers */

  changeBasemap(url: string) {
    getBasemapLayer(this.map).setSource(newImageSource({
      url,
    }));
  }

  showGrid() {
    getGridLayer(this.map).setOpacity(this.gridOpacity);
  }

  hideGrid() {
    getGridLayer(this.map).setOpacity(this.gridHidden);
  }

  addCharacter(character: BattleCharacter) {
    const feature = new Feature({
      geometry: new Point(character.position),
      name: character.name,
    });
    feature.setStyle(Maps.Styles.fronCharacter(character));
    feature.setId(character.id);
    this.getCharSource().addFeature(feature);
  }

  characterPosition(id: number) {
    return (this.getCharSource().getFeatures().find(it => it.getId() === id)?.getGeometry() as Point)?.getCoordinates();
  }

  environment() {
    return this.getEnvSource().getFeatures().map(it => it.getGeometry());
  }

  /* Interactions */

  activateCharactersInteractions() {
    this.addInteractions(Object.values(this.interactions.characters));
  }

  deactivateInteractions() {
    this.removeInteractions(Object.values(this.interactions.characters));
    this.removeInteractions(Object.values(this.interactions.environment));
  }

  draw(type: GeometryType) {
    this.interactions.environment.draw = this.addInteraction(new Draw({source: this.getEnvSource(), type}));
  }

  edit() {
    this.addInteraction(this.interactions.environment.edit);
  }

  eraser() {
    this.addInteraction(this.interactions.environment.eraser);
  }

  deleteAllEnvironment() {
    this.getEnvSource().clear();
  }

  deleteAll() {
    this.getCharSource().clear();
    this.getEnvSource().clear();
  }

  private addInteractions(interactions: any[]) {
    interactions.forEach(this.addInteraction, this);
  }

  private addInteraction(interaction) {
    if (interaction) {
      this.map.addInteraction(interaction);
    }
    return interaction;
  }

  private removeInteractions(interactions: any[]) {
    interactions.forEach(this.removeInteraction, this);
  }

  private removeInteraction(interaction) {
    if (interaction) {
      this.map.removeInteraction(interaction);
    }
  }

  /* Utils */

  getMap(): Map {
    return this.map;
  }

  private getCharSource() {
    return getCharacterLayer(this.map).getSource();
  }

  getEnvSource() {
    return getEnvironmentLayer(this.map).getSource();
  }

  setBattleZooms() {
    this.map.getView().setMinZoom(battleZoom);
    this.map.getView().setMaxZoom(battleZoom);
  }

  setDefaultZooms() {
    this.map.getView().setMinZoom(minZoom);
    this.map.getView().setMaxZoom(maxZoom);
  }
}
