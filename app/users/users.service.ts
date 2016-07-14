require('isomorphic-fetch');
declare const fetch: Function;

export default class UsersService {
    private usersUrl = 'api/v1/users';
    private currentUserUrl = 'api/v1/users/current';

    getUsers(): Promise<any[]> {
        return fetch(this.usersUrl)
            .then(response => response.json())
            .then(data => data.users)
            .catch(this.handleError);
    }

    getCurrentUserId(): Promise<number> {
        return fetch(this.currentUserUrl)
            .then(response => response.json())
            .then(data => data.id)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
