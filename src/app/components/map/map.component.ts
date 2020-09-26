import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from 'src/app/shared/map/map.service';
import {MapInteractionService} from '../../shared/map/interactions/map-interaction.service';


@Component({
  selector: 'dnd-home',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  constructor(private mapService: MapService, private mapInteractionService: MapInteractionService) {
  }

  ngOnInit(): void {
    this.mapService.initialize();
    this.mapInteractionService.initialize(this.mapService.getMap());
  }

  ngOnDestroy(): void {
  }

}
