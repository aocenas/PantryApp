import db from './db';
const Sequelize = require('sequelize');

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
