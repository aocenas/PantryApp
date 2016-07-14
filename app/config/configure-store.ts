import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import usersReducer from '../users/users.reducer';
import itemsReducer from '../pantry-list/items.reducer';
import statsReducer from '../stats/stats.reducer';


export function configureStore (api: Object) {

    // combine reducers
    const rootReducer = combineReducers({
        users: usersReducer,
        items: itemsReducer,
        stats: statsReducer,
    });
    return createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware.withExtraArgument(api)
        )
    );
};
