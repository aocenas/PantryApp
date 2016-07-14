require('isomorphic-fetch');
import {makeAction} from '../utils';

export const LOAD_USERS = 'LOAD_USERS';
export const loadUsersAction = makeAction(LOAD_USERS);

export const LOAD_CURRENT_USER_ID = 'LOAD_CURRENT_USER_ID';
export const loadCurrentUserIdAction = makeAction(LOAD_CURRENT_USER_ID);


export function loadUsers() {
    return (dispatch, getState, api) => {
        return api.usersService
            .getUsers()
            .then(
                users => dispatch(loadUsersAction(users)),
                err => dispatch(loadUsersAction(err))
            );
    };
}

export function loadCurrentUserId() {
    return (dispatch, getState, api) => {
        return api.usersService
            .getCurrentUserId()
            .then(
                users => dispatch(loadCurrentUserIdAction(users)),
                err => dispatch(loadCurrentUserIdAction(err))
            );
    };
}
