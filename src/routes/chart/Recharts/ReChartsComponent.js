import React from 'react'
import PropTypes from 'prop-types'

import AreaChartComponent from './AreaChartComponent'
import BarChartComponent from './BarChartComponent'
import LineChartComponent from './LineChartComponent'
import PieChartComponent from './PieChartComponent'


const ReChartsComponent = ({ type }) => {
  if (type === 'areaChart') return (<AreaChartComponent />)
  if (type === 'barChart') return (<BarChartComponent />)
  if (type === 'lineChart') return (<LineChartComponent />)
  return (<PieChartComponent />)
}

ReChartsComponent.propTypes = {
  type: PropTypes.string,
}

export default ReChartsComponent
