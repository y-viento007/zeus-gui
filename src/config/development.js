
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
          column: "value"
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
          "name": "hoge_valve0"
        },
      ],

    CMD_DATA : {
	      revision : 1,
	      type : "CMD",
	      name: "Valve_open",
	      args: [],
	    }
};