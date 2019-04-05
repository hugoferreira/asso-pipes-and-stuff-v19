/*
Unbounded queue; --> AsyncQueue
Publisher sends messages a.s.a.p.;
Subscriber tries to pull messages and blocks (awaits) until it has one;
Implicit subscription (fetch directly from data structure).
*/
import { Queue } from './queue/api';
import { Publisher, SimpleSubscriber } from './stuff';

export function testScenarioOne() {
    let queue = new Queue.AsyncQueue<string>()

    // Publisher 1 and Consumer 1
    const publisher = new Publisher(1)

    // Creating Subscribers
    const subscriberA = new SimpleSubscriber(1);

    (async () => {
        publisher.run(Date.now() + 5000, queue)

        setTimeout(() => subscriberA.run(Date.now() + 5000, queue), 100)
    })()
}

testScenarioOne()
