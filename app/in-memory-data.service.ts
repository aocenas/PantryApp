export class InMemoryDataService {
    createDb() {
        let users = [
            {id: 1, name: 'Andrej'},
            {id: 2, name: 'Palo'},
            {id: 3, name: 'Teo'},
        ];
        return {users};
    }
}
