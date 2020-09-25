import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {deepCopy} from 'src/app/shared/util/deep-copy';
import {randomId} from 'src/app/shared/models/common/identified';
import {NpcFacade} from 'src/app/shared/store/dnd/character/npc/npc.facade';
import {ChallengeRating} from 'src/app/shared/models/character/challenge-rating';
import {CreatureType} from 'src/app/shared/models/character/creature-type';
import {Character} from 'src/app/shared/models/character/character';

@Component({
  selector: 'dnd-npc-detail',
  templateUrl: './npc-detail.component.html',
  styleUrls: ['./npc-detail.component.scss'],
})
export class NpcDetailComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  readonly keys = Object.keys;
  readonly enumChallengeRating = ChallengeRating;
  readonly enumCreatureType = CreatureType;

  npc: Character;

  constructor(private facade: NpcFacade) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.facade.npc$.subscribe(h => {
        if (h) {
          this.npc = deepCopy(h);
        } else {
          this.npc = undefined;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }


  close() {
    this.facade.closeEdition();
  }

  saveNpc() {
    if (!this.isNPCValid()) {
      return;
    }
    if (!this.npc.id) {
      this.npc.id = randomId();
    }

    this.facade.saveNPC(this.npc);
  }

  isNPCValid() {
    return this.npc.name
      && this.npc.cr
      && this.npc.attributes.strength && this.npc.attributes.dexterity && this.npc.attributes.constitution
      && this.npc.attributes.intelligence && this.npc.attributes.wisdom && this.npc.attributes.charisma;
  }

  changeHostility() {
    this.npc.hostile = !this.npc.hostile;
  }

  hostilityIcon() {
    return this.npc.hostile ? 'skull-crossbones' : 'heart';
  }
}
