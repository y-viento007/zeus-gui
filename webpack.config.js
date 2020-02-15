const path = require('path');
const webpack = require('webpack');
const environment = process.env.NODE_ENV || 'development';


module.exports = {
  module: {
    loaders: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      }
    ]
  },
};