import { Queue } from '../queue/api';
import { Ventilator } from './Ventilator';

export abstract class Subscriber<T> {
    constructor(public id: number) {
    }

    logMessage(message: T): void {
        console.log(`Subscriber id ${this.id} | Received the message : ${message}`)
    }
}

export class SimpleSubscriber<T> extends Subscriber<T> {
    constructor(id: number) {
        super(id)
    }

    async pullMessage(queue: Queue.BlockingQueue<T>): Promise<T> {
        const message =  await queue.pop()
        this.logMessage(message)

        return message
    }

    async run(runTime: number, queue: Queue.BlockingQueue<T>): Promise<void> {
        let start = Date.now()
        while (start + runTime > Date.now()) {
            await this.pullMessage(queue)
        }
    }
}

export class Observer<T> extends Subscriber<T> {
    constructor(id: number) {
        super(id)
    }

    subscribeVentilator(ventilator: Ventilator<T>) {
        ventilator.addObserver(this)
    }

    sendRequest(message: T): void {
       this.logMessage(message)
    }
}