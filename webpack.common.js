const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      meta: {
        description:
          "Journalist, designer, developer Kazi Elman Awal’s website",
        robots: "index,follow",
        googlebot: "index,follow",
        generator: "Webpack",
        subject: "Proof Kazi can kind of code, for the web at least",
        referrer: "no-referrer",
        "Consent-Security-Policy": {
          "http-equiv": "Content-Security-Policy",
          content:
            "default-src 'self'; img-src 'self' data: https://*; font-src 'self'; child-src 'self'; style-src 'self' 'unsafe-inline';",
        },
      },
      title: "Kazi Elman Awal",
      favicon: "./src/favicon.png",
    }),
    new ScriptExtHtmlWebpackPlugin({
      module: /\.js$/,
    }),
  ],
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    moduleIds: "hashed",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
