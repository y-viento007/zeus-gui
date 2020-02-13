# JSON-serverの起動方法
`npx json-server --watch db.json --port 3001` で起動
- `localhost:3001` でアクセス可能になる

# POSTした時にGETと同じ内容が返ってくるようにする
- `npx json-server --watch db.json -m middleware.js --port 3001` で起動
	- https://qiita.com/Lurium/items/313f8f770a710b5ed188

