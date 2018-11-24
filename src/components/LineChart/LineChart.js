import React, { Component } from 'react';
import * as d3 from "d3";

import getRenewables from '../../service/dataRenewables'
import './LineChart.css';

class LineChart extends Component {
  componentDidMount() {
    getData()
      .then(
        data => drawGraph(data)
      );
  }

  render() {
    return (
      <svg width="80vw" height="60vh"></svg>
    );
  }
}

function getData() {
  return getRenewables()
    .then(json => json.data.filter(item => item.location === "WORLD"))
    .then(json => json.filter(item => item.value !== ""))
    .then(data => data.map(
      data => {
        return {
          value: data.value,
          date: data.time
        }
      }
    ))
}

function drawGraph(data) {
  var width = d3.select('svg').style('width')
  var height = d3.select('svg').style('height')

  var margin = { top: 20, right: 40, bottom: 20, left: 40 }

  var x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right])

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top])

  var line = d3.line()
    .defined(d => !isNaN(d.value))
    .x(d => x(d.date))
    .y(d => y(d.value))

  const svg = d3.select('svg');

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line);

  return svg.node();
}

export default LineChart;