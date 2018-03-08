/* eslint-disable */
var createReactClass = require('create-react-class');
import Line from './Line'
const DataSeries = createReactClass({

  getDefaultProps() {
    return {
      data: [],
      interpolationType: 'cardinal',
      colors: d3.scale.category10()
    };
  },

  render() {
    let { data, colors, xScale, yScale, interpolationType } = this.props;

    let line = d3.svg.line()
      .interpolate(interpolationType)
      .x((d) => { return xScale(d.x); })
      .y((d) => { return yScale(d.y); });

    let lines = data.points.map((series, id) => {
      return (
        <Line
          path={line(series)}
          stroke={colors(id)}
          key={id}
          />
      );
    });

    return (
      <g>
        <g>{lines}</g>
      </g>
    );
  }

});
export default DataSeries