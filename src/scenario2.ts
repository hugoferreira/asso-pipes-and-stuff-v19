/*
Unbounded queue and publishes asap (again);
Multiple subscribers:   
    They pull messages concurrently;
    Each gets a different message; (use AsyncSemaphore in AsyncQueue)
Implicit subscription (fetch from data structure).
*/
import { Queue } from './queue/api';
import { SimpleSubscriber, Publisher } from './stuff';

export function testScenarioTwo() {
    let queue = new Queue.AsyncQueue<string>()

    // Creating Publishers
    const publisher = new Publisher(1)

    // Creating Subscribers
    const subscriberA = new SimpleSubscriber(1)
    const subscriberB = new SimpleSubscriber(2)
    const subscriberC = new SimpleSubscriber(3)
    const subscriberD = new SimpleSubscriber(4);

    (async () => {
        publisher.run(5000, queue)

        setTimeout(() => subscriberA.run(5000, queue), 100)
        setTimeout(() => subscriberB.run(5000, queue), 300)
        setTimeout(() => subscriberC.run(5000, queue), 500)
        subscriberD.run(5000, queue)
    })()
}

testScenarioTwo();