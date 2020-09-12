import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroModule} from './hero/hero.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
      CommonModule,
      FontAwesomeModule,
        HeroModule,
    ]
})
export class CharacterModule {
}
