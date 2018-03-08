import React from 'react'
import PropTypes from 'prop-types'

import BarChart from './BarChartComponent'
import PieChartComponent from './PieComponent'
import LineChartComponent from './line/LineChartComponent'


const D3Component = ({ type }) => {
  if (type === 'areaChart') return (<BarChart />)
  if (type === 'barChart') return (<BarChart />)
  if (type === 'lineChart') return (<LineChartComponent />)
  return (<PieChartComponent />)
}

D3Component.propTypes = {
  type: PropTypes.string,
}

export default D3Component
