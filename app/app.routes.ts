import { provideRouter, RouterConfig }  from '@angular/router';
import {PantryListComponent} from './pantry-list/pantry-list.component';
import {StatsComponent} from './stats/stats.component';

const routes: RouterConfig = [
    {
        path: '',
        component: PantryListComponent
    },
    {
        path: 'stats',
        component: StatsComponent
    },
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
