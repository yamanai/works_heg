var path = require("path");
var webpack = require("webpack");
var autoprefixer = require("autoprefixer");
var precss = require("precss");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const PrerenderSpaPlugin = require("prerender-spa-plugin");
const extractLess = new ExtractTextPlugin({
  filename: "[name].css",
  disable: process.env.NODE_ENV === "development"
});
module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/main.js"]
    // index: './src/index/index.js',
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "js/[name].js"
    // filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        // options: {
        //   extractCSS: true
        // }
        options: {
          loaders: {
            less: ExtractTextPlugin.extract({
              loader: "css-loader!less-loader?indentSyntax",
              fallback: "vue-style-loader" // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            })
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        use: extractLess.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "less-loader",
              options: {
                importLoaders: 1
              }
            }
          ],
          fallback: "vue-style-loader"
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "images/[hash].[ext]"
        }
      }
    ]
  },
  resolve: {
    extensions: ["css", ".js", ".vue", ".less"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      assets: path.resolve(__dirname, "./src/assets"),
      pages: path.resolve(__dirname, "./src/pages"),
      models: path.resolve(__dirname, "./src/models"),
      components: path.resolve(__dirname, "./src/components"),
      $vuex: path.resolve(__dirname, "./src/vuex")
    }
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    noInfo: true,
    hot: true,
    proxy: {
      "/heg_api/*": {
        target: "http://www.happyeasygo.com",
        changeOrigin: true,
        secure: false
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map",
  plugins: [
    // new CopyWebpackPlugin([
    //   {
    //     from: "src/assets"
    //   }
    // ]),
    extractLess,
    new HtmlWebpackPlugin({
      title: "HappyEasyGo",
      template: "./src/pages/index.html",
      filename: path.resolve(__dirname, "index.html"),
      hash: true,
      xhtml: true
    })
    // new PrerenderSpaPlugin(
    //   // Absolute path to compiled SPA
    //   path.join(__dirname, "./dist"),
    //   // List of routes to prerender
    //   ["/"]
    // ),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // })
  ]
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ]);
}
