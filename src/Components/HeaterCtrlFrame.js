import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CONFIG from 'AppConfig';

import './HeaterCtrlFrame.css';

class HeaterCtrlElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cmd_name : "N/A",
      on_off : "-",
      pwm_is_enable : "-",
      duty : "-",
      effective_duty : "-",
      current : "-",
      pwm_value_percent : 0,
    };

    this.sendCmd = this.sendCmd.bind(this);
    this.handleChangeCmdName = this.handleChangeCmdName.bind(this);
    this.handleChangePwmValue = this.handleChangePwmValue.bind(this);
  }

  // backendにデータをPOSTでリクエストする
  requestTlm(state_name,tlm_name){
    // POSTのbodyを作成
    const heater_id = this.props.heater_id;
    const json_body = {
      name : tlm_name + heater_id,
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

  // このヒーターに関するTLMを全て更新する
  requestTlmAll(){
    // ヒーター一つが持つTLM名と対応するthis.stateの名前の一覧
    const heater_tlm_data = [
      { state_name: "on_off" , tlm_name: "heater_on_off" },
      { state_name: "pwm_is_enable" , tlm_name: "heater_pwm_is_enabled" },
      { state_name: "duty" , tlm_name: "heater_duty" },
      { state_name: "effective_duty" , tlm_name: "heater_effective_duty" },
      { state_name: "current" , tlm_name: "heater_current" },
    ];
    
    heater_tlm_data.map((heater_tlm_data) => {
      return this.requestTlm(heater_tlm_data.state_name,heater_tlm_data.tlm_name);
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
      args: (this.state.cmd_name==="Cmd_HeaterPwmChangeDuty") ? [this.state.pwm_value_percent] : [],
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
    this.setState({pwm_value_percent: 0});
  }

  handleChangeCmdName(event) {
    this.setState({cmd_name: event.target.value});
  }
  handleChangePwmValue(event) {
    this.setState({pwm_value_percent: event.target.value});
  }

  

  render(){

    return(
      <div className="HeaterCtrlElement">
        <div className="Id">{parseInt(this.props.heater_id)}</div>
        <div className="Name">{this.props.name}</div>
        <div className="OnOff">{this.state.on_off}</div>
        <div className="PwmIsEnable">{this.state.pwm_is_enable}</div>
        <div className="Duty">{this.state.duty}%</div>
        <div className="EffectiveDuty">{this.state.effective_duty}%</div>
        <div className="Current">{this.state.current}A</div>

        <select value={this.state.cmd_name} onChange={(e) => this.handleChangeCmdName(e)} >
          <option value="N/A"> N/A </option>
          <option value="Cmd_HeaterOn"> On </option>
          <option value="Cmd_HeaterOff"> Off </option>
          <option value="Cmd_HeaterPwmOn"> PWM On </option>
          <option value="Cmd_HeaterPwmOff"> PWM Off </option>
          <option value="Cmd_HeaterPwmChangeDuty"> PWM Change Duty </option>
        </select>
        <input type="text" value={this.state.pwm_value_percent} onChange={(e) => this.handleChangePwmValue(e)} />
      </div>
    );
  }
}

HeaterCtrlElement.propTypes = {
  heater_id: PropTypes.string,
  name: PropTypes.string,
  current_time: PropTypes.string,
};

class HeaterCtrlFrame extends Component {
  constructor(props) {
    super(props);
    this.element = [];
    this.requestTlmAllElements = this.requestTlmAllElements.bind(this);
  }

  requestTlmAllElements(){
    const heater_ctrl_setting_array = CONFIG.HEATER_CTRL_SETTING_ARRAY;
    heater_ctrl_setting_array.map((heater_ctrl_setting)=>{
      return this.element[heater_ctrl_setting.ID].requestTlmAll();
    });
  }

  sendCmdAllElements(){
    const heater_ctrl_setting_array = CONFIG.HEATER_CTRL_SETTING_ARRAY;
    heater_ctrl_setting_array.map((heater_ctrl_setting)=>{
      return this.element[heater_ctrl_setting.ID].sendCmd();
    });
  }

  render(){
    const heater_ctrl_setting_array = CONFIG.HEATER_CTRL_SETTING_ARRAY;
    return(
      <div className="HeaterCtrlFrame">
        <button className="UpdateButton" onClick={() => this.requestTlmAllElements()} >
          Update TLM
        </button>

        <div className="HeaterCtrlElement">
          <div className="Id"></div>
          <div className="Name"></div>
          <div className="OnOff">ON / OFF</div>
          <div className="PwmIsEnable">PWM</div>
          <div className="Duty">PWM Duty</div>
          <div className="EffectiveDuty">Effective Duty</div>
          <div className="Current">Current @ON</div>
        </div>
        
        {heater_ctrl_setting_array.map((heater_ctrl_setting)=>{
          return(
            <HeaterCtrlElement 
              key={heater_ctrl_setting.ID} 
              heater_id={heater_ctrl_setting.heater_id} 
              name={heater_ctrl_setting.name} 
              current_time= {this.props.current_time}
              ref={(ref) => this.element[heater_ctrl_setting.ID] = ref}
            />
          );
        })}

        <div className="button">
          <button className="CmdButton" onClick={() => this.sendCmdAllElements()} >
            Send CMD
          </button>
        </div>
      </div>
    );
  }
}

HeaterCtrlFrame.propTypes = {
  current_time: PropTypes.string,
};

export default HeaterCtrlFrame;