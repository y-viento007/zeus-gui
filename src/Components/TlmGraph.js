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
    const bright_color = "rgba(255,255,255,0.5)";
    const dark_color = "rgba(255,255,255,0.9)";

    return (
        <div className="TlmGraph-body">
          <p style={{padding:0, margin:0, color: dark_color}}> {this.props.label} </p>
          <VictoryChart
            theme={VictoryTheme.material}
            width={288} height={144}
            padding={{top: 6, bottom: 35, left: 50, right: 30}}
            domain={{ y: [this.state.y_min, this.state.y_max] }}
          >
            <VictoryAxis
              style={{
                grid: {
                  stroke: bright_color,
                  strokeWidth: 0.5
                },
                axis: { 
                  stroke: bright_color,
                  strokeWidth: 2
                },
                axisLabel: {
                  fontSize: 12, 
                  padding: 30,
                  fill: bright_color
                }, 
                ticks:{
                  stroke: bright_color,
                  strokeWidth: 1
                },
                tickLabels: { 
                  fontFamily: "Rajdhani",
                  fontSize: 12,
                  fill: bright_color
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
                  stroke: bright_color,
                  strokeWidth: 0.5
                },
                axis: { 
                  stroke: bright_color,
                  strokeWidth: 2
                },
                ticks:{
                  stroke: bright_color,
                  strokeWidth: 1
                },
                tickLabels: {
                  fontFamily: "Rajdhani",
                  fontSize: 12,
                  fill: bright_color
                }}}
            />
            <VictoryLine 
              standalone={false}

              data={this.props.data}
              x={this.props.x_key}
              y={this.props.y_key} 

              style={{
                data: { stroke: dark_color, strokeWidth: 2 }
              }}
            />
          </VictoryChart>
        </div>
    );
  }
}

export default TlmGraph;