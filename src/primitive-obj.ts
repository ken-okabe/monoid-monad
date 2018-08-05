export const toObj = (i: any) => (i !== Object(i)) //primitives
  ? ({
    valueOf: () => i
  })
  : i;

export const normalize = (obj: any) =>
  (obj.valueOf === undefined)
    ? obj
    : Object(obj.valueOf());