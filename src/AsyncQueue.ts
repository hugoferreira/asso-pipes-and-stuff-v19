import { AsyncSemaphore } from "./AsyncSemaphore";

export class AsyncQueue<T> {
    private queue: Array<T>
    private waitingEnqueue: AsyncSemaphore
    private waitingDequeue: AsyncSemaphore

    constructor(readonly maxSize: number) {
        this.queue = new Array<T>()
        this.waitingEnqueue = new AsyncSemaphore(0)
        this.waitingDequeue = new AsyncSemaphore(maxSize)
    }

    async enqueue(x: T) {
        await this.waitingDequeue.wait()
        this.queue.unshift(x)
        this.waitingEnqueue.signal()
    }

    async dequeue(): Promise<T> {
        await this.waitingEnqueue.wait()
        this.waitingDequeue.signal()
        return this.queue.pop()!
    }
}