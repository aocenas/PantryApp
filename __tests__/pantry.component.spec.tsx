jest.unmock('../app/pantry-list/pantry-list.component');
jest.unmock('./test-data');
jest.unmock('classnames');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import PantryListComponent from '../app/pantry-list/pantry-list.component';
import {users, items} from './test-data';

describe('PantryListComponent', () => {
    let component;
    let takeItemMock;

    beforeEach(() => {
        // create mock function
        takeItemMock = jest.fn(() => Promise.resolve());

        component = TestUtils.renderIntoDocument(
            <PantryListComponent
                users={users}
                items={items}
                takeItem={takeItemMock}
                currentUserId={users[0].id}
            />
        );
    });

    it('renders items correctly', () => {
        const listItems = TestUtils.scryRenderedDOMComponentsWithTag(component, 'label');
        listItems.forEach((item, index) => {
            expect(item.textContent).toMatch(items[index].name);
        });
    });

    it('submits form with correct data', () => {
        const input = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')[1];
        const select = TestUtils.findRenderedDOMComponentWithTag(component, 'select');
        const form = TestUtils.findRenderedDOMComponentWithTag(component, 'form');

        // select pantry item
        TestUtils.Simulate.change(
            input,
            {target: {checked: true}}
        );

        // select user
        TestUtils.Simulate.change(
            select,
            {target: {value: users[1].id}}
        );

        TestUtils.Simulate.submit(form);
        expect(takeItemMock).toBeCalledWith(items[1].id, users[1].id);

    });

    it('shows error message when item is not selected', () => {
        const form = TestUtils.findRenderedDOMComponentWithTag(component, 'form');
        TestUtils.Simulate.submit(form);

        const alert = TestUtils.findRenderedDOMComponentWithClass(component, 'alert-danger');
        expect(alert).toBeDefined();
        expect(alert.textContent).toBe('You need to select a snack to take.');
    });

});