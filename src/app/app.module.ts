import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, HostListener, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
// DnD Modules
import {SharedModule} from 'src/app/shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {DndStoreModule} from 'src/app/shared/store/dnd-store.module';
import {DndModule} from './components/dnd.module';
// Components
import {MainComponent} from 'src/app/shared/layouts/main/main.component';
import {FormsModule} from '@angular/forms';
import {MapService} from './shared/map/map.service';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    DndModule,
    AppRoutingModule,
    DndStoreModule,
    FormsModule
  ],
  exports: [],
  providers: [MapService,
    {
      provide: APP_INITIALIZER,
      useFactory: (mapService: MapService) =>
        () => mapService.initialize(),
      deps: [MapService],
      multi: true
    }
  ],
  declarations: [],
  bootstrap: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
