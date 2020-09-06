import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {DndState} from 'src/app/shared/store/dnd.state';
import {Hero} from 'src/app/shared/dnd/character/hero/hero.model';
import {HeroSelectors} from 'src/app/shared/dnd/character/hero/hero.selectors';
import {HeroActions} from 'src/app/shared/dnd/character/hero/hero.actions';

@Component({
    selector: 'dnd-heroes',
    templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit, OnDestroy {
    heroes$: Observable<Hero[]>;

    constructor(private store: Store<DndState>) {
    }

    ngOnInit() {
        this.heroes$ = this.store.pipe(select(HeroSelectors.Heroes));

        this.searchHeroes();
        setTimeout(() => this.searchHeroes(), 3500);
    }

    searchHeroes() {
        this.store.dispatch(HeroActions.SearchHeroes());
    }

    ngOnDestroy() {
    }
}
