// import _ from 'lodash';
function comp () {
   const div = document.createElement('div');
   const btn = document.createElement('button');
   const br = document.createElement('br');
   div.appendChild(br);
   div.appendChild(btn);
   btn.innerHTML = join(['hello','later'])
   btn.onclick = (e) => import(/* webpackChunkName: "getPre" */ './index').then((module)=>{
       const {getPre} = module;
       getPre()
   })
   return div
}

document.body.appendChild(comp())