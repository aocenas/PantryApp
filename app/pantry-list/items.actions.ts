import {makeAction} from '../utils';
import {loadCurrentUserIdAction} from '../users/users.actions';

export const LOAD_ITEMS = 'LOAD_ITEMS';
const loadItemsAction = makeAction(LOAD_ITEMS);

export const TAKE_ITEM = 'TAKE_ITEM';
const takeItemAction = makeAction(TAKE_ITEM);



export function loadItems() {
    return (dispatch, getState, api) => {
        return api.pantryService
            .getItems()
            .then(
                items => dispatch(loadItemsAction(items)),
                err => dispatch(loadItemsAction(err))
            );
    };
};


export function takeItem(itemId, userId) {
    return (dispatch, getState, api) => {
        return api.pantryService
            .takeItem(itemId, userId)
            .then(
                item => {
                    dispatch(loadCurrentUserIdAction(userId));
                    dispatch(takeItemAction(item));
                },
                err => dispatch(takeItemAction(err))
            );
    };
}
