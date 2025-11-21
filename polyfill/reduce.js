const result = arr.reduce((acc, cur) => acc + cur, 0); // sum of numbers

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function (callback, initialValue) {
    // Error handling
    if (!Array.isArray(this)) {
      throw new TypeError("Array.prototype.reduce called on non-array");
    }

    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    if (this.length === 0 && initialValue === undefined) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    let accumulator = initialValue;
    let startIndex = 0;

    // If no initial value, use first element
    if (accumulator === undefined) {
      accumulator = this[0];
      startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
  };
}
