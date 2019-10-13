import React, { Component } from 'react';

import './TLMGraph.css';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import * as V from 'victory';
import {VictoryChart,VictoryTheme,VictoryLine} from 'victory';


class TLMGraph extends Component {
	constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      x_key: props.x_key,
      y_key: props.y_key,
    }
	}

  componentDidUpdate() {
    this.state.data= this.props.data;
  }

	render() {
    return (
      <div>
        <LineChart width={400} height={400} data={this.state.data}>
          <XAxis dataKey={this.state.x_key} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="linear" dataKey={this.state.y_key} stroke="#8884d8" />
        </LineChart>
        <div>
          <VictoryChart
            theme={VictoryTheme.material}
            width={200} height={200}
          >
            <VictoryLine 
              standalone={false}
              
              data={this.state.data}
              x={this.state.x_key}
              y={this.state.y_key} 
            />
          </VictoryChart>
        </div>
      </div>
    );
	}
}


export default TLMGraph;