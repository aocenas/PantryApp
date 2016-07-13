import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {STORE_TOKEN} from '../config/create-store';
import {UsersActions} from './users.actions';
import {ItemsActions} from './items.actions';


@Component({
    selector: 'pantry-items',
    templateUrl: 'app/pantry-list/pantry-list.component.html',
    providers: [UsersActions, ItemsActions],
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
        private itemsActions: ItemsActions,
        private usersActions: UsersActions
    ) {}

    ngOnInit() {
        this.store.dispatch(this.usersActions.loadUsers());
        this.store.dispatch(this.itemsActions.loadItems());

        this.unsubscribe = this.store.subscribe(() => {
            let state = this.store.getState();
            console.log(state);
            this.users = state.users;
            this.pantryItems = state.items;

            if (state.users.length) {
                // TODO: get from session
                this.selectedUserId = state.users[0].id;
            }
        });

    }

    ngOnDestroy() {
        this.unsubscribe();
    }


    clearItemError() {
        this.showItemRequired = false;
    }

    onSubmit() {
        if (!this.selectedItemId) {
            this.showItemRequired = true;
            return;
        }

        this.store.dispatch(this.itemsActions.takeItem(this.selectedItemId));
        // TODO: it would be better to reset this after we are sure action is completed, check what is isMounted
        // equivalent in Angular or use Bluebird with cancelable promises
        // .then(() => this.selectedItemId = null;)
        this.selectedItemId = null;
    }
}

