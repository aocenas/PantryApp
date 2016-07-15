
export function fetch(url, options) {
    return global.fetch(url, Object.assign({}, options, {
        // make sure cookies are sent
        credentials: 'same-origin',
    }));
}


// from http://redux.js.org/docs/recipes/ReducingBoilerplate.html
export function createReducer(initialState: any, handlers: Object) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}


/**
 * Standard flux action https://github.com/acdlite/flux-standard-action.
 */
type Action = {
    type: string,
    payload?: any,
    error?: boolean
}

/**
 * Helper to create flux standard actions. Takes type and returns functions that takes optional payload and creates
 * correct action object.
 */
export function makeAction(type: string) {
    return (payload?: any): Action => {
        const action: Action = {type};
        if (payload) {
            action.payload = payload;
            if (payload instanceof Error) {
                action.error = true;
            }
        }
        return action;
    };
}

