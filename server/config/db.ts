const Sequelize = require('sequelize');

// SQLite, by default in memory, should be enough for the demo
export default new Sequelize({
    dialect: 'sqlite',

    // TODO: logging
    // logging: false,

    define: {
        paranoid: true,

        // probably not needed here as we use sqlite, but in case of using posgress I would make sure everything is
        // properly underscored.
        // underscored: true,
        // underscoredAll: true,
    },
});
