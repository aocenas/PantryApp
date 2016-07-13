import db from '../config/db';
const Sequelize = require('sequelize');


/**
 * Represents type of snack in the pantry.
 */
export default db.define('PantryItem', {
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
    },

    count: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});
