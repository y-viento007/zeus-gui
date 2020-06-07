import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CONFIG from 'AppConfig';

import './ValveCtrlFrame.css';

class ValveCtrlElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cmd_name : "N/A",
      open_time_ms : 0,
      is_checked : false,
      open_close : "-",
      open_counter : "-",
    };

    this.sendCmd = this.sendCmd.bind(this);
    this.handleChangeCmdName = this.handleChangeCmdName.bind(this);
    this.handleChangeOpenTimeValue = this.handleChangeOpenTimeValue.bind(this);
  }

  // backendにデータをPOSTでリクエストする
  requestTlm(state_name,tlm_name){
    // POSTのbodyを作成
    const valve_id = this.props.valve_id;
    const json_body = {
      name : tlm_name + valve_id,
      time_range : 0,
      time_delta : 1,
      current_time : this.props.current_time,
      type : "TLM",
      revision : 1,
    }
    // POSTする
    fetch(CONFIG.URL_BACKEND, {
      method: 'POST',
      body: JSON.stringify(json_body),
      timeout: 1000,
      headers: new Headers({ 'Content-type' : 'application/json' })
    }).then(res => res.json())
      .then(
        (result) => {
          console.log(result.data);
          console.log(state_name);
          if(result.data.length > 0){
            this.setState({ [state_name]: result.data[0].value });
          }else{
            console.log(result.data.length);
          }
        
        },
        (error) => { this.setState({ error }); }
      )
  }

  // このバルブに関するTLMを全て更新する
  requestTlmAll(){
    // バルブ一つが持つTLM名と対応するthis.stateの名前の一覧
    const valve_tlm_data = [
      { state_name: "open_close" , tlm_name: "valve_open_close" },
      { state_name: "open_counter" , tlm_name: "valve_open_counter" },
    ];
    
    valve_tlm_data.map((valve_tlm_data) => {
        return this.requestTlm(valve_tlm_data.state_name,valve_tlm_data.tlm_name);
    })

  }
  
  // 現在設定されているCMDを送る
  sendCmd(){
    // N/Aなら何もしない
    if(this.state.cmd_name==="N/A") { return; }

    const json_body = {
      revision : 1,
      type : "CMD",
      name: this.state.cmd_name,
      args: (this.state.cmd_name==="Cmd_ValveOpenClose") ? [this.state.open_time_ms] : [],
    };
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
      );
     // sendCmdしたらコマンド用のstateを初期化
    this.setState({cmd_name: "N/A"});
    this.setState({open_time_ms: 0});
  }
  
  // checkbocがチェックされているかを確認
  getIsChecked(){
    return this.state.is_checked;
  }

  handleChangeCmdName(event) {
    this.setState({cmd_name: event.target.value});
  }
  handleChangeOpenTimeValue(event) {
    this.setState({open_time_ms: event.target.value});
  }  
  handleChangeMultipleState(event) {
    this.setState({is_checked: event.target.checked});
  }  

  render(){
    return(
      <div className="ValveCtrlElement">
        <div className="Id">{parseInt(this.props.valve_id)}</div>
        <div className="Name">{this.props.name}</div>
        <div className="OpenClose">{this.state.open_close}</div>
        <div className="OpenCounter">{this.state.open_counter}</div>

        <select value={this.state.cmd_name} onChange={(e) => this.handleChangeCmdName(e)} >
          <option value="N/A"> N/A </option>
          <option value="Cmd_ValveOpen"> Open </option>
          <option value="Cmd_ValveClose"> Close </option>
          <option value="Cmd_ValveOpenClose"> OpenClose </option>
        </select>
        <input type="text" value={this.state.open_time_ms} onChange={(e) => this.handleChangeOpenTimeValue(e)} />
        <button onClick={() => this.sendCmd()} >
        Send CMD
        </button>
        <input type="checkbox" checked={this.state.is_checked} onChange={(e) => this.handleChangeMultipleState(e)} />
      </div>
    );
  }
}

ValveCtrlElement.propTypes = {
  valve_id: PropTypes.string,
  name: PropTypes.string,
  current_time: PropTypes.string,
};

