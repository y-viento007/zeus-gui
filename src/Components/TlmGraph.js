import React, { Component } from 'react';

import './TlmGraph.css';

import {VictoryChart,VictoryTheme,VictoryLine,VictoryAxis} from 'victory';


class TlmGraph extends Component {
	constructor(props) {
    super(props);
    this.state = {
      y_min: 0.0,
      y_max: 10.0,
    };
	}

  static getDerivedStateFromProps(nextProps, prevState) {
    let y_min = Math.min.apply(null, nextProps.data.map(function(o){return o[nextProps.y_key];}));
    let y_max = Math.max.apply(null, nextProps.data.map(function(o){return o[nextProps.y_key];}));

    return {
      y_min: y_max-y_min<0.1 ? (y_max+y_min)/2-0.05 : y_min,
      y_max: y_max-y_min<0.1 ? (y_max+y_min)/2+0.05 : y_max,
    }
  }


  render() {
    return (
        <div className="TlmGraph-body">
          <p style={{padding:0, margin:0, color: "rgba(255,255,255,0.9)"}}> {this.props.label} </p>
          <VictoryChart
            theme={VictoryTheme.material}
            width={288} height={144}
            padding={{top: 10, bottom: 50, left: 50, right: 30}}
            domain={{ y: [this.state.y_min, this.state.y_max] }}
          >
            <VictoryAxis
              style={{
                grid: {
                  stroke: "rgba(255,255,255,0.5)",
                  strokeWidth: 0.5
                },
                axis: { 
                  stroke: "rgba(255,255,255,0.5)",
                  strokeWidth: 2
                },
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
                  strokeWidth: 2
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