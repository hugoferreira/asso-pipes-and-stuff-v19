import ex1Test from './tests/ex1'
import ex2Test from './tests/ex2'
import ex3Test from './tests/ex3'
import ex4Test from './tests/ex4'

setInterval(() => { }, 1000); // run program until explicit exit

(async () => {
    console.log("EX1 -", await ex1Test(100) ? "PASSED" : "FAILED")
    console.log("EX2 -", await ex2Test(100, 3) ? "PASSED" : "FAILED")
    console.log("EX3 -", await ex3Test(100, 3) ? "PASSED" : "FAILED")
    console.log("EX4 -", await ex4Test(100, 3 , 3) ? "PASSED" : "FAILED")

    process.exit()
})()