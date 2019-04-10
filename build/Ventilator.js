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
class Ventilator {
    constructor(queue) {
        this.queue = queue;
        this.subs = Array();
    }
    subscribe(sub) {
        this.subs.push(sub);
    }
    pull() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notifySubs(this.queue.dequeue());
        });
    }
    notifySubs(task) {
        return __awaiter(this, void 0, void 0, function* () {
            let tasks = new Array();
            for (const sub of this.subs) {
                tasks.push(sub.process(task));
            }
            return Promise.all(tasks);
        });
    }
}
exports.Ventilator = Ventilator;
//# sourceMappingURL=Ventilator.js.map