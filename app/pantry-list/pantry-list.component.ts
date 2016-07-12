import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { PantryService } from '../pantry.service';

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
    providers: [UserService, PantryService]
})
export class PantryListComponent implements OnInit {
    pantryItems: Object[];
    // initialize so we do not have to handle empty state in template by hiding something
    users: Object[] = [];

    selectedUserId: number;
    selectedItemId: number;
    showItemRequired = false;

    constructor(
        private userService: UserService,
        private pantryService: PantryService
    ) {}

    ngOnInit() {
        this.pantryService.getItems().then(items => this.pantryItems = items);
        this.userService
            .getUsers()
            .then(users => {
                this.users = users;
                // TODO init from session
                this.selectedUserId = users[0].id;
            });
    }

    getPantryItems() {
        return [];
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

