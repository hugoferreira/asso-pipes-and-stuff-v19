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

// Creating Ventilator
let queue = new Queue.BoundedAsyncQueue<string>(1);
const ventilator = new Ventilator()

//Publisher throwing messages
setTimeout(async function() {
    await queue.push('first');
    await queue.push('second');
}, 1000);

// Creating Subscribers
const subscriberA = new Subscriber(1)
const subscriberB = new Subscriber(2)
const subscriberC = new Subscriber(3)

// Subscribing to the Ventilator
ventilator.addObserver(subscriberA)
ventilator.addObserver(subscriberB)
ventilator.addObserver(subscriberC);


(async () => {
    // await message
    // Notify all of our subscribers about the messages
    ventilator.notifyObservers(queue.pop())
    ventilator.notifyObservers(queue.pop())
})()