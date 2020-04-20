import React, { Component } from 'react';
import './CmdArea.css';

import CONFIG from 'AppConfig';

class CmdArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.cmd_data_array[0].name,
      raw_args: "0 0",
      args: [0,0]
    };

    this.handleChangeCmdName = this.handleChangeCmdName.bind(this);
    this.handleChangeArgs = this.handleChangeArgs.bind(this);
  }

  sendCmd(){
    const json_body = {
      revision : 1,
      type : "CMD",
      name: this.state.name,
      args: this.state.args,
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
  }

  handleChangeCmdName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeArgs(event) {
    this.setState({raw_args: event.target.value});

    // 末尾の空白は要素として換算されてしまう
    let args = event.target.value.split(/,+|\s+/).filter(function(n){
        if(n===""){
          return false;
        } else {
          return true;
        }
      }).map( function(n){
        if(!isNaN(n)){
          return Number(n);
        }else{ // 数値でなければ文字としてそのまま
          return n;
        }
      });
    this.setState({args: args});
  }

	render(){
    const options = this.props.cmd_data_array.map((cmd_data) => (
        <option key={cmd_data.name} value={cmd_data.name}>
          {cmd_data.name}
        </option>
      ));
    const args_list = this.state.args.map((arg,i) => (
        <li key={i}>{arg}</li>
      ));

		return(
      <div className="CmdArea">
        <p> 1. Select a command </p>
        <p> 2. Input arguments like: "arg1 arg2 arg3..." </p>
        <p> (Delimiter: " " or ",") </p>
        <p> 3. Push the "Send CMD" button </p>
        <select value={this.state.name} onChange={(e) => this.handleChangeCmdName(e)}>
          {options}
        </select>

        <input type="text" value={this.state.raw_args} onChange={(e) => this.handleChangeArgs(e)} />
        
        <p> Command: {this.state.name} </p>
        <p> Arguments: </p>
        <ol>
          {args_list}
        </ol>
        <button className="CmdButton" onClick={() => this.sendCmd()} >
          Send CMD
        </button>

      </div>
    );
	}
}

export default CmdArea;
