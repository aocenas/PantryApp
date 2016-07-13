import {Component, OnInit, Inject, OnDestroy} from '@angular/core';

import {STORE_TOKEN} from '../config/create-store';
import {ItemsActions} from './items.actions';


@Component({
    selector: 'pantry-items',
    templateUrl: 'app/pantry-list/pantry-list.component.html',
    styleUrls: ['app/pantry-list/pantry-list.component.css'],
})
export class PantryListComponent implements OnInit, OnDestroy {
    pantryItems: any[];
    users: any[];

    // selected form values
    selectedUserId: number;
    selectedItemId: number;

    unsubscribe: Function;

    // controls for error messages
    showItemRequired = false;

    constructor(
        @Inject(STORE_TOKEN) private store: any,
        private itemsActions: ItemsActions
    ) {}

    ngOnInit() {
        // loading is triggered in parent component
        this.unsubscribe = this.store.subscribe(() => this.processState());
        // handle initial state
        this.processState();
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    processState() {
        let state = this.store.getState();
        this.users = state.users.users;
        this.pantryItems = state.items;

        if (this.users.length) {
            // current users id is persisted in session
            this.selectedUserId = state.users.currentUserId || this.users[0].id;
        }
    }

    clearItemError() {
        this.showItemRequired = false;
    }

    onSubmit() {
        if (!this.selectedItemId) {
            this.showItemRequired = true;
            return;
        }

        this.store.dispatch(
            this.itemsActions.takeItem(this.selectedItemId, this.selectedUserId)
        );
        // TODO: it would be better to reset this after we are sure action is completed, check what is isMounted
        // equivalent in Angular or use Bluebird with cancelable promises
        // .then(() => this.selectedItemId = null;)
        this.selectedItemId = null;
    }
}

