import React, { Component } from 'react';
//import CONFIG from 'AppConfig';
import PropTypes from 'prop-types';


import HeaterCtrlFrame from './HeaterCtrlFrame.js';
import ValveCtrlFrame from './ValveCtrlFrame.js';

class CtrlArea extends Component {
  // constructor(props) {
    // super(props);
  // }
  render(){
    return(
      <div className="CtrlArea">
        <HeaterCtrlFrame current_time= {this.props.current_time}/> 
        <hr size="3"></hr>
        <ValveCtrlFrame current_time= {this.props.current_time}/>
      </div>
    );
  }
}

CtrlArea.propTypes = {
  current_time: PropTypes.string,
};


export default CtrlArea;