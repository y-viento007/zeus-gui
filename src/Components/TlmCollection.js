import React, { Component } from 'react';
import CONFIG from 'AppConfig';

import TlmGraph from './TlmGraph.js';

import './TlmCollection.css';


// TLM表示の最小単位
// props.settingの情報からデータをリクエスト
class TlmElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{time:0, value:0},{time:1, value:1}],
    }
    this.requestTlmData = this.requestTlmData.bind(this);
  }

  // backendにデータをPOSTでリクエストする
  requestTlmData(){
    // POSTのbodyを作成
    const json_body = {
      name : this.props.setting.name,
      time_range : this.props.setting.time_range,
      time_delta : this.props.setting.time_delta,
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
          // console.log(result.data);
          // console.log(result.name);
          if(result.data.length > 0){
            this.setState({ data: result.data });
          }else{
            console.log(result.data.length);
          }
         
        },
        (error) => { this.setState({ error }); }
      )
  }

  componentDidMount() {
    this.timer_request = setInterval(this.requestTlmData, CONFIG.POST_INTERVAL_MS);
  }

  componentWillUnmount() {
    clearInterval(this.timer_request);
  }

  render() {
    const type = this.props.setting.type;
    const display_name = this.props.setting.display_name;

    // typeごとに描画するコンポーネントを変える
    let tlm_element;
    if (type === "graph"){
      tlm_element = (
          <TlmGraph data= {this.state.data} x_key="time" y_key="value" label={display_name} />
        );
    } else if (type === "value"){
    		const display_min_value = this.props.setting.display_min_value;
    		const display_max_value = this.props.setting.display_max_value;

	    	const bar_width = (this.state.data[0].value-display_min_value)/(display_max_value-display_min_value)*100+"%"

        tlm_element = (
          <div className="Value">
	          <div className="Value-Label">
	          	<p className="Value-Name"> {display_name} </p>
	          	<div className="Value-Bar"
	          		style={{width: bar_width}} 
	          	></div>
	          </div>
            <p className="Value-Value"> {this.state.data[0].value} </p>
          </div>
        );
    } else {
      tlm_element = (<div></div>);
      // TBI: エラーを吐く
    }

    return(
      <div className="TlmElement">
        {tlm_element}
      </div>
    );
    
  }
}

// TlmElementを並べたもの
class TlmCollection extends Component {
  render() {
    const tlm_element_setting_array= this.props.tlm_element_setting_array;
    const current_time = this.props.current_time;

    return(
      <div className="TlmCollection">
        {tlm_element_setting_array.map((tlm_element_setting) => {
          return(<TlmElement key={tlm_element_setting.ID} setting={tlm_element_setting} current_time={current_time} />);
        })}
      </div>
    );

  }
}


export default TlmCollection;