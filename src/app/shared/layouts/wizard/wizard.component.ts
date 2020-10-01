/**
 * The main component that renders single TabComponent
 * instances.
 */

import {AfterContentInit, Component, ContentChildren, QueryList} from '@angular/core';
import {WizardStepComponent} from './wizard-step.component';

@Component({
  selector: 'dnd-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements AfterContentInit {

  @ContentChildren(WizardStepComponent) tabs: QueryList<WizardStepComponent>;

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter((tab) => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(step: WizardStepComponent) {
    this.tabs.toArray().forEach(t => t.active = false);
    step.active = true;
  }
}
