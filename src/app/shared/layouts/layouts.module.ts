import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// Components
import {MainComponent} from './main/main.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {ErrorComponent} from './error/error.component';
import {CreateCharacterComponent} from "../../components/create-character/create-character.component";
import {FormsModule} from "@angular/forms";
import {EditCharacterComponent} from "../../components/edit-character/edit-character.component";

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
        CreateCharacterComponent,
        EditCharacterComponent
    ],
    exports: [
        MainComponent,
        ErrorComponent,
        CreateCharacterComponent,
        EditCharacterComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutsModule {
}
