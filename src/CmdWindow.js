import React, { Component } from 'react';
// import './CmdWindow.css';
import config from 'AppConfig';

import Popout from 'react-popout';

class CmdWindow extends Component {
  render() {
    return (
      <div>
        <Popout title='Test' onClosing={this.props.onClosing}>
          <h3>記事入力</h3>
        </Popout>
      </div>
    );
  }
}



export default CmdWindow;