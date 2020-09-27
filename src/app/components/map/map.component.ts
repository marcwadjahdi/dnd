import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {MapService} from 'src/app/shared/map/map.service';
import {Maps} from 'src/app/shared/map/maps';


@Component({
  selector: 'dnd-home',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy {

  constructor(private mapService: MapService) {
  }

  ngAfterViewInit(): void {
    this.mapService.getMap().setTarget(Maps.battleMapID);
  }

  ngOnDestroy(): void {
    this.mapService.getMap().setTarget(Maps.battleMapHolder);
  }


}
