import { AsyncSemaphore } from '../utils/AsyncSemaphore'
import { BlockingQueue } from './BlockingQueue'

// Implementation _without_ Semaphore
export class BoundedAsyncQueue<T> implements BlockingQueue<T> {
    protected subscriberQueue = Array<(v: T) => void>()
    protected publisherQueue = Array<() => void>()
    protected dataQueue = Array<T>()

    constructor(readonly maxSize: number) {}

    async push(value: T) {
        // If subcribers are on hold (implies dataQueue is empty)
        if (this.subscriberQueue.length > 0) {
            this.subscriberQueue.shift()(value)
        }
        // Else if there is space in the queue
        else if (this.dataQueue.length < this.maxSize) {
            this.dataQueue.push(value)
        }
        // Else: await subscribers' pops
        else {
            return new Promise(resolve => this.publisherQueue.push(() => {
                this.dataQueue.push(value)
                resolve();
            }))
        }
    }

    async pop(): Promise<T> {
        // If there is data to be poped
        if (this.dataQueue.length > 0) {
            if (this.publisherQueue.length > 0) {
                this.publisherQueue.shift()()
            }
            return Promise.resolve(this.dataQueue.shift())
        }
        // Else: await publishers' pushs
        else {
            return new Promise(resolve => this.subscriberQueue.push(resolve))
        }
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
