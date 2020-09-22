import {Component, OnDestroy, OnInit} from '@angular/core';
import {battleMapID, extent, maxZoom, minZoom, projection} from '../../shared/store/dnd/map/map.constants';
import {MapService} from '../../shared/store/dnd/map/map.service';
import {MapInitializer} from '../../shared/store/dnd/map/map.initializer';
import Map from 'ol/Map';
import View from 'ol/View';
import {getCenter} from 'ol/extent';
import {basemaps, layersIndex, toImageLayer} from '../../shared/store/dnd/map/map.layers';


@Component({
  selector: 'dnd-home',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  constructor(private service: MapService) {
  }

  ngOnInit(): void {
    this.service.initialize();
  }

  ngOnDestroy(): void {
  }


}
