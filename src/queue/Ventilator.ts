import {Queue} from "./api";

interface Observable {
    sendRequest(message: any): void
}

export class Ventilator {
    private observables: Observable[]

    constructor() {
        this.observables = []
    }

    addObserver(ob: Observable) {
        this.observables.push(ob)
    }

    notifyObservers(message: Promise<any>): void {
        message.then(value => {console.log('Notifying subscribers:')
            this.observables.map((observer) => observer.sendRequest(value))})
    }

}

export class Subscriber implements Observable {
    id: number

    constructor(id: number) {
        this.id = id
    }

    sendRequest(message: any): void {
        console.log("Subscriber id " + this.id + " Received the message : " + message)
    }
}