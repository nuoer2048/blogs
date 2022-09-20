# call bind apply new 的 js 代码实现

## new
```javascript
function Name(){
    this.name = "xhq"
}

const n = new Name();

n.__proto__ = Name.prototype

function myNew(){
    const constru = Array.prototype.shift.call(arguments);
    var obj = {};
    const result = constru.apply(obj, arguments);
    return typeof result === "object"? result: obj;
}

```

## call
```javascript
    // 浏览器环境下
    var a = 1, b = 2;
    var obj ={a: 10,  b: 20}
    function test(key1, key2){
      console.log(this[key1] + this[key2]) 
    }
    test('a', 'b') // 3
    test.call(obj, 'a', 'b') // 30

    function myCall(){
        const context = Array.prototype.shift.call(arguments);
        context.fn = this;
        let args = [...arguments].slice(1);
        let r = context.fn(...args);
        delete context.fn;
        return r;
    }
    
```

## apply
```javascript
 var a = 1, b = 2;
    var obj ={a: 10,  b: 20}
    function test(key1, key2){
      console.log(this[key1] + this[key2]) 
    }
    test('a', 'b') // 3
    test.apply(obj, ["a", "b"]) // 30

    function apply(){
        const context = Array.prototype.shift.call(arguments);
        context.fn = this;
        const arges = [...arguments][1]
        if(!arges){
            return context.fn();
        }
     let r = context.fn(...args)
      delete context.fn;
      return r
    }

```

## bind

```javascript
function bind(arguments){
    const _me = this;
    return function(){
        return _me.apply(arguments)
    }
}
```
