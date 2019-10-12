import React, { Component } from 'react';
import SystemDiagram from './image/SystemDiagram/SystemDiagram.svg';
import './App.css';
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
// import { Samy, SvgProxy } from 'react-samy-svg';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


class App extends Component {
  /* 初期State（状態）を設定する */
  constructor(props) {
    super(props); /* ES6のclass構文では、明示的にsuper()メソッドを呼び出す */
    this.state = {
      switch1: true,
      switch2: true,
      data: [{"value":0,"time":0},{"value":1,"time":1}],
    };
    this.handleSwitch1 = this.handleSwitch1.bind(this); // thisを弄りたいならbindする
    this.handleSwitch2 = this.handleSwitch2.bind(this);
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
        // 補足：コンポーネント内のバグによる例外を隠蔽しないためにも
        // catch()ブロックの代わりにここでエラーハンドリングすることが重要です
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
    this.timer2 = setInterval(this.handleSwitch2, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  }

  /* 画面を生成 */
  render() {
    return (
      <div>
        <div className="App-header">
          <p>ZEUS GUI</p>
        </div>

        <div className="App-body">

          Switch1:
          <button onClick={this.handleSwitch1}>
            {this.state.switch1 ? "ON" : "OFF"}
          </button>


          <div className="TestGraph">
            <LineChart width={400} height={400} data={this.state.data}>
              <XAxis dataKey="time" />
              <Tooltip />
              <Legend />
              <Line type="linear" dataKey="value" stroke="#8884d8" />
            </LineChart>
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







