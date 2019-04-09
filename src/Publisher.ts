import { AsyncQueue } from 'AsyncQueue'

export class Publisher<T> {
    constructor(public queue: AsyncQueue<T>) {}

    async push(message: T): Promise<void> {
        this.queue.enqueue(message);
    }
}