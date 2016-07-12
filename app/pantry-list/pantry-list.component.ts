import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

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
    providers: [UserService]
})
export class PantryListComponent implements OnInit {
    pantryItems: {name: string}[];
    users: Object[];

    constructor(
        private userService: UserService
    ) {}

    ngOnInit() {
        this.pantryItems = this.getPantryItems();
        this.userService.getUsers().then(users => this.users = users);
    }

    getPantryItems() {
        return [];
    }
}

