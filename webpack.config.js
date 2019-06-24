const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');
const publicConfig = {
    devtool: 'cheap-module-source-map',            
    entry:{
        app: [
            path.join(__dirname, 'src/main.js')
        ],
        common: ['vue', 'vue-router']
    }, 
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ] 
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:5].css',
            allChunks: true
        }),

    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "common",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
};

module.exports = merge(commonConfig, publicConfig);