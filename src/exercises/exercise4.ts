const isArraySorted = require('is-array-sorted')
import { Publisher, BrokerPublisher } from '../entities/Publisher'
import { Subscriber, BrokerSubscriber } from '../entities/Subscriber'
import { Broker } from '../entities/Broker';

export async function exercise4(nOps: number, nPubs: number, nSubs: number): Promise<Boolean> {
    const result = new Array<number>()

    const broker = new Broker<number>()

    for(let i = 0; i < nPubs; i++) {
        let newPublisher = new BrokerPublisher<number>(i)
        broker.addPublisher(newPublisher)
    }

    for(let i = 0; i < nSubs; i++) {
        let newSubscriber = new BrokerSubscriber<number>(i, 250)
        broker.addSubscriber(newSubscriber)
    }

    const promises = Array<Promise<void>>()

    let enqueues = 0
    let dequeues = 0

    // Do a random permutation of enqueing and dequeing
    for (let i = 0; i < nOps; i += 1) {
        if (Math.random() > 0.5) {
            enqueues += 1
            // console.log(`${Date.now()} Enqueuing ${enqueues}`)
            await broker.enqueue(Math.floor(Math.random() * nPubs), enqueues)
        } else {
            dequeues += 1
            // console.log(`${Date.now()} Dequeuing`)
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