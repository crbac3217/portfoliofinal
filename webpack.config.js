const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output:{
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.[contenthash].js',
    },
    devServer: {
        static: './src',
        host: '0.0.0.0',
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true
    },
    plugins:[
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, './public') }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            minify: true
        }),
        new MiniCSSExtractPlugin()
    ],
    module: {
        rules:[
            {
                test: /\.(js)$/,
                exclude: /node_moduels/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test: /\.(jsx)$/,
                exclude: /node_moduels/,
                use:{
                    loader:'babel-loader'
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use:[
                    {
                        loader:'file-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use:[
                        MiniCSSExtractPlugin.loader,
                        'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use:[
                    {
                        loader:'html-loader'
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            }
        ]
    }
}