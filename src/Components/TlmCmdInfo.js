import React, { Component } from 'react';
import CONFIG from 'AppConfig';

import './TlmCmdInfo.css';


class TlmCmdInfo extends Component {
  render() {
    return(
      <div className="TlmCmdInfo">
        <p className="CurrentTime"> {this.props.current_time} </p>
        <p className="BackendURL"> Backend URL: {CONFIG.URL_BACKEND} </p>
        <button className="CmdWindowPopout" onClick={this.props.cmd_window_popout} >CMD Window</button>
      </div>
    );
  }
}

export default TlmCmdInfo;
