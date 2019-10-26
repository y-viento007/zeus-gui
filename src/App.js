import React, { Component } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SystemDiagram from '-!react-svg-loader!./image/SystemDiagram/SystemDiagram.svg'; // -!は必須
import './App.css';
import TLMGraph from './TLMGraph.js'


class App extends Component {
  /* 初期State（状態）を設定する */
  constructor(props) {
    super(props); /* ES6のclass構文では、明示的にsuper()メソッドを呼び出す */

    var num = 15;
    var new_data = [];
    for (var i = 0; i < num; i++) {
      new_data.push({
        time: i,
        value: 5 + (Math.random()-0.5)
      });
    }

    this.state = {
      switch1: true,
      switch2: true,
      num: num,
      data: new_data,
      time: 0,
      valve_color: "green",
      // valve_color: "red",
      valve_stroke: "black",
      // valve_stroke: "none",
    };

    // thisを弄りたいならbindする
    this.handleSwitch1 = this.handleSwitch1.bind(this); 
    this.handleSwitch2 = this.handleSwitch2.bind(this);
    this.updateData = this.updateData.bind(this);
    this.tickT = this.tickT.bind(this);
  }

  updateData() {
    var new_data = this.state.data;
    new_data.push({
      time: this.state.data[this.state.data.length - 1].time + 1,
      value: 5 + (Math.random()-0.5)
    });
    new_data.shift();
    // rechart.jsでグラフを逐次更新する際は一度データを初期化する（一瞬グラフが消えるので綺麗でない）
    // this.setState({ data: [] });
    // victoryならデータの更新だけでOK
    this.setState({ data: new_data });
  }

  tickT() {
    var now_time = this.state.time + 1;
    this.setState({ time: now_time });
  }

  handleSwitch1() {
    fetch("http://localhost:3001/status")
      .then(res => res.json())
      .then(
        (result) => {
          if (result.sw1==="ON"){
            this.setState({ switch1: true });
          } else if (result.sw1==="OFF") {
            this.setState({ switch1: false });
          }
          if (result.sw2==="ON"){
            this.setState({ switch2: true });
          } else if (result.sw2==="OFF") {
            this.setState({ switch2: false });
          }
        },
        // 補足：コンポーネント内のバグによる例外を隠蔽しないためにも
        // catch()ブロックの代わりにここでエラーハンドリングすることが重要です
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  handleSwitch2() {
    fetch("http://localhost:3001/data")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({data:result.voltage});
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }
  
  // 定期実行する関数を設定
  // http://webdesign-dackel.com/2015/11/03/redux-periodic-action/
  componentDidMount() {
    this.timer1 = setInterval(this.handleSwitch1, 1000);
    this.timer3 = setInterval(this.tickT, 1000);
    this.timer4 = setInterval(this.updateData, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer1);
    clearInterval(this.timer3);
    clearInterval(this.timer4);
  }

  /* 画面を生成 */
  render() {
    return (
      <div>

        <div className="App-header">
          <p>ZEUS GUI</p>
        </div>

        <div className="App-body">
          {this.state.time}
          Switch1:
          <button onClick={this.handleSwitch1}>
            {this.state.switch1 ? "ON" : "OFF"}
          </button>

          <div className="Box">
            <TLMGraph data= {this.state.data} x_key="time" y_key="value" />
          </div>

          {/* import svg */}
          {/*
          <div className="Box-SystemDiagram">
            <SystemDiagram className="Image-SystemDiagram" alt="SystemDiagram" />
          </div>
          */}

          {/* inline svg */}
          <div className="Box-SystemDiagram">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="800" class="Image-SystemDiagram" alt="SystemDiagram">
            <defs>
                <clipPath id="a">
                  <path d="M0 0h800v1200H0z"></path>
                </clipPath>
              </defs>
              <g clip-path="url(#a)">
                <path class="valve0" fill={this.state.valve_color} d="M432 446l-50 44.5v-89zm0 0l50-44.5v89z"></path>
                <circle vector-effect="non-scaling-stroke" cx="244.5" cy="248.5" r="112.5" fill="#D0F1FD" stroke="#000" stroke-linecap="square" stroke-miterlimit="3"></circle>
                <path d="M244.5 361v85m0 0H382" fill="none" vector-effect="non-scaling-stroke" stroke="#000" stroke-linecap="square" stroke-miterlimit="3"></path>
                <g stroke="#000" stroke-linecap="square" stroke-miterlimit="3">
                  <path vector-effect="non-scaling-stroke" d="M382 401.5v89M382 490.5l100-89M382 401.5l100 89M482 401.5v89"></path>
                  <path vector-effect="non-scaling-stroke" d="M432 401.5v89M432 490.5l100"  stroke={this.state.valve_stroke}></path>
                </g>
                <path vector-effect="non-scaling-stroke" stroke="#000" stroke-linecap="square" stroke-miterlimit="3" d="M482 446h78"></path>
                <path d="M560 466.5l78 27m-78-68v41m0-41l78-27m0 95v-95" fill="none" vector-effect="non-scaling-stroke" stroke="#000" stroke-linecap="square" stroke-miterlimit="3"></path>
              </g>
            </svg>


          </div>

        </div>

      </div>
    );
  }
}

export default App;


/*
App
  表示時刻の設定
  データ取得
  データ取得関数の定期実行
ContentBox
  ChartBox
  DiagramBox
*/







