import { AsyncQueue } from './AsyncQueue'

export class Subscriber<T> {
    static _id : number = 0
    public id: number

    constructor(public queue: AsyncQueue<T>, private processingTime: number) {
        this.id = Subscriber._id++
    }

    async pull(): Promise<T> {
        return this.process(this.queue.dequeue())
    }

    async process(task: Promise<T>) : Promise<T> {
        return new Promise<T>(resolve => {
            // simulates processing time
            setTimeout(() => {
                resolve(task)
            }, this.processingTime);
        })
    }
}