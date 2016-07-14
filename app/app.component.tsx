import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {loadUsers, loadCurrentUserId} from './users/users.actions';
import {loadItems} from './pantry-list/items.actions';


type Props = {
    children: any,
    loadItems: Function,
    loadUsers: Function,
    loadCurrentUserId: Function
};
class AppComponent extends React.Component<Props, any> {
    props: Props;

    componentWillMount() {
        this.props.loadItems();
        this.props.loadUsers();
        this.props.loadCurrentUserId();
    }

    render() {
        const {children} = this.props;

        return (
            <div className="app">
                <ul className="nav nav-tabs">
                    <li>
                        <Link to={`/`}>
                            List
                        </Link>
                    </li>
                    <li>
                        <Link to={`/stats`}>
                            Stats
                        </Link>
                    </li>
                </ul>
                {children}
            </div>
        );
    }
}

// we are just loading data, children components will select state
function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        loadItems: () => dispatch(loadItems()),
        loadUsers: () => dispatch(loadUsers()),
        loadCurrentUserId: () => dispatch(loadCurrentUserId()),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);


