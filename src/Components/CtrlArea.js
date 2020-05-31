import React, { Component } from 'react';
//import CONFIG from 'AppConfig';

import HeaterCtrlFrame from './HeaterCtrlFrame.js';

class CtrlArea extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className="CtrlArea">
        <HeaterCtrlFrame current_time= {this.state.current_time}/> 
        <ValveCtrlFrame />
      </div>
    );
  }
}

class ValveCtrlFrame extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className="ValveCtrlFrame">


      </div>
    );
  }
}

export default CtrlArea;