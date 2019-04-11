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
const ex1_1 = require("./tests/ex1");
const ex2_1 = require("./tests/ex2");
const ex3_1 = require("./tests/ex3");
const ex4_1 = require("./tests/ex4");
setInterval(() => { }, 1000); // run program until explicit exit
(() => __awaiter(this, void 0, void 0, function* () {
    console.log("EX1 -", (yield ex1_1.default(100)) ? "PASSED" : "FAILED");
    console.log("EX2 -", (yield ex2_1.default(100, 3)) ? "PASSED" : "FAILED");
    console.log("EX3 -", (yield ex3_1.default(100, 3)) ? "PASSED" : "FAILED");
    console.log("EX4 -", (yield ex4_1.default(100, 3, 3)) ? "PASSED" : "FAILED");
    process.exit();
}))();
//# sourceMappingURL=main.js.map