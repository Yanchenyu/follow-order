var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + '/index.js',
  output: {
    path: __dirname + '/output/',
    filename : 'js/bundle.js'
  },
  module:{
    // loaders:[
    //   {
    //     test:/\.js$/,
    //     exclude: './node_modules/',
    //     loader: 'babel-loader'
    //   },
    //   {
    //     test:/\.css$/,
    //     loader:'style-loader'
    //   },
    //   { 
    //     test: /\.scss$/, 
    //     loader: 'css-loader'
    //   }
    // ]
    rules:[
      {
            test: /\.js$/,
            exclude: './node_modules/',
            use:[
                'babel-loader'
            ]
      },
      {
            test:/\.css$/,
            use:[
                'style-loader',
                'css-loader'
            ]
      },
      {
            test:/\.(png|jpg|gif)$/,
            use:[                
                'url-loader'
            ]
      }
    ]
  },

  plugins: [
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: function () {
        return [precss, autoprefixer];
      },
      devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
      }
    }
  }),
    new CleanPlugin('output'),
    new htmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.BannerPlugin('Copyright Chvin'),
        new webpack.HotModuleReplacementPlugin()
  ]



}