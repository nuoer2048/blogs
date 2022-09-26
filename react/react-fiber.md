# React Fiber

在介绍 React Fiber 之前，先来大概看看 react 16 之前是怎么进行数据更新的。
react 16 之前是进行循环在递归更新虚拟节点的。不能中断。直到整颗虚拟 dom 更新完后，主线程才会被释放，这中间会导致 用户交互 和 动画效果无法立即得到响应 GUI native 和 JS 代码执行互斥

## requestIdleCallback
requestIdleCallback 支持在浏览器空闲状态执行回调函数。如果有更高优先级的任务插入，就去执行更高优先级的任务

## React fiber
Fiber 是 react 中的一个执行单元，react 16 之后，将整个渲染过程划分为一个个小的任务进行处理。每个小的任务对应的就是 Fiber 节点的构建。拆分的小的任务会在浏览器的空闲时间被执行，每个任务单元执行完后，react 就会检查是否还有空余时间（deadline.timeReaining()>0）,如果有就交换主线程的控制权。fiber 是一种链表数据结构，

fiber 的工作分为两个阶段
- render 阶段，构建 fiber 对象，构建链表。在链表种标记要执行的 dom 操作，可中断
- commit 阶段，根据构建好的链表进行 dom 操作。不可中断


## Fiber 的含义
1. 作为架构来说，之前的 react 15 的 recociler 采用递归的方式执行，数据保存在递归的调用栈中，所以被称为 statck recociler, react 的 reconciler 基于 fiber 节点实现，被称为 fiber reconciler
2. 作为静态数据结构数据来说，每个 Fiber 节点 对应一个 react element, 保存了该组件的类型，对应的节点信息
3. 作为动态的工作单元来说， 每个 fiber 节点，保存了本次更新中该组件的状态，要执行的动作（对 dom 的修改）

## Fiber 的结构
虽然属性很多，但是我们可以按三层含义将他们分类来看
```javascript
function Fiber(){
    // 作为静态数据结构
    // 组件类型
    this.tag;
    this.key;
    this.elementType;
    this.type;
    // fiber 对应的真实 dom 节点
    this.stateNode;

    // 用于连接其他 Fiber 节点形成 Fiber 树
    // 父级 fiber 节点
    this.return;
    // 子级
    this.child;
    // 兄弟节点
    this.sibling;
    this.index;

    this.ref;

    // 作为动态的工作单元, 本次更新造成的状态改变的相关信息
    this.pendingProps;
    this.memorizedProps;
    this.updateQueue;
    this.memorizedState;
    this.dependencies;

    this.mode;

    // 本次更新会造成的 dom 操作
    this.effectTag;
    this.nextEffect;

    this.firsetEffect;
    this.lastEffect;

    this.lanes;
    this.childLanes;

    指向该 fibr 在另一次更新对应的 fiber
    this.alternate;

}
```


# Fiber 架构的工作原理

Fiber 节点可以保存对应的 Dom 节点，响应的 Fiber 节点构成的 Fiber 树，就对应 DOM树
那么如何更新 DOM 树呢？这里需要用到 “双缓存”技术

## 什么是双缓存技术
当我们使用 canvas 绘制动画时，每一帧绘制前都会利用 ctx.clearRect 清除上一帧的画面。
如果当前帧的计算量比较大，就会导致清除上一帧画面到绘制当前帧画面之间有较长的间隙，就会出现白屏。
为了解决这种情况，我们可以在内存中绘制当前帧画面，绘制完毕后直接使用当前帧替换上一帧画面，由于省去了两种替换间的计算时间，就不会出现白屏到出现画面到闪烁情况
这种在内存中构建并直接替换的技术就叫双缓存技术。
react 使用 床缓存完成 Fiber 树的构建与替换，对应着 dom 树的构建与替换

## 双缓存 Fiber 树
在 React 中最多会同时存在两颗 Fiber 树。当前屏幕上显示对应的 Fiber 树称为 current Fiber 树，正在内存中构建的 Fiber 树 称为 workInProgress Fiber 树。
current Fiber 树中 Fiber 节点被称为 current Fiber , workInProgress Fiber 树中的 Fiber 节点被称为 workInProgress 节点，他们通过 alternate 连接
```javascript
current.alternate =workInProgress;
workInProgress.alternate = current
```

