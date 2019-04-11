"use strict";
// From https://stackoverflow.com/questions/50382553/asynchronous-bounded-queue-in-js-ts-using-async-await/50398038#50398038
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncSemaphore_1 = require("./AsyncSemaphore");
class AsyncQueue {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.queue = Array();
        this.waitingEnqueue = new AsyncSemaphore_1.AsyncSemaphore(0);
        this.waitingDequeue = new AsyncSemaphore_1.AsyncSemaphore(maxSize);
    }
    enqueue(x) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitingDequeue.wait();
            this.queue.unshift(x);
            this.waitingEnqueue.signal();
        });
    }
    dequeue() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitingEnqueue.wait();
            this.waitingDequeue.signal();
            return this.queue.pop();
        });
    }
    length() {
        return this.queue.length;
    }
}
exports.AsyncQueue = AsyncQueue;
//# sourceMappingURL=AsyncQueue.js.map