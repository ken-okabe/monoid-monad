"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const primitive_obj_1 = require("./primitive-obj");
const typed = (I) => (i) => {
    const handler = {
        get: (target, propKey, receiver) => {
            const targetValue = Reflect.get(target, propKey, receiver);
            return (propKey === String(I))
                ? I
                : (typeof targetValue !== "function")
                    ? targetValue
                    : (...args) => (typeof primitive_obj_1.normalize(target)[propKey] === "function")
                        ? primitive_obj_1.normalize(target)[propKey](...args)
                        : targetValue.apply(target, args);
        }
    };
    return exports.isType(I)(i)
        ? i //alreday typed I
        : new Proxy(primitive_obj_1.toObj(i), handler);
};
const istype = (I) => (i) => (i !== Object(i)) //primitives
    ? false
    : i[String(I)] === I;
exports.Type = (I) => (i) => (i === I) || (i == null)
    ? i
    : typed(I)(i);
exports.isType = (I) => (i) => (i === I)
    ? true
    : (i == null)
        ? false
        : istype(I)(i);
