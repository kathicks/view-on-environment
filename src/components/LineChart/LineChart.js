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
    .then(data => data.filter(item => item.value !== ""))
    .then(data => data.map(
      data => {
        return {
          date: data.time,
          value: data.value
        }
      }
    ))
}

function drawGraph(data) {
  var width = parseFloat(d3.select('svg').style('width'))
  var height = parseFloat(d3.select('svg').style('height'))

  var x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width])

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height, 0])

  var line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value))

  const svg = d3.select('svg');

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-width", 1.5)
    .attr("d", line);
  
  svg.attr("fill", "grey")

  return svg.node();
}

export default LineChart;