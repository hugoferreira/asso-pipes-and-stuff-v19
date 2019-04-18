import { AsyncQueue } from "../AsyncQueue";

export class Publisher<T> {
    private queue: AsyncQueue<T>

    constructor(queue: AsyncQueue<T>) {
        this.queue = queue
    }

    async push(content: T) {
        await this.queue.enqueue(content)
    }

}