const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

const plugins = [
  new HtmlWebpackPlugin({
    template: path.join(PUBLIC_DIR, 'index.html'),
    filename: 'index.html',
  }),

  new FaviconsWebpackPlugin({
    logo: path.resolve(PUBLIC_DIR, 'favicon.svg'),
    prefix: '/favicons/',
    outputPath: path.resolve(BUILD_DIR, 'favicons'),
    mode: 'webapp',
    inject: (htmlPlugin) =>
      path.basename(htmlPlugin.options.filename) === 'index.html',
    favicons: {
      icons: {
        appleIcon: false,
        appleStartup: false,
        android: false,
        favicons: true,
        coast: false,
        firefox: false,
        windows: false,
        yandex: false,
      },
    },
    cache: false,
  }),
  new webpack.HotModuleReplacementPlugin(),
];

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

const devServer = {
  historyApiFallback: true,
  open: true,
  compress: true,
  allowedHosts: 'all',
  hot: true,
  client: {
    overlay: {
      errors: true,
      warnings: true,
    },
    progress: true,
  },

  port: 3000,

  devMiddleware: {
    writeToDisk: true,
  },
  static: [
    {
      directory: path.join(BUILD_DIR, 'favicons'),
    },
  ],
};

module.exports = {
  devServer,
  plugins,
  entry: path.join(__dirname, '..', 'src', 'index.tsx'),
  output: {
    path: BUILD_DIR,

    publicPath: '/',
  },

  performance: {
    hints: false,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },

      { test: /\.(html)$/, use: ['html-loader'] },

      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
                namedExport: true,
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
        ],
      },
      {
        test: /\.(s[ac])ss$/i,
        use: ['sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash][ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext]',
        },
      },
    ],
  },
};
