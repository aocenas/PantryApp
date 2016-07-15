"use strict";
jest.unmock('../app/users/users.reducer');
jest.unmock('../app/users/users.actions');
jest.unmock('../app/utils');
jest.unmock('./test-data');
var users_reducer_1 = require('../app/users/users.reducer');
var users_actions_1 = require('../app/users/users.actions');
var test_data_1 = require('./test-data');
describe('UsersReducer', function () {
    it('handles load users', function () {
        var state = users_reducer_1.default(null, users_actions_1.loadUsersAction(test_data_1.users));
        expect(state.users).toEqual(test_data_1.users);
    });
    it('handles load current user', function () {
        var state = users_reducer_1.default(null, users_actions_1.loadCurrentUserIdAction(42));
        expect(state.currentUserId).toBe(42);
    });
});
//# sourceMappingURL=users.reducer.spec.js.map