import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapInteractionService} from 'src/app/shared/map/interactions/map-interaction.service';
import {Maps} from 'src/app/shared/map/maps';


@Component({
  selector: 'dnd-map-tools',
  templateUrl: './map-tools.component.html',
  styleUrls: ['./map-tools.component.scss']
})
export class MapToolsComponent implements OnInit, OnDestroy {

  readonly Tools = Maps.Tools;

  private currentTool: string;

  constructor(private interactions: MapInteractionService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  useTool(tool: string) {
    this.interactions.deactivateInteractions();
    this.currentTool = this.isCurrentTool(tool) ? null : tool;
    if (!this.currentTool) {
      this.interactions.activateCharactersInteractions();
      return;
    }
    switch (tool) {
      case this.Tools.point:
      case this.Tools.line:
      case this.Tools.polygon:
      case this.Tools.circle:
        this.interactions.draw(tool);
        break;
      case this.Tools.edit :
        this.interactions.edit();
        break;
      case this.Tools.eraser :
        this.interactions.eraser();
        break;
      case this.Tools.trash:
        this.interactions.deleteAllEnvironment();
        this.currentTool = null;
        break;
    }
  }

  isCurrentTool(tool: string) {
    return this.currentTool === tool;
  }
}
