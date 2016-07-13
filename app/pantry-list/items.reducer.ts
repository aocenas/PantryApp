import {createReducer} from '../utils';
import {LOAD_ITEMS, TAKE_ITEM} from './items.actions';


// TODO: error handling
// TODO: loading state
export default createReducer([], {
    [LOAD_ITEMS](state, action) {
        if (!action.error) {
            // for now we just replace state with server data
            return action.payload;
        } else {
            return state;
        }
    },

    [TAKE_ITEM](state, action) {
        if (!action.error) {
            const updatedItem = action.payload;
            return state.map(item => {
                if (item.id === updatedItem.id) {
                    return updatedItem;
                } else {
                    return item;
                }
            });
        } else {
            return state;
        }
    }
})