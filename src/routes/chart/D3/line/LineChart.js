/* eslint-disable */
var createReactClass = require('create-react-class');

import DataSeries from './DataSeries'

const LineChart = createReactClass({

  getDefaultProps(){
    return {
      width: 600,
      height: 300
    }
  },

  render() {
    let { width, height, data } = this.props;

    let xScale = d3.scale.ordinal()
                   .domain(data.xValues)
                   .rangePoints([0, width]);

    let yScale = d3.scale.linear()
                   .range([height, 10])
                   .domain([data.yMin, data.yMax]);

    return (
      <svg width={width} height={height}>
          <DataSeries
            xScale={xScale}
            yScale={yScale}
            data={data}
            width={width}
            height={height}
            />
      </svg>
    )
  }

})
export default LineChart