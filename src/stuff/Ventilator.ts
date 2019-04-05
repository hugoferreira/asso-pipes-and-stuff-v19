import {Queue} from "../queue/api";

interface Observable<T> {
    sendRequest(message: T): void
}

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

export class Subscriber<T> implements Observable<T> {
    id: number

    constructor(id: number) {
        this.id = id
    }

    sendRequest(message: T): void {
        console.log("Subscriber id " + this.id + " Received the message : " + message)
    }
}