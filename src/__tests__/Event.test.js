import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<EventList /> component', () => {

    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData} />);
    });

    test('render event', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    });
    
    test('render summary', () => {
        expect(EventWrapper.find('.summary')).toHaveLength(1);
    });

    test('render dateTime', () => {
        expect(EventWrapper.find('.dateTime')).toHaveLength(1);
    });

    test('render timezone', () => {
        expect(EventWrapper.find('.timeZone')).toHaveLength(1);
    });

    test('render location', () => {
        expect(EventWrapper.find('.location')).toHaveLength(1);
    });

    test('render show details button', () => {
        expect(EventWrapper.find('.show-details')).toHaveLength(1);
    });

    test('hide details when button is clicked', () => {
        EventWrapper.setState({
            collapsed: false
        });
        EventWrapper.find('.hide-details').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(true);
    });

}); 