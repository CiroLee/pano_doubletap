pano_doubletap
==
krpano双击插件（兼容PC端和移动端）

src/目录中包含dblclick.js、doubletap.js、doubletap.mobile.js，分别是krpano官网提供的双击插件，该插件调用的是原生的dblclick事件，所以只能在PC端使用。doubletap.js在此基础上做了兼容，可以在PC和移动端实现兼容使用，doubletap.mobile.js是专门为移动端改写的双击插件，是一个针对性的精简版，只能在移动端使用。三个插件可根据需要引用。
