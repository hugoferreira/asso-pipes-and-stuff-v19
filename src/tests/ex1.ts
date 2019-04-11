import { AsyncQueue } from '../AsyncQueue'
import { Publisher } from '../Publisher'
import { Subscriber } from '../Subscriber'
const isArraySorted = require('is-array-sorted')


export default async function(nOps: number) {

    // Declare objects
    const queue = new AsyncQueue<number>(10)

    const publisher = new Publisher<number>(queue)
    const subscriber = new Subscriber<number>(10, queue)

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