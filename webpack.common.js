const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const babel = require('./babel.config.js');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    output: {
        filename: 'cookie-message.js',
        path: path.resolve(__dirname, 'dist'),
        library: undefined,
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: babel
                }
            }
        ]
    }
};
