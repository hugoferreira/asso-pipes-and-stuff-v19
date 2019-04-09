import { AsyncQueue } from './AsyncQueue'

export class Subscriver<T> {
    constructor(public queue: AsyncQueue<T>) {}

    async pull(): Promise<T>{
        return this.queue.dequeue();
    }
}