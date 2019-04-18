const isArraySorted = require('is-array-sorted')
import { AsyncQueue } from '../AsyncQueue'
import { Publisher } from '../entities/Publisher'
import { Subscriber } from '../entities/Subscriber'

export async function testAsyncQueueBehavior(nOps: number): Promise<Boolean> {
    const result = new Array<number>()
    const q = new AsyncQueue<number>(1)
    const publisher = new Publisher<number>(q)
    const subscriber = new Subscriber<number>(q)

    const enqueue = (m: number) => q.enqueue(m)
    const dequeue = () => q.dequeue()
    const promises = Array<Promise<void>>()

    let enqueues = 0
    let dequeues = 0

    // Do a random permutation of enqueing and dequeing
    for (let i = 0; i < nOps; i += 1) {
        if (Math.random() > 0.5) {
            enqueues += 1
            // console.log(`${Date.now()} Enqueuing ${enqueues}`)
            // enqueue(enqueues)
            publisher.push(enqueues)
        } else {
            dequeues += 1
            // console.log(`${Date.now()} Dequeuing`)
            // promises.push(dequeue().then(v => { result.push(v) }))
            promises.push(subscriber.pull().then(v => { result.push(v) }))
        }
    }

    // console.log(`Total enqueues ${enqueues}; dequeues ${dequeues}`)
    const pending = Math.min(enqueues, dequeues)
    await Promise.all(promises.slice(0, pending))

    // Length should be equal minimum between enqueues and dequeues
    const isLengthOk = pending === result.length 

    // Messages should be ordered
    const isSorted = isArraySorted(result)

    return isLengthOk && isSorted
}