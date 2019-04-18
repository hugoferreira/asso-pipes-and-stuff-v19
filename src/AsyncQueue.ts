export class AsyncQueue<T> {
    queue: Array<T>

    constructor() {
        this.queue = Array<T>()
    }

    enqueue(element: T): void {
        this.queue.push(element)
    }

    async dequeue(): Promise<T> {
        return this.queue.shift()
    }
}