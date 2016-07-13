import {Component, OnInit, Inject} from '@angular/core';
import {groupBy, find} from 'lodash';

import {STORE_TOKEN} from '../config/create-store';
import {StatsActions} from './stats.actions';

type Stats = {
    actions: any[],
    user: Object
}

@Component({
    selector: 'stats',
    template: `
        <h1>Stats</h1>
        <div *ngIf="statsData">
            <div *ngFor="let stat of statsData" class="panel panel-default">
                <div class="panel-body">
                    {{stat.user.name}}
                    <ul>
                        <li *ngFor="let action of stat.actions">
                            took {{action.item.name}} at {{action.createdAt | date}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <h3 *ngIf="!statsData">
            Nobody has taken anything from the pantry yet.
        </h3>
    `,
    providers: [StatsActions],
})
export class StatsComponent implements OnInit {
    unsubscribe: Function;
    actions: Object[];
    statsData: Stats[];

    constructor(
        @Inject(STORE_TOKEN) private store: any,
        private statsActions: StatsActions
    ) {}

    ngOnInit() {
        this.store.dispatch(this.statsActions.loadStats());
        this.unsubscribe = this.store.subscribe(() => this.processState());
        // handle initial state
        this.processState();
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    processState() {
        const {items, stats, users: {users}} = this.store.getState();

        // make sure everything is loaded
        if (stats.length && items.length && users.length) {
            const grouped = groupBy(stats, (action: any) => action.UserId);
            this.statsData = Object.keys(grouped).map(key => {
                const updatedActions = grouped[key].map(action =>
                    Object.assign({}, action, {
                        item: find(items, {id: action.PantryItemId}),
                    })
                );
                return {
                    actions: updatedActions,
                    user: find(users, {id: parseInt(key)}),
                };
            });
        }

    }

}

