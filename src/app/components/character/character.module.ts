import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroModule} from './hero/hero.module';

@NgModule({
    imports: [
        CommonModule,
        HeroModule,
    ]
})
export class CharacterModule {
}
