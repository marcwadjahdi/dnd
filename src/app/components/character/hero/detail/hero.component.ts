import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HeroFacade} from 'src/app/shared/dnd/character/hero/hero.facade';
import {Hero} from 'src/app/shared/dnd/character/hero/hero.model';
import {randomId} from '../../../../shared/dnd/common/identified';
import {HeroClasses} from '../../../../shared/dnd/character/common/character-classes';
import {deepCopy} from '../../../../shared/util/deep-copy';

@Component({
  selector: 'dnd-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  heroClasses = Object.values(HeroClasses);

  hero: Hero;

  constructor(private heroFacade: HeroFacade) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.heroFacade.hero$.subscribe(h => {
        if (h) {
          this.hero = deepCopy(h);
          this.hero.characterClass = h.characterClass;
        } else {
          this.hero = undefined;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }


  close() {
    this.heroFacade.closeEdition();
  }

  saveHero() {
    if (!this.isHeroValid()) {
      return;
    }
    if (!this.hero.id) {
      this.hero.id = randomId();
    }

    this.heroFacade.saveHero(this.hero);
  }

  isHeroValid() {
    return this.hero.name  && this.hero.characterClass
      && this.hero.level && this.hero.level >=1 && this.hero.level <= 20
      && this.hero.attributes.strength && this.hero.attributes.dexterity && this.hero.attributes.constitution
      && this.hero.attributes.intelligence && this.hero.attributes.wisdom && this.hero.attributes.charisma;
  }
}
