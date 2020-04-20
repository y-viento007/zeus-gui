
// 設定ファイル
// 参考↓
// https://qiita.com/r-nouchi/items/411e2acbd6df8db6d4a0

// development.js 以外の設定ファイルで起動したい場合は、`NODE_ENV={ファイル名(.jsなし)} npm start`

import moment from 'moment'

// 下記のコマンドをshなどで実行してjsonを作成する
// jq -R -s -f form.jq tlm.csv > tlm_data_array.json
var tlm_data_array = require('./tlm_data_array.json');


export default {
    URL_BACKEND: "http://localhost:3001/status",
    // INITIAL_START_DATE : moment("20191202_090230",'YYYYMMDD_HHmmss'),
    INITIAL_START_DATE : moment(),

    TLM_COLUMN_ARRAY : [
        "diagram",
        "value",
        "graph"
      ],

    TLM_WINDOW_DATA_ARRAY : [
        {
          ID: 0,
          name: "diagram",
          type: "diagram",
          column: "diagram"
        },
        {
          ID: 1,
          name: "graph_1",
          type: "graph",
          column: "graph"
        },
        {
          ID: 2,
          name: "value_1",
          type: "value",
          column: "diagram"
        },
        {
          ID: 3,
          name: "value_2",
          type: "value",
          column: "value"
        },
        {
          ID: 4,
          name: "value_3",
          type: "value",
          column: "value"
        },
        {
          ID: 5,
          name: "value_4",
          type: "value",
          column: "value"
        },
        {
          ID: 6,
          name: "graph_2",
          type: "graph",
          column: "graph"
        }
      ],

    TLM_DATA_ARRAY : tlm_data_array,

    // DiagramのTLM項目は変わることが少ないはずなので、ベタ打ちで設定する
    TLM_DIAGRAM_DATA_ARRAY : [
        {
          "ID": "0",
          "name": "valve_open_close02"
        },
        {
          "ID": "0",
          "name": "valve_open_close02"
        },
        {
          "ID": "0",
          "name": "valve_open_close02"
        },
      ],

    CMD_TEST_DATA : {
	      revision : 1,
	      type : "CMD",
	      name: "Valve_open",
	      args: [],
	    },
    CMD_DATA_ARRAY : [
        {name:"Cmd_ValveOpen"},
        {name:"Cmd_ValveOpenUvcSafe"},
        {name:"Cmd_ValveClose"},
        {name:"Cmd_ValveOpenClose"},
        {name:"Cmd_ValveOpenCloseUvcSafe"},
        {name:"Cmd_ValveMultipleOpenClose"},
        {name:"Cmd_ValveMultipleOpenCloseUvcSafe"},
        {name:"Cmd_ValveAutoOpenCloseStart"},
        {name:"Cmd_ValveAutoOpenCloseEnd"},
        {name:"Cmd_ValveShutdownAll"},
        {name:"Cmd_HeaterOn"},
        {name:"Cmd_HeaterOff"},
        {name:"Cmd_HeaterSetCurrentEach"},
        {name:"Cmd_HeaterSetMaxCurrent"},
        {name:"Cmd_HeaterPwmOn"},
        {name:"Cmd_HeaterPwmOff"},
        {name:"Cmd_HeaterPwmChangeDuty"},
        {name:"Cmd_HeaterShutdownAll"},
        {name:"Cmd_HeaterOnOff"},
        {name:"Cmd_HeaterPwmOnOff"},
        {name:"Cmd_NoOperation"},
        {name:"Cmd_TempSetReadInterval"},
        {name:"Cmd_PressSetReadInterval"},
        {name:"Cmd_TelemetrySendAnomalyInfo"},
        {name:"Cmd_TelemetrySetInterval"},
        {name:"Cmd_TelemetrySendAutocontrolInfo"},
        {name:"Cmd_THRM_CTRL_ENABLE"},
        {name:"Cmd_THRM_CTRL_DISABLE"},
        {name:"Cmd_THRM_HEATER_CTRL_ENABLE"},
        {name:"Cmd_THRM_HEATER_CTRL_DISABLE"},
        {name:"Cmd_THRM_SET_MAX_DUTY"},
        {name:"Cmd_THRM_SET_UPPER_THRESHOLD"},
        {name:"Cmd_THRM_SET_LOWER_THRESHOLD"},
        {name:"Cmd_THRM_SWITCH_REF_THERMO"},
        {name:"Cmd_VALVE_CTRL_ENABLE"},
        {name:"Cmd_VALVE_CTRL_DISABLE_CLEAR"},
        {name:"Cmd_VALVE_CTRL_AUTO_DISABLE"},
        {name:"Cmd_VALVE_CTRL_SET_AVE_STEP_TPS2"},
        {name:"Cmd_VALVE_CTRL_SET_AVE_STEP_RV"},
        {name:"Cmd_VALVE_CTRL_SET_WAIT_STEP_RV"},
        {name:"Cmd_VALVE_CTRL_SET_RV_SEL"},
        {name:"Cmd_VALVE_CTRL_SET_VPS_THRS_RV"},
        {name:"Cmd_VALVE_CTRL_SET_A"},
        {name:"Cmd_VALVE_CTRL_SET_M_DVT"},
        {name:"Cmd_VALVE_CTRL_SET_PRESS_SLOPE"},
        {name:"Cmd_VALVE_CTRL_SET_PRESS_OFFSET"},
        {name:"Cmd_VALVE_CTRL_SET_B"},
        {name:"Cmd_ANOMALY_HANDLER_FLAG_MODIFY_PRESS"},
        {name:"Cmd_ANOMALY_HANDLER_FLAG_MODIFY_RV"},
        {name:"Cmd_ANOMALY_HANDLER_FLAG_MODIFY_RTV"},
      ]

};