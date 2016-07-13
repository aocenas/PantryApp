const Sequelize = require('sequelize');

import User from './user.model';
import PantryItem from './pantry-item.model';
import db from './db';

// for statistics to track snacks taken
const Action = db.define('Action', {
    type: {
        // yeah not too much types for now but who knows what will the future bring
        type: Sequelize.ENUM('take'),
        allowNull: false,
    },
});

Action.belongsTo(User);
Action.belongsTo(PantryItem);

export default Action;
