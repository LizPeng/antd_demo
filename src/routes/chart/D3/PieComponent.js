import React from 'react'
import ReactDOM from 'react-dom'
import { Page } from 'components'
import * as d3 from 'd3'

class Chart extends React.Component {
  constructor () {
    super()
    this.state = {}
  }
  
  componentDidMount () {
    console.log(d3.version)
    const ele = ReactDOM.findDOMNode(this)
    const dataset = [5, 10, 20, 40, 6, 25]
    const h = 300
    const w = 300
    const centerAxis = h / 2
    const outerRadius = w / 2 - 15
    const innerRadius = w / 3 - 10
    function arcTween (outerRadius, delay) {
      return function () {
        d3.select(this).transition().delay(delay).attrTween("d", function(d) {
          var i = d3.interpolate(d.outerRadius, outerRadius)
          console.log(d.outerRadius, i)
          return function (t) {d.outerRadius = i(t); return arc(d)}
        })
      }
    }
    let arc = d3.svg.arc()
      .padRadius(outerRadius)
      .innerRadius(innerRadius)
    let pie = d3.layout.pie(dataset)
      .padAngle(0.02)

    let svg = d3.select(ele)
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .append('g')
      .attr('transform', `translate(${centerAxis}, ${centerAxis})`)
    let color = d3.scale.category10()

    svg.selectAll('path')
      .data(pie(dataset))
      .enter().append('path')
      .each((d) => { d.outerRadius = outerRadius - 15 })
      .attr('fill', (d, i) => {
        return color(i)
      })
      .on('mouseover', arcTween(outerRadius, 0))
      .on('mouseout', arcTween(outerRadius - 15, 150))
  }
  render () {
    return (
      <Page inner>
        <h2>hello </h2>
      </Page>
    )
  }
}


export default Chart
