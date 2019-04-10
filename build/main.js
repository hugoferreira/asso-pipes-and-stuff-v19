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
const Publisher_1 = require("./Publisher");
const Subscriber_1 = require("./Subscriber");
const Ventilator_1 = require("./Ventilator");
const isArraySorted = require('is-array-sorted');
setInterval(() => { }, 1000); // run program until explicit exit
(() => __awaiter(this, void 0, void 0, function* () {
    console.log("EX1 -", (yield ex1Test(100)) ? "PASSED" : "FAILED");
    console.log("EX2 -", (yield ex2Test(100, 3)) ? "PASSED" : "FAILED");
    console.log("EX3 -", (yield ex3Test(100, 3)) ? "PASSED" : "FAILED");
    process.exit();
}))();
function ex1Test(nOps) {
    return __awaiter(this, void 0, void 0, function* () {
        // Declare objects
        const queue = new AsyncQueue_1.AsyncQueue(10);
        const publisher = new Publisher_1.Publisher(queue);
        const subscriber = new Subscriber_1.Subscriber(queue, 10);
        let enqueues = 0;
        let dequeues = 0;
        const result = new Array();
        const promises = Array();
        // Do a random permutation of enqueing and dequeing
        for (let i = 0; i < nOps; i += 1) {
            if (Math.random() > 0.5) {
                enqueues += 1;
                publisher.push(enqueues);
            }
            else {
                dequeues += 1;
                promises.push(subscriber.pull().then(v => { result.push(v); }));
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
function ex2Test(nOps, nSubscribers) {
    return __awaiter(this, void 0, void 0, function* () {
        // Declare objects
        const queue = new AsyncQueue_1.AsyncQueue(10);
        const publisher = new Publisher_1.Publisher(queue);
        const subscribers = new Array();
        for (let i = 0; i < nSubscribers; i += 1)
            subscribers.push(new Subscriber_1.Subscriber(queue, 10));
        let enqueues = 0;
        let dequeues = 0;
        const result = new Array();
        const promises = Array();
        // Do a random permutation of enqueing and dequeing
        for (let i = 0; i < nOps; i += 1) {
            if (Math.random() > 0.5) {
                enqueues += 1;
                publisher.push(enqueues);
            }
            else {
                dequeues += 1;
                // a random subscriber pulls a message
                promises.push(subscribers[Math.floor(Math.random() * nSubscribers)].pull().then(v => { result.push(v); }));
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
function ex3Test(nOps, nSubscribers) {
    return __awaiter(this, void 0, void 0, function* () {
        // Declare objects
        const queue = new AsyncQueue_1.AsyncQueue(10);
        const publisher = new Publisher_1.Publisher(queue);
        const ventilator = new Ventilator_1.Ventilator(queue);
        for (let i = 0; i < nSubscribers; i += 1)
            ventilator.subscribe(new Subscriber_1.Subscriber(queue, 1000));
        let enqueues = 0;
        let dequeues = 0;
        const result = new Array();
        const promises = Array();
        // Do a random permutation of enqueing and dequeing
        for (let i = 0; i < nOps; i += 1) {
            if (Math.random() > 0.5) {
                enqueues += 1;
                publisher.push(enqueues);
            }
            else {
                dequeues += 1;
                // pushes to results a message from a random subscriber
                promises.push(ventilator.pull().then(v => { result.push(v[Math.floor(Math.random() * v.length)]); }));
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
//# sourceMappingURL=main.js.map