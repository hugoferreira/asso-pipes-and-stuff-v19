const isArraySorted = require('is-array-sorted')
import { AsyncQueue } from '../AsyncQueue'
import { Publisher } from '../entities/Publisher'
import { Subscriber } from '../entities/Subscriber'

export async function exercise2(nOps: number, nSubs: number): Promise<Boolean> {
    const result = new Array<number>()
    const q = new AsyncQueue<number>(15)
    const publisher = new Publisher<number>(q)
    const subscribers = new Array<Subscriber<number>>()

    for (let i = 0; i < nSubs; i++) {
        subscribers.push(new Subscriber<number>(250, q))
    }

    const promises = Array<Promise<void>>()

    let enqueues = 0
    let dequeues = 0

    // Do a random permutation of enqueing and dequeing
    for (let i = 0; i < nOps; i += 1) {
        if (Math.random() > 0.5) {
            enqueues += 1
            // console.log(`${Date.now()} Enqueuing ${enqueues}`)
            publisher.push(enqueues)
        } else {
            dequeues += 1
            // console.log(`${Date.now()} Dequeuing`)
            promises.push(subscribers[Math.floor(Math.random() * nSubs)].pull().then(v => { result.push(v) }))
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