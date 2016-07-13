// make sure all models are loaded
import PantryItem from './models/pantry-item.model';
import User from './models/user.model';
import db from './config/db';
import {userNames, itemNames} from './config/init-data';

function randomCount() {
    return Math.ceil(Math.random() * 10);
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
