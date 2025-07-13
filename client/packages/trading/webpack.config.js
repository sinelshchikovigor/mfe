const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    port: 3002,
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'esnext',
          jsx: 'automatic',
          sourcemap: isDevelopment,
          tsconfigRaw: require('./tsconfig.json'),
          ...(isDevelopment && { jsxDev: true }),
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'trading',
      filename: 'remoteEntry.js',
      exposes: {
        './TradingPanel': './src/TradingPanel',
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
      },
    }),
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};
