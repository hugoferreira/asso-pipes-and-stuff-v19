/*

Unbounded queue and publishes asap (again);
Ventilator (or Subscription Manager) knows about the subscribers:
    Observer used to push to subscribers (Explicit subscription);
    Different specializations of ventilators (Fanout, Round-robin...).

With steroids:
(do this one-->) Understands receipt notification (ACK) from subscribers;
May use Heart Beat, Timeout and Circuit breaker patterns to deal with delivery failures;
Manages message meta-information, such as marking them as tentatively consumed, until it has such guarantees (e.g., to avoids losing messages).

*/

import {Queue} from "./queue/api";
import {Subscriber, Ventilator} from './queue/Ventilator'

export function testScenarioThree() {

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
}

testScenarioThree();