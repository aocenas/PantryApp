const express = require('express');

import Action from './models/actions.model';
import PantryItem from './models/pantry-item.model';
import User from './models/user.model';

const router = express.Router();

/**
 * Take an item from pantry as an user. Sends updated item on success.
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
                        // create action object which is used in stats page
                        .then(() => Action.create({
                            type: 'take',
                            UserId: user.id,
                            PantryItemId: item.id,
                        }))
                        .then(() => {
                            req.session.currentUserId = user.id;
                            res.json({item});
                        });
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

/**
 * send current user id, which is user that was last used to take an item from the pantry
 */
router.get('/users/current', function getUsers(req, res, next) {
    res.json({id: req.session.currentUserId})
});

router.get('/actions', function getActions(req, res, next) {
    Action
        .findAll()
        .then(actions => res.json({actions}))
        .catch(next);
});

export default router;
