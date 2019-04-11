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
class Subscriber {
    constructor(processingTime, queue) {
        this.processingTime = processingTime;
        this.id = Subscriber._id++;
        this.queue = queue;
    }
    pull() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.process(this.queue.dequeue());
        });
    }
    process(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                // simulates processing time
                setTimeout(() => {
                    resolve(task);
                }, this.processingTime);
            });
        });
    }
    setQueue(queue) {
        this.queue = queue;
    }
}
Subscriber._id = 0;
exports.Subscriber = Subscriber;
//# sourceMappingURL=Subscriber.js.map