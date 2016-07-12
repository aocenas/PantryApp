import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class UserService {
    private usersUrl = 'app/users';  // URL to web api

    constructor(private http: Http) { }

    getUsers(): Promise<Object[]> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
