import React, { Component } from 'react';

class NumberOfEvents extends Component {
  
  state = {
    numberOfEvents: '32',
  }
  
  handleInputChanged = (event) => {
    const number = event.target.value;
    if (number <= 0 || number > 32) {
      this.setState({
        numberOfEvents: '',
      });
    } else {
      this.setState({
        numberOfEvents: number,
      });
      this.props.updateNumberofEvents(number);
    }
  };
  
  render() {
    return(
      <div className="NumberOfEvents">
        <p>Number of events:</p>
        <input 
          type="number" 
          className="number"
          value={this.props.numberOfEvents} 
            onChange={this.props.updateNumberofEvents(e)}
            />
      </div>
    )
  }};
  
  export default NumberOfEvents;