function Array(...args) {
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

/* ✅ What this line does
Object.setPrototypeOf(arr, Array.prototype);


This tells JavaScript:
“Make arr inherit all methods from Array.prototype.”
After this line, arr gets access to:
push(), pop(), map(), filter(), reduce(), forEach(), length auto-updates

internal array behaviors
Basically, arr becomes a TRUE Array.

🎯 Why this line is necessary?
Because when you create an object manually, like:
let arr = {};
It is not an array. It has no array methods.

But after: Object.setPrototypeOf(arr, Array.prototype);

Now arr behaves like: let arr = [];

🎯 Prototype Explained Simply

When you do: arr.push(10);

JavaScript checks:

Does arr have push?

❌ No.

Check arr’s prototype: Array.prototype

Is there a push inside Array.prototype?

✔ Yes → Use it.

So your array gets push/pop/map for free.

🎯 Visual explanation (very clear)

Before:
arr → {}  
arr.__proto__ → Object.prototype


After:
Object.setPrototypeOf(arr, Array.prototype);


Now:
arr → {}
arr.__proto__ → Array.prototype → Object.prototype


Now arr can do everything arrays do.

🎯 Real-life example
Example WITHOUT prototype:
let arr = {};
arr.push(1); // ❌ Error: arr.push is not a function

After setting prototype:
let arr = {};
Object.setPrototypeOf(arr, Array.prototype);

arr.push(1); // ✔ Works!

🎯 Why browser prints function Array() { [native code] }

Because JavaScript engine (V8) uses prototypes internally, not classes.

🔥 Summary (very short)
Object.setPrototypeOf(arr, Array.prototype);


➡ Makes arr inherit all array methods
➡ Turns plain object into array-like object
➡ Links arr.proto to Array.prototype
➡ Allows using push/pop/map/filter etc. */
