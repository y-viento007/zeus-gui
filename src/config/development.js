
// 設定ファイル
// 参考↓
// https://qiita.com/r-nouchi/items/411e2acbd6df8db6d4a0

// development.js 以外の設定ファイルで起動したい場合は、`NODE_ENV={ファイル名(.jsなし)} npm start`

import moment from 'moment'

export default {
    URL_BACKEND: "http://localhost:3001/status",
    INITIAL_START_DATE : moment("20191202_090230",'YYYYMMDD_HHmmss'),

    TLM_WINDOW_TYPE : ["value-1","graph-1"],

    TLM_DATA_ARRAY : [ 
          { 
            ID: 1,
            name : "hoge_voltage",

            display_setting: {
              type : "graph",
              window : "graph-1",
            },
            time_range : 3,
            time_delta : 1,

            // time:[], value:[]ではなく{time:,value:},{time:,value:}...としたい
            // time : ["20191202_090200","20191202_090201","20191202_090202"], 
            test_data : [
                {time:"20191202_090200", value:5.0},
                {time:"20191202_090201", value:4.9},
                {time:"20191202_090202", value:5.2},
              ], // テストデータ
          },
          { 
            ID: 2,
            name : "hoge-valve",

            display_setting: {
              type : "value",
              window : "value-1",
            },

            time_range : 0,
            time_delta : null,

            test_time : "20191202_090200",
            test_value : "Close", // テストデータ
          },
          { 
            ID: 3,
            name : "hoge-heater-onoff-valve",
            
            display_setting: {
              type : "value",
              window : "value-1",
            },

            time_range : 0,
            time_delta : null,

            test_time : "20191202_090200",
            test_value : "ON",// テストデータ
          },
      ],

    CMD_DATA : {
	      revision : 1,
	      type : "CMD",
	      name: "Valve_open",
	      args: [],
	    }
};