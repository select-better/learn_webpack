/*
 * @Author: your name
 * @Date: 2021-09-10 17:18:30
 * @LastEditTime: 2021-09-12 16:51:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web-demo/src/print.js
 */
// import _ from 'lodash';
// console.log(_.join(['another', 'module', 'loaded!']))

export default function printMe(text){
    console.log(text,'kkm')
}

// webpackPrefetch webpack的预获取 预获取会在父chunk加载后加载， 优先级不太高
// webpackPreload webpack的预获取 预获取会和父chunk并行加载， 优先级中等，会在父chunk中立即请求

// import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
