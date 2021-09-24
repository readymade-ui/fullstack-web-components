const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const htmlPageNames = ['login', 'dashboard'];

module.exports = (env) => {
  const environment = env.production ? 'production' : 'development';
  return {
    mode: environment,
    entry: {
      main: './src/main/main.ts',
      login: './src/login/login.ts',
      dashboard: './src/dashboard/dashboard.ts',
      polyfill: './src/polyfill.ts',
    },
    output: {
      filename: '[name].js',
      path: resolve('./dist'),
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: true,
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/main/index.html',
        chunks: ['main'],
        minify: environment === 'production',
      }),
    ]
      .concat(
        htmlPageNames.map(
          (name) =>
            new HtmlWebpackPlugin({
              template: resolve(`./src/${name}/index.html`),
              filename: `${name}.html`,
              chunks: [`${name}`],
              minify: environment === 'production',
            })
        )
      )
      .concat(new LiveReloadPlugin({}))
      .concat(
        new HtmlWebpackTagsPlugin({
          tags: ['./polyfill.js', './style.css'].concat(
            environment === 'development'
              ? 'http://localhost:35729/livereload.js'
              : []
          ),
          append: true,
        })
      ),
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        { test: /\.ts?$/, loader: 'ts-loader' },
        environment === 'production'
          ? {
              test: /\.ts?$/,
              loader: resolve('loader.js'),
              options: {
                plugins: [require('postcss-csso')],
              },
            }
          : {},
      ],
    },
  };
};
