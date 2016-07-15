jest.unmock('../app/stats/stats.component');
jest.unmock('./test-data');
jest.unmock('lodash');
jest.unmock('classnames');

import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import StatsComponent from '../app/stats/stats.component';
import {users, items, stats} from './test-data';

describe('StatsComponent', () => {
    let component;
    let loadStatsMock;

    beforeEach(() => {
        // create mock function
        loadStatsMock = jest.fn(() => Promise.resolve());

        component = TestUtils.renderIntoDocument(
            <StatsComponent
                users={users}
                items={items}
                stats={stats}
                loadStats={loadStatsMock}
            />
        );
    });

    it('renders items correctly', () => {
        const panels = TestUtils.scryRenderedDOMComponentsWithClass(component, 'panel');
        expect(panels.length).toBe(2);
        expect(panels[0].textContent).toMatch(users[0].name);
        expect(panels[1].textContent).toMatch(users[1].name);

        panels.forEach(panel => {
            const listItems = panel.getElementsByTagName('li');
            expect(listItems.length).toBe(2);
        });

    });


    it('loads data on mount', () => {
        expect(loadStatsMock).toBeCalled();
    });

});