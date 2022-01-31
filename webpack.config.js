var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      // scss css로 전처리 -> css load
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      // ts 파일 load할 수 있게
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // server는 build에 포함 안됨
  devServer: {
    port: 80,
  },
  // src/index.html에 번들링된 js 파일 끼워넣은 html 파일로 빌드
  plugins: [
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      template: 'src/index.html',
    }),
  ],
}