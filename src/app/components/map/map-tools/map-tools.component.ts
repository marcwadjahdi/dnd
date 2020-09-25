import {Component, OnDestroy, OnInit} from '@angular/core';
import {TOOLS} from 'src/app/shared/map/map.tools';
import {MapInteractionService} from 'src/app/shared/map/interactions/map-interaction.service';


@Component({
  selector: 'dnd-map-tools',
  templateUrl: './map-tools.component.html',
  styleUrls: ['./map-tools.component.scss']
})
export class MapToolsComponent implements OnInit, OnDestroy {
  readonly tools = TOOLS;

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
      case TOOLS.point:
      case TOOLS.line:
      case TOOLS.polygon:
      case TOOLS.circle:
        this.interactions.draw(tool);
        break;
      case TOOLS.edit :
        this.interactions.edit();
        break;
      case TOOLS.eraser :
        this.interactions.eraser();
        break;
      case TOOLS.trash:
        this.interactions.deleteAllEnvironment();
        this.currentTool = null;
        break;
    }
  }

  isCurrentTool(tool: string) {
    return this.currentTool === tool;
  }
}
