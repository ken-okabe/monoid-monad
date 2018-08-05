"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toObj = (i) => (i !== Object(i)) //primitives
    ? ({
        valueOf: () => i
    })
    : i;
exports.normalize = (obj) => (obj.valueOf === undefined)
    ? obj
    : Object(obj.valueOf());
