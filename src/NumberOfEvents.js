import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  
  state = {
    numberOfEvents: '32',
    errorText: "",
  }
  
  handleInputChanged = (event) => {
    const number = event.target.value;
    if (number < 1 || number > 32) {
      this.setState({
        numberOfEvents: "32",
        errorText: "Please enter a number between 1 and 32.",
      });
    } else {
      this.setState({
        numberOfEvents: number,
        errorText: "",
      });
      this.props.updateNumberofEvents(value);
    }
  };
  
  render() {
    return(
      <div className="NumberOfEvents">
        <ErrorAlert text={this.state.errorText} />
        <p>Number of events:</p>
        <input 
          type="number" 
          className="number"
          value={this.state.numberOfEvents} 
          onChange={this.handleInputChanged}
            />
      </div>
    )
  }};
  
  export default NumberOfEvents;