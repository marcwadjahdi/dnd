import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../../shared/store/dnd/map/map.service';
import {Basemaps} from '../../../shared/store/dnd/map/map.layers';


@Component({
  selector: 'dnd-map-layer-switcher',
  templateUrl: './map-layer-switcher.component.html',
  styleUrls: ['./map-layer-switcher.component.scss']
})
export class MapLayerSwitcherComponent implements OnInit, OnDestroy {
  readonly baseMaps = Basemaps;

  basemap: string;

  constructor(private map: MapService) {
  }

  ngOnInit(): void {
    this.basemap = this.baseMaps[0];
  }

  ngOnDestroy(): void {
  }

  changeBasemap() {
    this.map.changeBasemap(this.basemap);
  }

  basemapName(b: any) {
    return b
      .replace('/assets/layers', '')
      .split('.')[0]
      .split('/')
      .filter(it => !!it)
      .map(it => `${it[0].toUpperCase()}${it.substr(1).toLocaleLowerCase()}`)
      .join(' ');
  }
}
