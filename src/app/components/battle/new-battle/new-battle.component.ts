import {Component, OnDestroy, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {BattleCharacter} from 'src/app/shared/dnd/battle/battle';
import {Maps} from 'src/app/shared/map/maps';
import {BattleFacade} from 'src/app/shared/store/dnd/battle/battle.facade';
import {PcFacade} from 'src/app/shared/store/dnd/character/pc/pc.facade';
import {deepCopy} from 'src/app/shared/util/deep-copy';
import {Dice} from '../../../shared/util/dice';
import {Characters} from 'src/app/shared/dnd/character/characters';
import {MapService} from '../../../shared/map/map.service';
import BasemapStore = Maps.Layers.BasemapStore;

@Component({
  selector: 'dnd-new-battle',
  templateUrl: './new-battle.component.html',
  styleUrls: ['./new-battle.component.scss'],
})
export class NewBattleComponent implements OnInit, OnDestroy {

  readonly basemaps = BasemapStore;
  readonly values = Object.values;

  basemap: string;
  characters: { [id: number]: BattleCharacter };

  constructor(private mapService: MapService, private facade: BattleFacade, private pcFacade: PcFacade) {
  }

  ngOnInit(): void {
    this.pcFacade.players$.pipe(take(1)).subscribe(pcs =>
      this.characters = pcs
        .map(pc => {

          let x = Dice.rollD20();
          x = x > 10 ? x : x * -1;
          let y = Dice.rollD20();
          y = y > 10 ? y : y * -1;
          const center = this.mapService.getMap().getView().getCenter();
          const character = Characters.saveCharacter({
            ...deepCopy(pc),
            active: false,
            position: [center[0] + x, center[1] + y],
            initiative: Dice.rollD20(),
          });
          return {[pc.id]: character};
        })
        .reduce((value, character, index, array) => {
            return {...value, ...character};
          }
        )
    );
  }

  ngOnDestroy(): void {
  }

  removeCharacter() {
    return (character) => delete this.characters[character.id];
  }

  startBattle() {
    const isValid = !!this.basemap; // && !Object.values(this.characters).find(it => !Characters.isValid(it));
    if (isValid) {
      this.facade.startBattle({
        basemap: this.basemap,
        characters: this.characters,
      });
    }
  }
}
