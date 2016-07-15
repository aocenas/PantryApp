jest.unmock('../app/users/users.reducer');
jest.unmock('../app/users/users.actions');
jest.unmock('../app/utils');
jest.unmock('./test-data');

import usersReducer from '../app/users/users.reducer';
import {loadCurrentUserIdAction, loadUsersAction} from '../app/users/users.actions';
import {users} from './test-data';

describe('UsersReducer', () => {

    it('handles load users', () => {
        const state = usersReducer(null, loadUsersAction(users));
        expect(state.users).toEqual(users);
    });


    it('handles load current user', () => {
        const state = usersReducer(null, loadCurrentUserIdAction(42));
        expect(state.currentUserId).toBe(42);
    });

});