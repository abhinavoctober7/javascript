class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.successCallbacks = [];
    this.failCallbacks = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = value;
      queueMicrotask(() => {
        this.successCallbacks.forEach((cb) => cb(value));
      });
    };

    const reject = (error) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.value = error;
      queueMicrotask(() => {
        this.failCallbacks.forEach((cb) => cb(error));
      });
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // --- then method for chaining promises ---
  then(onSuccess, onFailure) {
    return new MyPromise((resolve, reject) => {
      const handleSuccess = (value) => {
        try {
          const result = onSuccess(value);
          resolve(result); // chaining
        } catch (error) {
          reject(error);
        }
      };

      const handleFailure = (error) => {
        try {
          const result = onFailure(error);
          resolve(result); // chaining
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === "fulfilled") {
        handleSuccess(this.value);
      } else if (this.state === "rejected") {
        handleFailure(this.value);
      } else {
        this.successCallbacks.push(handleSuccess);
        this.failCallbacks.push(handleFailure);
      }
    });
  }

  // --- catch method for chaining promises ---
  catch(onFailure) {
    return this.then(null, onFailure);
  }

  // --- finally method for chaining promises ---
  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally();
        return value;
      },
      (error) => {
        onFinally();
        throw error;
      }
    );
  }

  // --- static methods ---
  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }
  static reject(error) {
    return new MyPromise((_, reject) => reject(error));
  }
}

const x = fetch("https://api.github.com/users/akshaysaini7")
  .then((response) => response.json())
  .then((data) => data.name)
  .then((name) => name.toUpperCase());

console.log(x);
