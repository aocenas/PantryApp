import * as express from 'express';

import {PantryItem} from './models/pantry-item.model';
import {User} from './models/user.model';

const router = express.Router();

router.get('/pantry-items', function getPantryItems(req, res, next) {
    const items = PantryItem.getAllItems();
    res.json({items});
});

router.get('/users', function getUsers(req, res, next) {
    const users = User.getAllUsers();
    res.json({users});
});

export default router;
