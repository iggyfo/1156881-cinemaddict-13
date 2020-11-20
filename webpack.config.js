const { dirname } = require("path");
const path = require(`path`);

module.exports = {
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, `public`)
  },
  devtool: `sourse-map`
}
