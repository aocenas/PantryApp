import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export default class PantryService {
    private itemsUrl = 'api/v1/pantry-items';
    private takeItemUrl = (id: number) => `api/v1/pantry-items/take/${id}`;

    constructor(private http: Http) { }

    getItems(): Promise<any[]> {
        return this.http.get(this.itemsUrl)
            .toPromise()
            .then(response => response.json().items)
            .catch(this.handleError);
    }


    takeItem(itemId: number): Promise<any[]> {
        return this.http.post(this.takeItemUrl(itemId), null)
            .toPromise()
            .then(response => response.json().item)
            .catch(this.handleError);
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
