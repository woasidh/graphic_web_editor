var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// todo .html 확장자 없이 rendering 하기 (서버 config로 하기)

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.ts',
    editor: './src/index.ts'
  },
  watch: true, // dev-server에서는 watch가 default로 true
  module: {
    rules: [
      // scss css로 전처리 -> css load
      {
        test: /\.scss$/,
        // todo css-mini-extractor로 하기
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      // ts 파일 load할 수 있게
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      /**
       * webpack5 file-loader depricated -> 공식문서에 나옴
       * todo asset modules로 하기
       */
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   loader: 'file-loader',
      // },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: '[name].bundle.js',
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
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      filename: 'editor.html',
      template: 'src/editor.html',
      chunks: ['editor']
    })
  ],
}