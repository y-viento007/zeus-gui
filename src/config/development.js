
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
    INITIAL_START_DATE : moment("20191202_090230",'YYYYMMDD_HHmmss'),

    TLM_WINDOW_DATA_ARRAY : [
          {
            ID: 1,
            name: "graph-1",
            type: "graph"
          },
          {
            ID: 2,
            name: "value-1",
            type: "value"
          },
          {
            ID: 3,
            name: "value-2",
            type: "value"
          },
          {
            ID: 4,
            name: "value-3",
            type: "value"
          },
          {
            ID: 5,
            name: "value-4",
            type: "value"
          }
        ],

    TLM_DATA_ARRAY : tlm_data_array,

    CMD_DATA : {
	      revision : 1,
	      type : "CMD",
	      name: "Valve_open",
	      args: [],
	    }
};