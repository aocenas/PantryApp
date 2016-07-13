import { Injectable } from '@angular/core';

import UserService from '../user.service';
import {makeAction} from '../utils';

export const LOAD_USERS = 'LOAD_USERS';
const loadUsersAction = makeAction(LOAD_USERS);


@Injectable()
export class UsersActions {

    constructor(
        private userService: UserService
    ) {}

    loadUsers() {
        return (dispatch) => {
            return this.userService
                .getUsers()
                .then(
                    users => dispatch(loadUsersAction(users)),
                    err => dispatch(loadUsersAction(err))
                );
        };
    };
}