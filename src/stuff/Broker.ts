import { Queue } from '../queue'
import { Observer } from './Subscriber'
import { Publisher } from './Publisher'
import { Registry, DefaultDict } from '../utils'

// Serves as a two-way ventilator
export class Broker<T> {
    private observers = new DefaultDict<number, Array<Observer<T>>>(() => new Array<Observer<T>>())

    constructor(private registry: Registry<Publisher<T>>) {}

    addSubscriber(obj: Observer<T>, publisherId: number) {
        this.observers.get(publisherId).push(obj)
    }

    notifyObservers(message: T, fromPublisherId: number): void {
        this.observers.get(fromPublisherId).forEach((observer) => observer.sendRequest(message))
    }

    async run(runTime: number, publisherQueues: Array<[number, Queue.BlockingQueue<T>]>): Promise<void> {
        let start = Date.now()
        while (start + runTime > Date.now()) {
            for (let [pubKey, queue] of publisherQueues) {
                this.notifyObservers(await queue.pop(), pubKey)
            }
        }
    }

}
