import {HashMap} from './hashMap.js';

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
/*console.log(test.get('elephant'));
console.log(test.length());
// this should only over-write the existing values of your nodes and not add new ones
*/test.set('elephant', 'brown');
console.log(test.length());
test.set('moon', 'silver');
console.log(test.length());
/*test.clear();
console.log(test.length());*/