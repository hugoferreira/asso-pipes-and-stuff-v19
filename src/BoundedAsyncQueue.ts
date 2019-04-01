import { AsyncSemaphore } from './AsyncSemaphore'

// Thanks https://stackoverflow.com/questions/50382553/asynchronous-bounded-queue-in-js-ts-using-async-await

export class BoundedAsyncQueue<T> {
    private queue = Array<T>()
    private waitingEnqueue: AsyncSemaphore
    private waitingDequeue: AsyncSemaphore

    constructor(readonly maxSize: number) {
        this.waitingEnqueue = new AsyncSemaphore(0)
        this.waitingDequeue = new AsyncSemaphore(maxSize)
    }

    async push(x: T) {
        await this.waitingDequeue.wait()
        this.queue.unshift(x)
        this.waitingEnqueue.signal()
    }

    async pop() {
        await this.waitingEnqueue.wait()
        this.waitingDequeue.signal()
        return this.queue.pop()!
    }
}
