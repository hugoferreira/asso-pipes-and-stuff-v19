import { Queue } from './queue/api'


let queue = new Queue.BoundedQueue<string>(1);
// let queue = new UnboundedQueue<string>();

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

