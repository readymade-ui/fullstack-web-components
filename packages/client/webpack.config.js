import { resolve } from 'path';
import HtmlWebpackPlugin  from 'html-webpack-plugin';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';
import LiveReloadPlugin  from 'webpack-livereload-plugin';
import TerserPlugin  from 'terser-webpack-plugin';
import PostCSSCSSOPlugin from 'postcss-csso';

export default async (env) => {
  const environment = env.production ? 'production' : 'development';
  return {
    mode: environment,
    entry: {
      index: './src/index.ts',
      main: './src/view/main/main.ts',
      login: './src/view/login/login.ts',
      dashboard: './src/view/dashboard/dashboard.ts',
      polyfill: './src/polyfill.ts',
    },
    output: {
      filename: '[name].js',
      path: resolve('./dist'),
      library: {
        type: "module",
      },
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: true,
        }),
      ],
    },
    plugins: [new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
      minify: environment === 'production',
    }), new HtmlWebpackTagsPlugin({
      tags: ['./polyfill.js', './style.css'].concat(
        environment === 'development'
          ? 'http://localhost:35729/livereload.js'
          : []
      ),
      append: true,
    })]
      .concat(new LiveReloadPlugin({})),
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        { test: /\.ts?$/, loader: 'ts-loader' },
        // (environment === 'production') && {
        //   test: /\.ts?$/,
        //   use: ['./loader.js', 
        //   { 
        //     options: {
        //       plugins: [PostCSSCSSOPlugin],
        //     }
        //   }],
        //   type: 'asset/source',
        // }
      ]
    },
    experiments: {
      outputModule: true,
    },
  };
};
