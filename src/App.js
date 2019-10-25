import React, { Component } from 'react';
import SystemDiagram from './image/SystemDiagram/SystemDiagram.svg';
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
          <div className="Box-SystemDiagram">
            <img src={SystemDiagram} className="Image-SystemDiagram" alt="SystemDiagram" />
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







