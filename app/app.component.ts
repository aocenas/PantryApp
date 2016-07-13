import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-app',
    template: `
        <nav>
            <a [routerLink]="['/']" routerLinkActive="active">List</a>
            <a [routerLink]="['/stats']" routerLinkActive="active">Stats</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
})
export class AppComponent {}
