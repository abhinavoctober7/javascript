const arr = [1, 2, 3, [4, 5]];

Array.prototype.flatAnArray = function () {
  let flatArray = [];
  for (let element of this) {
    if (Array.isArray(element)) {
      flatArray.push(...this.flatAnArray(element));
    } else {
      flatArray.push(element);
    }
  }
  return flatArray;
};
