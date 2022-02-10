import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';

class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: "all"
  };

  updateEvents = async (location, numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.numberOfEvents),
          currentLocation: location,
        });
      }
    });
  }

  updateNumberOfEvents = async (e) => {
    const newNumber = e.target.value ? parseInt(e.target.value) : 32;
    if (newNumber < 1 || newNumber > 32) {
      this.setState({
        numberOfEvents: '32',
      });
    } else {
      this.setState({
        errorText: "",
        numberOfEvents: newNumber,
      });
      this.updateEvents(this.state.currentLocation, this.state.numberOfEvents);
    }
  };

  componentDidMount() {
    const { numberOfEvents } = this.state;
    this.mounted = true;
    getEvents().then((events) => {
      this.setState({
        events: events.slice(0, numberOfEvents),
        locations: extractLocations(events)
      });
    });
  }

  getData = () => {
    if (this.mounted) {
      const { locations, events } = this.state;
      const data = locations.map((location) => {
        const number = events.filter((event) => event.location === location).length
        const city = location.split(', ').shift();
        return { city, number };
      });
      return data;
    }
  };

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    return (
      <div className='App'>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
