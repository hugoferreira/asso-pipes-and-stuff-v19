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
const Publisher_1 = require("../Publisher");
const Subscriber_1 = require("../Subscriber");
const Broker_1 = require("../Broker");
const isArraySorted = require('is-array-sorted');
function default_1(nOps, nPublishers, nSubscribers) {
    return __awaiter(this, void 0, void 0, function* () {
        // Declare objects
        const broker = new Broker_1.Broker(10);
        const publishers = new Array();
        for (let i = 0; i < nPublishers; i += 1) {
            let publisher = new Publisher_1.BrokerPublisher();
            broker.addPublisher(publisher);
            publishers.push(publisher);
        }
        const subscribers = new Array();
        for (let i = 0; i < nSubscribers; i += 1) {
            let subscriber = new Subscriber_1.Subscriber(10);
            broker.addSubscriber(subscriber);
            subscribers.push(subscriber);
        }
        let enqueues = 0;
        let dequeues = 0;
        const result = new Array();
        const promises = Array();
        // Do a random permutation of enqueing and dequeing
        for (let i = 0; i < nOps; i += 1) {
            if (Math.random() > 0.5) {
                enqueues += 1;
                // random publisher pushes
                publishers[Math.floor(Math.random() * nPublishers)].push(enqueues);
            }
            else {
                dequeues += 1;
                // broker pulls a message
                promises.push(broker.pull().then(v => { result.push(v); }));
            }
        }
        const pending = Math.min(enqueues, dequeues);
        yield Promise.all(promises.slice(0, pending));
        // Length should be equal minimum between enqueues and dequeues
        const isLengthOk = pending === result.length;
        // Messages should be ordered
        const isSorted = isArraySorted(result);
        return isLengthOk && isSorted;
    });
}
exports.default = default_1;
//# sourceMappingURL=ex4.js.map