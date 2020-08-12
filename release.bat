REM 声明采用UTF-8编码
chcp 65001
@echo off

set releaseDir=%cd%\release\
set sdkDir=%cd%\sdk

:star
cls
echo 发布平台:
echo    1.微信(wx)
echo    2.QQ(qq)
echo    3.Oppo(op)
echo    4.Vivo(vv)
echo    5.头条(tt)
echo    6.百度(bd)
echo    7.小米(xm)
echo    8.4399(ss)
echo 0.退出

set /p a=请选择:
if %a%==1 goto wx
if %a%==2 goto qq
if %a%==3 goto op
if %a%==4 goto vv
if %a%==5 goto tt
if %a%==6 goto bd
if %a%==7 goto xm
if %a%==8 goto ss
if %a%==0 goto end

REM 通用操作--------------------------------------------------------------------------------
:common
echo 空字符检查
cmd /c gulp checkNullChar

echo 拷贝common文件夹
xcopy %sdkDir%\common\* %dir%\* /e /y

echo 删除bundle.js.map
del /f /s /q /a %dir%\js\bundle.js.map

if %1==vv goto vv_step2

echo 版本发布完成
goto end

REM 微信--------------------------------------------------------------------------------
:wx
echo 复制SDK文件
set dir=%cd%\release\wxgame
xcopy %sdkDir%\wx\* %dir%\* /e /y /exclude:%sdkDir%\wx\uncopy.txt
echo 游戏代码混淆
REM cmd /c gulp obfuse_js --pf wxgame

REM REM CDN操作 把资源拷贝到外面一级目录，并压缩zip
REM set AppID=wxd2eb55f1d8e239c6
REM set cdnDir=%releaseDir%\%AppID%\
REM if exist %cdnDir% (
REM rd /s /q %cdnDir%
REM )
REM xcopy %dir%\game\* %cdnDir%\game\* /e /y
REM rd /s /q %dir%\game
REM xcopy %dir%\res\* %cdnDir%\res\* /e /y
REM rd /s /q %dir%\res
REM xcopy %dir%\scene\* %cdnDir%\scene\* /e /y
REM rd /s /q %dir%\scene
REM cd release
REM WinRAR a -r "%AppID%.zip" -rr -m5 %AppID% -ibck
REM cd ..

goto common

REM QQ--------------------------------------------------------------------------------
:qq
set dir=%cd%\release\qq_mini
xcopy %sdkDir%\qq\* %dir%\* /e /y
REM del /f /s /q /a %dir%\qq_platform-ad52b13e8b.js
REM del /f /s /q /a %dir%\qq-adapter-1e13299df0.js
echo 游戏代码混淆
cmd /c gulp obfuse_js --pf qqmini
goto common

REM OPPO--------------------------------------------------------------------------------
:op
echo 已集成到publish_oppogame.js
@pause
REM set dir=%cd%\release\oppogame\quickgame
REM xcopy %sdkDir%\common\* %dir%\* /e /y
REM xcopy %sdkDir%\op\* %dir%\* /e /y
REM echo 游戏代码混淆
REM cmd /c gulp obfuse_js --pf oppo

REM REM echo 删除native/cfg目录
REM REM if exist %dir%\native\cfg (
REM REM rd /s /q %dir%\native\cfg
REM REM )

REM echo 打包 release 签名的 rpk
REM cd %dir%
REM quickgame pack release & adb push .\dist\ydhw.ssly2.nearme.gamecenter.signed.rpk sdcard/games & @pause

REM Vivo--------------------------------------------------------------------------------
:vv
echo 已集成到publish_vivogame.js
@pause
REM set proDir=%cd%\release\vivogame\quickgame
REM set dir=%proDir%\src

REM echo 游戏代码混淆
REM cmd /c gulp vivo
REM del /f /s /q /a %dir%\merge.tfp

REM echo 删除native/cfg目录
REM if exist %dir%\native\cfg (
REM rd /s /q %dir%\native\cfg
REM )

REM call :common vv

REM :vv_step2
REM echo 打包 release 签名的 rpk
REM cd %proDir%
REM npm run release & @pause

REM adb push .\dist\com.szydhw.ssly.vivominigame.signed.rpk sdcard/games &

REM 头条--------------------------------------------------------------------------------
:tt

echo 复制SDK文件
set dir=%cd%\release\ttgame
set tempDir=%cd%\release\wxgame

if exist %dir% (
    echo %dir% 已存在
) else (
    echo 创建 %dir% 
    md %dir%
)

del /f /s /q /a %dir%\*

xcopy %tempDir%\* %dir%\* /e /y
xcopy %sdkDir%\tt\* %dir%\* /e /y /exclude:%sdkDir%\tt\uncopy.txt


if exist %dir%\libs\laya.wxmini.js (
rd /s /q %dir%\libs\laya.wxmini.js
)

echo 游戏代码混淆
cmd /c gulp obfuse_js --pf ttgame
goto common
echo 头条版本完成

REM 百度--------------------------------------------------------------------------------
:bd


REM 小米--------------------------------------------------------------------------------
:xm

REM 4399--------------------------------------------------------------------------------
:ss

REM end--------------------------------------------------------------------------------
:end
@pause