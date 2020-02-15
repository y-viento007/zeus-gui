import React, { Component } from 'react';
import TlmGraph from './TlmGraph.js';

import config from 'AppConfig';

// 設定
// const URL_BACKEND = "http://localhost:3001/status";

// TLMを表示するBOX
// tlm_dataの情報からデータをリクエスト -> 別で行った方が良い？
// tlm_data.display_typeに従って表示形式設定
class TlmDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{time:0, value:0},{time:1, value:1}],
    }
    this.requestTlmData = this.requestTlmData.bind(this);
  }

  requestTlmData(){
    const json_body = {
      ID: this.props.tlm_data.ID,
      name : this.props.tlm_data.name,
      time_range : this.props.time_range,
      time_delta : this.props.time_delta,
      current_time : this.props.current_time,
      type : "TLM",
      revision : 1,
    }

    fetch(config.URL_BACKEND, {
      method: 'POST',
      body: JSON.stringify(json_body),
      headers: new Headers({ 'Content-type' : 'application/json' })
    }).then(res => res.json())
      .then(
        (result) => {
          this.setState({ data: result.data });
        },
        (error) => { this.setState({ error }); }
      )
  }

  componentDidMount() {
    this.timer_request = setInterval(this.requestTlmData, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer_request);
  }

  render() {
    // console.log(this.state.data);
    if (this.props.tlm_data.display_type === "graph"){
      return (
        <div className="TlmDisplay">
          <p> {this.props.name} </p>
          <TlmGraph data= {this.state.data} x_key="time" y_key="value" />
        </div>
      );
    } else if (this.props.tlm_data.display_type === "value"){
      return (
        <div className="TlmDisplay">
          <p> {this.props.tlm_data.name} : {this.state.data.value} (Time: {this.state.data.time}) </p>
        </div>
      );
    } else {
      return(<div></div>);
    }
    
  }
}

// TLMを表示するエリア
// props.tlm_data_array の配列の要素数だけTlmDisplayを作成
class TlmDisplayArea extends Component {

 //  constructor(props) {
 //    super(props);
	// }



  render() {
    const tlm_data_array = this.props.tlm_data_array;
    const current_time = this.props.current_time;
    const test_tlm_data0 = tlm_data_array[0];
    const test_tlm_data1 = tlm_data_array[1];
    const test_tlm_data2 = tlm_data_array[2];


    return (
      <div className="TlmDisplayArea">

        <h2> ソースコードベタ打ちtestデータの表示確認 </h2>
        <TlmGraph data={test_tlm_data0.test_data} x_key="time" y_key="value" />
        <p> {test_tlm_data1.name} : {test_tlm_data1.test_value} (Time: {test_tlm_data1.test_time}) </p>
        <p> {test_tlm_data2.name} : {test_tlm_data2.test_value} (Time: {test_tlm_data2.test_time}) </p>

        <h2> POSTして受け取ったデータの表示確認(TlmDisplayを使用) </h2>
        <p>バックエンドURL: {config.URL_BACKEND} </p>
        {/*  要素数だけTlmDisplayを作成 */}
        {tlm_data_array.map((tlm_data) =>
          <TlmDisplay key={tlm_data.ID} tlm_data={tlm_data} current_time={current_time} />
        )}
      </div>
    );
  }

}

export default TlmDisplayArea;