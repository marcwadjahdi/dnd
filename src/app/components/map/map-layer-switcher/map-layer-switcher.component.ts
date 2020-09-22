import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../../shared/store/dnd/map/map.service';
import {basemaps} from '../../../shared/store/dnd/map/map.layers';


@Component({
  selector: 'dnd-map-layer-switcher',
  templateUrl: './map-layer-switcher.component.html',
  styleUrls: ['./map-layer-switcher.component.scss']
})
export class MapLayerSwitcherComponent implements OnInit, OnDestroy {
  readonly baseMaps = basemaps;

  basemap: string;

  constructor(private map: MapService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  changeBasemap() {
    this.map.changeLayer(this.basemap);
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
