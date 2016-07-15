"use strict";
exports.users = ['user1', 'user2'].map(function (name, index) { return ({ name: name, id: index }); });
exports.items = ['item1', 'item2'].map(function (name, index) { return ({ name: name, id: index, count: index }); });
exports.stats = [
    { PantryItemId: 0, UserId: 0 },
    { PantryItemId: 1, UserId: 0 },
    { PantryItemId: 1, UserId: 1 },
    { PantryItemId: 1, UserId: 1 },
].map(function (action, index) {
    return Object.assign(action, {
        id: index,
        type: 'take',
        createdAt: (new Date()).toISOString()
    });
});
//# sourceMappingURL=test-data.js.map