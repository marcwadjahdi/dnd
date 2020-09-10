import {Component, OnInit} from '@angular/core';

import * as $ from 'jquery';
import Map from 'ol/Map';
import View from 'ol/View';
import {getCenter} from 'ol/extent';
import {click} from 'ol/events/condition';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';

import {Draw, Modify, Select, Snap} from 'ol/interaction';
import {Vector as VectorSource} from 'ol/source';
import {Group as GrouLayer, Vector as VectorLayer} from 'ol/layer';
import {BASEMAPS, buildBasemapsLayer} from '../../shared/dnd/map/map.layers';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {STYLES} from './styles';
import {EXTENT, LAYER_PATH_PREFIX, PROJECTION, ZOOM_MAX, ZOOM_MIN} from '../../shared/dnd/map/map.constants';
import {Character} from 'src/app/shared/dnd/character/common/character.model';
import {CharacterService} from 'src/app/shared/dnd/character/common/character.service';
import {CharacterType} from 'src/app/shared/dnd/character/common/character-types';


const BATTLE_MAP_ID = 'battle_map';

@Component({
  selector: 'dnd-home',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss', './layer-switcher.scss']
})
export class MapComponent implements OnInit {
  readonly CLASS_IMAGE_PH = 'PLAYER_CLASS';
  readonly CLASS_IMAGE_PATH = `/assets/images/class/${this.CLASS_IMAGE_PH}.png`;

  readonly BASEMAP_INDEX = 1;
  readonly VECTOR_INDEX = 5;

  readonly TOOLS = {
    eraser: 'eraser',
    select: 'select',
    player: 'player',
    pointer: 'Point',
    line: 'LineString',
    polygon: 'Polygon',
    circle: 'Circle',
  };

  readonly baseMaps = BASEMAPS;

  /* Map */
  private map: Map;
  /* Layers */
  basemap = LAYER_PATH_PREFIX + BASEMAPS[0];
  private basemapLayer: GrouLayer;
  private vectorSource: VectorSource;
  private vectorLayer: VectorLayer;
  /* Interactions */
  private currentTool: string;
  private modify: Modify;
  private eraser: Select;
  private select: Select;
  private draw: Draw;
  private snap: Snap;
  collapsed = false;

  /* Character Creation */
  private selectedFeature: any;
  selectedCharacter: Character;

  constructor(private characterService: CharacterService) {
  }

  ngOnInit(): void {
    this.basemapLayer = buildBasemapsLayer();
    this.buildDrawLayer();
    this.buildMap();
    this.addLayerSwitcher();
  }

