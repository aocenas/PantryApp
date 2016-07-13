const express = require('express');

import Actions from './models/actions.model';
import PantryItem from './models/pantry-item.model';
import User from './models/user.model';

const router = express.Router();

/**
 * Decrement count on particular item.
 */
router.post('/pantry-items/take/:id', function takePantryItem(req, res, next) {
    let id: number;
    // make sure we have correct input
    try {
        id = parseInt(req.params.id, 10);
    } catch (error) {
        next(error);
    }

    PantryItem
        .findById(id)
        .then(item => {
            if (!item) {
                res.status(404).end();
            }
            // make sure we cannot take items with count == 0
            if (item.count > 0) {
                return item
                    .decrement('count', {by: 1})
                    // TODO: PERF: we could just modify data in place
                    .then(item => item.reload())
                    .then(() => {
                        // TODO: create action log
                        res.json({item});
                    });
            } else {
                res.status(400).json({message: 'Out of stock'});
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
    Actions
        .findAll()
        .then(actions => res.json({actions}))
        .catch(next);
});

export default router;
