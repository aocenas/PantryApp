import * as React from 'react';
import {connect} from 'react-redux';

import {loadStats} from './stats.actions';
import StatsComponent from './stats.component';


function mapStateToProps(state) {
    return {
        users: state.users.users,
        items: state.items,
        stats: state.stats,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadStats: () => dispatch(loadStats()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsComponent);
