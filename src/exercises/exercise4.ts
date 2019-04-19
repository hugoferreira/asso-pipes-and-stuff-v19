const isArraySorted = require('is-array-sorted')
import { AsyncQueue } from '../AsyncQueue'
import { Publisher, BrokerPublisher } from '../entities/Publisher'
import { Subscriber, BrokerSubscriber } from '../entities/Subscriber'
import { Ventilator } from '../entities/Ventilator';
import { Broker } from '../entities/Broker';

export async function exercise4(nOps: number, nPubs: number, nSubs: number): Promise<Boolean> {
    const result = new Array<number>()
    const q = new AsyncQueue<number>(50)

    const broker = new Broker<number>()

    const publishers = new Array<BrokerPublisher<number>>()
    for(let i = 0; i < nPubs; i++) {
        let newPublisher = new BrokerPublisher<number>(i)
        broker.addPublisher(newPublisher)
        publishers.push(newPublisher)
    }

    const subscribers = new Array<BrokerSubscriber<number>>()
    for(let i = 0; i < nSubs; i++) {
        let newSubscriber = new BrokerSubscriber<number>(i, 250)
        broker.addSubscriber(newSubscriber)
        subscribers.push(newSubscriber)
    }

    const promises = Array<Promise<void>>()

    let enqueues = 0
    let dequeues = 0

    // Do a random permutation of enqueing and dequeing
    for (let i = 0; i < nOps; i += 1) {
        if (Math.random() > 0.5) {
            enqueues += 1
            // console.log(`${Date.now()} Enqueuing ${enqueues}`)
            // enqueue(enqueues)
            // publisher.push(enqueues)
            // publishers[Math.floor(Math.random() * nPubs)].push(enqueues)
            await broker.enqueue(Math.floor(Math.random() * nPubs), enqueues)
        } else {
            dequeues += 1
            // console.log(`${Date.now()} Dequeuing`)
            // promises.push(dequeue().then(v => { result.push(v) }))
            // promises.push(subscriber.pull().then(v => { result.push(v) }))
            // promises.push(subscribers[Math.floor(Math.random() * nSubs)].pull().then(v => { result.push(v) }))
            // promises.push(ventilator.pull().then(v => { result.push(v)/*; console.log(result)*/ }))
            // promises.push(broker.moveMessage().then(v => { result.push(v) }))
            promises.push(broker.pull().then(v => { result.push(v)!/*; console.log(result)*/ }))
        }
    }
    //console.log(result)

    //console.log(`Total enqueues ${enqueues}; dequeues ${dequeues}`)
    const pending = Math.min(enqueues, dequeues)
    await Promise.all(promises.slice(0, pending))

    // Length should be equal minimum between enqueues and dequeues
    const isLengthOk = pending === result.length 

    // Messages should be ordered
    const isSorted = isArraySorted(result)

    return isLengthOk && isSorted
}