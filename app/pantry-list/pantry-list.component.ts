import {Component, OnInit, Inject, OnDestroy} from '@angular/core';

import {STORE_TOKEN} from '../config/create-store';
import {ItemsActions} from './items.actions';


@Component({
    selector: 'pantry-items',
    templateUrl: 'app/pantry-list/pantry-list.component.html',
})
export class PantryListComponent implements OnInit, OnDestroy {
    pantryItems: Object[];
    users: Object[];

    selectedUserId: number;
    selectedItemId: number;
    showItemRequired = false;
    unsubscribe: any;

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
        console.log(state);
        this.users = state.users;
        this.pantryItems = state.items;

        if (state.users.length) {
            // TODO: get from session
            this.selectedUserId = state.users[0].id;
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

