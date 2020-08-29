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
import {BATTLE_MAPS} from './maps';
import {STYLES} from './styles';

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

  readonly baseMaps = BATTLE_MAPS;

  /* Map */
  private map: Map;
  /* Layers */
  basemap: string;
  private basemapLayer: ImageLayer;
  private vectorSource: VectorSource;
  private vectorLayer: VectorLayer;
  /* Interactions */
  private currentTool: string;
  private modify: Modify;
  private eraser: Select;
  private draw: Draw;
  private snap: Snap;

  constructor() {
  }

  ngOnInit(): void {
    this.buildDrawLayer();
    this.buildMap();
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

}
