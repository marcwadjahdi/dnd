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
import {ModifyEvent} from 'ol/interaction/Modify';
import newImageSource = Maps.Layers.newImageSource;
import getBasemapLayer = Maps.Layers.getBasemapLayer;
import getEnvironmentLayer = Maps.Layers.getEnvironmentLayer;
import getCharacterLayer = Maps.Layers.getCharacterLayer;
import getGridLayer = Maps.Layers.getGridLayer;


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
    this.interactions.characters.modify.on('modifyend', (evt: ModifyEvent) => {
      this.map.getFeaturesAtPixel(evt.mapBrowserEvent.pixel).forEach(feature => {
        const character = feature.getProperties()?.character;
        if (!!character) {
          const position = (feature.getGeometry() as Point)?.getCoordinates();
          this.battleFacade.editCharacter(character.id, {position});
        }
      });
    });
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

  addCharacters(characters: BattleCharacter[]) {
    if (characters) {
      characters.forEach(this.addCharacter, this);
    }
  }

  addCharacter(character: BattleCharacter) {
    if (!character) {
      return;
    }
    const feature = new Feature({
      geometry: new Point(character.position),
      name: character.name,
      character,
    });
    feature.setStyle(Maps.Styles.fronCharacter(this.map.getView()));
    feature.setId(character.id);
    this.getCharSource().addFeature(feature);
  }

  renderCharacter(character: BattleCharacter) {
    this.getCharSource().getFeatures().find(it => it.getId() === character.id).setProperties({character});
    getCharacterLayer(this.map).changed();
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

  getMap(): Map {
    return this.map;
  }

  getEnvSource() {
    return getEnvironmentLayer(this.map).getSource();
  }


  /* Utils */

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

  private getCharSource() {
    return getCharacterLayer(this.map).getSource();
  }
}
