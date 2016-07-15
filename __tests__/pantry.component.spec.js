"use strict";
jest.unmock('../app/pantry-list/pantry-list.component');
jest.unmock('./test-data');
jest.unmock('classnames');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var pantry_list_component_1 = require('../app/pantry-list/pantry-list.component');
var test_data_1 = require('./test-data');
describe('PantryListComponent', function () {
    var component;
    var takeItemMock;
    beforeEach(function () {
        // create mock function
        takeItemMock = jest.fn(function () { return Promise.resolve(); });
        component = TestUtils.renderIntoDocument(React.createElement(pantry_list_component_1.default, {users: test_data_1.users, items: test_data_1.items, takeItem: takeItemMock, currentUserId: test_data_1.users[0].id}));
    });
    it('renders items correctly', function () {
        var listItems = TestUtils.scryRenderedDOMComponentsWithTag(component, 'label');
        listItems.forEach(function (item, index) {
            expect(item.textContent).toMatch(test_data_1.items[index].name);
        });
    });
    it('submits form with correct data', function () {
        var input = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')[1];
        var select = TestUtils.findRenderedDOMComponentWithTag(component, 'select');
        var form = TestUtils.findRenderedDOMComponentWithTag(component, 'form');
        // select pantry item
        TestUtils.Simulate.change(input, { target: { checked: true } });
        // select user
        TestUtils.Simulate.change(select, { target: { value: test_data_1.users[1].id } });
        TestUtils.Simulate.submit(form);
        expect(takeItemMock).toBeCalledWith(test_data_1.items[1].id, test_data_1.users[1].id);
    });
    it('shows error message when item is not selected', function () {
        var form = TestUtils.findRenderedDOMComponentWithTag(component, 'form');
        TestUtils.Simulate.submit(form);
        var alert = TestUtils.findRenderedDOMComponentWithClass(component, 'alert-danger');
        expect(alert).toBeDefined();
        expect(alert.textContent).toBe('You need to select a snack to take.');
    });
});
//# sourceMappingURL=pantry.component.spec.js.map