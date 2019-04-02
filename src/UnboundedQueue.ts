import { AsyncSemaphore } from './AsyncSemaphore'

// Thanks https://stackoverflow.com/questions/50382553/asynchronous-bounded-queue-in-js-ts-using-async-await

export class UnboundedQueue<T> {
    private queue = Array<T>()
    private waitingEnqueue: AsyncSemaphore

    constructor() {
        this.waitingEnqueue = new AsyncSemaphore(0)
    }

    async push(x: T) {
        this.queue.unshift(x)
        this.waitingEnqueue.signal()
    }

    async pop() {
        await this.waitingEnqueue.wait()
        return this.queue.pop()!
    }
}
