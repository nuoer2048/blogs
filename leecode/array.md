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

# 判断一个链表是否是回文结构
```javascript
function isPalindroml1(head){
  const temp = new Array();
  const cur = head;
  while( cur){
   temp.push(cur);
   cur = cur.next
  }
  while(head){
    if(head.value !== temp.pop().value){
      return false
    }
    head = head.next
  }
  return true
}

function 2(head){
  const temp = new Array();
  const slow = head, fast = head;

}

```

# 二叉树
```javascript
// 前序遍历
function pre(root){
  const res =[];
  function _pre(node){
   if(!node){
    return
   }
   res.push(node.val);
   _pre(node.left)
   _pre(node.right)
  }
  _pre(root)
  return res;
}


function pre_stack(root){
  const stack = [root], res = [];
  while(stack.length){
    const cur = stack.pop();
    res.push(cur.val);
    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left)
  }
  return res;
}


// 中序
function inorder(root){
  const res = [];

   function _inorder(node){
     if(!node){
      return
     }
     _inorder(node.left);
     res.push(node.value);
     _inorder(node.right)
   }

  return res;
}

function inorder2(root){
  const res = [];
  const stack = [];
  let cur = root;
  if(!root) return;

  while(stack.length || cur){
    while(cur){
      stack.push(cur);
    cur= cur.left;
    }
    const node = stack.pop();
    res.push(node.value);
    if(node.right){
      cur = node.right
    }
  }

  return res;

}

// 后序
function postOrder(root){
  const res = [];

  function _post(node){
    if(!node){
      return;
    }
    _post(node.left);
    _post(node.right);
    res.push(node.value)
  }

  return res;
}

function post2(root){
 if(!root) return;
 const res = [], stack = [root];
 while(stack.length){
   res.unshift(stack.pop().length);
   cur.left && stack.push(cur.left);
   cur.right && stack.push(cur.right);
 }
 return res;
}

// 层序遍历

function level(root){
  const res = [];

  function _level(node, level){
   if(!root){
    return null
   }
   res[level] = res[level] || [];
   res[levl].push(node.value);
   _level(node.left, level+1);
   _level(node.right, level+1)
  }

  return res;
}


function level2(root){
  const res = [];
  const queue = [root];
  let level = 0;
  while(queue.length){
    res.push([]);
    const len = queue.length;
    for(var i = 0; i< len; i++>){
      const node = queue.shift();
       res[i].push(node.value);
       node.left && queue.push(node.left);
       node.right && queue.node.right;
    }
    level++
  }

  return res;


}


```
# 主持人调度
```javascript
function minmumNumberOfHost( n ,  startEnd ) {
    // write code hstartEnd.map(item =>item[0])ere
    let start =startEnd.map(item =>item[0]).sort((a,b)=>a-b);
    let end= startEnd.map(item=>item[1]).sort((a,b)=>a-b);
    let count =0,j=0;
    for(let i=0;i<start.length;i++){
       if(start[i]<end[j])
           //某个活动i的开始时间早于活动j 的结束时间，增加主持人
           count++;
        else
            //否则，不用增加主持人
            j++; 
    }
    return count;
}
```

# 主持人调度
```javascript
function candy( arr ) {
    let res=new Array(arr.length).fill(1);
    for(let i=0;i<arr.length;i++)
        if (arr[i+1] > arr[i]){
          res[i+1] = res[i] + 1
        }
    for(let j=arr.length-1;j>0;j--)
        if(arr[j-1]>arr[j] && res[j-1]<=res[j])
            res[j-1]= res[j]+1;
    return res.reduce((pre,cur)=>pre+cur);
}
```