function Array1(...args) {
  let arr = {};

  // Special internal properties for Arrays
  arr.length = 0;

  // If values passed, add them
  for (let i = 0; i < args.length; i++) {
    arr[i] = args[i];
    arr.length++;
  }

  // Set prototype internally
  Object.setPrototypeOf(arr, Array.prototype);

  return arr;
}

const x = new Array1(1, 2, 3);
console.log(x);
