import React, { Component } from 'react';
//import CONFIG from 'AppConfig';
import PropTypes from 'prop-types';


import HeaterCtrlFrame from './HeaterCtrlFrame.js';

class CtrlArea extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className="CtrlArea">
        <HeaterCtrlFrame current_time= {this.props.current_time}/> 
        <ValveCtrlFrame />
      </div>
    );
  }
}

CtrlArea.propTypes = {
  current_time: PropTypes.string,
};

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