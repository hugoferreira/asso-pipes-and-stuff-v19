import { AsyncQueue } from './AsyncQueue'
import { Broker } from './Broker'

export class Publisher<T> {
    static _id : number = 0
    public id: number
    public queue: AsyncQueue<T>

    constructor(queue?: AsyncQueue<T>) {
        this.id = Publisher._id++
        this.queue = queue
    }

    async push(message: T): Promise<void> {
        this.queue.enqueue(message);
    }

    setQueue(queue: AsyncQueue<T>) : void {
        this.queue = queue
    }
}

export class BrokerPublisher<T> extends Publisher<T> {
    private broker: Broker<T>

    constructor() {
        super()
    }

    setBroker(broker: Broker<T>) {
        this.broker = broker
    }

    async push(message: T): Promise<void> {
        this.broker.enqueue(this.id, message);
    }
}