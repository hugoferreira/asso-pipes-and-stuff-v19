import { AsyncSemaphore } from '../utils/AsyncSemaphore'
import { BlockingQueue } from './BlockingQueue'


export class UnboundedQueue<T> implements BlockingQueue<T> {
    private queue = Array<T>()
    private waitingEnqueue: AsyncSemaphore

    constructor() {
        this.waitingEnqueue = new AsyncSemaphore(0)
    }

    push(x: T) {
        this.queue.unshift(x)
        this.waitingEnqueue.signal()
    }

    async pop() {
        await this.waitingEnqueue.wait()
        return this.queue.pop()!
    }
}