  private buildDrawLayer() {
    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      title: 'Characters',
      source: this.vectorSource,
      style: this.getStyle(),
      zIndex: this.VECTOR_INDEX,
    });
  }

  private buildMap() {
    this.map = new Map({
      target: BATTLE_MAP_ID,
      layers: [
        this.basemapLayer,
        this.vectorLayer,
      ],
      view: new View({
        projection: PROJECTION,
        center: getCenter(EXTENT),
        zoom: ZOOM_MAX,
        minZoom: ZOOM_MIN,
        maxZoom: ZOOM_MAX,
      }),
      controls: []
    });
  }

  private getStyle() {
    return (feature, resolution) => {
      feature.setStyle(STYLES[this.currentTool]);
      return [];
    };
  }

  useTool(tool: string) {
    this.removeInteractions();
    this.selectedFeature = undefined;
    this.selectedCharacter = undefined;
    this.currentTool = this.isCurrentTool(tool) ? null : tool;
    if (!this.currentTool) {
      this.addSnap();
      this.addModify();
      return;
    }
    switch (tool) {
      case this.TOOLS.eraser :
        this.useEraser();
        break;
      case this.TOOLS.select :
        this.useSelect();
        break;
      case this.TOOLS.player:
        this.useCharacterTool();
        break;
      case this.TOOLS.pointer:
      case this.TOOLS.line:
      case this.TOOLS.polygon:
      case this.TOOLS.circle:
        this.addSnap();
        this.addModify();
        this.useDrawTool(tool);
        break;
    }
  }

  private removeInteractions() {
    this.removeInteraction(this.draw);
    this.removeInteraction(this.snap);
    this.removeInteraction(this.modify);
    this.removeInteraction(this.eraser);
    this.removeInteraction(this.select);
  }

  private removeInteraction(interaction: any) {
    if (interaction) {
      this.map.removeInteraction(interaction);
    }
  }

  isCurrentTool(tool: string) {
    return this.currentTool === tool;
  }

  useEraser() {
    this.eraser = new Select({condition: (mapBrowserEvent) => click(mapBrowserEvent)});
    this.eraser.on('select', (features) => {
      let feat = features.selected;
      if (Array.isArray(feat) && feat.length !== 0) {
        feat = feat[0];
      }
      if (feat) {
        this.vectorSource.removeFeature(feat);
      }
    });
    this.map.addInteraction(this.eraser);
  }

  useSelect() {
    this.select = new Select({condition: (mapBrowserEvent) => click(mapBrowserEvent)});
    this.select.on('select', (event) => {
      event.stopPropagation();
      this.openOrCloseEditCharacter(event);
    });
    this.map.addInteraction(this.select);
  }

  openOrCloseEditCharacter(event) {
    if (Array.isArray(event.selected) && event.selected.length) {
      const selected = event.selected[0];
      const character = this.characterService.get(selected.ol_uid);
      if (character && character.type === CharacterType.NPC) {
        this.collapsed = false;
        this.selectedFeature = selected;
        this.selectedCharacter = character;
      } else {
        this.selectedFeature = undefined;
        this.selectedCharacter = undefined;
        this.select.getFeatures().clear();
      }
    }
  }

  useDrawTool(tool: string) {
    this.draw = new Draw({source: this.vectorSource, type: tool});
    this.map.addInteraction(this.draw);
  }

  useCharacterTool() {
    this.draw = new Draw({source: this.vectorSource, type: this.TOOLS.pointer});
    this.draw.on('drawend', eventDraw => {
      this.selectedFeature = eventDraw.feature;
      this.collapsed = false;
    });
    this.map.addInteraction(this.draw);
  }

  createOrEditFeatureCharacter(character: Character) {
    this.selectedFeature.setStyle((feat) => {
      character = this.characterService.get(feat.ol_uid);
      return [new Style({
        image: this.getIconByTypeCharacter(character),
        text: new Text({
          font: '14px Calibri,sans-serif',
          fill: new Fill({color: '#000000'}),
          stroke: new Stroke({
            color: '#fff', width: 2
          }),
          offsetX: 0,
          offsetY: 40,
          textBaseline: 'bottom',
          text: character.name
        })
      })];
    });
    if (!character.id) {
      character.id = this.selectedFeature.ol_uid;
    }
    this.characterService.save(character);
    this.selectedFeature = undefined;
    this.selectedCharacter = undefined;
  }

  getIconByTypeCharacter(character: Character) {
    if (character.type === CharacterType.NPC) {
      return character.hostile ? STYLES.hostileNPC : STYLES.friendlyNPC;
    }
    if (character.type === CharacterType.Player) {
      const src = this.CLASS_IMAGE_PATH.replace(this.CLASS_IMAGE_PH, character.characterClass.name.toLocaleLowerCase());
      return new Icon({
        offset: [-44, -44],
        size: [220, 220],
        scale: 0.30,
        src,
      });
    }
    throw new Error('Impossible to identify character type');
  }

  private addModify() {
    this.modify = new Modify({source: this.vectorSource});
    this.map.addInteraction(this.modify);
  }

  private addSnap() {
    this.snap = new Snap({source: this.vectorSource});
    this.map.addInteraction(this.snap);
  }

  expandOrCollapse() {
    this.collapsed = !this.collapsed;
  }

  collapsingIcon = () => this.collapsed ? 'caret-left' : 'caret-right';

  addLayerSwitcher() {
    this.map.addControl(new LayerSwitcher({
      target: $('.layer-switcher').get(0),
      show_progress: true,
      extent: true,
      trash: true,
    }));
  }

  isFeatureSelected() {
    return !!this.selectedFeature;
  }
}
