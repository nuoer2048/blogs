# CORS

- 同源策略
限制一个 origin 下的文档或者是它加载的脚本，如何与另一个源的资源进行交互。是浏览器侧的行为
同源是指协议、域名、端口相同
明确限制不同源的脚本在未经授权时，不能读取其他方的资源（HTTP,document, cookie, storage）

如果 cookie 没有配置 SameSite 的话，就可能会导致 CSRF（跨站请求伪造）

跨源数据存储访问
localStorage 和 inndexedDB 是以源进行分割，每个源都有自己单独的存储空间，一个源中的 js 脚本不能对其它源的数据进行读写操作
cookies 使用不同源的定义，一个页面可以为其本域以及其父域（父域不是公共后缀）设置 cookie。浏览器允许给定的域及其所有子域访问 cookie, 
可以在设置 cookie 时，设置 domain、path、secire、httponly 来限定其无障碍.
读取 cookie 时，不知道该 cookie 是在什么地方被设置的。即使是 https 链接，看到 cookie 也有可能是通过不安全链接访问的

跨源网络访问
同源策略控制着不同源的交互，例如在使用 request 、img、script 等 api 加载资源时，会受到同源策略的影响。但是在日常开发中，我们经常会存在加载其他源的资源的场景。可以使用 CORS 允许跨源资源共享。它是让服务端来指定哪些主机可以访问该服务端的资源。

CORS
CORS（跨域资源共享），它是基于 http 头的机制，该机制通过允许服务器设置 origin 标识，来表示服务器的资源可以被这些 origin 的请求访问。
CORS 还通过一种机制 “预检”，来获取服务端是否允许该实际请求。预检的使用可以避免跨域请求对服务器的用户数据产生不可预估的影响。需要预检的请求必须先发送一个 OPTION 请求到服务器进行预先检查。

有些请求不会触发 CORS 预检请求，这样的请求称为简单请求

满足下面所有条件就被视为简单请求
- method 为 GET、POST、HEAD 之一
- 请求头部除了被用户代理自动设置的头部外，还可以设置 accept、accept-language、content-language、content-type(值可为: text/plain、multipart/form-data、application/x-www-form-urlencode)
- 请求中没有使用 readablestream 对象

HTTP 响应请求头
- origin
- access-control-request-headers
- access-control-request-method

HTTP 响应尾部头
- access-control-allow-origin
- access-control-allow-headers
- access-control-allow-method
- access-control-expose-headers(预请求的结果被缓存多久)
- access-control-max-age
- access-control-allow-credentials
