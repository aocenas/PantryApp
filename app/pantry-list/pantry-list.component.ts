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
        
        <div *ngIf="users">
            <ul>
              <li *ngFor="let user of users">
                <span>{{user.name}}</span>
              </li>
            </ul>
        </div>
    `,
    providers: [UserService, PantryService]
})
export class PantryListComponent implements OnInit {
    pantryItems: Object[];
    users: Object[];

    constructor(
        private userService: UserService,
        private pantryService: PantryService
    ) {}

    ngOnInit() {
        this.pantryService.getItems().then(items => this.pantryItems = items);
        this.userService.getUsers().then(users => this.users = users);
    }

    getPantryItems() {
        return [];
    }
}

