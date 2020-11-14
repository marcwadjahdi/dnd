import {Injectable} from '@angular/core';

import Map from 'ol/Map';
import {Maps} from './maps';
import {Draw, Modify, Select, Snap} from 'ol/interaction';
import Transform from 'ol-ext/interaction/Transform';
import GeometryType from 'ol/geom/GeometryType';
import {BattleCharacter, EnvironmentItem} from '../dnd/battle/battle';
import Feature from 'ol/Feature';
import {Point} from 'ol/geom';
import {BattleFacade} from '../store/dnd/battle/battle.facade';
import {ModifyEvent} from 'ol/interaction/Modify';
import {randomId} from '../dnd/common/identified';
import Polygon from 'ol/geom/Polygon';
import Circle from 'ol/geom/Circle';
import LineString from 'ol/geom/LineString';
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
    return this.getEnvSource().getFeatures().map(it => it.getGeometry()).map(geom => {
      const type = geom.getType();
      switch (type) {
        case GeometryType.CIRCLE:
          const circle = (geom as Circle);
          return {type, data: {center: circle.getCenter(), radius: circle.getRadius()}};
        case GeometryType.LINE_STRING:
          return {type, data: (geom as LineString).getCoordinates()};
        case GeometryType.POINT:
          return {type, data: (geom as Point).getCoordinates()};
        case GeometryType.POLYGON:
          return {type, data: (geom as Polygon).getCoordinates()};
        case GeometryType.MULTI_LINE_STRING:
        case GeometryType.MULTI_POINT:
        case GeometryType.MULTI_POLYGON:
        case GeometryType.LINEAR_RING:
        case GeometryType.GEOMETRY_COLLECTION:
        default:
          return {type};
          break;
      }
    });
  }

  addEnvironment(items: EnvironmentItem[] = []) {
    const envSource = this.getEnvSource();
    items
      .map(this.envItemToGeometry)
      .map(geometry => new Feature({geometry}))
      .forEach(feature => envSource.addFeature(feature));
  }

  private envItemToGeometry(item: EnvironmentItem) {
    switch (item.type) {
      case GeometryType.CIRCLE:
        return new Circle(item.data.center, item.data.radius);
      case GeometryType.LINE_STRING:
        return new LineString(item.data);
      case GeometryType.POINT:
        return new Point(item.data);
      case GeometryType.POLYGON:
        return new Polygon(item.data);
      case GeometryType.MULTI_LINE_STRING:
      case GeometryType.MULTI_POINT:
      case GeometryType.MULTI_POLYGON:
      case GeometryType.LINEAR_RING:
      case GeometryType.GEOMETRY_COLLECTION:
      default:
        return null;
    }
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
    this.interactions.environment.draw.on('drawend', (evt) => {
      evt.feature.setId(randomId());
      setTimeout(() => this.battleFacade.addFeature(evt.feature), 50);
    });
  }

  edit() {
    this.addInteraction(this.interactions.environment.edit);
    ['rotateend', 'translateend', 'scaleend'].forEach(evtName =>
      this.interactions.environment.edit.on(evtName, (evt: { feature: Feature }) => {
        setTimeout(() => this.battleFacade.editFeature(evt.feature), 50);
      })
    );

  }

  eraser() {
    this.addInteraction(this.interactions.environment.eraser);
    this.interactions.environment.eraser.on('select', (evt: any) => {
      if (evt.selected && evt.selected.length !== 0) {
        evt.selected.forEach(feature => {
          setTimeout(() => this.battleFacade.removeFeature(feature.getId()), 50);
        });
      }
    });
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
