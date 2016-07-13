import { Injectable } from '@angular/core';

import StatsService from './stats.service';
import {makeAction} from '../utils';

export const LOAD_ACTIONS = 'LOAD_ACTIONS';
const loadActionsAction = makeAction(LOAD_ACTIONS);


@Injectable()
export class StatsActions {

    constructor(
        private statsService: StatsService
    ) {}

    loadStats() {
        return (dispatch) => {
            return this.statsService
                .getActions()
                .then(
                    actions => dispatch(loadActionsAction(actions)),
                    err => dispatch(loadActionsAction(err))
                );
        };
    };
}