var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var isArraySorted = require('is-array-sorted');
var AsyncQueue = /** @class */ (function () {
    function AsyncQueue() {
        this.queue = Array();
    }
    AsyncQueue.prototype.enqueue = function (element) {
        this.queue.push(element);
    };
    AsyncQueue.prototype.dequeue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.queue.shift()];
            });
        });
    };
    return AsyncQueue;
}());
function testAsyncQueueBehavior(nOps) {
    return __awaiter(this, void 0, void 0, function () {
        var result, q, enqueue, dequeue, promises, enqueues, dequeues, i, pending, isLengthOk, isSorted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = new Array();
                    q = new AsyncQueue();
                    enqueue = function (m) { return q.enqueue(m); };
                    dequeue = function () { return q.dequeue(); };
                    promises = Array();
                    enqueues = 0;
                    dequeues = 0;
                    // Do a random permutation of enqueing and dequeing
                    for (i = 0; i < nOps; i += 1) {
                        if (Math.random() > 0.5) {
                            enqueues += 1;
                            // console.log(`${Date.now()} Enqueuing ${enqueues}`)
                            enqueue(enqueues);
                        }
                        else {
                            dequeues += 1;
                            // console.log(`${Date.now()} Dequeuing`)
                            promises.push(dequeue().then(function (v) { result.push(v); }));
                        }
                    }
                    pending = Math.min(enqueues, dequeues);
                    return [4 /*yield*/, Promise.all(promises.slice(0, pending))
                        // Length should be equal minimum between enqueues and dequeues
                    ];
                case 1:
                    _a.sent();
                    isLengthOk = pending === result.length;
                    isSorted = isArraySorted(result);
                    return [2 /*return*/, isLengthOk && isSorted];
            }
        });
    });
}
setInterval(function () { }, 1000); // run program forever until an explicit exit occurs
(function () { return __awaiter(_this, void 0, void 0, function () {
    var success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, testAsyncQueueBehavior(100)];
            case 1:
                success = _a.sent();
                console.log(success);
                process.exit();
                return [2 /*return*/];
        }
    });
}); })();
