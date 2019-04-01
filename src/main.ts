import { AsyncQueue } from './AsyncQueue'
import { BoundedAsyncQueue } from './BoundedAsyncQueue'

let queue = new BoundedAsyncQueue<string>(1);

// 'some value'
let cenas = queue.pop();
console.log(cenas);
let tretas: any;
setTimeout(async function() { 
  await queue.push('some value'); 
  await queue.push('another value');

  // 'another value'
  tretas = queue.pop();
  console.log('tretas')
}, 3000);

(async () => {
    console.log('yay')
    console.log(await cenas)
    setTimeout(
        async () => { console.log(await tretas) },
        500
    )
})()

