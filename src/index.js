// import _ from 'lodash';
// import myImage from './source/ces.png'
// import Data from './source/data.xml'
// import Note from './source/data.csv'
// import dataYaml from './source/data.yaml'
// import dataToml from './source/data.toml'
// import printMe from './print'
// import { cube } from './match'
// import './style.scss';

// console.log(dataYaml.title)
// console.log(dataToml.owner.name)

// function component(){
//     const ele = document.createElement('div');
//     ele.innerHTML = _.join(['hello','webpack'], ' ');
//     ele.classList.add('hello')
//     const img = new Image();
//     img.src = myImage
//     ele.appendChild(img)
//     const btn =  document.createElement('button');
//     btn.innerHTML = 'click me'
//     btn.onclick = ()=>{
//         console.log('cc')
//     }
//     ele.appendChild(btn)
//     // console.log(Data)
//     // console.log(Note)
//     return ele
// }
// document.body.appendChild(component())

// async function getComponent(){
//     // const ele = document.createElement('div');
//     const { default: _} = await import('lodash')
//     const ele = document.createElement('div');
//     ele.innerHTML = _.join(['hello', 'webpack'], ' ')
//     ele.onclick = printMe.bind(null , '请注意112')
//     ele.classList = 'hello'
//     return ele
// }
// let comp
// getComponent().then(component => {
//     comp = component
//     document.body.appendChild(comp)
// })

// if (module.hot) {
//     module.hot.accept('./print.js', function() {
//       console.log('Accepting the updated printMe module!');
//     //   printMe();
//       document.body.removeChild(comp);
//       getComponent().then(component => {
//         comp = component
//         document.body.appendChild(comp)
//     })
//     })
//   }

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/service-worker.js').then(registration => {
//         console.log('SW registered: ', registration);
//       }).catch(registrationError => {
//         console.log('SW registration failed: ', registrationError);
//       });
//     });
//   }

// function component(){
//     const dom = document.createElement('div')
//     dom.innerHTML = ['hello webpack',
//         '5 的 cube = ' + cube(5)
//    ].join('\n\n')
//    return dom
// }
// console.log(component())
// document.body.appendChild(component())

import React, { useState } from "react";
import ReactDom from "react-dom";

const ImportDiv = () => {
  const [count, setCount] = useState(14);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)} type="button">
        +
      </button>
      <div>count: {count}</div>
      <button onClick={() => setCount((c) => c - 1)} type="button">
        -
      </button>
    </div>
  );
};
// console.log(document.getElementById('container'))
// 如果可以，接下来其实就可以对文件开始使用了为
ReactDom.render(<ImportDiv />, document.getElementById("container"));
