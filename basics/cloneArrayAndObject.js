const arr = [1, 2, 3, [4, 5]];

Object.prototype.superClone = function (object) {
  const cloning = Array.isArray(object) ? [] : {};
  for (let key in object) {
    if (Array.isArray(object[key])) {
      // 1. What if it is an Array?
      cloning[key] = [];
      for (let i = 0; i < object[key].length; i++) {
        if (Array.isArray(object[key][i])) {
          cloning[key][i] = this.superClone(object[key][i]);
        } else if (typeof object[key][i] === "object") {
          cloning[key][i] = this.superClone(object[key][i]);
        } else {
          cloning[key][i] = object[key][i];
        }
      }
    } else if (typeof object[key] === "object" && object[key] !== null) {
      // 2. What if it is an Object?
      cloning[key] = this.superClone(object[key]);
    } else {
      // 3. What if it is a Primitive?
      cloning[key] = object[key];
    }
  }
};
