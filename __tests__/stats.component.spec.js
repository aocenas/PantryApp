"use strict";
jest.unmock('../app/stats/stats.component');
jest.unmock('./test-data');
jest.unmock('lodash');
jest.unmock('classnames');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var stats_component_1 = require('../app/stats/stats.component');
var test_data_1 = require('./test-data');
describe('StatsComponent', function () {
    var component;
    var loadStatsMock;
    beforeEach(function () {
        // create mock function
        loadStatsMock = jest.fn(function () { return Promise.resolve(); });
        component = TestUtils.renderIntoDocument(React.createElement(stats_component_1.default, {users: test_data_1.users, items: test_data_1.items, stats: test_data_1.stats, loadStats: loadStatsMock}));
    });
    it('renders items correctly', function () {
        var panels = TestUtils.scryRenderedDOMComponentsWithClass(component, 'panel');
        expect(panels.length).toBe(2);
        expect(panels[0].textContent).toMatch(test_data_1.users[0].name);
        expect(panels[1].textContent).toMatch(test_data_1.users[1].name);
        panels.forEach(function (panel) {
            var listItems = panel.getElementsByTagName('li');
            expect(listItems.length).toBe(2);
        });
    });
    it('loads data on mount', function () {
        expect(loadStatsMock).toBeCalled();
    });
});
//# sourceMappingURL=stats.component.spec.js.map