const path = require('path');

module.exports = {
  target: 'node',
  entry: './server.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    modules: [path.resolve(__dirname, 'server'), 'node_modules'],
  },
};
