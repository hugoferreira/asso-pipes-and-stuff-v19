import { Queue } from '../queue/api';
import { Observable } from './Subscriber';

export class Ventilator<T> {
    private observables: Observable<T>[]

    constructor() {
        this.observables = []
    }

    addObserver(ob: Observable<T>) {
        this.observables.push(ob)
    }

    notifyObservers(message: T): void {
        this.observables.map((observer) => observer.sendRequest(message))
    }

    async run(time: Number, queue: Queue.BlockingQueue<T>): Promise<void> {
        while (time > Date.now()) {
            this.notifyObservers(await queue.pop());
        }
    }
}