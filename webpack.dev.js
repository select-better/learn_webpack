/*
 * @Author: your name
 * @Date: 2021-09-12 17:34:36
 * @LastEditTime: 2021-09-12 18:03:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web-demo/webpack.dev.js
 */
const { merge }  = require('webpack-merge');
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        port: 5555,
        hot: true,
        open: true,
        client: {
            overlay: {
                warnings: false,
                errors: false
            },
        }
       
    },
    module: {
       
    },
    plugins: [
   
    ]
})