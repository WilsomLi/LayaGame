# LayaGame

> 目标

快速构建游戏，拥有完善的通用模块，尽量减少重复编码，把精力放在核心玩法体验上。

## 环境

* 引擎库 Laya2.5
* IDE Laya2.5 VSCode
* Unity版本 2018.4.7

## 界面适配
Laya的ui界面控制四维属性同时存在时（目前仅根节点、以及拷贝节点到另一父节点时才会出现同时存在，其他情况会只会允许一种属性存在）
其优先级为：centerX > left|right | x、centerY > bottom|top > y;
同时存在多个属性时，低优先级属性将会无效，因此在皮肤文件的根节点设置时需注意；
微信小游戏上界面适配模式基本是适配宽度，因此对于全屏处理一般只要设置top和bottom为0即可。
注：代码设置这些互斥的属性时，以最后设置的属性为主，而不看重优先级。

## 安装gulp环境命令
npm install -g gulp
npm install

## protobuf
1、添加子模块Common-Protobuf，在项目终端中输入下面命令
git submodule add git@code.aliyun.com:ydhw_common/Common-Protobuf.git

2、执行gen-js.bat会根据pb.proto文件生成对应的js和ts文件，并且把protobuf-bundles.js拷贝到bin对应目录

protobuf命令行需安装：
npm install protobufjs@6.8.4 -g
npm install @egret/protobuf -g

## 多平台打包

1.oppo 打包环境
https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/quickgame.html
adb push .\ydhw.ssly2.nearme.gamecenter.signed.rpk sdcard/games


## 代码版本管理：	
- 主干master	核心玩法开发，纯净版，不涉及任何平台相关业务逻辑
- 各平台相关分支（名字必须明确是哪个平台）	各自平台业务功能，如在开发过程修改到游戏核心玩法相关内容，必须把这些代码合并回主干版本。
	发布平台时，先问清楚策划是否需要游戏最新版本内容，如需要，则把主干合并到分支


## 发布历史

### v1.0.1

- 基础框架构建

### v1.0.2

- 修改底层开启版本管理和CDN的bug
- 加载资源失败重试次数从1改成9999，间隔时间从0改成100毫秒
- laya默认缓存只会缓存图片和声音，现改成支持缓存所有文件




