import React, { Component } from 'react';
import CONFIG from 'AppConfig';
import './TlmDiagram.css';

class TlmDiagram extends Component {
	constructor(props) {
    super(props);

    // POST時にstateを追加する（あまり良くないかもだがとりあえず）
    // render()のsvgが追加されたstateを読む
    this.state = {
      diagram_setting_array: CONFIG.TLM_DIAGRAM_DATA_ARRAY
    };
    this.requestTlmData = this.requestTlmData.bind(this);
	}

	test(){return 0}

  requestTlmData(tlm_data){
    // POSTするbody
    const json_body = {
      ID: tlm_data.ID,
      name : tlm_data.name,
      time_range : 0,
      time_delta : tlm_data.time_delta,
      current_time : this.props.current_time,
      type : "TLM",
      revision : 1,
    }

    fetch(CONFIG.URL_BACKEND, {
      method: 'POST',
      body: JSON.stringify(json_body),
      headers: new Headers({ 'Content-type' : 'application/json' })
    }).then(res => res.json())
        .then(
        (result) => {
          // 返答が空配列でないことを確認
          if(result.data.length > 0){
            // valueがtrueならOpen, falseならClose
            if (result.data[0].value===true){
            this.setState({ [tlm_data.name]: "Valve-Open"  });
            } else if (result.data[0].value===false) {
              this.setState({ [tlm_data.name]: "Valve-Close" });
            }
          }else{
            console.log(result.data.length);
          }
          
        },
        (error) => { this.setState({ error }); }
      )
  }



  componentDidMount() {
  	this.timer_request_array = CONFIG.TLM_DIAGRAM_DATA_ARRAY.map((tlm_data) =>{
  		return setInterval(this.requestTlmData, CONFIG.POST_INTERVAL_MS, tlm_data)
  	})
  }

  componentWillUnmount() {
  	this.timer_request_array.map((timer)=>{
  		return clearInterval(timer);
  	})
  }

  render() {
    return (
        <div className="TlmDiagram">
        	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="800" className="Image-SystemDiagram" alt="SystemDiagram">
            <defs>
              <clipPath id="a">
                <path d="M0 0h800v600H0z"></path>
              </clipPath>
            </defs>
            <g clipPath="url(#a)">
              <path className={this.state.valve_open_close02} d="M432 446l-50 44.5v-89zm0 0l50-44.5v89z"></path>
              <circle vectorEffect="non-scaling-stroke" cx="244.5" cy="248.5" r="112.5" fill="#D0F1FD" stroke="#000" strokeLinecap="square" strokeMiterlimit="3"></circle>
              <path d="M244.5 361v85m0 0H382" fill="none" vectorEffect="non-scaling-stroke" stroke="#000" strokeLinecap="square" strokeMiterlimit="3"></path>
              <g stroke="#000" strokeLinecap="square" strokeMiterlimit="3">
                <path vectorEffect="non-scaling-stroke" d="M382 401.5 v89 l100-89 v89 l-100 -89"></path>
              </g>
              <path vectorEffect="non-scaling-stroke" stroke="#000" strokeLinecap="square" strokeMiterlimit="3" d="M482 446h78"></path>
              <path d="M560 466.5l78 27m-78-68v41m0-41l78-27m0 95v-95" fill="none" vectorEffect="non-scaling-stroke" stroke="#000" strokeLinecap="square" strokeMiterlimit="3"></path>
            </g>
          </svg>
      </div>
    );
	}
}

export default TlmDiagram;