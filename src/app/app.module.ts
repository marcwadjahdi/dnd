import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
// DnD Modules
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {DndStoreModule} from './shared/store/dnd-store.module';
import {DndModule} from './components/dnd.module';
// Components
import {MainComponent} from './shared/layouts/main/main.component';
import {HomeComponent} from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    DndModule,
    AppRoutingModule,
    DndStoreModule,
    NgbModule,
    FormsModule
  ],
  exports: [],
  providers: [],
  declarations: [],
  bootstrap: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
