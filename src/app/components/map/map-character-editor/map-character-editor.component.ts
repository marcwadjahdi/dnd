import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hero} from 'src/app/shared/dnd/character/hero/hero.model';
import {HeroService} from 'src/app/shared/dnd/character/hero/hero.service';
import {Character} from 'src/app/shared/dnd/character/common/character.model';
import {CharacterType, CharacterTypes} from 'src/app/shared/dnd/character/common/character-types';
import {deepCopy} from '../../../shared/util/deep-copy';
import {CharacterService} from '../../../shared/dnd/character/common/character.service';

@Component({
  selector: 'dnd-map-character-editor',
  templateUrl: './map-character-editor.component.html',
  styleUrls: ['./map-character-editor.component.scss']
})
export class MapCharacterEditorComponent implements OnInit {
  @Input()
  character: Character;
  @Output()
  createdCharacter = new EventEmitter<Character>();

  characterTypes = CharacterTypes;

  heroes: Hero[];
  hero: Hero;

  constructor(private characterService: CharacterService, private heroesService: HeroService) {
  }

  ngOnInit(): void {
    this.heroes = this.heroesService.search()
      .filter(hero => !this.characterService.search(it => it.name === hero.name))
      .map(h => {
        const copy = deepCopy(h);
        delete copy.id;
        copy.characterClass = h.characterClass;
        return copy;
      });
    if (!this.character) {
      this.character = {};
    }
  }

  canSumbit() {
    return !!this.character.name;
  }

  onSubmit() {
    if (this.canSumbit()) {
      this.createdCharacter.emit(this.character);
      this.character = {};
      this.hero = null;
    }
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
