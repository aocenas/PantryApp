import * as React from 'react';
const cx = require('classnames');
import {connect} from 'react-redux';

import {takeItem} from './items.actions';

type Props = {
    users: any[],
    currentUserId: number,
    items: any[],
    takeItem: Function,
}
type State = {
    showSelectItemError: boolean,
    selectedItemId: number,
    selectedUserId: number,
}
class PantryListComponent extends React.Component<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
        super(props);
        this.state = {
            showSelectItemError: false,
            selectedItemId: null,
            selectedUserId: this.props.currentUserId || (this.props.users.length && this.props.users[0].id),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.currentUserId && nextProps.currentUserId) {
            // current user was loaded from the server
            this.setState({
                selectedUserId: nextProps.currentUserId,
            });
        }

        if (this.props.users.length !== nextProps.users.length && !this.state.selectedUserId) {
            // select first user from users if not already selected, if current user comes later, it will take
            // precedence
            this.setState({
                selectedUserId: nextProps.users[0].id,
            });
        }
    }

    render() {
        return (
            <div className="pantry-list">
                <h1>Pantry</h1>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    {this.props.items ?
                        <div className="list-group">
                            {this.props.items.map(item =>
                                <label
                                    className={cx('list-group-item', {disabled: item.count === 0})}
                                    key={item.id}
                                >
                                    <input
                                        type="radio"
                                        name="pantry_item"
                                        checked={item.id === this.state.selectedItemId}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                this.setState({
                                                    showSelectItemError: false,
                                                    selectedItemId: item.id,
                                                });
                                            }
                                        }}
                                        disabled={item.count === 0}
                                    />
                                    &nbsp;
                                    {item.name}
                                    <span className="badge">{item.count} left</span>
                                </label>
                            )}
                        </div> : null
                    }

                    {this.state.showSelectItemError ?
                        <div className="alert alert-danger">
                            You need to select a snack to take.
                        </div> : null
                    }

                    <div className="form-group bottom">
                        {this.props.users ?
                            <select
                                className="form-control"
                                required
                                value={this.state.selectedUserId}
                                onChange={(event) => this.setState({selectedUserId: event.target.value})}
                                name="user_id"
                            >
                                {this.props.users.map(user =>
                                    <option
                                        value={user.id}
                                        key={user.id}
                                    >
                                        {user.name}
                                    </option>
                                )}
                            </select> : null
                        }
                        <button type="submit" className="btn btn-primary">Take a snack</button>
                    </div>
                </form>
            </div>
        );
    }

    onSubmit(event) {
        event.preventDefault();
        if (!this.state.selectedItemId) {
            this.setState({showSelectItemError: true});
            return;
        }

        this._submitPromise = this.props.takeItem(this.state.selectedItemId, this.state.selectedUserId)
            .then(() => this.setState({selectedItemId: null}));
    }
}


function mapStateToProps(state) {
    return {
        users: state.users.users,
        currentUserId: state.users.currentUserId,
        items: state.items,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        takeItem: (userId, itemId) => dispatch(takeItem(userId, itemId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PantryListComponent);

