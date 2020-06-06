This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 準備
- node.jsをインストール
- ルートディレクトリで`npm install`が必要

- Windows環境で新たに環境構築した際にエラーが出た
	- グローバルに`react-dev-utils`がないらしいので`npm -g install react-dev-utils`を実行
	- グローバルに`react-scripts`がないらしいので`npm -g install react-scripts`を実行

## 手順
- `src/config`内ファイルで初期設定を行う
	- URL
		- `URL_BACKEND` をバックエンドのURLにする
	- 時刻
		- 初期時刻は`INITIAL_START_DATE`で設定
	- TLM表示項目の設定
		- `TLM Content`と`TLM Diagram`が最小単位
			- バックエンドに送るjson形式はどちらも同一
		- `TLM Content`の設定
			- `tlm.csv`で各`TLM Content`の表示設定
			- `jq -R -s -f form.jq tlm.csv > tlm_data_array.json`によって`tlm_data_array.json`として読み込む
		- `TLM Diagram`の設定
			- key:`TLM_DIAGRAM_DATA_ARRAY` としてベタ打ちで表示設定
- `npm start`でreact appが起動する
	- `AppConfig`がないと言われたら`npm install`を再実行すると動く

## 手順（フロントエンド単体）
- json server
	- json serverに対するPOSTに対してjsonを返す
		- オーバーライドによって、POSTすると実際にはGETすることになる
			- POST時に送るjsonは読み取られない
		- TLM表示に必要な`data`をkeyとするデータを含む
	- `./sample_json_server`のディレクトリで`README.md`に従いjsonサーバーを起動する
- `src/config`内ファイルで初期設定を行う
	- `URL_BACKEND` をsample_json_serverの`http://localhost:3001/status` にする


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
