import db from './db';
const Sequelize = require('sequelize');

export default db.define('User', {
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
    },
});
