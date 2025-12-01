const obj = {
  id: "12345",
  name: { first: "John", last: "Doe" },
  address: {
    city: "New York",
    zip: "10001",
    landMark: { name: "Statue of Liberty" },
  },
};

Object.prototype.flatAnObject = function (obj, parent = "", res = {}) {
  for (let key in obj) {
    let propName = parent ? parent + "_" + key : key;
    if (typeof obj[key] == "object" && obj[key] !== null) {
      this.flatAnObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
};

console.log(obj.flatAnObject());