class ValveCtrlFrame extends Component {
  constructor(props) {
    super(props);
    this.element = [];
    this.state = {
        cmd_name: "N/A",
        open_time_ms : 0,
        open_span_ms : 0,
    }
    this.requestTlmAllElements = this.requestTlmAllElements.bind(this);
    this.sendMultipleCmd = this.sendMultipleCmd.bind(this);
    this.handleChangeCmdName = this.handleChangeCmdName.bind(this);
    this.handleChangeOpenTimeValue = this.handleChangeOpenTimeValue.bind(this);
    this.handleChangeOpenSpanValue = this.handleChangeOpenSpanValue.bind(this);

  }

  requestTlmAllElements(){
    const valve_ctrl_setting_array = CONFIG.VALVE_CTRL_SETTING_ARRAY;
    valve_ctrl_setting_array.map((valve_ctrl_setting)=>{
        return this.element[valve_ctrl_setting.ID].requestTlmAll();
    });
  }

  sendMultipleCmd(){
    // N/Aなら何もしない
    if(this.state.cmd_name==="N/A") { return; }

    // チェックボックスの状態を読み取り、valve_flagを作成
    const valve_ctrl_setting_array = CONFIG.VALVE_CTRL_SETTING_ARRAY;
    let valve_flag = 0;    
    valve_ctrl_setting_array.forEach((valve_ctrl_setting)=>{
      let is_checked = this.element[valve_ctrl_setting.ID].getIsChecked();
      valve_flag += is_checked ? 2**(valve_ctrl_setting.ID-1) : 0;
    });
    console.log(valve_flag);

    let args = [];
    if (this.state.cmd_name==="Cmd_ValveMultipleOpenClose"){
        args = [valve_flag, this.state.open_time_ms];
    } else if(this.state.cmd_name==="Cmd_ValveAutoOpenCloseStart") {
        args = [valve_flag, this.state.open_time_ms, this.state.open_span_ms];
    } else if(this.state.cmd_name==="Cmd_ValveAutoOpenCloseEnd") { 
        args = [];
    }

    const json_body = {
        revision : 1,
        type : "CMD",
        name: this.state.cmd_name,
        args: args,
    };
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
        );
    // sendCmdしたらコマンド用のstateを初期化
    this.setState({cmd_name: "N/A"});
    this.setState({open_time_ms: 0});
    this.setState({open_span_ms: 0});
  }

  handleChangeCmdName(event) {
    this.setState({cmd_name: event.target.value});
  }
  handleChangeOpenTimeValue(event) {
    this.setState({open_time_ms: event.target.value});
  }  
  handleChangeOpenSpanValue(event) {
    this.setState({open_span_ms: event.target.checked});
  }  

  render(){
    const valve_ctrl_setting_array = CONFIG.VALVE_CTRL_SETTING_ARRAY;
    return(
      <div className="ValveCtrlFrame">
         <button className="UpdateButton" onClick={() => this.requestTlmAllElements()} >
          Update TLM
        </button>

        <div className="ValveCtrlElement">
          <div className="Id"></div>
          <div className="Name"></div>
          <div className="OpenClose">OPEN / CLOSE</div>
          <div className="OpenCounter">OPEN CNT</div>
        </div>
        
        {valve_ctrl_setting_array.map((valve_ctrl_setting)=>{
          return(
            <ValveCtrlElement 
              key={valve_ctrl_setting.ID} 
              valve_id={valve_ctrl_setting.valve_id} 
              name={valve_ctrl_setting.name} 
              current_time= {this.props.current_time}
              ref={(ref) => this.element[valve_ctrl_setting.ID] = ref}
            />
          );
        })}
        
        <select value={this.state.cmd_name} onChange={(e) => this.handleChangeCmdName(e)} >
          <option value="N/A"> N/A </option>
          <option value="Cmd_ValveMultipleOpenClose"> Multiple OpenClose </option>
          <option value="Cmd_ValveAutoOpenCloseStart"> Multiple AutoOpen Start </option>
          <option value="Cmd_ValveAutoOpenCloseEnd"> Multiple AutoOpen End </option>
        </select>
        <input type="text" value={this.state.open_time_ms} onChange={(e) => this.handleChangeOpenTimeValue(e)} />
        <input type="text" value={this.state.open_span_ms} onChange={(e) => this.handleChangeOpenSpanValue(e)} />
        <button className="CmdButton" onClick={() => this.sendMultipleCmd()} >
          Send CMD
        </button>
      </div>
    );
  }
}

ValveCtrlFrame.propTypes = {
  current_time: PropTypes.string,
};

export default ValveCtrlFrame;