import React from 'react'
import { Radio } from 'antd'
import { Page } from 'components'
import D3Component from './D3Component'
import styles from './index.less'

const RadioGroup = Radio.Group

const chartList = [
  {
    label: 'lineChart',
    value: 'lineChart',
  },
  {
    label: 'barChart',
    value: 'barChart',
  },
  {
    label: 'areaChart',
    value: 'areaChart',
  },
  {
    label: 'pieChart',
    value: 'pieChart',
  },
]

class Chart extends React.Component {
  constructor () {
    super()
    this.state = {
      type: '',
    }
    this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this)
  }
  handleRadioGroupChange (e) {
    this.setState({
      type: e.target.value,
    })
  }
  render () {
    return (<Page inner>
      <RadioGroup options={chartList} defaultValue="pieChart" onChange={this.handleRadioGroupChange} />
      <div className={styles.chart}>
        <D3Component type={this.state.type} />
      </div>
    </Page>)
  }
}


export default Chart
