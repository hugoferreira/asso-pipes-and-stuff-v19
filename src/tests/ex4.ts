import { BrokerPublisher } from '../Publisher'
import { Subscriber } from '../Subscriber'
import { Broker } from '../Broker'
const isArraySorted = require('is-array-sorted')


export default async function(nOps: number, nPublishers: number, nSubscribers: number) {

    // Declare objects
    const broker = new Broker<number>(10)

    const publishers = new Array<BrokerPublisher<number>>()
    for(let i = 0; i < nPublishers; i += 1) {
        let publisher = new BrokerPublisher<number>()
        broker.addPublisher(publisher)
        publishers.push(publisher)
    }

    const subscribers = new Array<Subscriber<number>>()
    for(let i = 0; i < nSubscribers; i += 1) {
        let subscriber = new Subscriber<number>(10)
        broker.addSubscriber(subscriber)
        subscribers.push(subscriber)
    }

    let enqueues = 0
    let dequeues = 0
    const result = new Array<number>()
    const promises = Array<Promise<void>>()

    // Do a random permutation of enqueing and dequeing
    for (let i = 0; i < nOps; i += 1) {
        if (Math.random() > 0.5) {
            enqueues += 1
            // random publisher pushes
            publishers[Math.floor(Math.random() * nPublishers)].push(enqueues)
        } else {
            dequeues += 1
            // broker pulls a message
            promises.push(broker.pull().then(v => { result.push(v) }))
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