React 应用的根节点通过使 current 指针在不同的 Fiber 树中的 rooterFiber 间切换，来完成 currentFiber 树指向的切换/
即当 workerInProgress Fiber 树构建完成交给 Renderer 渲染在页面上后，应用根节点的 current 指针执行 workerInProgres Fiber 树。此时的 workerInProgress Fiber 树就称为 current Fibet 树。
每次 状态的更新都会产生新的 workInProgress Fiber 树，通过 current 与 workInProgress 的替换完成 Dom 更新。


## mount 时
考虑如下例子
```javascript
const App(){
    const [num, add] = useState(0);
    return (<p onClick={() => add(num=1)}>{{num}}</p>)
}

ReactDom.render(<App />, document.getElementById("root"))
```

1. 首次执行 ReactDom.render 会创建 fiberRootNode 和 rootFiber. fiberRootNode 是整个应用的根节点。 rootFiber 是<App/> 所在组件的根节点
之所以要区分 fiberRootNode 和 rootFiber 是因为在应用中我们可以多次调用 ReactDom.render 渲染不同的组件树，他们会拥有不同的 rootFiber 但是整个应用只有一个 fiberRootNode
```javascript
fiberRootNode.current = rootFiber = null;
```
由于是首屏渲染，页面中还没有挂载任何的 Dom, 所以rootFiber 没任何的 子 Fiber
2. 接下来进行 render阶段，根据组件返回的 jsx 在内存中依次创建 Fiber节点，并连接在一起构建为 Fiber 树，也就是 workInProgress 树。
在构建 workInProgress树中会尝试复用 current Fiber 树中已有的 Fiber 节点的属性。在首屏阶段。只有 rootFiber 存在对应的 current Fiber
3. workInProgress Fiber 树构建完成后，fiberRootNode 的 current 指向 workInProgress 树，使其变成 current Fiber 树


## update
1. mount 完后，接下来我们来点击 p 触发状态改变，此动作会开启一次新的 render 阶段， 并构建一颗新的 workInProgress Fiber 树。
和 mount 时一样，workInProgress fiber 树创建过程中可以复用 current Fiber树 对应的 节点数据。（是否决定复用的过程就是 diff 算法）
2. workInProgress Fiber 树在 render 阶段完成构建后，进入commit 阶段，渲染到页面上，渲染完毕后。 workerInProgress Fiber 树变为 current fiber 树。


## Fiber 是如何创建并构建成 Fiber 树的？

React render阶段 开始于 performSyncWorkOnRoot 或 perfornConCurrentWorkOnRoot 方法的调用，取决于本次是同步更新还是异步更新。
在这两个方法会调用如下两个方法
```javascript

function workLoopSync(){
    while(workProgress !== null){
        perfomUnitOnWork(workProgress)
    }
}

function workLoopConcurrent(){
    while(workprogress !== null && !shouldYeid()){
          perfomUnitOnWork(workProgress)
    }
}

```

可以看到他们唯一的区别就是是否调用 shouldYield， 如果当前浏览器帧没有剩余时间，shouldYield 会中止循环，zhi到浏览器有空余时间再继续遍历。

workerInProgress 代表当前已经创建的  workInProgress Fiber 树。
perfomUnitOnWork   会创建下一个 Fiber 节点，并fuzhi给 workInProgress, 并将 workInProgress 与 Fiber 节点连接起来。

perfomUnitOnWork 的工作分为 递 归 两部分
### 递
先从 rootFiber 向下深度优先遍历，遍历到每个 Fiber 节点，调用 beginWork 方法，该方法会根据传入的Fiber节点创建子Fiber节点，并将这两个Fiber节点连接起来。

当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段

### “归”阶段
在“归”阶段会调用completeWork (opens new window)处理Fiber节点。

当某个Fiber节点执行完completeWork，如果其存在兄弟Fiber节点（即fiber.sibling !== null），会进入其兄弟Fiber的“递”阶段。

如果不存在兄弟Fiber，会进入父级Fiber的“归”阶段。

“递”和“归”阶段会交错执行直到“归”到rootFiber。至此，render阶段的工作就结束了

