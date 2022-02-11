import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { shallow } from 'enzyme';
import Event from '../Event';
import EventList from '../EventList';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  test('An event element is collapsed by default', ({ given, when, then }) => {

    given('the event element is collapsed by default', () => {
    });

    let EventListWrapper;
    when('the list of events is displayed', () => {
      EventListWrapper = shallow(<EventList events={mockData} />);
      expect(EventListWrapper.find(".EventList")).toHaveLength(1);
    });

    let EventWrapper;
    then('the user should see event element in its collapsed form by default', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      let eventDetails = EventWrapper.find(".event .extra-details");
      expect(EventWrapper.state("collapsed")).toBe(true);
    });

});

test('User can expand an event to see its details', ({ given, when, then }) => {

  let EventWrapper;
  given('the user is on the main page with a selected list of events at disposal', () => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
    expect(EventWrapper.state("collapsed")).toBe(true);
  });

  when('user clicks on the event button to show details', () => {
    const showDetailsButton = EventWrapper.find(".show-details");
      showDetailsButton.simulate("click");
  });

  then('the element will see expand and show its details', () => {
    expect(EventWrapper.state("collapsed")).toBe(false);
  });

});

test('User can collapse an event to hide its details', ({ given, when, then }) => {

  let EventWrapper;
  given('the event had its element expanded previously to have its details seen', () => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.setState({ collapsed: false });
  });

  when('user can click on the event element button to hide details', () => {
    const HideDetailsButton = EventWrapper.find(".hide-details");
    HideDetailsButton.simulate("click");
  });

  then('the user should see event go back to its collapsed form', () => {
    expect(EventWrapper.state("collapsed")).toBe(true);
  });

});

});