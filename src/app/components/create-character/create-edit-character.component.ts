import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hero} from 'src/app/shared/dnd/character/hero/hero.model';
import {HeroService} from 'src/app/shared/dnd/character/hero/hero.service';
import {randomId} from 'src/app/shared/dnd/common/identified';
import {Character} from 'src/app/shared/dnd/character/common/character.model';
import {CharacterType, CharacterTypes} from 'src/app/shared/dnd/character/common/character-types';

@Component({
  selector: 'dnd-create-edit-character',
  templateUrl: './create-edit-character.component.html',
  styleUrls: ['./create-edit-character.component.scss']
})
export class CreateEditCharacterComponent implements OnInit {
  @Input()
  character: Character;
  @Output()
  createdCharacter = new EventEmitter<Character>();

  characterTypes = CharacterTypes;

  heroes: Hero[];
  hero: Hero;

  constructor(private heroesService: HeroService) {
  }

  ngOnInit(): void {
    this.heroes = this.heroesService.search();
    if (!this.character) {
      this.character = {};
    }
  }

  canSumbit() {
    return this.character.name && this.character.type && this.character.hostile;
  }

  onSubmit() {
    // this.character.id = randomId();
    this.createdCharacter.emit(this.character);
    this.character = {};
    this.hero = null;
  }

  title() {
    return this.character.id ? `Character ${this.character.name}` : 'Create Character';
  }

  onTypeSelect() {
    this.hero = null;
  }

  isTypeDisabled() {
    return !!this.character.id;
  }

  isPlayer() {
    return this.character.type === CharacterType.Player;
  }

  isNPC() {
    return this.character.type === CharacterType.NPC;
  }

  onHeroSelect() {
    this.character = {...this.hero};
  }

  heroStr(h: Hero) {
    return `Lvl ${h.level} ${h.characterClass.name} - ${h.name}`;
  }

}
