import React, { Component } from 'react'
import {ResponsiveContainer, ComposedChart, CartesianGrid, Bar, Line, Tooltip, Legend, XAxis, YAxis} from 'recharts'

class Graph extends Component {
  render() {
    return (
      <ResponsiveContainer minWidth={500} minHeight={500}
        margin={{top: 20, right: 30, bottom: 20, left: 30}}>
        <ComposedChart data={this.props.dates}>
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey='2TXCT2Z972Daily' name="Abakus Daily" barSize={10} fill='#d13c32' yAxisId="right" />
          <Bar dataKey='3KWRNGFL72Daily' name="Online Daily" barSize={10} fill='#004b80' yAxisId="right" />
          <Line dataKey="2TXCT2Z972Total" name="Abakus Total" stroke="#d13c32" type="monotone" yAxisId="left" connectNulls={true} />
          <Line dataKey="3KWRNGFL72Total" name="Online Total" stroke="#004b80" type="monotone" yAxisId="left" connectNulls={true} />
        </ComposedChart>
      </ResponsiveContainer>
    )
  }
}

export default Graph
