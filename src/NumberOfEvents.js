import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  
  state = {
    numberOfEvents: '32',
    infoText: "",
  }
  
  handleInputChanged = (event) => {
    const number = event.target.value;
    if (number <= 0 || number > 32) {
      this.setState({
        numberOfEvents: "",
        infoText: "Please enter a number between 1 and 32.",
      });
    } else {
      this.setState({
        numberOfEvents: number,
        infoText: "",
      });
      this.props.updateNumberofEvents(number);
    }
  };
  
  render() {
    return(
      <div className="NumberOfEvents">
        <ErrorAlert text={this.props.errorText} />
        <p>Number of events:</p>
        <input 
          type="number" 
          className="number"
          value={this.props.numberOfEvents} 
          onChange={(e) => this.props.updateNumberOfEvents(e)}
            />
      </div>
    )
  }};
  
  export default NumberOfEvents;