// Imports for loading & configuring the in-memory web api
// import { XHRBackend } from '@angular/http';
//
// import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
// import { InMemoryDataService }               from './in-memory-data.service';

// The usual bootstrapping imports
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

import {AppComponent} from './app.component';
import {APP_ROUTER_PROVIDERS} from './app.routes';

import {UsersActions} from './pantry-list/users.actions';
import {ItemsActions} from './pantry-list/items.actions';

import PantryService from './pantry.service';
import UserService from './user.service';
import StatsService from './stats/stats.service';

import {store, STORE_TOKEN} from './config/create-store';


bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS,

    // using new version of forms
    disableDeprecatedForms(),
    provideForms(),

    // make redux store injectable
    { provide: STORE_TOKEN, useValue: store },
    ItemsActions,
    UsersActions,

    PantryService,
    UserService,
    StatsService,

    // { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    // { provide: SEED_DATA, useClass: InMemoryDataService }      // in-mem server data
])
.catch((err: any) => console.error(err));
