import { AsyncQueue } from "../AsyncQueue";

export class Subscriber<T> {
    private queue: AsyncQueue<T>

    constructor(queue: AsyncQueue<T>) {
        this.queue = queue
    }

    async pull(): Promise<T> {
        return this.queue.dequeue()
    }

}