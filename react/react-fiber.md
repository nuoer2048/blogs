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
