import React, { Component } from 'react';
import * as d3 from "d3";

import './LineChart.css';

class LineChart extends Component {
    componentDidMount() {
        setGraphArea();
      }

    render() {
      return (
        <svg width="80vw" height="40vh">
            <rect width="100%" height="100%"></rect>
        </svg>
      );
    }
  }

function setGraphArea() {
    return d3.select('rect')
        .attr('fill', '#e6eeff');
}

export default LineChart;