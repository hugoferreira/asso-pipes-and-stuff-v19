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
class Publisher {
    constructor(queue) {
        this.id = Publisher._id++;
        this.queue = queue;
    }
    push(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.queue.enqueue(message);
        });
    }
    setQueue(queue) {
        this.queue = queue;
    }
}
Publisher._id = 0;
exports.Publisher = Publisher;
class BrokerPublisher extends Publisher {
    constructor() {
        super();
    }
    setBroker(broker) {
        this.broker = broker;
    }
    push(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.broker.enqueue(this.id, message);
        });
    }
}
exports.BrokerPublisher = BrokerPublisher;
//# sourceMappingURL=Publisher.js.map