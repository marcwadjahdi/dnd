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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    TabsComponent,
    TabComponent,
    DialogComponent,
    DialogDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutsModule {
}
