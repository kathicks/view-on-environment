import React, { Component } from 'react';
import Header from './components/Header/Header'
import LineChart from './components/LineChart/LineChart';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <LineChart />
      </div>
    );
  }
}

export default App;
