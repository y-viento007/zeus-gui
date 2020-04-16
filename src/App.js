import React, { Component } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
// import SystemDiagram from '-!react-svg-loader!./image/SystemDiagram/SystemDiagram.svg'; // -!は必須
import './App.css';

import DisplayArea from './Components/DisplayArea.js';
import CmdWindow from "./Components/CmdWindow.js"

import CONFIG from 'AppConfig';

import moment from 'moment';


class App extends Component {
  constructor(props) {
    super(props);
  　
    this.state = {
      current_time: CONFIG.INITIAL_START_DATE.format("YYYY-MM-DD HH:MM:SS"),       // TLM表示したい最初の時刻
      initial_start_date: CONFIG.INITIAL_START_DATE,
      gui_start_date: moment(),  // GUIを開始した時刻（GUI内基準時刻）
      display_column_setting_array: CONFIG.DISPLAY_COLUMN_SETTING_ARRAY,
      display_frame_setting_array: CONFIG.DISPLAY_FRAME_SETTING_ARRAY,
      tlm_element_setting_array: CONFIG.TLM_ELEMENT_SETTING_ARRAY,
      cmd_data : CONFIG.CMD_DATA,
      revision: 1,

      data: [{time:0,value:0}],
      switch1:true,
      time: 0,
      valve_color: "green",
      valve_stroke: "black",
      valve_class: "valve0",

      isPoppedOut: false,
    };
    console.log(this.state.tlm_element_setting_array);

    // thisを弄りたいならbindする
    this.tickT = this.tickT.bind(this);

    this.popout = this.popout.bind(this);
    this.popoutClosed = this.popoutClosed.bind(this);
  }

  testSendCmd(){
    const json_body = {
      revision : this.state.cmd_data.revision,
      type : this.state.cmd_data.type,
      name: this.state.cmd_data.name,
      args: this.state.cmd_data.args,
    }
    fetch(CONFIG.URL_BACKEND, {
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
    this.timer_tickT = setInterval(this.tickT, 1000);
    this.timer_getTlm = setInterval(this.getTlm, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer_tickT);
    clearInterval(this.timer_getTlm);
  }

  /* 画面を生成 */
  render() {
    return (
      <div className="App">

        <div className="App-header">
          <p className="App-title">ZEUS GUI</p>
        </div>

        <div className="App-body">
          <div className="Test-body">
            <DisplayArea 
              display_column_setting_array = {this.state.display_column_setting_array}
              display_frame_setting_array = {this.state.display_frame_setting_array}
              tlm_element_setting_array = {this.state.tlm_element_setting_array} 
              current_time= {this.state.current_time} />
          </div>
          <hr size="3"></hr>

          <p>Time increment: {this.state.time}</p>
          <p>current_time increment: {this.state.current_time} </p>

          <h2> CMDテスト </h2>
          <p>バックエンドURL: {CONFIG.URL_BACKEND} </p>

          <button className="CmdButton" onClick={this.popout}>CMDウィンドウ表示</button>

          {/* import svg */}
          {/*
          <div className="Box-SystemDiagram">
            <SystemDiagram className="Image-SystemDiagram" alt="SystemDiagram" />
          </div>
          */}

        </div>

        {this.state.isPoppedOut && (
          <CmdWindow closeWindowPortal={this.popoutClosed}>
            <div className="App-body">
              <h3>コマンドテスト</h3>
              <button className="CmdButton" onClick={() => this.testSendCmd()} >
                Send Cmd
              </button>
              <button className="CmdButton" onClick={() => this.popoutClosed()} >
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







