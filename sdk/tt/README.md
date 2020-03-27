# 头条发布说明，基于Laya2.2版本，后续版本变动时若需要，则替换laya.ttmini.js

## sdk目录说明

1、头条发布后的目录架构跟微信小游戏几乎一致，目前不一致的是头条的白名单说明字段是“ttNavigateToMiniProgramAppIdList”，比微信多了个“tt”，也就是说实际上发布成微信小游戏的包体只要修改下项目配置，即可供头条使用；

2、project.config.json需要修改自己游戏的appId；

3、ttplatform.js为平台实际操作工具类，实际操作可供修改；

4、发布后执行release.bat脚本会自动将sdk/tt目录下的文件（除了uncopy.txt说明部分）拷贝到发布后的工程，因此新增的平台相关文件置于此处即可，而非放在工程影响其他平台（单独开分支的随意）。