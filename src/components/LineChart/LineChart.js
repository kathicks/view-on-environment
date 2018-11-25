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
  var parseYear = d3.timeParse("%Y");

  return getRenewables()
    .then(json => json.data.filter(item => item.location === "WORLD"))
    .then(data => data.filter(item => item.value !== ""))
    .then(data => data.map(
      data => {
        return {
          date: parseYear(data.time),
          value: data.value
        }
      }
    ))
}

function drawGraph(data) {
  var margin = { top: 60, right: 60, bottom: 60, left: 60 };
  var width = parseFloat(d3.select('svg').style('width')) - margin.left - margin.right
  var height = parseFloat(d3.select('svg').style('height')) - margin.top - margin.bottom

  var x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width])

  var y = d3.scaleLinear()
    .domain([Math.floor(d3.min(data, d => d.value) - 0.5), Math.ceil(d3.max(data, d => d.value) + 0.5)])
    .range([height, 0])

  const svg = d3.select('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svg
    .append("rect")
    .attr("class", "inner")
    .attr("fill", "#f0eeed")
    .attr("width", width)
    .attr("height", height);
  
  drawAxis(svg, x, y, width, height);
  drawLine(svg, x, y, data);
  drawVertices(svg, x, y, data);

  return svg.node();
}

function drawVertices(svg, x, y, data) {
  svg.selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function (d) { return x(d.date); })
    .attr("cy", function (d) { return y(d.value); })
    .attr("r", 5);
}

function drawLine(svg, x, y, data) {
  var line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));
  
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}

function drawAxis(svg, x, y, width, height) {
  svg.append("g")
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")))
    .attr("transform", "translate(0," + (height) + ")");

  svg.append("text")
    .attr("transform", "translate(" + (width / 2) + " ," + (height + 45) + ")")
    .style("text-anchor", "middle")
    .text("Year");

  svg.append("g")
    .attr("transform", "translate(0," + width - 1 + ")")
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -55)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("% Renewables");
}

export default LineChart;
