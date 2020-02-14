import React, { Component } from 'react';

import './TlmGraph.css';

import {VictoryChart,VictoryTheme,VictoryLine} from 'victory';


class TlmGraph extends Component {
	constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      x_key: props.x_key,
      y_key: props.y_key,
    };
	}

  // componentDidUpdate() {
  //   this.setState({ data: this.props.data });
  // }

  render() {
    return (
        <div className="TlmGraph-body">
          <VictoryChart
            theme={VictoryTheme.material}
            width={450} height={200}
          >
            <VictoryLine 
              standalone={false}
              
              data={this.props.data}
              x={this.props.x_key}
              y={this.props.y_key} 
            />
          </VictoryChart>
        </div>
    );
	}
}


export default TlmGraph;