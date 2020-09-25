import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NpcFacade} from 'src/app/shared/store/dnd/character/npc/npc.facade';
import {ChallengeRating} from 'src/app/shared/models/character/challenge-rating';
import {CreatureType} from 'src/app/shared/models/character/creature-type';
import {Character} from 'src/app/shared/models/character/character';

@Component({
  selector: 'dnd-npc-list',
  templateUrl: './npc-list.html',
  styleUrls: ['./npc-list.component.scss'],
})
export class NpcListComponent implements OnInit, OnDestroy {
  readonly enumChallengeRating = ChallengeRating;
  readonly enumNpcType = CreatureType;



  npcs$: Observable<Character[]>;

  constructor(private facade: NpcFacade) {
  }

  ngOnInit() {
    this.npcs$ = this.facade.npcs$;
  }

  ngOnDestroy() {
  }

  hostileFilter() {

  }

  friendlyFilter() {

  }

  nameFilter($event) {
    this.facade.filter($event);
  }

  createNewNPC() {
    this.facade.openCreation();
  }

  editNPC(npc: Character) {
    this.facade.openEdition(npc);
  }

  deleteNPC(npc: Character) {
    this.facade.deleteByID(npc.id);
  }

  hostileBadgeCls(player: Character) {
    return `${player.hostile ? 'hostile' : 'friendly'}-badge`;
  }
}
