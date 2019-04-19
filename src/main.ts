import { exercise1 } from './exercises/exercise1'
import { exercise2 } from './exercises/exercise2'
import { exercise3 } from './exercises/exercise3'

setInterval(() => { }, 1000); // run program forever until an explicit exit occurs
(async () => {
    const successEx1 = await exercise1(100)
    const successEx2 = await exercise2(100, 20)
    const successEx3 = await exercise3(100, 20)
    console.log('Exercise 1 - ' + successEx1)
    console.log('Exercise 2 - ' + successEx2)
    console.log('Exercise 3 - ' + successEx3)
    process.exit()
})()