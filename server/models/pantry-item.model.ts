const mockItemsNames = [
    'Snickers',
    'Chips',
    'Chocolate',
    'Dru tycinky',
    'Banany',
];

export class PantryItem {

    constructor(
        public id: number,
        public count: number,
        public name: string
    ) {}

    static getAllItems() {
        return mockItemsNames.map((name, index) =>
            new PantryItem(index, Math.ceil((Math.random() * 100)), name)
        );
    }
}

