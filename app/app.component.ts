import {Component, OnInit, Inject} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {UsersActions} from './users/users.actions';
import {ItemsActions} from './pantry-list/items.actions';
import {STORE_TOKEN} from './config/create-store';

@Component({
    selector: 'my-app',
    template: `
        <ul class="nav nav-tabs">
            <li><a [routerLink]="['/']" routerLinkActive="active">List</a></li>
            <li><a [routerLink]="['/stats']" routerLinkActive="active">Stats</a></li>
        </ul>
        <router-outlet></router-outlet>
    `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [UsersActions, ItemsActions],
})
export class AppComponent implements OnInit {

    constructor(
        @Inject(STORE_TOKEN) private store: any,
        private itemsActions: ItemsActions,
        private usersActions: UsersActions
    ) {}

    ngOnInit() {
        // load this data here as they are needed for both pages
        this.store.dispatch(this.usersActions.loadUsers());
        this.store.dispatch(this.usersActions.loadCurrentUserId());
        this.store.dispatch(this.itemsActions.loadItems());
    }
}
