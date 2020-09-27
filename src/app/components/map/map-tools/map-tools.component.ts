import {Component, OnDestroy, OnInit} from '@angular/core';
import {Maps} from 'src/app/shared/map/maps';
import {MapService} from 'src/app/shared/map/map.service';


@Component({
  selector: 'dnd-map-tools',
  templateUrl: './map-tools.component.html',
  styleUrls: ['./map-tools.component.scss']
})
export class MapToolsComponent implements OnInit, OnDestroy {

  readonly Tools = Maps.Tools;

  private currentTool: string;

  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  useTool(tool: string) {
    this.mapService.deactivateInteractions();
    this.currentTool = this.isCurrentTool(tool) ? null : tool;
    if (!this.currentTool) {
      this.mapService.activateCharactersInteractions();
      return;
    }
    switch (tool) {
      case this.Tools.point:
      case this.Tools.line:
      case this.Tools.polygon:
      case this.Tools.circle:
        this.mapService.draw(tool);
        break;
      case this.Tools.edit :
        this.mapService.edit();
        break;
      case this.Tools.eraser :
        this.mapService.eraser();
        break;
      case this.Tools.trash:
        this.mapService.deleteAllEnvironment();
        this.currentTool = null;
        this.mapService.activateCharactersInteractions();
        break;
    }
  }

  isCurrentTool(tool: string) {
    return this.currentTool === tool;
  }
}
