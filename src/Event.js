import React, { Component } from "react";

class Event extends Component {

  state = {
    collapsed: true
  };
  
  handleClick= ()  => {
    this.setState({
        collapsed: !this.state.collapsed
    });
  };

  render() {
    const { event} = this.props;
        const { collapsed } = this.state;
        
        return <div className='event'>
        
        <p className='summary'>{event.summary}</p>
        <p className='dateTime'>{event.dateTime}</p>
        <p className='timeZone'>{event.timeZone}</p>
        <p className='location'>@{event.summary} | {event.location}</p>
        if(collapsed === true){
            <button className='show-details'
        onClick={this.handleClick}>show Details</button>
        }
        else{
          <div className="details-view">
            <h2 className="details-header">About event:</h2>
            <a href={event.htmlLink} className='htmlLink' target='_blank'>See details on Google Calendar</a>
            <p className='description'>{event.description}</p>
            <button className='hide-details'
            onClick={this.handleClick}>hide Details</button>
          </div>
        }
    </div>;  
    }
}
export default Event;