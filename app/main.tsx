require('whatwg-fetch');
import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';

import {configureStore} from './config/configure-store';
import routes from './config/app.routes';
import PantryService from './pantry-list/pantry.service';
import UsersService from './users/users.service';
import StatsService from './stats/stats.service';


const store = configureStore({
    statsService: new StatsService(),
    usersService: new UsersService(),
    pantryService: new PantryService(),
});

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('app-root')
);

