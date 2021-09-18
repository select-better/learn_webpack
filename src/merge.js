import {cube} from './match';
import './style.scss';
import { getPre } from '@/index.js';

function component(){
    const div = document.createElement('div');
    div.classList = 'hello';
    div.innerHTML = `hello world, hello webpack:cube(5) = ${cube(5)}`
    div.onclick = getPre
    return div
};

document.body.appendChild(component());