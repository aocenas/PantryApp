import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {OpaqueToken} from '@angular/core';

import usersReducer from '../pantry-list/users.reducer';
import itemsReducer from '../pantry-list/items.reducer';

// combine reducers
const rootReducer = combineReducers({
    users: usersReducer,
    items: itemsReducer,
    // actions: actionsReducer
});

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);
export const STORE_TOKEN = new OpaqueToken('store');
