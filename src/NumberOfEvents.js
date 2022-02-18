import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberEvents: 32,
  };

  handleInputChange = event => {
    const number = event.target.value;

    if (number <= 0) {
      this.setState({
        numberEvents: number,
        errorText: 'Please enter a number between 1 and 32.'
      })
    } else if (number > 32) {
      this.setState({
        numberEvents: number,
        errorText: 'Please enter a number between 1 and 32.'
      })
    } else {
      this.setState({
        numberEvents: number,
        errorText: ''
      })
    }
    this.props.updateEventNumber(event);
  }

  render() {

    return (

      <div className='NumberOfEvents'>

        <p>Number of events:</p>

        <input
          type="number"
          className="numberInput"
          value={this.state.numberEvents}
          onChange={this.handleInputChange}
        />

        <ErrorAlert text={this.state.errorText} />

      </div>
    );
  }
}

export default NumberOfEvents;