const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        // app: './src/merge.js',
        // app: './src/comp/lazy.js'
        app: './src/index.js'
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
        },
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        alias:{
            '@':path.join(__dirname,'./src/comp')
        },
    },
    module: {
        rules:[
            {
                test: /\.s[ac]ss$/i,
                // postcss-loader是进行浏览器兼容的，会处理兼容各个浏览器 可以安装 autoprefixer进行自动补充 补充等 下次再提交
                // sass-loader sass 还需要一个sass的处理器 dart-sass 
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.jsx?$/i,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/preset-env', {
                        useBuiltIns: "usage",
                    }], ['@babel/preset-react']],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            },
            {
                test: /\.js$/,
                // eslint也可以在提交代码前再检测
                enforce: 'pre', //加载器的执行顺序，不设置为正常执行，pre（前）|post（后），eslint是检查代码规范，应该在编译前就执行
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        // 分离和压缩css
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        // 生成一个html文件
        new HtmlWebpackPlugin({
            title: 'merge',
            template: path.resolve(__dirname, 'src/index.html')
          }),
        // 定义全局的方法，一般不使用
        new webpack.ProvidePlugin({
            join: ['lodash', 'join']
        })
    ]
}