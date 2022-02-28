import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import TerserPlugin from 'terser-webpack-plugin';

export default async (env) => {
  const environment = env.production ? 'production' : 'development';
  return {
    mode: environment,
    entry: {
      index: './src/index.ts',
      polyfill: './src/polyfill.ts',
      ponyfill: './src/ponyfill.ts',
    },
    output: {
      filename: '[name].js',
      path: resolve('./dist'),
      library: {
        type: 'module',
      },
    },
    optimization: {
      minimize: environment === 'production' ? true : false,
      minimizer: [
        new TerserPlugin({
          extractComments: true,
          terserOptions: {
            mangle: true,
          },
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunks: ['index'],
        minify: environment === 'production',
        scriptLoading: 'module',
      }),
      new HtmlWebpackTagsPlugin({
        tags: ['./polyfill.js', './style.css'],
        append: true,
      }),
    ].concat(new LiveReloadPlugin({})),
    resolve: {
      extensions: ['.ts', '.js'],
      symlinks: false,
    },
    module: {
      rules: [{ test: /\.ts?$/, loader: 'ts-loader' }],
    },
    experiments: {
      outputModule: true,
    },
  };
};
