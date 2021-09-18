const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 代码包的分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTs= require('fork-ts-checker-webpack-plugin')
// const isProductionMode = process.env.NODE_ENV === 'production';
const webpack = require("webpack");
// const WorkboxPlugin = require('workbox-webpack-plugin');


// 生产和开发是不同的环境，某些 utility, plugin 和 loader 都只用于生产环境
module.exports = {
    // entry: './src/index.js', 当mode设置为development的时候，不会被压缩
    // mode: 'development',
    mode: 'production',
    entry: {
        // shared 共享我们的包， lodash
        index : {
            import: './src/index.js',
            // dependOn: 'shared'
        },
        // hot: 'webpack/hot/dev-server.js',
        // client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
        // inx : {
        //     import: './src/aa.ts',
        //     // dependOn: 'shared'
        // },
        // __webpack_nonce__ : 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM'

        // 增加安全
        // print :{
        //     import:'./src/print.js',
        //     dependOn: 'shared'
        // },
        // shared: 'lodash'
    },
    // 多个入口使用
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    //  },
    // 支持导出
    // optimization: {
    //     usedExports: true,
    // },
    // 新版本不需要 moduleIds 这些， 内部有解决的
    // optimization: {
    //     moduleIds: 'deterministic',
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //      cacheGroups: {
    //        vendor: {
    //          test: /[\\/]node_modules[\\/]/,
    //          name: 'vendors',
    //          chunks: 'all',
    //        },
    //     },
    //     // 下面的这些可以减少webpack的本身算法，进行优化
    //     // removeAvailableModules: false,
    //     // removeEmptyChunks: false,
    //     // splitChunks: false,
    //    },
    // },
    // 别在生产环境  生产可以选择没有source-map 
    // devtool: 'none',
    output: {
        // 输出的名称
        // filename: 'bundle.js',
        filename: '[name].[contenthash].js',
        //  路径
        path: path.resolve(__dirname, 'dist'),
        // 清楚先前的内容
        clean: true,
        publicPath: '/',
        // 创建一个库，进行简单的配置
        // library: {
        //     name: 'ccCome',
        //     // 用于兼容所有的库
        //     type: 'umd'
        // }
        // 去掉路径消息，较少垃圾回收机制的压力
        pathinfo: false,
    },
    // 将lodash的依赖放在外面使用者哪里
    // 比如某些库 react的， 必须外面有react
    // 下面是配置lodash的库在外面
    // externals: {
    //     lodash: {
    //       commonjs: 'lodash',
    //       commonjs2: 'lodash',
    //       amd: 'lodash',
    //       root: '_',
    //     },
    // },
    // 匹配library后的所有文件
    // externals: [
    //     /^library\/.+$/,
    // ],
    devServer:{
        static: './dist',
        // 默认打开的浏览器
        open: true,
        // hot和client设置false的话，就不回热加载了
        hot: true,
        port: 3333,
        // 方向代理
        proxy: {
          '/api': 'http://localhost:3000',
        },
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                // postcss-loader是进行浏览器兼容的，会处理兼容各个浏览器 可以安装 autoprefixer进行自动补充 补充等 下次再提交
                // sass-loader sass 还需要一个sass的处理器 dart-sass 
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','sass-loader']
            },
            // 图片的加载
            {
                test: /\.(png|svg|jpg|gif)$/i,
                type: 'asset/resource'
            },
             // 文字
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            // 加载资源
            {
                test: /\.(csv|tsv)$/i,
                use:['csv-loader']
            },
            {
                test: /\.xml$/i,
                use:['xml-loader']
            },
            // 进行自己结构
            {
                test: /\.toml$/i,
                type:'json',
                parser: {
                    parse: toml.parse
                }
            }, 
            {
                test: /\.yaml$/i,
                type:'json',
                parser: {
                    parse: yaml.parse
                }
            }, 
            {
                test: /\.json5$/i,
                type:'json',
                parser: {
                    parse: json5.parse
                }
            }, 
            {
                test: /\.jsx?$/i,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            },
            {
                test: /\.tsx?$/i,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: false
                        }
                    }
                ]
            }
        ]
    },

   performance: {
      hints:false   
   },
    
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            title: 'cache',
            // 添加模版，这样就是会有container的id的div了
            template: path.resolve(__dirname, 'src/index.html')
          }),
        // 会出现分析的方块，如有需要进行相应的优化
        // new BundleAnalyzerPlugin()
        new ForkTs(),
        // new webpack.HotModuleReplacementPlugin(),
        // new WorkboxPlugin.GenerateSW({
        //     // 这些选项帮助快速启用 ServiceWorkers
        //     // 不允许遗留任何“旧的” ServiceWorkers
        //     clientsClaim: true,
        //     skipWaiting: true,
        //   }),
    ]
}