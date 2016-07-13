import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export default class UsersService {
    private usersUrl = 'api/v1/users';
    private currentUserUrl = 'api/v1/users/current';

    constructor(private http: Http) { }

    getUsers(): Promise<any[]> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(response => response.json().users)
            .catch(this.handleError);
    }

    getCurrentUserId(): Promise<number> {
        return this.http.get(this.currentUserUrl)
            .toPromise()
            .then(response => response.json().id)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
