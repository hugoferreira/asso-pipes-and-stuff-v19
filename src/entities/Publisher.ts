import { AsyncQueue } from "../AsyncQueue";
import { Broker } from "./Broker";

export class Publisher<T> {
    protected queue: AsyncQueue<T>

    constructor(queue: AsyncQueue<T>) {
        this.queue = queue
    }

    async push(content: T) {
        await this.queue.enqueue(content)
    }

}

export class BrokerPublisher<T> extends Publisher<T> {
    private id: number
    private broker: Broker<T>

    constructor(id: number) {
        super(undefined)
        this.id = id
    }

    public getID(): number {
        return this.id
    }

    public setBroker(broker: Broker<T>) {
        this.broker = broker
    }

    public setQueue(queue: AsyncQueue<T>){
        this.queue = queue
    }
}