import { AsyncQueue } from '../AsyncQueue'
import { Subscriber, BrokerSubscriber } from './Subscriber';
import { BrokerPublisher } from './Publisher';

export class Broker<T> {
    private inboundQueues: Map<number, AsyncQueue<T>>
    private outboundQueues: Map<number, AsyncQueue<T>>
    private currSubscribers: Map<number, BrokerSubscriber<T>>

    constructor(){
        this.inboundQueues = new Map<number, AsyncQueue<T>>()
        this.outboundQueues = new Map<number, AsyncQueue<T>>()
        this.currSubscribers = new Map<number, BrokerSubscriber<T>>()
    }

    addPublisher(publisher: BrokerPublisher<T>) {
        let newQueue = new AsyncQueue<T>(15)
        this.inboundQueues.set(publisher.getID(), newQueue)
        publisher.setQueue(newQueue)
        publisher.setBroker(this)
    }

    addSubscriber(subscriber: BrokerSubscriber<T>) {
        let queue = new AsyncQueue<T>(15)
        subscriber.setQueue(queue)
        this.outboundQueues.set(subscriber.getID(), queue)
        this.currSubscribers.set(subscriber.getID(), subscriber)
    }

    async enqueue(publisherKey: number, task: T) {
        this.inboundQueues.get(publisherKey).enqueue(task)
    }

    async dequeue(subscriberKey: number) {
        this.currSubscribers.get(subscriberKey).pull()
    }

    async pull() {
        for(let subscriberKey of this.currSubscribers.keys()) {
            if(this.currSubscribers.get(subscriberKey).getQueue().getQueue().length > 0) {
                //return this.currSubscribers.get(subscriberKey).pull()
                return this.notifySubscribers(await this.currSubscribers.get(subscriberKey).pull())
            }
        }

        //return this.currSubscribers.values().next().value.pull()
    }

    /* async moveMessage() {
        for await(let publisherKey of this.inboundQueues.keys()) {
            let publisherQueue = this.inboundQueues.get(publisherKey)
            let message = await publisherQueue.dequeue()

            for(let subscriberKey of this.currSubscribers.keys()) {
                let subscriberQueue = this.outboundQueues.get(subscriberKey)
                subscriberQueue.enqueue(message)
            }
        }
    } */

    notifySubscribers(notification: T): T {
        //let taskArray = new Array<Promise<T>>();
        //this.currSubscribers.map((sub) => sub.print(notification))
        //return notification;
        //return await Promise.all(taskArray)

        for(let subscriberKey of this.currSubscribers.keys()) {
            this.currSubscribers.get(subscriberKey).print(notification)
        }
        return notification
    }
}