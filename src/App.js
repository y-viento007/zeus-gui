import React, { Component } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
// import SystemDiagram from '-!react-svg-loader!./image/SystemDiagram/SystemDiagram.svg'; // -!は必須
import './App.css';

import DisplayArea from './DisplayArea.js';
import CmdWindow from "./CmdWindow.js"

import config from 'AppConfig';

import moment from 'moment';


class App extends Component {
  constructor(props) {
    super(props);
  　
    this.state = {
      current_time: config.INITIAL_START_DATE.format("YYYY-MM-DD HH:MM:SS"),       // TLM表示したい最初の時刻
      initial_start_date: config.INITIAL_START_DATE,
      gui_start_date: moment(),  // GUIを開始した時刻（GUI内基準時刻）
      tlm_data_array: config.TLM_DATA_ARRAY,
      cmd_data : config.CMD_DATA,
      revision: 1,

      data: [{time:0,value:0}],
      switch1:true,
      time: 0,
      valve_color: "green",
      valve_stroke: "black",
      valve_class: "valve0",

      isPoppedOut: false,
    };
    console.log(this.state.tlm_data_array);

    // thisを弄りたいならbindする
    this.testGetSwitchStatus = this.testGetSwitchStatus.bind(this); 
    this.testUpdateValve = this.testUpdateValve.bind(this);
    this.tickT = this.tickT.bind(this);

    this.popout = this.popout.bind(this);
    this.popoutClosed = this.popoutClosed.bind(this);
  }

  ////////////////////////
  // 機能テスト用
  ////////////////////////
  testUpdateValve() {
    var time = this.state.time;
    if (time%2===0){
      this.setState({ valve_class: "valve0", valve_stroke: "black"})
    } else {
      this.setState({ valve_class: "valve1", valve_stroke: "none"})
    }
  }
  testGetSwitchStatus() {
    fetch("http://localhost:3001/status")
      .then(res => res.json())
      .then(
        (result) => {
          if (result.sw1==="ON"){
            this.setState({ switch1: true });
          } else if (result.sw1==="OFF") {
            this.setState({ switch1: false });
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
  
  ////////////////////////

  popout() {
    this.setState({ isPoppedOut: true });
  }

  popoutClosed(){
    this.setState({ isPoppedOut: false });
  }


  tickT() {
    // timeの更新
    // 0から単純にインクリメントする
    var now_time = this.state.time + 1;
    this.setState({ time: now_time });

    // current_timeの更新 (形式："2019-12-02 09:02:30")
    // initial_start_dateからインクリメントする
    var current_date = moment(this.state.initial_start_date.format())　// jsでのオブジェクトの値渡しは初期化しかなさそう
    current_date.add(
      moment().diff(this.state.gui_start_date) , "ms" 
    );                                                // addは元のmomentオブジェクト自体が変更されるっぽい

    const current_time = current_date.format("YYYY-MM-DD HH:mm:ss");
    // console.log(current_time);

    this.setState({ current_time: current_time }); 

  }


  // 定期実行する関数を設定
  // http://webdesign-dackel.com/2015/11/03/redux-periodic-action/
  componentDidMount() {
    // this.timer_testGetSwitchStatus = setInterval(this.testGetSwitchStatus, 1000);
    // this.timer_testUpdateValve = setInterval(this.testUpdateValve, 1000);

    this.timer_tickT = setInterval(this.tickT, 1000);
    this.timer_getTlm = setInterval(this.getTlm, 1000);
  }
  componentWillUnmount() {
    // clearInterval(this.timer_testGetSwitchStatus);
    // clearInterval(this.timer_testUpdateValve);

    clearInterval(this.timer_tickT);
    clearInterval(this.timer_getTlm);
  }

  /* 画面を生成 */
  render() {
    return (
      <div>

        <div className="App-header">
          <p className="App-title">ZEUS GUI</p>
        </div>

        <div className="App-body">
          <div className="Test-body">
            <DisplayArea tlm_data_array = {this.state.tlm_data_array} current_time= {this.state.current_time} />
          </div>

          <p>Time increment: {this.state.time}</p>
          <p>current_time increment: {this.state.current_time} </p>

          <h2> CMDテスト </h2>
          <p>バックエンドURL: {config.URL_BACKEND} </p>
          <button onClick={this.testSendCmd}>CMDテスト</button>

          <button className="CmdButton" onClick={this.popout}>CMDウィンドウ表示</button>

          {/* import svg */}
          {/*
          <div className="Box-SystemDiagram">
            <SystemDiagram className="Image-SystemDiagram" alt="SystemDiagram" />
          </div>
          */}

        </div>

        {this.state.isPoppedOut && (
          <CmdWindow>
            <div className="App-body">
              <p>Even though I render in a different window, I share state!</p>
              <h3 className="test">コマンドテスト</h3>
              <button className="CmdButton" onClick={() => this.setState({ isPoppedOut: false })} >
                Close me!
              </button>
            </div>
          </CmdWindow>
        )}

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







