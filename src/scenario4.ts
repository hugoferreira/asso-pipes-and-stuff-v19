/*
Multiple publishers, multiple subscribers;
Both have specialized queues:
    Inbound and Outbound;
    Broker manages queue binding;
    Broker moves messages around (between queues);
    Queues may be persistent;
No implicit connections between subscribers and producers:
    Explicit subscription;
    Identification mechanism is needed (keys, topics, ...);
    Study the Registry and (if you are feeling adventurous) the Service Locator patterns.
*/
import { Broker, Publisher, SimpleSubscriber } from './stuff'
import { Queue } from './queue'

export function testScenarioFour() {

    // Create Broker
    const broker = new Broker<string>(5000)

    // Create Publishers and populate registry
    const pubA = new Publisher<string>()
    const keyA = broker.addPublisher(pubA)

    const pubB = new Publisher<string>()
    const keyB = broker.addPublisher(pubB)

    // Create Subscribers 
    const subsA = new SimpleSubscriber<string>(1)
    const subsB = new SimpleSubscriber<string>(2)
    const subsC = new SimpleSubscriber<string>(3)
    const subsD = new SimpleSubscriber<string>(4)

    // Manage subscriptions
    broker.addSubscriber(subsA, keyA)
    broker.addSubscriber(subsA, keyB)
    broker.addSubscriber(subsB, keyB)
    broker.addSubscriber(subsC, keyA);

    // Run system
    (async () => {
        broker.run()
    })()

}

testScenarioFour()
