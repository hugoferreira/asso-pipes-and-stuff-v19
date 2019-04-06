import { Queue } from '../queue';
import { Observer } from './Subscriber';


// The Ventilator plays the role of an _Observable, to the subscriber _Observers_
export class Ventilator<T> {
    private observers = Array<Observer<T>>()

    constructor() {}

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
