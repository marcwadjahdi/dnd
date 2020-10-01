import {Component, Input} from '@angular/core';

@Component({
  selector: 'dnd-wizard-step',
  templateUrl: './wizard-step.component.html',
  styleUrls: ['./wizard-step.component.scss']
})
export class WizardStepComponent {
  @Input('stepTitle') title: string;
  @Input() active = false;
}
