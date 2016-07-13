import {createReducer} from '../utils';
import {LOAD_ACTIONS} from './stats.actions';


// TODO: error handling
// TODO: loading state
export default createReducer([], {
    [LOAD_ACTIONS](state, action) {
        if (!action.error) {
            return action.payload;
        } else {
            return state;
        }
    }
})