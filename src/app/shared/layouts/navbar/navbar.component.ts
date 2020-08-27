import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {DndState} from '../../store/dnd/dnd.state';
import {Observable, Subscription} from 'rxjs';
import {isAuthenticated} from '../../auth';

@Component({
    selector: 'dnd-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    subscriptions: Subscription[];

    authenticated = false;

    constructor(private store: Store<DndState>) {
    }

    ngOnInit(): void {
        this.store.pipe(select(isAuthenticated)).subscribe(
            (authenticated) => this.authenticated = authenticated
        );
    }

    isGameMaster() {
        return false;
    }
}
