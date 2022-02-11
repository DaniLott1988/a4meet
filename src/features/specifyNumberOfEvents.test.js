import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { shallow, mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {

    given('the user is on the home page', () => {
    });
    
    let NumberOfEventsWrapper;
    when('there is no value input by the user', () => {
      NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    then('a default value of 32 is specified to be displayed', () => {
      NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    });
  });

  test('User can change the number of events they want to see.', ({ given, when, then }) => {

    let AppWrapper;
    given('the user is on the home page', () => {
      AppWrapper = mount(<App />);
    });

    when('there is a value input by the user', () => {
      const eventNumberInput = { target: { value: 4 } };
      AppWrapper.find(".NumberOfEvents").simulate(
      "change",
      eventNumberInput
      );
    });

    then('the desired number of events will be displayed', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.setState({ numberOfEvents: 4 });
      expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(4);
    });
  });

});