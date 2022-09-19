function Promise(resolver: any) {
    if (typeof resolver !== "function") {
      throw new Error("resolver 必须是一个函数");
    }
  
    const self = this;
  
    self.status = "pending";
    self.callback = [];
  
    function resolve(value: any) {
      if (self.status !== "pending") {
        return;
      }
      self.status = "resolved";
      self.data = value;
      for (let i = 0; i < self.callback.length; i++) {
        self.callback[i].onResolved(value);
      }
    }
  
    function reject(reason: any) {
      if (self.stauts !== "pending") {
        return;
      }
      self.status = "rejected";
      self.data = reason;
      for (let i = 0; i < self.callback.length; i++) {
        self.callback[i].onRejected(reason);
      }
    }
  
    try {
      resolver(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  function recolvePromise(nextPromise, x, nextResolve, nextReject) {
    let then,
      thenCalledOrThrow = false;
    if (nextPromise === x) {
      return nextReject("不能循环使用");
    }
  
    if (x !== null && (typeof x === "object" || typeof x === "function")) {
      then = x?.then;
      try {
        then.call(
          x,
          function rs(d) {
            if (thenCalledOrThrow) {
              return;
            }
            thenCalledOrThrow = true;
            // nextResolve(d);
            return recolvePromise(nextPromise, d, nextResolve, nextReject);
          },
          function rj(e) {
            if (thenCalledOrThrow) {
              return;
            }
            thenCalledOrThrow = true;
            // nextReject(e);
            return recolvePromise(nextPromise, e, nextResolve, nextReject);
          }
        );
      } catch (error) {
        thenCalledOrThrow = true;
        nextReject(error);
      }
    } else {
      nextResolve(x);
    }
  }
  
  Promise.prototype.then = function (onResolved, onRejected) {
    onRejected = typeof onRejected === "function" ? onRejected : (reason) => {};
    onResolved = typeof onResolved === "function" ? onResolved : (data) => {};
    const self = this;
    const data = self?.data;
    let promise2;
  
    if (self?.status === "resolved") {
      return (promise2 = new Promise((resolve, reject) => {
        const x = onResolved(data);
        recolvePromise(promise2, x, resolve, reject);
      }));
    } else if (self?.status === "rejected") {
      return (promise2 = new Promise((resolve, reject) => {
        setTimeout(function () {
          const x = onRejected(data);
          recolvePromise(promise2, x, resolve, reject);
        });
      }));
    } else {
      self.callback.push({
        onRejected,
        onResolved
      });
    }
  };
  
  Promise.prototype.catch = function (onRejected) {
    this.then(null, onRejected);
  };
  
  Promise.prototype.finally = function (cb) {
    return this.then(
      function r(a) {
        setTimeout(cb);
        return a;
      },
      function e(e) {
        setTimeout(e);
        throw e;
      }
    );
  };
  
  Promise.prototype.resolve = function (value) {
    let promise = new Promise(function (resolve, reject) {
      setTimeout(() => {
        recolvePromise(promise, value, resolve, reject);
      });
    });
    return promise;
  };
  
  Promise.prototype.reject = function(reason){
    return new Promise((resolve, reject){
      reject(reason)
    })
  }
  
  
  Promise.prototype.all = function (promises) {
    return new Promise((resolve, rejected) => {
      // 按照顺序，全部执行完，就 reesolve
      const len = promises.length;
      const promisedCounter = 0;
      const promiseValue = new Array(promisedCounter);
      for(let i = 0;i<len;i++){
        (function(i){
          Promise.resolve(promises[i]).then(function(res) {
            promiseValue[i] = res;
            promisedCounter++;
            if(promisedCounter === len){
              resolve(promiseValue)
            }
          }, function(error){
             rejected(error)
          })
        })(i)
      }
    });
  };
  
  Promise.prototype.race = function(promises){
    return new Promise(function(resolve, reject){
       for(let i =0; i< promises.length; i++){
           Promise.resolve(promises[i]).then(function(res){
            return resolve(res)
           },function(error){
              return reject(error)
           })
       }
    })
  }
  
  export default Promise;
  