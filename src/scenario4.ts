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

import { Broker, Publisher, Observer } from './stuff'
import { Registry } from './utils'
import { Queue } from './queue'

export function testScenarioFour() {

    // Create Registry
    const registry = new Registry<Publisher<string>>()

    // Create Broker
    const broker = new Broker<string>(registry)

    // Create Publishers and populate registry
    const pubA = new Publisher<string>()
    const keyA = registry.register(pubA)

    const pubB = new Publisher<string>()
    const keyB = registry.register(pubB)

    // Create Subscribers
    const subsA = new Observer(1)
    const subsB = new Observer(2)
    const subsC = new Observer(3)
    const subsD = new Observer(4)


    // Manage subscriptions
    broker.addSubscriber(subsA, keyA)
    broker.addSubscriber(subsA, keyB)

    broker.addSubscriber(subsB, keyB)

    broker.addSubscriber(subsC, keyA)


    // Publisher Queues
    let queueA = new Queue.AsyncQueue<string>()
    let queueB = new Queue.AsyncQueue<string>();

    // Run system
    (async () => {
        setTimeout(() => pubB.run(5000, queueB), 100)
        // Notify all of our subscribers about the messages
        broker.run(5000, [
            [keyA, queueA],
            [keyB, queueB]
        ])

        pubA.run(5000, queueA)
    })()

}

testScenarioFour()
