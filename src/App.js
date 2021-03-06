import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from "./EventGenre";
import { OfflineAlert } from './Alert';
import { getEvents, extractLocations, checkToken, getAccessToken } from
'./api';
import { mockData } from './mock-data';


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
      currentLocation: 'all',
      showWelcomeScreen: undefined,
       offlineText: ''

    }
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
    if (!navigator.onLine) {
      this.setState({
        offlineText: 'Please notice events will not be updated as you are offline.'
      })
    } else {
        this.setState({
          offlineText: ''
      })
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);

      const eventsToShow = locationEvents.slice(0, numberOfEvents);
      if (this.mounted) {
        this.setState({
          events: eventsToShow,
          currentLocation: location
        });
      }
    });
  };

  updateEventNumber = async (event) => {
    const eventCount = event.target.value ? parseInt(event.target.value) : 32;
    await this.setState({ numberOfEvents: eventCount });
    this.updateEvents(this.state.currentLocation, this.state.numberOfEvents);
  }

  getData = () => {
      const { locations, events } = this.state;
      const data = locations.map((location) => {
        const number = events.filter((event) => event.location === location).length
        const city = location.split(', ').shift();
        return { city, number };
      });
      return data;
  };

  render() {

    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    
    return (

      <div className='App'>

        <h1>Meet App</h1>

        <OfflineAlert text={this.state.offlineText} />

        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />

        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateNumberOfEvents={(event) => this.updateNumberOfEvents(event)} errorText ={this.state.errorText} />

        <p>Events in each city</p>

        <div className="data-vis-wrapper">

          <EventGenre events={this.state.events} />
        
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>

        </div>

        <EventList events={this.state.events} />

        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />

      </div>
    );
  }
}

export default App;
