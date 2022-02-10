import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

  let NumberOfEventsWrapper;
  beforeAll(() => {
      NumberOfEventsWrapper = shallow(<NumberOfEvents/>);
  });

  test('render text input', () => {
      expect(NumberOfEventsWrapper.find('.number')).toHaveLength(1);
  });

  test("render textbox element correctly", () => {
    expect(NumberOfEventsWrapper.find(".new-number-of-events")).toHaveLength(1);
  });

  test("Change event on textbox", () => {
    expect(NumberOfEventsWrapper);
  });

});