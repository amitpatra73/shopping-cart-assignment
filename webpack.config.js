const path = require('path');

module.exports = {
    entry: {
        "main": './assets/js/index.js',
        "login": './assets/js/login.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'assets/js'),
    },
};