import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../shared/store/dnd/map/map.service';


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
