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
import {Queue} from "./queue";
import { Observer, Publisher, Ventilator} from './stuff'

export function testScenarioThree() {

    let queue = new Queue.BoundedAsyncQueue<string>(5)

    // Creating Ventilator
    const ventilator = new Ventilator()

    // Creating Publishers
    const publisher = new Publisher(1)
    const publisher2 = new Publisher(2)

    // Creating Subscribers
    const subscriberA = new Observer(1)
    const subscriberB = new Observer(2)
    const subscriberC = new Observer(3)
    const subscriberD = new Observer(4)

    // Subscribing to the Ventilator
    subscriberA.subscribeVentilator(ventilator)
    subscriberB.subscribeVentilator(ventilator)
    subscriberC.subscribeVentilator(ventilator);

    (async () => {
        setTimeout(() => publisher.run(5000, queue), 100)
        // Notify all of our subscribers about the messages
        ventilator.run(5000, queue)

        publisher2.run(5000, queue)
    })()

    subscriberD.subscribeVentilator(ventilator)

}

testScenarioThree();