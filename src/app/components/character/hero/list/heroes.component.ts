import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Hero, HeroActions, HeroSelectors} from 'src/app/shared/dnd/character/hero';
import {DndState} from 'src/app/shared/store/dnd.state';

@Component({
    selector: 'dnd-heroes',
    templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit, OnDestroy {
    heroes$: Observable<Array<Hero>>;

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
