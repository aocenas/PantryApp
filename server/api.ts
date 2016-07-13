const express = require('express');

import Actions from './models/actions.model';
import PantryItem from './models/pantry-item.model';
import User from './models/user.model';

const router = express.Router();

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
