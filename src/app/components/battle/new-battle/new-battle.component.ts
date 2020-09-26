import {Component, OnDestroy, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {BattleCharacter} from 'src/app/shared/dnd/battle/battle';
import {Maps} from 'src/app/shared/map/maps';
import {BattleFacade} from 'src/app/shared/store/dnd/battle/battle.facade';
import {PcFacade} from 'src/app/shared/store/dnd/character/pc/pc.facade';
import {deepCopy} from 'src/app/shared/util/deep-copy';
import {Dice} from '../../../shared/util/dice';
import {Characters} from 'src/app/shared/dnd/character/characters';
import BasemapStore = Maps.Layers.BasemapStore;

@Component({
  selector: 'dnd-new-battle',
  templateUrl: './new-battle.component.html',
  styleUrls: ['./new-battle.component.scss'],
})
export class NewBattleComponent implements OnInit, OnDestroy {

  readonly basemaps = BasemapStore;
  readonly values = Object.values;
  readonly removeCharacter = (character) => delete this.characters[character.id];

  basemap: string;
  characters: { [id: number]: BattleCharacter };

  constructor(private facade: BattleFacade, private pcFacade: PcFacade) {
  }

  ngOnInit(): void {
    this.pcFacade.players$.pipe(take(1)).subscribe(pcs =>
      this.characters = pcs
        .map(pc => {
          const character = Characters.saveCharacter({...deepCopy(pc), initiative: Dice.rollD20()});
          return {[pc.id]: character};
        })
        .reduce((value, character, index, array) => {
            return {...value, character};
          }
        )
    );
  }

  ngOnDestroy(): void {
  }

  startBattle() {
    const isValid = !!this.basemap && !Object.values(this.characters).find(it => !Characters.isValid(it));
    if (isValid) {
      this.facade.startBattle({
        basemap: this.basemap,
        characters: this.characters,
      });
    }
  }
}
