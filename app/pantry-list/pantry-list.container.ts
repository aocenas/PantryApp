import {connect} from 'react-redux';

import {takeItem} from './items.actions';
import PantryListComponent from './pantry-list.component';


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
