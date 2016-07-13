import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export default class PantryService {
    private itemsUrl = 'api/v1/pantry-items';

    constructor(private http: Http) { }

    getItems(): Promise<any[]> {
        return this.http.get(this.itemsUrl)
            .toPromise()
            .then(response => response.json().items)
            .catch(this.handleError);
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
