import { Queue } from '../queue/api';
import { Observer } from './Subscriber';

export class Ventilator<T> {
    private observers: Observer<T>[]

    constructor() {
        this.observers = []
    }

    addObserver(ob: Observer<T>) {
        this.observers.push(ob)
    }

    notifyObservers(message: T): void {
        this.observers.map((obs) => obs.sendRequest(message))
    }

    async run(runTime: number, queue: Queue.BlockingQueue<T>): Promise<void> {
        let start = Date.now()
        while (start + runTime > Date.now()) {
            this.notifyObservers(await queue.pop());
        }
    }
}
