// make sure all models are loaded
import PantryItem from './pantry-item.model';
import User from './user.model';
import db from './db';
import {userNames, itemNames} from './init-data';

function randomCount() {
    return Math.ceil(Math.random() * 100);
}

export default () =>
    db
        .sync()
        .then(() => {
            const users = userNames.map(name => ({name}));
            const items = itemNames.map(name => ({name, count: randomCount()}));

            return Promise.all([
                User.bulkCreate(users),
                PantryItem.bulkCreate(items)
            ]);
        });
