import React, { Component } from 'react';

import './TlmGraph.css';

import {VictoryChart,VictoryTheme,VictoryLine,VictoryAxis} from 'victory';


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
            width={320} height={160}
            padding={{top: 10, bottom: 50, left: 50, right: 30}}
          >
            <VictoryAxis
              label="Time"
              style={{
                axisLabel: {fontSize: 12, padding: 30}, 
                tickLabels: { fontSize: 12 },
              }}
              tickFormat={(t) => `${t}`.slice(9,11)+`:`+`${t}`.slice(11,13)+`:`+`${t}`.slice(13,15)}
              tickCount={4}
              // tickFormat={(t) => `${t}`+`:`+`${t}`+`:`+`${t}`}
            />
            <VictoryAxis dependentAxis
              style={{ tickLabels: {
                  fontSize: 12
                }}}
            />
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