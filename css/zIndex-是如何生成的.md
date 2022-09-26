# 层叠上下文
html 元素沿着相对于用户的方向一条虚线 z 轴展开，层叠上下文就是这些 html 元素的一个三维构想。众 html 元素基于其 html 属性，按照这个优先级占据空间。
形成 层叠上下文的 css 属性有:
1. 文档根元素
2. position 不为 static 
3. flex 布局
4. grid 布局
5. opacity 小于1
6. will-change 有值
7. contain 属性为 layout 、paint 、strict、content
8. isolation 为 isolate
9. transform filter backdrop-filter perspective clip-path mask mask-image mask-border 不为 none

# z-index
z-index 属性定义了 z 轴上的顺序，z-index 指定
1. 盒子在当前堆叠上下文中的堆叠层级
2. 盒子是否创建一个本地的堆叠上下文
