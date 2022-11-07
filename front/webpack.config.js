const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    resolve: {
        modules: [__dirname, 'node_modules'],
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};