const React = require('react');
import {Route, IndexRoute} from 'react-router';

import PantryListComponent from '../pantry-list/pantry-list.container';
import StatsComponent from '../stats/stats.container';
import AppComponent from '../app.component';

export default (
    <Route path="/" component={AppComponent}>
        <IndexRoute component={PantryListComponent} />
        <Route path="stats" component={StatsComponent} />
    </Route>
);