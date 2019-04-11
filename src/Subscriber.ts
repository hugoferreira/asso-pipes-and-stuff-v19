import { AsyncQueue } from './AsyncQueue'
import { Broker } from './Broker'

export class Subscriber<T> {
    static _id : number = 0
    public id: number
    public queue: AsyncQueue<T>

    constructor(private processingTime: number, queue?: AsyncQueue<T>) {
        this.id = Subscriber._id++
        this.queue = queue
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

    setQueue(queue: AsyncQueue<T>) : void {
        this.queue = queue
    }
}