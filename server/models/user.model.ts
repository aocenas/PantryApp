const userNames = [
    'andrej',
    'teo',
    'palo'
];

export class User {

    constructor(
        public id: number,
        public name: string
    ) {}

    static getAllUsers() {
        return userNames.map((name, index) =>
            new User(index, name)
        );
    }
}

