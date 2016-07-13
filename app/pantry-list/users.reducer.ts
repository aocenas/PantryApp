import {createReducer} from '../utils';
import {LOAD_USERS} from './users.actions';


export default createReducer([], {
    [LOAD_USERS](state, action) {
        // TODO: error handling
        // TODO: loading state

        if (action.payload && !action.error) {
            // for now we just replace state with server data
            return action.payload;
        } else {
            return state;
        }
    }
})