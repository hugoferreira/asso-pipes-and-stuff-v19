import { Queue } from '../queue'
import { Registry, DefaultDict } from '../utils'
import { Publisher, SimpleSubscriber } from 'stuff';

// Serves as a two-way ventilator
export class Broker<T> {
    // Registry key(Publisher | Subscriber) -> queue
    private registry = new Registry<Queue.BlockingQueue<T>>()
    // publisherKey -> arraySubscriberKeys
    private observers = new DefaultDict<number, Array<number>>(() => new Array<number>())

    constructor(public runTime: number) {}

    addPublisher(obj: Publisher<T>) : number{
        const key = this.registAndRun(obj)
        let subscriberKeys = Array<number>()
        this.observers.set(key, subscriberKeys)
        return key
    }

    addSubscriber(obj: SimpleSubscriber<T>, publisherId: number) :void {
        const key = this.registAndRun(obj)
        this.observers.get(publisherId).push(key)
    }

    registAndRun(obj: Publisher<T> | SimpleSubscriber<T>) :number{
        let queue = new Queue.UnboundedQueue<T>()
        const key = this.registry.register(queue);
        (async () => {
            obj.run(this.runTime, queue)
        })()
        return key
    }

    async movesMessages(): Promise<void> { //isto vai merdar tanto omfg (aposto que este forEach vai cagar no async)n  
            console.log("movesMessage")
   
            let publisherQueue = this.registry.get(0)
            console.log("1")
            const message = await publisherQueue.pop()
            console.log("2")
            let subscriberQueue = this.registry.get(3)
            subscriberQueue.push(message)
            console.log("3")
            return ;
        // this.observers.get(0).forEach((subscriberKey) => {
        //         console.log(subscriberKey)
        //         let subscriberQueue = this.registry.get(subscriberKey)
        //         subscriberQueue.push(message)
        // })
        // this.observers.forEach(async (subscribers, publisherKey) => {
        //     console.log(publisherKey)
        //     let publisherQueue = this.registry.get(publisherKey)
        //     const message = await publisherQueue.pop()
        //     console.log(message)

        //     subscribers.forEach((subscriberKey) => {
        //         console.log(subscriberKey)
        //         let subscriberQueue = this.registry.get(subscriberKey)
        //         subscriberQueue.push(message)
        //     })
        // });
    }

    async run(): Promise<void> {
        let start = Date.now()
        while (start + this.runTime > Date.now()) {
            await this.movesMessages()
        }
    }
}
