import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CONFIG from 'AppConfig';

import './TlmCmdInfo.css';


class TlmCmdInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raw_tlm: "-",
    }
    this.requestTlm = this.requestTlm.bind(this);
    this.requestTlmAll = this.requestTlmAll.bind(this);
  }
  requestTlm(state_name,tlm_name){
    // POSTのbodyを作成
    const json_body = {
      name : tlm_name,
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
      headers: new Headers({ 'Content-type' : 'application'})
    }).then(res => res.json())
      .then(
        (result) => {
          if(result.data.length > 0){
            this.setState({ [state_name]: result.data[0].value });
          }else{
            console.log(result.data.length);
          }
        
        },
        (error) => { this.setState({ error }); }
      )
  }

  // TLMを全て更新する
  requestTlmAll(){
    // TLM名と対応するthis.stateの名前の一覧
    const tlm_data = [
      { state_name: "raw_tlm" , tlm_name: "raw_tlm" },
    ];
    
    tlm_data.map((tlm_data) => {
        return this.requestTlm(tlm_data.state_name,tlm_data.tlm_name);
    })
  }

  componentDidMount() {
    this.timer_requestTlmAll = setInterval(this.requestTlmAll, CONFIG.POST_INTERVAL_MS)
  }
  componentWillUnmount() {
    clearInterval(this.timer_requestTlmAll);
  }
  
  render() {
    return(
      <div className="TlmCmdInfo">
        <p className="CurrentTime"> {this.props.current_time} </p>
        <p className="RawTlm"> {this.state.raw_tlm} </p>
        <button className="CmdWindowPopout PopoutButton" onClick={this.props.cmd_window_popout} >CMD Window</button>
        <button className="CtrlWindowPopout PopoutButton" onClick={this.props.ctrl_window_popout} >CTRL Window</button>
      </div>
    );
  }
}

TlmCmdInfo.propTypes = {
  current_time: PropTypes.string,
  cmd_window_popout: PropTypes.func,
  ctrl_window_popout: PropTypes.func,
};

export default TlmCmdInfo;
