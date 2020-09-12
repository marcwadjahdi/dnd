import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Hero} from 'src/app/shared/dnd/character/hero/hero.model';
import {HeroFacade} from 'src/app/shared/dnd/character/hero/hero.facade';

@Component({
  selector: 'dnd-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit, OnDestroy {

  heroes$: Observable<Hero[]>;
  hero$: Observable<Hero>;

  constructor(private heroFacade: HeroFacade) {
  }

  ngOnInit() {
    this.heroes$ = this.heroFacade.heroes$;
    this.hero$ = this.heroFacade.hero$;

  }

  ngOnDestroy() {
  }

  createNewHero() {
    this.heroFacade.openCreation();
  }

  editHero(hero: Hero) {
    this.heroFacade.openEdition(hero);
  }

  deleteHero(hero: Hero) {
    if (hero.id) {
      this.heroFacade.deleteByID(hero.id);
    }
  }

  classBadgeCls(hero: Hero) {
    return `${hero.characterClass.name}-badge`;
  }
}
