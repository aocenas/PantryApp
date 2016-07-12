import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { PantryService } from '../pantry.service';

@Component({
    selector: 'pantry-items',
    template: `
        <h1>Pantry</h1>
        <div *ngIf="pantryItems">
            <ul>
              <li *ngFor="let item of pantryItems">
                <span>{{item.name}}</span>
              </li>
            </ul>
        </div>
        
        <form>
            <div class="form-group">
                <select
                    class="form-control"
                    required
                    [(ngModel)]="selectedUserId"
                    [ngModelOptions]="{standalone: true}"
                >
                    <option *ngFor="let user of users" [value]="user.id">
                        {{user.name}}
                    </option>
                </select>
            </div>
            <button type="submit" class="btn btn-default">Take a snack</button>
            {{selectedUserId}}
        </form>
    `,
    providers: [UserService, PantryService]
})
export class PantryListComponent implements OnInit {
    pantryItems: Object[];
    // initialize so we do not have to handle empty state in template by hiding something
    users: Object[] = [];

    selectedUserId: number;


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
}

