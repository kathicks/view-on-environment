import React, { Component } from 'react';
import Header from './components/Header/Header';
import LineChart from './components/LineChart/LineChart';

class App extends Component {
  state = {
    country: "WORLD",
  }

  handleChange = (event) => 
    this.setState({
      country: event.target.value
    })
  
  render() {
    return (
      <div className="app">
        <Header handleChange={ this.handleChange }/>
        <LineChart country={ this.state.country } />
      </div>
    );
  }
}

export default App;
