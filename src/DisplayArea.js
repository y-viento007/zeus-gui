import React, { Component } from 'react';
import TlmGraph from './TlmGraph.js';
import './DisplayArea.css';
import config from 'AppConfig';

// TLMを表示するBOX
// tlm_dataの情報からデータをリクエスト -> 別で行った方が良い？
// tlm_data.display_typeに従って表示形式設定
class TlmContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{time:0, value:0},{time:1, value:1}],
      date: "2019/10/12"
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
        <div className="TlmContent-Graph">
          <p style={{padding:0, margin:0}}> {this.props.tlm_data.display_name} </p>
          <TlmGraph data= {this.state.data} x_key="time" y_key="value" />
        </div>
      );
    } else if (this.props.tlm_data.display_type === "value"){
      return (
        <div className="TlmContent-Value">
          <p> {this.props.tlm_data.display_name} : {this.state.data.value} (Time: {this.state.data.time}) </p>
        </div>
      );
    } else {
      return(<div></div>);
    }
    
  }
}

// TLM・CMDを表示するエリア
// props.tlm_data_array の配列の要素数だけTlmDisplayを作成
// display_windowに従ってテレメをまとめる
class DisplayArea extends Component {

 //  constructor(props) {
 //    super(props);
	// }



  render() {
    const tlm_data_array = this.props.tlm_data_array;
    const current_time = this.props.current_time;

    return (
      <div>
        <div className="DisplayArea">
          {/*  windowに振り分ける */}
          {config.TLM_WINDOW_DATA_ARRAY.map((window_data) =>
            <div className={"Window"} key={window_data.name}>
              <div className={window_data.type}>
              {tlm_data_array.map((tlm_data) => {
                if(tlm_data.display_window===window_data.name){
                  return <TlmContent key={tlm_data.name} tlm_data={tlm_data} current_time={current_time} />
                }else{return null}}
              )} 
              </div>
            </div>
          )}
        </div>

        <hr size="3"></hr>

        <h2> POSTして受け取ったデータの表示確認(TlmDisplayを使用) </h2>
        <p>バックエンドURL: {config.URL_BACKEND} </p>
        {/*  要素数だけTlmDisplayを作成 */}
        {tlm_data_array.map((tlm_data) =>
          <TlmContent key={"displaytest-"+tlm_data.ID} tlm_data={tlm_data} current_time={current_time} />
        )}

        <h2> windowに振り分ける </h2>
        
      </div>
    );
  }

}

export default DisplayArea;