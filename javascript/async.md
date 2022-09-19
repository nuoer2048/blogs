# 手写 async 和 await
- await 只能在 async 函数中使用
- async 函数返回一个 Promise 有无值，看函数有无返回值
- async 后面最好更一个 Promise 函数，不然效果和同步效果一样
- async/await 是用同步方式实现异步效果

# generator
generator 意为生成器，是 es6 带来的新规范， generator 能够让我们函数执行时任意地方暂停。在后续遇到合适的时机继续执行。
generator 和 async/await 的对比
- async 返回的是一个 promise 函数
- generator 不是自执行的，必须调用 next
- 

```javascript
function generatorToAsync(generatorFunc){
    return function(){
         let gen = generatorFunc.apply(this, arguments)
        return new Promise(function(resolve, reject){
          function step(key, value){
           let result;
           try{ 
             result = gen[key](value);

           }catch(error){
            reject(error)
           }
           const {done, value} = result;
           if(done){
            resolve(value)
           }else {
            Promise.resolve(value).then(val => step["next"](value), error => {reject(error)})
           }
          }
          step("next")
        })
    }
}
```