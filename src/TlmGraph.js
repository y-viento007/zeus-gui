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
          <p style={{padding:0, margin:0, color: "rgba(255,255,255,0.9)"}}> {this.props.label} </p>
          <VictoryChart
            theme={VictoryTheme.material}
            width={288} height={144}
            padding={{top: 10, bottom: 50, left: 50, right: 30}}
          >
            <VictoryAxis
              style={{
                grid: {
                  stroke: "rgba(255,255,255,0.5)",
                  strokeWidth: 0.5
                },
                axis: { stroke: "rgba(255,255,255,0.5)"},
                axisLabel: {
                  fontSize: 12, 
                  padding: 30,
                  fill: "rgba(255,255,255,0.5)"
                }, 
                ticks:{
                  stroke: "rgba(255,255,255,0.5)",
                  strokeWidth: 1
                },
                tickLabels: { 
                  fontFamily: "Rajdhani",
                  fontSize: 12,
                  fill: "rgba(255,255,255,0.5)"
                },
              }}
              tickFormat={(t) => `${t}`.slice(9,11)+`:`+`${t}`.slice(11,13)+`:`+`${t}`.slice(13,15)}
              tickCount={4}
              // tickFormat={(t) => `${t}`+`:`+`${t}`+`:`+`${t}`}
            />
            <VictoryAxis dependentAxis
              className="VictoryAxis"
              style={{
                grid: {
                  stroke: "rgba(255,255,255,0.5)",
                  strokeWidth: 0.5
                },
                axis: { 
                  stroke: "rgba(255,255,255,0.5)",
                  strokeWidth: 1
                },
                ticks:{
                  stroke: "rgba(255,255,255,0.5)",
                  strokeWidth: 1
                },
                tickLabels: {
                  fontFamily: "Rajdhani",
                  fontSize: 12,
                  fill: "rgba(255,255,255,0.5)"
                }}}
            />
            <VictoryLine 
              standalone={false}

              data={this.props.data}
              x={this.props.x_key}
              y={this.props.y_key} 

              style={{
                data: { stroke: "rgba(255,255,255,0.9)", strokeWidth: 2 }
              }}
            />
          </VictoryChart>
        </div>
    );
	}
}

export default TlmGraph;