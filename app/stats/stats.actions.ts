import {makeAction} from '../utils';

export const LOAD_ACTIONS = 'LOAD_ACTIONS';
const loadActionsAction = makeAction(LOAD_ACTIONS);


export function loadStats() {
    return (dispatch, getState, api) => {
        return api.statsService
            .getActions()
            .then(
                actions => dispatch(loadActionsAction(actions)),
                err => dispatch(loadActionsAction(err))
            );
    };
}
