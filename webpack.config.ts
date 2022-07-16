import url from 'node:url'
import path from 'node:path'

import { Configuration } from 'webpack'
import 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const isDevelopment = process.env.NODE_ENV === 'development'

const config: Configuration = {
  experiments: {
    lazyCompilation: {
      imports: true,
      entries: false,
    },
    outputModule: true,
    topLevelAwait: true,
  },
  entry: {
    main: './src/index.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: {
          plugins: [isDevelopment && 'react-refresh/babel'].filter(Boolean),
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      scriptLoading: 'module',
    }),
    (isDevelopment && new ReactRefreshWebpackPlugin()) as any,
  ].filter(Boolean),
  optimization: {
    chunkIds: 'named',
    splitChunks: {
      chunks: 'all',
    },
  },
}

export default config
