import {AsyncQueue} from './AsyncQueue'

let queue = new AsyncQueue();

// 'some value'
let cenas = queue.pop();
console.log(cenas);
let tretas;
setTimeout(function() { 
  queue.push('some value'); 
  queue.push('another value');

  // 'another value'
  tretas = queue.pop();
  console.log(tretas)
}, 3000);

(async () => {
    console.log('yay')
    console.log(await cenas)
    console.log(await tretas)
})()

