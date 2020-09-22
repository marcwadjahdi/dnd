import {Component, OnDestroy, OnInit} from '@angular/core';
import Map from 'ol/Map';

import {Draw, Modify, Select, Snap} from 'ol/interaction';
import {Subscription} from 'rxjs';
import {MapService} from '../../../shared/store/dnd/map/map.service';


@Component({
  selector: 'dnd-map-tools',
  templateUrl: './map-tools.component.html',
  styleUrls: ['./map-tools.component.scss']
})
export class MapToolsComponent implements OnInit, OnDestroy {
  readonly TOOLS = {
    trash: 'trash',
    eraser: 'eraser',
    player: 'player',
    pointer: 'Point',
    line: 'LineString',
    polygon: 'Polygon',
    circle: 'Circle',
  };

  private subscriptions: Subscription[] = [];

  /* Map */
  private map: Map;
  /* Interactions */
  private currentTool: string;
  private modify: Modify;
  private eraser: Select;
  private draw: Draw;
  private snap: Snap;

  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
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
  }

  private removeInteraction(interaction: any) {
    this.map.removeInteraction(interaction);
  }

  isCurrentTool(tool: string) {
    return this.currentTool === tool;
  }

  useEraser() {
    // this.eraser = new Select({condition: (mapBrowserEvent) => click(mapBrowserEvent)});
    // this.eraser.on('select', (features) => {
    //   let feat = features.selected;
    //   if (Array.isArray(feat) && feat.length !== 0) {
    //     feat = feat[0];
    //   }
    // if (feat) {
    //   this.vectorSource.removeFeature(feat);
    //   this.characterService.deleteById(feat.ol_uid);
    // }
    // });
    // this.map.addInteraction(this.eraser);
  }

  useDrawTool(tool: string) {
    // this.draw = new Draw({source: this.vectorSource, type: tool});
    // this.map.addInteraction(this.draw);
  }

  useCharacterTool() {
    // this.draw = new Draw({source: this.vectorSource, type: this.TOOLS.pointer});
    // this.draw.on('drawend', eventDraw => {
    //   this.selectedFeature = eventDraw.feature;
    //   this.collapsed = false;
    // });
    // this.map.addInteraction(this.draw);
  }

  private addModify() {
    // this.modify = new Modify({source: this.vectorSource});
    // this.map.addInteraction(this.modify);
  }

  private addSnap() {
    // this.snap = new Snap({source: this.vectorSource});
    // this.map.addInteraction(this.snap);
  }

  trashAll() {
    // this.vectorSource.clear();
    // this.characterService.deleteAll();
  }
}
