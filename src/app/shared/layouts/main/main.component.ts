import {Component, HostListener, OnInit} from '@angular/core';
import {DndState} from '../../store/dnd.state';
import {Store} from '@ngrx/store';
import {StoreState} from '../../store/util/sync';
import {take} from 'rxjs/operators';

@Component({
  selector: 'dnd-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private store: Store<DndState>) {
  }

  ngOnInit() {
  }

  @HostListener('window:unload')
  unloadHandler() {
    this.store.select(state => state).pipe(take(1)).subscribe(StoreState);
  }
}
