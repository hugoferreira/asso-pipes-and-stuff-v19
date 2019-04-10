import { Subscriber } from './Subscriber'
import { AsyncQueue } from 'AsyncQueue'

export class Ventilator<T>{
    private subs = Array<Subscriber<T>>()

    constructor(public queue: AsyncQueue<T>) {}

    public subscribe(sub: Subscriber<T>){
        this.subs.push(sub)
    }

    async pull(): Promise<T[]> {
        return this.notifySubs(this.queue.dequeue())
    }

    async notifySubs(task: Promise<T>) : Promise<T[]> {

        let tasks : Array<Promise<T>> = new Array<Promise<T>>()

        for (const sub of this.subs) {
            tasks.push(sub.process(task))
        }

        return Promise.all(tasks)
    }
}