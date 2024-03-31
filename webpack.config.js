const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");

// Check if certificate files exist
const certFilesExist =
  fs.existsSync(path.resolve(__dirname, "192.168.68.102-key.pem")) &&
  fs.existsSync(path.resolve(__dirname, "192.168.68.102.pem"));

module.exports = {
  mode: "development",
  entry: "./src/script.js", // Adjust if your main JS file is different
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/service-worker.js", to: "service-worker.js" },
        { from: "src/icon-192x192.png", to: "icon-192x192.png" },
        // Add any other assets you need to copy
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
    open: true,
    ...(certFilesExist && {
      server: {
        type: "https",
        options: {
          key: fs.readFileSync(
            path.resolve(__dirname, "192.168.68.102-key.pem")
          ),
          cert: fs.readFileSync(path.resolve(__dirname, "192.168.68.102.pem")),
        },
      },
    }),
    host: "0.0.0.0", // Optional: to access your server externally
    port: 8080, // Optional: change this to your desired port
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
