/**
 * The main component that renders single TabComponent
 * instances.
 */

import {AfterContentInit, Component, ContentChildren, QueryList} from '@angular/core';

import {TabComponent} from './tab.component';

@Component({
  selector: 'dnd-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter((tab) => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach(t => t.active = false);
    tab.active = true;
  }
}
