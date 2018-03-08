import React, { Component } from 'react'
import * as d3 from 'd3'

class BarChart extends Component {
  constructor (props) {
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }
  componentDidMount () {
    this.createBarChart()
  }
  // componentDidUpdate () {
  //   this.createBarChart()
  // }
  createBarChart () {
    const node = this.svgNode
    let margin = {
      top: 20, right: 100, bottom: 30, left: 100
    }
    let width = 960 - margin.left - margin.right
    let height = 500 - margin.top - margin.bottom

    let dataset = [
      { x: 0, y: 5 },
      { x: 1, y: 8 },
      { x: 2, y: 13 },
      { x: 3, y: 12 },
      { x: 4, y: 16 },
      { x: 5, y: 21 },
      { x: 6, y: 18 },
      { x: 7, y: 23 },
      { x: 8, y: 24 },
      { x: 9, y: 28 },
      { x: 10, y: 35 },
      { x: 11, y: 30 },
      { x: 12, y: 32 },
      { x: 13, y: 36 },
      { x: 14, y: 40 },
      { x: 15, y: 38 },
    ]
    let xScale = d3.scale.linear()
      .domain([0, d3.max(dataset, d => d.x)])
      .range([0, width])
    let yScale = d3.scale.linear()
      .domain([0, d3.max(dataset, d => d.y)])
      .range([0, height])
    let xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .innerTickSize(-height)
      .outerTickSize(0)
      .tickPadding(10)
    let yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .innerTickSize(-width)
      .outerTickSize(0)
      .tickPadding(10)
    let line = d3.svg.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
    const svg = d3.select(node).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
    svg.append('path')
      .data([dataset])
      .attr('class', 'line')
      .attr('d', line)

  }
  render () {
    return (
      <div
        ref={(node) => { this.svgNode = node }}
        width={800}
        height={500}
      />
    )
  }
}
export default BarChart