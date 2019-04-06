import { AsyncSemaphore } from '../utils/AsyncSemaphore'
import { BlockingQueue } from './BlockingQueue'

// Implementation _without_ Semaphore
export class BoundedAsyncQueue<T> implements BlockingQueue<T> {
    async push(val: T) {
        throw new Error("Method not implemented.");
    }
    
    async pop(): Promise<T> {
        throw new Error("Method not implemented.");
    }

    
}

// Implementation _with_ Semaphore
export class BoundedQueue<T> implements BlockingQueue<T> {
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

    async pop(): Promise<T> {
        await this.waitingEnqueue.wait()
        this.waitingDequeue.signal()
        return this.queue.pop()!
    }
}
