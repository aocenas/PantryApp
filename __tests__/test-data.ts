
export const users = ['user1', 'user2'].map((name, index) => ({name, id: index}));

export const items = ['item1', 'item2'].map((name, index) => ({name, id: index, count: index}));

export const stats = [
    {PantryItemId: 0, UserId: 0},
    {PantryItemId: 1, UserId: 0},
    {PantryItemId: 1, UserId: 1},
    {PantryItemId: 1, UserId: 1},
].map((action, index) =>
    Object.assign(action, {
        id: index,
        type: 'take',
        createdAt: (new Date()).toISOString()
    })
)

