使用的一些问题
### 使用mini-css-extract-plugin分离css失败
1.和webpack教程走，package.json添加了sideEffects， 需要去掉，这个影响了打包和分离css
### postcss-loader没有兼容的css就是 autoprefixer不起作用
1.别再package.json里面直接配置browserslist, 选择自己新建一个.browserslistrc就没问题
### 三种方式的热加载
1.watch 能更新文件，但页面需要手动刷新
2.webpack-dev-server能热加载，不需要刷新页面，但不会生产文件，直接在内存中进行改变
3.express+ webpack-dev-middleware.在内存中，不生产新文件，也需要手动刷新文件
### esmodule
在package.json加上 "type": "module", 但使用后 哪些webpack.config都会有问题，所以也可以不加上
### ts的使用
第三方库没有声明可以安装 比如： npm install --save-dev @types/lodash
1.npm i ts-loader typescript -D 配置书写tsconfig.json
2.声明不同的引入，比如svg 在 custom.d.ts里面
### 测试可以使用mocha 可以进行基本的单元测试 和 异步运行测试 和 http请求测试 略
### url-loader都被更换
现在目前都主要在asset/resource等，等于webpack内置了这些loader， svg的资源可以用用asset/inline使用url注入
### react的todo
增加测试单元，增加eslint的测试，慢慢来