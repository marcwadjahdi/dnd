import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// Routing
import {RouterModule} from '@angular/router';
// Components
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {ActiveBattleComponent} from './active-battle/active-battle.component';
import {NewBattleComponent} from './new-battle/new-battle.component';
import {AddBattleCharacterComponent} from './add-battle-character/add-battle-character.component';
import {BattleCharacterItemComponent} from './active-battle/battle-character-item/battle-character-item.component';

@NgModule({
  declarations: [
    NewBattleComponent,
    ActiveBattleComponent,
    BattleCharacterItemComponent,
    AddBattleCharacterComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: 'battle',
        component: ActiveBattleComponent,
      },
    ]),
    FormsModule,
  ]
})
export class BattleModule {
}
