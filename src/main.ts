import { AsyncQueue } from './AsyncQueue'
import { Publisher } from './Publisher'
import { Subscriber } from './Subscriber'
import { Ventilator } from './Ventilator'
const isArraySorted = require('is-array-sorted')

setInterval(() => { }, 1000); // run program until explicit exit

(async () => {
    console.log("EX1 -", await ex1Test(100) ? "PASSED" : "FAILED")
    console.log("EX2 -", await ex2Test(100, 3) ? "PASSED" : "FAILED")
    console.log("EX3 -", await ex3Test(100, 3) ? "PASSED" : "FAILED")

    process.exit()
})()

async function ex1Test(nOps: number) {

    // Declare objects
    const queue = new AsyncQueue<number>(10)

    const publisher = new Publisher<number>(queue)
    const subscriber = new Subscriber<number>(queue, 10)

    let enqueues = 0
    let dequeues = 0
    const result = new Array<number>()
    const promises = Array<Promise<void>>()

    // Do a random permutation of enqueing and dequeing
    for (let i = 0; i < nOps; i += 1) {
        if (Math.random() > 0.5) {
            enqueues += 1
            publisher.push(enqueues)
        } else {
            dequeues += 1
            promises.push(subscriber.pull().then(v => { result.push(v) }))
        }
    }

    const pending = Math.min(enqueues, dequeues)
    await Promise.all(promises.slice(0, pending))

    // Length should be equal minimum between enqueues and dequeues
    const isLengthOk = pending === result.length 

    // Messages should be ordered
    const isSorted = isArraySorted(result)

    return isLengthOk && isSorted
}

async function ex2Test(nOps: number, nSubscribers: number) {

    // Declare objects
    const queue = new AsyncQueue<number>(10)

    const publisher = new Publisher<number>(queue)
    const subscribers = new Array<Subscriber<number>>()
    for(let i = 0; i < nSubscribers; i += 1)
        subscribers.push(new Subscriber<number>(queue, 10))

    let enqueues = 0
    let dequeues = 0
    const result = new Array<number>()
    const promises = Array<Promise<void>>()

    // Do a random permutation of enqueing and dequeing
    for (let i = 0; i < nOps; i += 1) {
        if (Math.random() > 0.5) {
            enqueues += 1
            publisher.push(enqueues)
        } else {
            dequeues += 1

            // a random subscriber pulls a message
            promises.push(subscribers[Math.floor(Math.random() * nSubscribers)].pull().then(v => { result.push(v) }))
        }
    }

    const pending = Math.min(enqueues, dequeues)
    await Promise.all(promises.slice(0, pending))

    // Length should be equal minimum between enqueues and dequeues
    const isLengthOk = pending === result.length 

    // Messages should be ordered
    const isSorted = isArraySorted(result)

    return isLengthOk && isSorted
}

async function ex3Test(nOps: number, nSubscribers: number) {

    // Declare objects
    const queue = new AsyncQueue<number>(10)

    const publisher = new Publisher<number>(queue)
    const ventilator = new Ventilator<number>(queue)
    for(let i = 0; i < nSubscribers; i += 1)
        ventilator.subscribe(new Subscriber<number>(queue, 1000))

    let enqueues = 0
    let dequeues = 0
    const result = new Array<number>()
    const promises = Array<Promise<void>>()

    // Do a random permutation of enqueing and dequeing
    for (let i = 0; i < nOps; i += 1) {
        if (Math.random() > 0.5) {
            enqueues += 1
            publisher.push(enqueues)
        } else {
            dequeues += 1
            // pushes to results a message from a random subscriber
            promises.push(ventilator.pull().then(v => { result.push(v[Math.floor(Math.random() * v.length)]) }))
        }
    }

    const pending = Math.min(enqueues, dequeues)
    await Promise.all(promises.slice(0, pending))

    // Length should be equal minimum between enqueues and dequeues
    const isLengthOk = pending === result.length 

    // Messages should be ordered
    const isSorted = isArraySorted(result)

    return isLengthOk && isSorted
}