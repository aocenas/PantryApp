import {createReducer} from '../utils';
import {LOAD_ITEMS} from './items.actions';


export default createReducer([], {
    [LOAD_ITEMS](state, action) {
        // TODO: error handling
        // TODO: loading state

        if (!action.error) {
            // for now we just replace state with server data
            return action.payload;
        } else {
            return state;
        }
    }
})