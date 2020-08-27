import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
// Icones
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
// App modules
import {LayoutsModule} from './layouts/layouts.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        FormsModule,
        LayoutsModule,
    ],
    exports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        FormsModule,
        LayoutsModule,
    ]
})
export class SharedModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, far);
    }
}
