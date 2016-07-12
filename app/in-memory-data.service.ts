function randomCount() {
    return Math.ceil(Math.random() * 100);
}

export class InMemoryDataService {
    createDb() {
        const users = [
            {id: 1, name: 'Andrej'},
            {id: 2, name: 'Palo'},
            {id: 3, name: 'Teo'},
        ];

        const items = [
            'Snickers',
            'Chips',
            'Chocolate',
            'Dru tycinky',
            'Banany',
        ].map((name, index) => ({id: index, name, count: randomCount()}));

        return {
            users,
            'pantry-items': items,
        };
    }
}
