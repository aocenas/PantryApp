import {fetch} from '../utils';

export default class StatsService {
    private actionsUrl = 'api/v1/actions';

    getActions(): Promise<any[]> {
        return fetch(this.actionsUrl)
            .then(response => response.json())
            .then(data => data.actions)
            .catch(this.handleError);
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
