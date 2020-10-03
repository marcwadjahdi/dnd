import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
// Components
import {MainComponent} from './main/main.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {ErrorComponent} from './error/error.component';
import {TabComponent} from './tabs/tab.component';
import {TabsComponent} from './tabs/tabs.component';
import {DialogComponent} from './dialog/dialog.component';
import {DialogDirective} from './dialog/dialog.directive';
import {WizardComponent} from './wizard/wizard.component';
import {WizardStepComponent} from './wizard/wizard-step.component';
import {HpFormatterPipe} from '../dnd/character/util/hp/hp-formatter.pipe';
import {HpFormatterDirective} from '../dnd/character/util/hp/hp-formatter.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule
  ],
  declarations: [
    DialogComponent,
    DialogDirective,
    ErrorComponent,
    FooterComponent,
    MainComponent,
    NavbarComponent,
    TabsComponent,
    TabComponent,
    WizardComponent,
    WizardStepComponent,
    HpFormatterPipe,
    HpFormatterDirective,
  ],
  exports: [
    TabsComponent,
    TabComponent,
    WizardComponent,
    WizardStepComponent,
    DialogDirective,
    HpFormatterDirective,
    HpFormatterPipe,
  ],
  providers: [
    HpFormatterPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutsModule {
}
