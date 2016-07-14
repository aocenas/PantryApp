import * as React from 'react';
import {connect} from 'react-redux';
import {groupBy, find} from 'lodash';

import {loadStats} from './stats.actions';


class StatsComponent extends React.Component<any, any> {
    props: {
        users: any[],
        items: any[],
        stats: any[],
        loadStats: Function
    };

    componentWillMount() {
        this.props.loadStats();
    }

    render() {

        const {items, stats, users} = this.props;

        let statsData = null;
        // make sure everything is loaded
        if (stats.length && items.length && users.length) {
            const grouped = groupBy(stats, (action: any) => action.UserId);
            statsData = Object.keys(grouped).map(key => {
                const updatedActions = grouped[key].map(action =>
                    Object.assign({}, action, {
                        item: find(items, {id: action.PantryItemId}),
                    })
                );
                return {
                    actions: updatedActions,
                    user: find(users, {id: parseInt(key)}),
                };
            });
        }

        return (
            <div className="stats-component">
                <h1>Stats</h1>
                {statsData ?
                    statsData.map(data =>
                        <div className="panel panel-default" key={data.user.id}>
                            <div className="panel-body">
                                {data.user.name}
                                <ul>
                                    {data.actions.map(action =>
                                        <li key={action.id}>
                                            took {action.item.name} at {action.createdAt}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ) :
                    <h3>
                        Nobody has taken anything from the pantry yet.
                    </h3>
                }
            </div>
        );
    }
}


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
