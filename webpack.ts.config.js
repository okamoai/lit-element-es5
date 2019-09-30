const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  devtool: false,
  mode: 'production',
  entry: {
    'lit-button': './src/wc/lit-button/index.ts',
    'std-button': './src/wc/std-button/index.ts',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/js/wc-ts',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors-ts',
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
        test: /\.(js|ts)$/,
        use: 'ts-loader',
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
      reportFilename: '../../../report-ts.html',
    }),
  ],
}
