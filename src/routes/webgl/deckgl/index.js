import React, { Component } from 'react'
import echarts from 'echarts'
import 'echarts-gl'

export default class Echart extends Component {
  componentDidMount () {
    let chart = echarts.init(document.getElementById('main'))
    let chart1 = echarts.init(document.getElementById('main1'))
    chart.setOption({
      grid3D: {},
      xAxis3D: {},
      yAxis3D: {},
      zAxis3D: {},
      series: [{
        type: 'scatter3D',
        symbolSize: 50,
        data: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
        itemStyle: {
          opacity: 1,
        },
        animationDurationUpdate: 10000,
      }],
    })
    function makeGaussian (amplitude, x0, y0, sigmaX, sigmaY) {
      return function (amplitude, x0, y0, sigmaX, sigmaY, x, y) {
        let exponent = -(
          (Math.pow(x - x0, 2) / (2 * Math.pow(sigmaX, 2)))
          + (Math.pow(y - y0, 2) / (2 * Math.pow(sigmaY, 2)))
        )
        return amplitude * Math.pow(Math.E, exponent)
      }.bind(null, amplitude, x0, y0, sigmaX, sigmaY)
    }
    // 创建一个高斯分布函数
    let gaussian = makeGaussian(50, 0, 0, 20, 20)
    let data = []
    for (let i = 0; i < 1000; i++) {
      // x, y 随机分布
      let x = Math.random() * 100 - 50
      let y = Math.random() * 100 - 50
      let z = gaussian(x, y)
      data.push([x, y, z])
    }
    chart1.setOption({
      grid3D: {},
      xAxis3D: {},
      yAxis3D: {},
      zAxis3D: { max: 100 },
      series: [{
        type: 'scatter3D',
        data: data,
      }],
    })
  }

  render () {
    return (
      <div>
        <div id="main" style={{ width: 500, height: 500 }} />
        <div id="main1" style={{ width: 500, height: 500 }} />
      </div>
    )
  }
}
