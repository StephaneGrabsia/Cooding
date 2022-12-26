/* eslint-disable */

const path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    mode: 'development',
    entry: {
        app: './src/app.js',
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.bundle.js',
    },
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, './public'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                // if use css
                // test: /\.css$/,
                // use: ['style-loader', 'css-loader']

                // if use scss
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']

            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    }
};