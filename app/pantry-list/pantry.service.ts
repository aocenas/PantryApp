import {fetch} from '../utils';

export default class PantryService {
    private itemsUrl = 'api/v1/pantry-items';
    private takeItemUrl = (userId: number, itemId: number) => `api/v1/user/${userId}/take/${itemId}`;

    getItems(): Promise<any[]> {
        return fetch(this.itemsUrl)
            .then(response => response.json())
            .then(data => data.items)
            .catch(this.handleError);
    }


    takeItem(itemId: number, userId: number): Promise<any[]> {
        return fetch(this.takeItemUrl(userId, itemId), {method: 'POST'})
            .then(response => response.json())
            .then(data => data.item)
            .catch(this.handleError);
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
