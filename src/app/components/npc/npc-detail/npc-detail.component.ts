import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {deepCopy} from 'src/app/shared/util/deep-copy';
import {NpcFacade} from 'src/app/shared/store/dnd/character/npc/npc.facade';
import {ChallengeRating} from 'src/app/shared/dnd/character/enums/challenge-rating.enum';
import {CreatureType} from 'src/app/shared/dnd/character/enums/creature-type.enum';
import {Character} from 'src/app/shared/dnd/character/character.model';
import {Characters} from '../../../shared/dnd/character/characters';
import {CharacterClasses} from '../../../shared/dnd/character/enums/character-class.enum';

@Component({
  selector: 'dnd-npc-detail',
  templateUrl: './npc-detail.component.html',
  styleUrls: ['./npc-detail.component.scss'],
})
export class NpcDetailComponent implements OnInit, OnDestroy {

  readonly keys = Object.keys;
  readonly enumChallengeRating = ChallengeRating;
  readonly enumCreatureType = CreatureType;
  npc: Character;
  private subs: Subscription[] = [];

  constructor(private facade: NpcFacade) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.facade.npc$.subscribe(h => {
        if (h) {
          this.npc = deepCopy(h);
          this.npc.cr = this.enumChallengeRating[this.keys(this.enumChallengeRating).find(it => this.enumChallengeRating[it] === h.cr)];
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
    if (Characters.isValid(this.npc)) {
      this.facade.saveNPC(this.npc);
    }
  }

  changeHostility() {
    this.npc.hostile = !this.npc.hostile;
    this.npc.characterClass = CharacterClasses[`${this.npc.hostile ? 'Hostile' : 'Friendly'}NPC`];
  }

  hostilityIcon() {
    return this.npc.hostile ? 'hangry' : 'happy';
  }
}
