import { Injectable } from '@angular/core';

import UsersService from './users.service';
import {makeAction} from '../utils';

export const LOAD_USERS = 'LOAD_USERS';
export const loadUsersAction = makeAction(LOAD_USERS);

export const LOAD_CURRENT_USER_ID = 'LOAD_CURRENT_USER_ID';
export const loadCurrentUserIdAction = makeAction(LOAD_CURRENT_USER_ID);


@Injectable()
export class UsersActions {

    constructor(
        private usersService: UsersService
    ) {}

    loadUsers() {
        return (dispatch) => {
            return this.usersService
                .getUsers()
                .then(
                    users => dispatch(loadUsersAction(users)),
                    err => dispatch(loadUsersAction(err))
                );
        };
    };

    loadCurrentUserId() {
        return (dispatch) => {
            return this.usersService
                .getCurrentUserId()
                .then(
                    users => dispatch(loadCurrentUserIdAction(users)),
                    err => dispatch(loadCurrentUserIdAction(err))
                );
        };
    };
}