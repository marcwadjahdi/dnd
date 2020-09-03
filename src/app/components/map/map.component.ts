import {Component, OnInit, ViewChild} from '@angular/core';

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
import {STYLES} from './styles';
import {EXTENT, LAYER_PATH_PREFIX, PROJECTION, ZOOM_MAX, ZOOM_MIN} from '../../shared/dnd/map/map.constants';


const BATTLE_MAP_ID = 'battle_map';

@Component({
  selector: 'dnd-home',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss', './layer-switcher.scss']
})
export class MapComponent implements OnInit {
  readonly BASEMAP_INDEX = 1;
  readonly VECTOR_INDEX = 5;
  readonly TOOLS = {
    eraser: 'eraser',
    player: 'player',
    monster: 'monster',
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
  private draw: Draw;
  private snap: Snap;
  collapsed = false; // TODO go back to default true;

  constructor() {
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
      case this.TOOLS.player:
      case this.TOOLS.monster:
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
    this.eraser = new Select({
      condition: (mapBrowserEvent) => click(mapBrowserEvent),
    });
    this.eraser.on('select', (features) => {
      let feat = features.selected;
      if (Array.isArray(feat)) {
        feat = feat[0];
      }
      this.vectorSource.removeFeature(feat);
    });
    this.map.addInteraction(this.eraser);
  }

  useDrawTool(tool: string) {
    if (!tool) {
      return;
    }

    let geometry = tool;
    if (tool === this.TOOLS.monster || tool === this.TOOLS.player) {
      geometry = this.TOOLS.pointer;
    }

    this.draw = new Draw({source: this.vectorSource, type: geometry});
    this.map.addInteraction(this.draw);
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

  collapsingIcon = () => this.collapsed ? 'chevron-circle-left' : 'chevron-circle-right';

  addLayerSwitcher() {
    this.map.addControl(new LayerSwitcher({
      target: $('.layerSwitcher').get(0),
      show_progress: true,
      extent: true,
      trash: true,
    }));
  }
}
