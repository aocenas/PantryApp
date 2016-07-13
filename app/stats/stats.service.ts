import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export default class StatsService {
    private actionsUrl = 'api/v1/actions';

    constructor(private http: Http) { }

    getActions(): Promise<any[]> {
        return this.http.get(this.actionsUrl)
            .toPromise()
            .then(response => response.json().actions)
            .catch(this.handleError);
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
