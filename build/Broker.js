"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncQueue_1 = require("./AsyncQueue");
class Broker {
    constructor(queueMaxSize) {
        this.queueMaxSize = queueMaxSize;
        this.pubQueues = new Map();
        this.subscribers = new Map();
    }
    addPublisher(publisher) {
        let queue = new AsyncQueue_1.AsyncQueue(this.queueMaxSize);
        this.pubQueues.set(publisher.id, queue);
        publisher.setBroker(this);
    }
    addSubscriber(subscriber) {
        let queue = new AsyncQueue_1.AsyncQueue(this.queueMaxSize);
        subscriber.setQueue(queue);
        this.subscribers.set(subscriber.id, subscriber);
    }
    enqueue(key, task) {
        return __awaiter(this, void 0, void 0, function* () {
            let availableQueue = this.checkAvailableQueues();
            if (availableQueue !== undefined) {
                availableQueue.enqueue(task);
                return;
            }
            const publisherQueue = this.pubQueues.get(key);
            return publisherQueue.enqueue(task);
        });
    }
    dequeue(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriber = this.subscribers.get(key);
            return subscriber ? subscriber.pull() : undefined;
        });
    }
    pull() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let [key, subscriber] of this.subscribers) {
                if (subscriber.queue.length() > 0)
                    return subscriber.pull();
            }
            return this.subscribers.values().next().value.pull();
        });
    }
    checkAvailableQueues() {
        let availableQueue;
        this.subscribers.forEach(subscriber => {
            if (!availableQueue || (subscriber.queue.length() <= this.queueMaxSize && subscriber.queue.length() < availableQueue.length())) {
                availableQueue = subscriber.queue;
            }
        });
        return availableQueue;
    }
}
exports.Broker = Broker;
//# sourceMappingURL=Broker.js.map