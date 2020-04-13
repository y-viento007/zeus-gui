import React, { Component } from 'react';
// import './CmdWindow.css';
import config from 'AppConfig';

import Popout from 'react-popout';

class CmdWindow extends Component {
  constructor(props) {
    super(props);
  　
    this.state = {
      cmd_data : config.CMD_DATA,
    };

    this.testSendCmd = this.testSendCmd.bind(this);
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

  render() {
    return (
      <div>
        <Popout title='Test' onClosing={this.props.onClosing}>
          <h3>コマンドテスト</h3>
          <button onClick={this.testSendCmd}>CMDテスト</button>
        </Popout>
      </div>
    );
  }
}



export default CmdWindow;