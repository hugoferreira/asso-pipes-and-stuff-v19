
export class AsyncQueue<T> {
    subscriberQueue: Array<(v: T) => void>
    publisherQueue: Array<T>

    constructor() {
        this.publisherQueue = new Array<T>()
        this.subscriberQueue = new Array()
    }

    async push(value: T) {
        if (this.subscriberQueue.length > 0) {
            this.subscriberQueue.shift()(value)
        } else {
            this.publisherQueue.push(value)
        }
    }


    async pop(): Promise<T> {
        if(this.publisherQueue.length > 0) {
            return Promise.resolve(this.publisherQueue.shift())
        } else {
            return new Promise(resolve => this.subscriberQueue.push(resolve))
        }
    }
}