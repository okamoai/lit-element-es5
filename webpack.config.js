const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  devtool: false,
  mode: 'production',
  entry: {
    'lit-button': './src/wc/lit-button/index.js',
    'std-button': './src/wc/std-button/index.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/js/wc',
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          filename: '../lib/[name].js',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules\/(?!(lit-html|lit-element))\//,
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      {
        from: '**/*',
        to: '../../../',
        context: 'src/static',
      },
      {
        from: '{*,?!(src)/*}.js',
        to: '../lib/',
        context: 'node_modules/@webcomponents/webcomponentsjs',
      },
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: '../../../report.html',
    }),
  ],
}
