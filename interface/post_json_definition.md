# インターフェース調整のためのjsonサンプル集

## フロントからPOSTするjson
### TLM
{
	“revision” : 1,
	“type” : “TLM”,
		“//” : “ID”はフロント側の管理用,
		“//” : “name”はテレメ項目名,
	“name” : “hoge-voltage”,
		“//” : 以下のtime関連は、time_rangeが0なら戻り値は”current_time”の1データのみ（系統図表示や数値表示向け）、0でないなら戻り値は”current_time”-”time_range”から”current_time”の範囲のデータを”time_delta”刻みで（グラフの表示向け）,
	“current_time” : “20191202_090230”,
	“time_range” : 30,
	“time_delta” : 1,
}
{
	“revision” : 1,
	“type” : “TLM”,
	“name” : “hoge-valve”,
	“current_time” : “20191202_090230”,
	“time_range” : 0,
	“time_delta” : null,
}
{
	“revision” : 1,
	“type” : “TLM”,
	“name” : “hoge-heater-onoff”,
	“current_time” : “20191202_090230”,
	“time_range” : 0,
	“time_delta” : null,
}

​
### CMD
{
	“revision” : 1,
	“type” : “CMD”,
	“name”: “Valve_open”
	“args”: [ ] 
}
​
​
## フロントに返して欲しいjson
### TLM
{
	“name” : “hoge-voltage”,
	“data” : [{“time”:“20191202_090200” ,”value”:5.0},{“time”:“20191202_090201” ,”value”:5.1},...]
}
{
	“name” : “hoge-valve”,
	“data” : [{“time”:“20191202_090230” ,”value”:“Close”}]
}
{
	“name” : “hoge-heater-onoff”,
	“data” : [{“time”:“20191202_090230” ,”value”:“ON”}]
}


​
### CMD
{	
	”ack”: ”success”
}
