const express = require('express');

import Action from './models/actions.model';
import PantryItem from './models/pantry-item.model';
import User from './models/user.model';

const router = express.Router();

/**
 * Decrement count on particular item.
 */
router.post('/user/:userId/take/:itemId/', function takePantryItem(req, res, next) {
    let itemId: number;
    let userId: number;
    // make sure we have correct input
    try {
        itemId = parseInt(req.params.itemId, 10);
        userId = parseInt(req.params.userId, 10);
    } catch (error) {
        res.status(400).end();
    }

    Promise
        .all([
            PantryItem.findById(itemId),
            User.findById(userId),
        ])
        .then(([item, user]) => {
            if (!(item && user)) {
                res.status(404).end();
            } else {
                if (item.count > 0) {
                    return item
                        .decrement('count', {by: 1})
                        // TODO: PERF: we could just modify data in place
                        .then(item => item.reload())
                        .then(() => Action.create({
                            type: 'take',
                            UserId: user.id,
                            PantryItemId: item.id,
                        }))
                        .then(() => res.json({item}));
                } else {
                    res.status(400).json({message: 'Out of stock'});
                }
            }
        })
        .catch(next);
});

router.get('/pantry-items', function getPantryItems(req, res, next) {
    PantryItem
        .findAll()
        .then(items => res.json({items}))
        .catch(next);
});

router.get('/users', function getUsers(req, res, next) {
    User
        .findAll()
        .then(users => res.json({users}))
        .catch(next);
});

router.get('/actions', function getActions(req, res, next) {
    Action
        .findAll()
        .then(actions => res.json({actions}))
        .catch(next);
});

export default router;
