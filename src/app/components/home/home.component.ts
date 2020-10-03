import {Component, OnInit, ViewChild} from '@angular/core';
import {StoredState, StoreState} from '../../shared/store/util/sync';

@Component({
  selector: 'dnd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly STORAGE_EVENT = 'storage';

  @ViewChild('stateData')
  private textArea;

  constructor() {
  }

  ngOnInit(): void {
  }

  download() {
    const data = StoredState();
    const blob = new Blob([JSON.stringify(data)], {type: 'text/plain'});
    const file = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = file;
    link.setAttribute('download', 'irrandia.json');
    document.body.appendChild(link);
    link.dispatchEvent(new MouseEvent('click'));
    document.body.removeChild(link);
  }

  upload() {
    const value = this.textArea.nativeElement.value;
    if (value) {
      StoreState(JSON.parse(value));
      window.dispatchEvent(new StorageEvent(this.STORAGE_EVENT));
    }
  }
}
