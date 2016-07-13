import {createReducer} from '../utils';
import {LOAD_USERS, LOAD_CURRENT_USER_ID} from './users.actions';

const initialState = {
    users: [],
    currentUserId: null,
};

// TODO: error handling
// TODO: loading state
export default createReducer(initialState, {
    [LOAD_USERS](state, action) {
        if (!action.error) {
            return Object.assign({}, state, {
                users: action.payload,
            });
        } else {
            return state;
        }
    },

    [LOAD_CURRENT_USER_ID](state, action) {
        if (!action.error) {
            return Object.assign({}, state, {
                currentUserId: action.payload,
            });
        } else {
            return state;
        }
    },
});