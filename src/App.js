import React, { Component } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
// import SystemDiagram from '-!react-svg-loader!./image/SystemDiagram/SystemDiagram.svg'; // -!は必須
import './App.css';

import DisplayArea from './DisplayArea.js';

import config from 'AppConfig';

import moment from 'moment';


class App extends Component {
  constructor(props) {
    super(props);
  　
    this.state = {
      current_time: config.INITIAL_START_DATE.format("YYYYMMDD_HHMMSS"),       // TLM表示したい最初の時刻
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
    };
    console.log(this.state.tlm_data_array);

    // thisを弄りたいならbindする
    this.testGetSwitchStatus = this.testGetSwitchStatus.bind(this); 
    this.testUpdateValve = this.testUpdateValve.bind(this);
    this.testSendCmd = this.testSendCmd.bind(this);
    this.tickT = this.tickT.bind(this);
  }

  ////////////////////////
  // 機能テスト用
  ////////////////////////
  testUpdateValve() {
    var time = this.state.time;
    if (time%2===0){
      this.setState({ valve_color: "green", valve_stroke: "black"})
    } else {
      this.setState({ valve_color: "red", valve_stroke: "none"})
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
  testSendCmd(){
    const json_body = {
      revision : this.state.cmd_data.revision,
      type : this.state.cmd_data.type,
      name: this.state.cmd_data.name,
      args: this.state.cmd_data.args,
    }

    fetch(config.URL_BACKEND, {
      method: 'POST',
      body: JSON.stringify(json_body),
      headers: new Headers({ 'Content-type' : 'application/json' })
    }).then(res => res.json())
      .then(
        (result) => {
          console.log(result.ack);
        },
        (error) => { this.setState({ error }); }
      )
  }
  ////////////////////////


  tickT() {
    // timeの更新
    // 0から単純にインクリメントする
    var now_time = this.state.time + 1;
    this.setState({ time: now_time });

    // current_timeの更新 (形式："20191202_090230")
    // initial_start_dateからインクリメントする
    var current_date = moment(this.state.initial_start_date.format())　// jsでのオブジェクトの値渡しは初期化しかなさそう
    current_date.add(
      moment().diff(this.state.gui_start_date) , "ms" 
    );                                                // addは元のmomentオブジェクト自体が変更されるっぽい

    const current_time = current_date.format("YYYYMMDD_HHmmss");
    // console.log(current_time);

    this.setState({ current_time: current_time }); 
  }


  // 定期実行する関数を設定
  // http://webdesign-dackel.com/2015/11/03/redux-periodic-action/
  componentDidMount() {
    this.timer_testGetSwitchStatus = setInterval(this.testGetSwitchStatus, 1000);
    this.timer_testUpdateValve = setInterval(this.testUpdateValve, 1000);

    this.timer_tickT = setInterval(this.tickT, 1000);
    this.timer_getTlm = setInterval(this.getTlm, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer_testGetSwitchStatus);
    clearInterval(this.timer_testUpdateValve);

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
          <p> Switch status from json-server: {this.state.switch1 ? "ON" : "OFF"}</p>

          <h2> CMDテスト </h2>
          <p>バックエンドURL: {config.URL_BACKEND} </p>
          <button onClick={this.testSendCmd}>CMDテスト</button>

          


          {/* import svg */}
          {/*
          <div className="Box-SystemDiagram">
            <SystemDiagram className="Image-SystemDiagram" alt="SystemDiagram" />
          </div>
          */}

          {/* inline svg */}
          <div className="Box-SystemDiagram">
            {/*
            <p> SVG test </p>
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
            */}
            


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







