@echo off
setlocal enabledelayedexpansion
set file=configs.json
set /a count=0
echo 正在清理%file%文件
REM 删除%file%文件
if exist %cd%\%file% (
	del /q %file%
)
for /F %%d in ('dir /b *.json') do (
	if !count! gtr 0 (
		REM echo 添加逗号%%d!count!
		echo ,>>%file%
	) else (
		echo {>>%file%
	)
	set /a count+=1
	REM "文件名:"写入
	echo "%%~nd":>>%file%
	type %%d>>%file%
)
REM 添加换行
echo.>>%file%
echo }>>%file%
echo 合并结束
move %file% ../bin/nativescene/
pause
exit