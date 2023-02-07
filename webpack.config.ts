import { resolve } from 'path';

import type { Configuration as WebpackConfiguration, WebpackOptionsNormalized } from 'webpack';

import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

interface AdditionalOptions {
  hot?: boolean;
  analyze?: boolean;
}

type Env = Record<string, boolean> | undefined;

type Options = Pick<WebpackOptionsNormalized, 'mode'> & AdditionalOptions;

type Configuration = WebpackConfiguration & WebpackDevServerConfiguration;

const configOutput: Configuration['output'] = {
  path: resolve(__dirname, 'build'),
  filename: 'js/[name].[contenthash].js',
  assetModuleFilename: 'assets/[hash][ext][query]',
};

const configOptimization: Configuration['optimization'] = {
  runtimeChunk: 'single',
  minimizer: [
    new ESBuildMinifyPlugin({
      target: 'esnext',
      css: true,
    }),
  ],
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 1,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  },
};

const configModules = (isProduction: boolean): Required<Configuration>['module'] => ({
  rules: [
    {
      test: /\.(ts)$/,
      loader: 'esbuild-loader',
      exclude: /node_modules/,
      options: {
        loader: 'ts',
        target: 'esnext',
      },
    },
    {
      test: /\.(png|jpg|jpeg|gif|webp)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'images/[hash][ext][query]',
      },
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[hash][ext][query]',
      },
    },
    {
      test: /\.(css|pcss)$/,
      exclude: /node_modules/,
      use: [
        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              auto: true,
              localIdentName: isProduction ? '[hash:base64]' : '[name]-[local]-[hash:base64:8]',
            },
          },
        },
        {
          loader: 'postcss-loader',
        },
      ],
    },
    {
      test: /\.svg$/i,
      type: 'asset/resource',
      generator: {
        filename: 'svg/[hash][ext][query]',
      },
    },
  ],
});

interface GetConfigPluginsProps {
  isAnalyze: boolean;
  isDevelopment: boolean;
  isProduction: boolean;
}

const getConfigPlugins = ({
  isAnalyze,
  isDevelopment,
  isProduction,
}: GetConfigPluginsProps): Required<Configuration>['plugins'] => [
  new Dotenv(),
  new HtmlWebpackPlugin({
    title: 'MKeeper',
    template: './src/public/index.html',
  }),
  new MiniCssExtractPlugin({
    filename: isProduction ? 'css/[name].[contenthash].css' : 'css/[name].css',
    chunkFilename: isProduction ? 'css/[id].[contenthash].css' : 'css/[id].css',
  }),
  ...(isDevelopment ? [new ForkTsCheckerWebpackPlugin()] : []),
  ...(isAnalyze ? [new BundleAnalyzerPlugin({ analyzerPort: 8081 })] : []),
  ...(isProduction
    ? [new CopyWebpackPlugin({ patterns: [{ from: './src/static', to: '.' }] })]
    : []),
];

const config = (_env: Env, { analyze = false, hot = false, mode }: Options): Configuration => {
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';
  const isDevServer = isDevelopment && hot;
  const isAnalyze = isDevelopment && analyze;

  const appConfig: Configuration = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'eval-source-map',

    entry: './src/index.ts',

    output: configOutput,

    optimization: configOptimization,

    module: configModules(isProduction),

    resolve: {
      extensions: ['.wasm', '.json', '.js', '.mjs', '.cjs', '.ts', '.mts', '.cts', '.d.ts'],
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },

    plugins: getConfigPlugins({ isAnalyze, isDevelopment, isProduction }),
  };

  const devServer: WebpackDevServerConfiguration = {
    static: {
      directory: resolve(__dirname, 'src/static'),
    },
    historyApiFallback: true,
    compress: true,
    port: 8080,
  };

  return isDevServer
    ? {
        ...appConfig,
        devServer,
      }
    : appConfig;
};

export default config;
