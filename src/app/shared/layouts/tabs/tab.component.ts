import {Component, Input} from '@angular/core';

@Component({
  selector: 'dnd-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input('tabTitle') title: string;
  @Input() active = false;
}