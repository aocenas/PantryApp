import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class PantryService {
    private itemsUrl = 'app/pantry-items';  // URL to web api

    constructor(private http: Http) { }

    getItems(): Promise<Object[]> {
        return this.http.get(this.itemsUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
