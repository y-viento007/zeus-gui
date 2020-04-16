
// 設定ファイル
// 参考↓
// https://qiita.com/r-nouchi/items/411e2acbd6df8db6d4a0

// development.js 以外の設定ファイルで起動したい場合は、`NODE_ENV={ファイル名(.jsなし)} npm start`

import moment from 'moment'

// 下記のコマンドをshなどで実行してjsonを作成する
// jq -R -s -f form.jq tlm.csv > tlm_element_setting_array.json
var tlm_element_setting_array = require('./tlm_element_setting_array.json');


export default {
    URL_BACKEND: "http://localhost:3001/status",
    // INITIAL_START_DATE : moment("20191202_090230",'YYYYMMDD_HHmmss'),
    INITIAL_START_DATE : moment(),

    DISPLAY_COLUMN_SETTING_ARRAY : [
        {
          name: "info_diagram",
          flex_basis: "40%",
        },
        {
          name:"value",
          flex_basis: "20%",
        },
        {
          name:"graph1",
          flex_basis: "20%",
        },
        {
          name:"graph2",
          flex_basis: "20%",
        },
      ],

    DISPLAY_FRAME_SETTING_ARRAY : [
        {
          ID: 0,
          name: "info",
          type: "info",
          display_column: "info_diagram",
          flex_basis: "100%",
        },
        {
          ID: 1,
          name: "diagram",
          type: "diagram",
          display_column: "info_diagram",
          flex_basis: "100%",
        },
        {
          ID: 2,
          name: "graph_1",
          type: "collection",
          display_column: "graph1",
          flex_basis: "100%",
        },
        {
          ID: 3,
          name: "value_1",
          type: "collection",
          display_column: "value",
          flex_basis: "100%",
        },
        {
          ID: 4,
          name: "value_2",
          type: "collection",
          display_column: "value",
          flex_basis: "100%",
        },
        {
          ID: 5,
          name: "value_3",
          type: "collection",
          display_column: "value",
          flex_basis: "100%",
        },
        {
          ID: 6,
          name: "value_4",
          type: "collection",
          display_column: "value",
          flex_basis: "100%",
        },
        {
          ID: 7,
          name: "graph_2",
          type: "collection",
          display_column: "graph2",
          flex_basis: "100%",
        },
      ],

    TLM_ELEMENT_SETTING_ARRAY : tlm_element_setting_array,

    // DiagramのTLM項目は変わることが少ないはずなので、ベタ打ちで設定する
    TLM_DIAGRAM_DATA_ARRAY : [
        {
          "ID": "0",
          "name": "valve_open_close02"
        },
      ],

    CMD_DATA : {
	      revision : 1,
	      type : "CMD",
	      name: "Valve_open",
	      args: [],
	    }
};