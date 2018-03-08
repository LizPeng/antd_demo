import React from 'react'
import { Row, Col, Card, Button } from 'antd'
import {
  PieChart, Pie, Tooltip, Sector, Cell, Label, LabelList
} from 'recharts'
import Container from './Container'

const data02 = [
  { name: 'Group A', value: 2400 }, { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 }, { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 }, { name: 'Group F', value: 4800 }
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const colProps = {
  lg: 12,
  md: 24,
}

const SimplePieChart = () => (
  <Container>
    <PieChart >
      <Pie
        dataKey="value"
        data={data02}
        cx={130}
        cy={100}
        innerRadius={40}
        outerRadius={80}
        fill="#82ca9d"
        label={d => d.name}
      />
      <Tooltip />
    </PieChart>
  </Container>
)

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

class TwoLevelPieChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0,
    }
    this.onPieEnter = this.onPieEnter.bind(this)
  }

  onPieEnter (data, index) {
    this.setState({
      activeIndex: index,
    })
  }
  render () {
    return (
      <Container>
        <PieChart>
          <Pie
            dataKey="value"
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data02}
            cx={200}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            onMouseEnter={this.onPieEnter}
          >
            {
              data02.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={entry.value} />)
            }
          </Pie>
        </PieChart>
      </Container>
    )
  }
}

const PieChartPage = () => (
  <div className="content-inner">
    <Button type="primary"
      style={{
        position: 'absolute',
        right: 0,
        top: -48,
      }}
    >
      <a href="http://recharts.org/#/zh-CN/examples/TwoLevelPieChart" target="blank">Show More</a>
    </Button>
    <Row gutter={32}>
      <Col {...colProps}>
        <Card title="SimplePieChart">
          <SimplePieChart />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="TwoLevelPieChart">
          <TwoLevelPieChart />
        </Card>
      </Col>
    </Row>
  </div>
)

export default PieChartPage
