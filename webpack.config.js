const path = require('path');

module.exports = {
    entry: './assets/js/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'assets/js'),
    },
};