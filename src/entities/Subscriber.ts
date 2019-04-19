import { AsyncQueue } from "../AsyncQueue";

export class Subscriber<T> {
    protected queue: AsyncQueue<T>
    private delay: number

    constructor(delay: number, queue: AsyncQueue<T>) {
        this.delay = delay
        this.queue = queue
    }

    async pull(): Promise<T> {
        return this.process(this.queue.dequeue())
    }

    async process(task: Promise<T>): Promise<T> {
        // node bate mal com unhandled promise rejects, TIL
        return new Promise(resolve => {
            setTimeout(function() {
                resolve(task)
            }, this.delay)
        })
    }

    print(msg: T): T{
        // console.log(msg)
        return msg;
    }

}

export class BrokerSubscriber<T> extends Subscriber<T> {
    private id: number

    constructor(id: number, delay: number) {
        super(delay, undefined)
        this.id = id;
    }

    setQueue(queue: AsyncQueue<T>) {
        this.queue = queue
    }

    getQueue() {
        return this.queue
    }

    public getID(): number {
        return this.id
    }
}