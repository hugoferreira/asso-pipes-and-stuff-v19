import { Subscriber } from './Subscriber'
import { BrokerPublisher } from './Publisher'
import { AsyncQueue } from './AsyncQueue'

export class Broker<T>{
    private pubQueues = new Map<number, AsyncQueue<T>>()
    private subscribers = new Map<number, Subscriber<T>>()

    constructor(private queueMaxSize: number) {}

    public addPublisher(publisher: BrokerPublisher<T>) {
        let queue: AsyncQueue<T> = new AsyncQueue<T>(this.queueMaxSize)
        this.pubQueues.set(publisher.id, queue)
        publisher.setBroker(this)
    }

    public addSubscriber(subscriber: Subscriber<T>) {
        let queue: AsyncQueue<T> = new AsyncQueue<T>(this.queueMaxSize)
        subscriber.setQueue(queue)
        this.subscribers.set(subscriber.id, subscriber)
    }

    async enqueue(key: number, task: T) {
        let availableQueue : AsyncQueue<T> = this.checkAvailableQueues()
        if (availableQueue !== undefined) {
            availableQueue.enqueue(task)
            return
        }

        const publisherQueue : AsyncQueue<T> = this.pubQueues.get(key)
        return publisherQueue.enqueue(task)
    }

    async dequeue(key: number) {
        const subscriber : Subscriber<T> = this.subscribers.get(key)
        return subscriber ? subscriber.pull() : undefined
    }

    async pull() {
        for(let [key, subscriber] of this.subscribers) {
            if (subscriber.queue.length() > 0)
                return subscriber.pull()
        }

        return this.subscribers.values().next().value.pull()
    }

    checkAvailableQueues() : AsyncQueue<T> {
        let availableQueue : AsyncQueue<T>
        this.subscribers.forEach(subscriber => {
            if(!availableQueue || (subscriber.queue.length() <= this.queueMaxSize && subscriber.queue.length() < availableQueue.length())) {
                availableQueue = subscriber.queue
            }
        })

        return availableQueue
    }
}