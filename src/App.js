import React, { Component } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
// import SystemDiagram from '-!react-svg-loader!./image/SystemDiagram/SystemDiagram.svg'; // -!は必須
import './App.css';

import DisplayArea from './Components/DisplayArea.js';
import CmdArea from './Components/CmdArea.js';
import CtrlArea from './Components/CtrlArea.js';
import SubWindow from "./Components/SubWindow.js"


import CONFIG from 'AppConfig';

import moment from 'moment';


class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      current_time: CONFIG.INITIAL_START_DATE.format("YYYY-MM-DD HH:MM:SS"),       // TLM表示したい最初の時刻
      initial_start_date: CONFIG.INITIAL_START_DATE,
      gui_start_date: moment(),  // GUIを開始した時刻（GUI内基準時刻）
      time: 0,

      display_column_setting_array: CONFIG.DISPLAY_COLUMN_SETTING_ARRAY,
      display_frame_setting_array: CONFIG.DISPLAY_FRAME_SETTING_ARRAY,
      tlm_element_setting_array: CONFIG.TLM_ELEMENT_SETTING_ARRAY,
      cmd_data : CONFIG.CMD_TEST_DATA,
      revision: 1,

      popout_cmd_flag: false,
      popout_ctrl_flag: false,
    };
    console.log(this.state.tlm_element_setting_array);

    // thisを弄りたいならbindする
    this.tickT = this.tickT.bind(this);

    this.open_popout_cmd = this.open_popout_cmd.bind(this);
    this.close_popout_cmd = this.close_popout_cmd.bind(this);
    this.open_popout_ctrl = this.open_popout_ctrl.bind(this);
    this.close_popout_ctrl = this.close_popout_ctrl.bind(this);
  }


  ////////////////////////

  // サブウィンドウ表示設定用の関数
  open_popout_cmd() {
    this.setState({ popout_cmd_flag: true });
  }

  close_popout_cmd(){
    this.setState({ popout_cmd_flag: false });
  }

  open_popout_ctrl() {
    this.setState({ popout_ctrl_flag: true });
  }

  close_popout_ctrl(){
    this.setState({ popout_ctrl_flag: false });
  }
  ////////////////////////


  // timeの更新
  tickT() {
    // 0から単純にインクリメントする
    var now_time = this.state.time + 1;
    this.setState({ time: now_time });

    // current_timeの更新 (形式："2019-12-02 09:02:30")
    // initial_start_dateからインクリメントする
    var current_date = moment(this.state.initial_start_date.format()) // jsでのオブジェクトの値渡しは初期化しかなさそう
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
    this.timer_tickT = setInterval(this.tickT, CONFIG.POST_INTERVAL_MS);
    this.timer_getTlm = setInterval(this.getTlm, CONFIG.POST_INTERVAL_MS);
  }
  componentWillUnmount() {
    clearInterval(this.timer_tickT);
    clearInterval(this.timer_getTlm);
    this.close_popout_cmd();
    this.close_popout_ctrl();
  }

  /* 画面を生成 */
  render() {
    return (
      <div className="App">
        <div className="Main">
          <div className="Main-header">
            <p className="Main-title">ZEUS GUI</p>
          </div>

          <div className="Main-body">
            <DisplayArea 
              display_column_setting_array = {this.state.display_column_setting_array}
              display_frame_setting_array = {this.state.display_frame_setting_array}
              tlm_element_setting_array = {this.state.tlm_element_setting_array} 
              current_time= {this.state.current_time}
              cmd_window_popout = {this.open_popout_cmd.bind(this)} />
            <hr size="3"></hr>

            <p>Time increment: {this.state.time}</p>
            <p>current_time increment: {this.state.current_time} </p>

            <h2> CMDテスト </h2>
            <p>バックエンドURL: {CONFIG.URL_BACKEND} </p>

            <button className="CmdButton" onClick={this.open_popout_cmd}>CMDウィンドウ表示</button>
            <button className="CmdButton" onClick={this.open_popout_ctrl}>CTRLウィンドウ表示</button>

            {/* import svg */}
            {/*
            <div className="Box-SystemDiagram">
              <SystemDiagram className="Image-SystemDiagram" alt="SystemDiagram" />
            </div>
            */}

          </div>
        </div>

        {this.state.popout_cmd_flag && (
          <SubWindow width="400" height="400" closeWindowPortal={this.close_popout_cmd}>
            <div className="Sub">
              <div className="Sub-header">
              </div>
              <div className="Sub-body">
                <CmdArea cmd_data_array={CONFIG.CMD_DATA_ARRAY} />
                <hr size="3"></hr>
                
                <button className="CmdButton" onClick={() => this.close_popout_cmd()} >
                  Close me!
                </button>
              </div>
            </div>
          </SubWindow>
        )}

        {this.state.popout_ctrl_flag && (
          <SubWindow width="1200" height="800" closeWindowPortal={this.close_popout_ctrl}>
            <div className="Sub">
              <div className="Sub-header">
              </div>
              <div className="Sub-body">
                <CtrlArea current_time= {this.state.current_time} />
                <hr size="3"></hr>
                
                <button className="CmdButton" onClick={() => this.close_popout_ctrl()} >
                  Close me!
                </button>
              </div>
            </div>
          </SubWindow>
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







