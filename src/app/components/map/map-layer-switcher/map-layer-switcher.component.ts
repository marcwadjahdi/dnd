import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from 'src/app/shared/map/map.service';
import {Maps} from 'src/app/shared/map/maps';
import BasemapStore = Maps.Layers.BasemapStore;


@Component({
  selector: 'dnd-map-layer-switcher',
  templateUrl: './map-layer-switcher.component.html',
  styleUrls: ['./map-layer-switcher.component.scss']
})
export class MapLayerSwitcherComponent implements OnInit, OnDestroy {
  readonly basemaps = BasemapStore;

  basemap: string;

  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {
    this.basemap = this.basemaps[0].id;
  }

  ngOnDestroy(): void {
  }

  changeBasemap() {
    this.mapService.changeBasemap(this.basemap);
  }
}
