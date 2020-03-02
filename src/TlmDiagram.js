import React, { Component } from 'react';
import config from 'AppConfig';
import './TlmDiagram.css';

class TlmDiagram extends Component {
	constructor(props) {
    super(props);
    this.state = {
    };
    this.requestTlmData = this.requestTlmData.bind(this);
	}

	test(){return 0}

  requestTlmData(tlm_data){
    const json_body = {
      ID: tlm_data.ID,
      name : tlm_data.name,
      time_range : 0,
      time_delta : tlm_data.time_delta,
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
          this.setState({ [tlm_data.name]: "Valve_"+result.data1 });
        },
        (error) => { this.setState({ error }); }
      )
  }



  componentDidMount() {
  	this.timer_request_array = this.props.tlm_data_array.map((tlm_data) =>{
  		return setInterval(this.requestTlmData, 1000, tlm_data)
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
                  <path d="M0 0h800v1200H0z"></path>
                </clipPath>
              </defs>
              <g clipPath="url(#a)">
                <path className={this.state.hoge_valve0} d="M432 446l-50 44.5v-89zm0 0l50-44.5v89z"></path>
                <circle vectorEffect="non-scaling-stroke" cx="244.5" cy="248.5" r="112.5" fill="#D0F1FD" stroke="#000" strokeLinecap="square" strokeMiterlimit="3"></circle>
                <path d="M244.5 361v85m0 0H382" fill="none" vectorEffect="non-scaling-stroke" stroke="#000" strokeLinecap="square" strokeMiterlimit="3"></path>
                <g stroke="#000" strokeLinecap="square" strokeMiterlimit="3">
                  <path vectorEffect="non-scaling-stroke" d="M382 401.5v89M382 490.5l100-89M382 401.5l100 89M482 401.5v89"></path>
                  
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