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
class AsyncSemaphore {
    constructor(permits) {
        this.permits = permits;
        this.promises = Array();
    }
    signal() {
        this.permits += 1;
        if (this.promises.length > 0)
            this.promises.pop()();
    }
    wait() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.permits == 0 || this.promises.length > 0)
                yield new Promise(r => this.promises.unshift(r));
            this.permits -= 1;
        });
    }
}
exports.AsyncSemaphore = AsyncSemaphore;
//# sourceMappingURL=AsyncSemaphore.js.map