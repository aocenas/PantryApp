import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {STORE_TOKEN} from '../config/create-store';
import {UsersActions} from './users.actions';
import {ItemsActions} from './items.actions';


@Component({
    selector: 'pantry-items',
    template: `
        <h1>Pantry</h1>
        <form (ngSubmit)="onSubmit()">
        
            <div *ngIf="pantryItems">
                <ul>
                    <li *ngFor="let item of pantryItems">
                        <input
                            type="radio"
                            name="pantry_item"
                            value="{{item.id}}"
                            [(ngModel)]="selectedItemId"
                            (click)="clearItemError()"
                        />
                        {{item.name}}
                    </li>
                </ul>
            </div>
            <div *ngIf="showItemRequired" class="error-message">
                You need to select a snack to take.
            </div>
        
            <div class="form-group">
                <select
                    class="form-control"
                    required
                    [(ngModel)]="selectedUserId"
                    [ngModelOptions]="{standalone: true}"
                    name="user_id"
                >
                    <option *ngFor="let user of users" [value]="user.id">
                        {{user.name}}
                    </option>
                </select>
            </div>
            <button type="submit" class="btn btn-default">Take a snack</button>
            {{selectedItemId}}
        </form>
    `,
    providers: [UsersActions, ItemsActions],
})
export class PantryListComponent implements OnInit, OnDestroy {
    pantryItems: Object[];
    // initialize so we do not have to handle empty state in template by hiding something
    users: Object[] = [];

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
        console.log('submit');
    }
}

