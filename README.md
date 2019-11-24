# Alex Ni 毕业设计 CMall
演示地址: http://114.55.94.250/
#### 前端技术
| 技术         | 说 明         |
|--------------|---------------|
|Vue|前端框架|
|Vue router|路由|
|Vuex|全局状态管理|
|Axios|前端HTTP框架|
|V-charts|报表生成|
|Element|前端UI框架|
|nprogress|进度条控件|

#### 开发工具
| 工具         | 说 明         |
|--------------|---------------|
|WebStrom|前端开发工具|

#### 开发环境
| 环境         | 版本         |
|--------------|---------------|
|node|10.16.0|
|nginx|1.10|
#### 本地安装
> 本地安装
  * git clone  https://github.com/andyx511/vueadmin.git 
  * 下载node并安装，本人版本10.16.0
  * 本项目为前后端分离项目，访问本地接口需要对应后端服务
    * 如果本地后端服务已启动，修改/src/utils/request.js中的 baseURL: 'http://127.0.0.1:8888'
    * 无本地后端服务，修改/src/utils/request.js中的 baseURL: 'http://114.55.94.250:8888'
  * 进入项目目录，命令行运行 npm install ，下载相关依赖
  * 命令行运行 npm run dev ，启动项目
  * 访问地址 http://127.0.0.1:8889 ，查看项目是否启动成功
  * 后端传送门： https://github.com/andyx511/cmall.git 