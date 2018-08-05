"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const primitive_obj_1 = require("./primitive-obj");
exports.extendMethod = (i) => (key) => (f) => {
    const handler = {
        get: (target, propKey, receiver) => {
            const targetValue = Reflect.get(target, propKey, receiver);
            return key === propKey
                ? (...args) => (f(target.valueOf()))(...args)
                : (typeof targetValue !== "function")
                    ? targetValue
                    : (...args) => (typeof primitive_obj_1.normalize(target)[propKey] === "function")
                        ? primitive_obj_1.normalize(target)[propKey](...args)
                        : targetValue.apply(target, args);
        }
    };
    return (i[key] !== undefined)
        ? i
        : new Proxy(primitive_obj_1.toObj(i), handler);
};
