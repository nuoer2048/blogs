# 二维数组中数据的查找

```javascript
const findNumberIn2dArray = (arrar: Array<Array<any>>, target: number) => {
      let i = arrar.length - 1,
        j = 0;
      while (i >= 0 && j < arrar[0].length) {
        const current = arrar[i][j];
        if (target > current) {
          j++;
        } else if (target < current) {
          i--;
        } else if (target === current) {
        }
        return true;
      }
      return false;
    };

```

# js 实现 reduce

```javascript
function reduce(fn, initialValue){
        for(var i = 0; i< this.length; i++){
          if(typeof initialValue === "undefined"){
             initialValue = fn(this[i], this[i+1], i+1, this);
             ++i
          }else {
            initialValue = fn(initialValue, this[i], i, this)
          }
        }  
    }
```

# js 实现反转链表
```javascript
function reverseList(head){
if(!head || !head.next) return;
  var pre = null, curr = head
  while(curr){
    const next = curr.next;
    curr.next = pre;
    pre = curr;
    curr = next;
  }
  head = pre;
  return head
}


function digui(node){
    if(!node.next){
        return node;
    }else {
        const nextNode = digui(node.next);
        nextNode.next = node;
        node.next = null;
    }
}

```

# js 实现合并两个排序的链表

```javascript
function node(value){
  this.value = value;
  this.next = null;
}

function mergeList(l1,l2){
 if(!l1)return l2;
 if(!l2) return l1;
  const head = new node();
  let node1 = l1;
  let node2 = l2;
  let current = head;
  while(node1&&node2){
    if(node1.val <node2.val>){
        current.next = node1;
        node1 = node1.next
    }else {
        current.next = node2
        node2=node2.next
    }
    current = current.next
  }
  if(node1){
    current.next = node1
  }else if(node2){
    current.next = node2
  }
  return head;
} 
```
# js 实现旋转数组的最小数字
```javascript
function minNumberInRotateArray(arr){
    let len = arr.length,hight = len-1,low=0;
    if(len===0)return 0;
    while(low<high){
        let mind = low + Math.floor((high-low)/2);
        if(arr[mind]>arr[hight]){
            low = mind+1
        }else if(arr[mind]===arr[hight]){
            hight = hight --
        }else {
            hight = mind
        }
    }
    return arr[low]
}
```

#  数组中出现次数超过一半的数字
```javascript
function moreThanHalf(numbers){
  if(!numbers) return 0;
  if(numbers.length) return numbers[0];
  var times = 0, cand;
  for(var i = 0; i< numbers.length; i++){
    if(times === 0){
        cand = numbers[i];
        times = 1
    }else {
        if(cand === numbers[i]){
            times ++;
        }else {times --}
    }
  }

  times = 0;
  for(var i =0; i< numbers.length; i++){
    if(cand === numbers[i]){
        times++
    }
  }

  return times>Math.floor(numbers.length/2) ? cand: 0
}
```

# 连续子数组的最大和
```javascript
function maxRes(arr){
  if(arr.length === 0) return 0;
  var sum = arr[0], maxSum = arr[0];
  for(var i =0; i<arr.length; i++){
    sum = Math.max(sum+arr[i], arr[i]);
    maxSum = Math.max(sum, maxSum)
  }
  return maxSum;
}
```


# 跳台阶
```javascript

function numWays(n){
  const cache = new Array(n+1).fill(-1);
  dfs(n, cache);
  return cache[n]
}

function dfs(n, cache){
  if(n <=1) cache[n] = 1;
  if(n === 2) cache[n] = 2;
  if(cache[n] !== -1) return cache[n];
  cache[n] = (dfs(n-1, cache)+dfs(n-2, cache))
  return cache[n];
}

```

# 斐波那契数列
```javascript

var fibo = function(){
    let memo = [0,1];
    let fib = function(n){
        if(memo[n]=== undefined){
            memo[n] = fib(n-2)+fib(n-1)
        }
        return memo[0]
    }
    return fib
}()

function fibonacci(n) {
    var n1 = 1, n2 = 1, sum;
    for (let i = 2; i < n; i++) {
        sum = n1 + n2
        n1 = n2
        n2 = sum
    }
    return sum
}

```


# 岛屿数量
```javascript
function numIslands(grid){
   const rl = grid.length;
   const cl = grid[0].length;
   
   function isArea(r,c){
    return r>=0&&c>=0&&r<rl&&c<cl
   }

   function bfs(r,c){
      if(!isArea(r,c)){
        return;
      }
      if(grid[r][c] !== "1"){
        return;
      }
      grid[r][c]="2";
      bfs(r-1,c);
      bfs(r+1,c);
      bfs(r,c-1);
      bfs(r,c+1)
   }

   let count = 0;

   for(var r = 0; r<rl;r++){
    for(var c = 0; c<cl; c++){
       if(grid[r][c]==="1"){
          bfs(r,c);
          count++
       }
    }
   }
}

```