import React, { Component } from 'react';

import TlmDiagram from './TlmDiagram.js';
import TlmCollection from './TlmCollection.js';
import TlmCmdInfo from './TlmCmdInfo.js';

import './DisplayArea.css';



// テレメや系統図などが表示されるフレーム
class DisplayFrame extends Component {
  render() {
    const frame_id = this.props.setting.id;
    const frame_name = this.props.setting.name;
    const frame_type = this.props.setting.type;
    const tlm_element_setting_array = this.props.tlm_element_setting_array;
    const current_time = this.props.current_time;

    // typeごとに描画するコンポーネントを変える
    let frame_content;
    if (frame_type==="diagram"){
      frame_content = <TlmDiagram current_time={current_time} />;
    } else if (frame_type==="collection"){
      frame_content = <TlmCollection tlm_element_setting_array={tlm_element_setting_array} current_time={current_time} />;
    } else if (frame_type==="info"){
      frame_content = <TlmCmdInfo current_time={current_time} cmd_window_popout={this.props.cmd_window_popout.bind(this)} />;
    } else {
      frame_content = (<div></div>);
      // TBI: エラーを吐く
    }
    
    return (
      <div
        className="DisplayFrame" 
        id={frame_id}
        style={{"flexBasis":this.props.setting.flex_basis}}
      >
        <p className="DisplayFrame-header">{frame_name}</p>
        <div className="DisplayFrame-body">
          {frame_content}
        </div>
      </div>
    );
  }
}



// TLMを表示するエリア
// DisplayFrameを並べる
class DisplayArea extends Component {
  render() {
    const display_column_setting_array = this.props.display_column_setting_array;
    const display_frame_setting_array = this.props.display_frame_setting_array;
    const tlm_element_setting_array = this.props.tlm_element_setting_array;
    const current_time = this.props.current_time;

    return (

      <div className="DisplayArea">

        {/*  display_columnを並べる */}
        {display_column_setting_array.map((display_column_setting) =>

          <div className="DisplayColumn"
            key={display_column_setting.name} 
            id={display_column_setting.name}
            style={{"flexBasis":display_column_setting.flex_basis}}
          >
            
            {/*  display_columnごとに、表示したいdisplay_frameを並べる */}
              {/*  display_framごとに、表示したいtlm_data_arrayをフィルタして与える */}
            {display_frame_setting_array.map((display_frame_setting) => {
              if(display_frame_setting.display_column === display_column_setting.name){
                return (
                  <DisplayFrame
                    key={display_frame_setting.ID}
                    setting={display_frame_setting}
                    tlm_element_setting_array={tlm_element_setting_array.filter((tlm_element_setting) => {
                      return tlm_element_setting.display_frame===display_frame_setting.name})}
                    current_time={current_time}
                    cmd_window_popout={this.props.cmd_window_popout.bind(this)} />
                );
              } else {
                return null;
              }
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayArea;
