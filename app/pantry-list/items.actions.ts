import { Injectable } from '@angular/core';

import PantryService from '../pantry.service';
import {makeAction} from '../utils';

export const LOAD_ITEMS = 'LOAD_ITEMS';
const loadItemsAction = makeAction(LOAD_ITEMS);

export const TAKE_ITEM = 'TAKE_ITEM';
const takeItemAction = makeAction(TAKE_ITEM);


@Injectable()
export class ItemsActions {

    constructor(
        private pantryService: PantryService
    ) {}

    loadItems() {
        return (dispatch) => {
            return this.pantryService
                .getItems()
                .then(
                    items => dispatch(loadItemsAction(items)),
                    err => dispatch(loadItemsAction(err))
                );
        };
    };


    takeItem(itemId) {
        return (dispatch) => {
            return this.pantryService
                .takeItem(itemId)
                .then(
                    item => dispatch(takeItemAction(item)),
                    err => dispatch(takeItemAction(err))
                );
        };
    }
}