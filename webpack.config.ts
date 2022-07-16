import url from 'node:url'
import path from 'node:path'

import { Configuration } from 'webpack'
import 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const isDevelopment = process.env.NODE_ENV === 'development'

const config: (env: { loader: 'babel' | 'swc' }) => Configuration = env => {
  return {
    experiments: {
      lazyCompilation: isDevelopment
        ? {
            imports: true,
            entries: false,
          }
        : false,
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

    // cache: {
    //   type: 'memory',
    // },

    module: {
      rules: [
        env.loader === 'swc'
          ? {
              test: /\.[jt]sx?$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'swc-loader',
                  options: {
                    jsc: {
                      transform: {
                        react: {
                          development: isDevelopment,
                          refresh: isDevelopment,
                          runtime: 'automatic',
                        },
                      },
                    },
                  },
                },
              ],
            }
          : {
              test: /\.[jt]sx?$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                plugins: [isDevelopment && 'react-refresh/babel'].filter(
                  Boolean
                ),
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
}

export default config
