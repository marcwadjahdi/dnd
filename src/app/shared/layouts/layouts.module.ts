import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// Components
import {MainComponent} from './main/main.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {ErrorComponent} from './error/error.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule
    ],
    declarations: [
        MainComponent,
        NavbarComponent,
        FooterComponent,
        ErrorComponent,
    ],
    exports: [
        MainComponent,
        ErrorComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutsModule {
}
