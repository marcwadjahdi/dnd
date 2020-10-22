import {Component, OnDestroy, OnInit} from '@angular/core';
import {BattleCharacter} from 'src/app/shared/dnd/battle/battle';
import {Closeable} from '../../../shared/util/closeable';
import {Character} from '../../../shared/dnd/character/character.model';
import {MapService} from '../../../shared/map/map.service';
import {BattleFacade} from '../../../shared/store/dnd/battle/battle.facade';
import {PcFacade} from '../../../shared/store/dnd/character/pc/pc.facade';
import {NpcFacade} from '../../../shared/store/dnd/character/npc/npc.facade';
import {DialogService} from '../../../shared/layouts/dialog/dialog.service';
import {debounceTime, distinctUntilChanged, map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Characters} from '../../../shared/dnd/character/characters';
import {deepCopy} from '../../../shared/util/deep-copy';
import {Dice} from '../../../shared/util/dice';
import {randomId} from '../../../shared/dnd/common/identified';

@Component({
  selector: 'dnd-add-battle-character',
  templateUrl: './add-battle-character.component.html',
  styleUrls: ['./add-battle-character.component.scss'],
})
export class AddBattleCharacterComponent implements OnInit, OnDestroy, Closeable {

  npcs: Character[];
  npc: Character;

  playersCharacters: { [id: number]: BattleCharacter };
  nonPlayersCharacters: { [id: number]: BattleCharacter };

  constructor(
    private mapService: MapService,
    private facade: BattleFacade,
    private pcFacade: PcFacade,
    private npcFacade: NpcFacade,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.nonPlayersCharacters = {};
    this.pcFacade.players$.pipe(take(1)).subscribe(pcs =>
      this.playersCharacters = pcs
        .map(pc => Object.assign({[pc.id]: this.toBattleCharacter(pc)}))
        .reduce((value, character, index, array) => Object.assign(value, character))
    );
    this.npcFacade.npcs$.pipe(take(1)).subscribe(npcs => this.npcs = npcs);
  }

  ngOnDestroy(): void {
  }

  values = (data: any) => data ? Object.values(data) : [];

  formatter = (character) => `${character.name} - ${character.cr} - ${character.hostile ? 'Hostile' : 'Friendly'}`;

  searchNPC = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term =>
      term === '' ? []
        : this.npcs.filter(npc => npc.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  );

  removePC(character) {
    delete this.playersCharacters[character.id];
  }

  removeNPC(character) {
    delete this.nonPlayersCharacters[character.id];
  }

  addNPC() {
    const battleNPC = this.toBattleCharacter(this.npc);
    battleNPC.id = randomId();
    this.nonPlayersCharacters[battleNPC.id] = battleNPC;
  }

  addToBattle() {
    this.facade.addCharacters([
      ...Object.values(this.playersCharacters),
      ...Object.values(this.nonPlayersCharacters)
    ]);
  }

  close(): void {
    this.dialogService.close();
  }

  /* Random Position */

  toBattleCharacter(character: Character) {
    return Characters.saveCharacter({
      ...deepCopy(character),
      active: false,
      position: this.randomPosition(),
      initiative: Dice.rollD20(),
    });
  }

  randomPosition() {
    const x = (Dice.rollD20() + Dice.rollD12() + Dice.rollD8()) * (Dice.rollD6() > 3 ? 1 : -1);
    const y = (Dice.rollD20() + Dice.rollD12() + Dice.rollD8()) * (Dice.rollD6() > 3 ? 1 : -1);
    const center = this.mapService.getMap().getView().getCenter();
    return [center[0] + x, center[1] + y];
  }
}
