import { AsyncQueue } from "../AsyncQueue";
import { Subscriber } from "./Subscriber";

export class Ventilator<T> {
    private queue: AsyncQueue<T>
    private currSubscribers: Array<Subscriber<T>>

    constructor(queue: AsyncQueue<T>) {
        this.queue = queue
        this.currSubscribers = new Array<Subscriber<T>>()
    }

    //Observer pattern
    async notifySubscribers(notification: Promise<T>) {
        let taskArray = new Array<Promise<T>>();
        this.currSubscribers.map((sub) => sub.process(notification))
        return await Promise.all(taskArray)
    }

    addSubscriber(subscriber: Subscriber<T>) {
        this.currSubscribers.push(subscriber)
    }

    async pull() {
        return await this.notifySubscribers(this.queue.dequeue())
    }
}