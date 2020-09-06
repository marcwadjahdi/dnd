import {Component, OnInit} from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import Projection from 'ol/proj/Projection';
import {getCenter} from 'ol/extent';
import {click} from 'ol/events/condition';

import {Draw, Modify, Select, Snap} from 'ol/interaction';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import {Circle, Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {BATTLE_MAPS} from './maps';
import {STYLES} from './styles';
import {Character} from 'src/app/shared/dnd/character/common/character.model';
import {CharacterService} from 'src/app/shared/dnd/character/common/character.service';
import {CharacterType} from 'src/app/shared/dnd/character/common/character-types';

const EXTENT = [0, 0, 1151, 1151];
const PROJ = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: EXTENT,
});

@Component({
  selector: 'dnd-home',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
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

  readonly baseMaps = BATTLE_MAPS;

  /* Map */
  private map: Map;
  /* Layers */
  basemap = BATTLE_MAPS[0];
  private basemapLayer: ImageLayer;
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
    this.buildDrawLayer();
    this.buildMap();
    this.changeBasemap();
  }


  private buildMap() {
    this.map = new Map({
      target: 'battle_map',
      layers: [
        this.vectorLayer,
      ],
      view: new View({
        projection: PROJ,
        center: getCenter(EXTENT),
        zoom: 3.5,
        minZoom: 2,
        maxZoom: 3.5,
      }),
      controls: []
    });
  }

  private buildDrawLayer() {
    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: this.getStyle(),
      zIndex: this.VECTOR_INDEX,
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
    switch (character.type) {
      case CharacterType.Player:
        const src = this.CLASS_IMAGE_PATH.replace(this.CLASS_IMAGE_PH, character.characterClass.name.toLocaleLowerCase());
        return new Icon({
          offset: [-44, -44],
          size: [220, 220],
          scale: 0.35,
          src,
        });
      case CharacterType.NPC:
        const color = character.hostile ? {color: 'rgb(196,22,22)'} : {color: 'rgb(31,146,50)'};
        return new Circle({
          fill: new Fill(color),
          stroke: new Stroke({color: '#090f15', width: 1.25}),
          radius: 20
        });
    }
  }

  private addModify() {
    this.modify = new Modify({source: this.vectorSource});
    this.map.addInteraction(this.modify);
  }

  private addSnap() {
    this.snap = new Snap({source: this.vectorSource});
    this.map.addInteraction(this.snap);
  }

  changeBasemap() {
    if (this.basemapLayer) {
      this.map.removeLayer(this.basemapLayer);
    }
    if (!this.basemap) {
      return;
    }
    this.basemapLayer = new ImageLayer({
      source: new Static({
        url: this.basemap,
        projection: PROJ,
        imageExtent: EXTENT,
        zIndex: this.BASEMAP_INDEX
      })
    });
    this.map.addLayer(this.basemapLayer);
  }

  basemapName(b: any) {
    return b
      .replace('/assets/layers', '')
      .replace('.jpg', '')
      .replace('.png', '')
      .split('/')
      .filter(it => !!it)
      .map(it => `${it[0].toUpperCase()}${it.substr(1).toLocaleLowerCase()}`)
      .join(' ');
  }

  expandOrCollapse() {
    this.collapsed = !this.collapsed;
  }

  arrowIcon = () => this.collapsed ? 'chevron-circle-left' : 'chevron-circle-right';

  isFeatureSelected() {
    return !!this.selectedFeature;
  }
}
