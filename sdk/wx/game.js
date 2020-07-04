"undefined" != typeof swan && "undefined" != typeof swanGlobal ? (require("swan-game-adapter.js"), require("libs/laya.bdmini.js")) : "undefined" != typeof wx && (require("weapp-adapter.js"), require("libs/laya.wxmini.js")),
    window.loadLib = require;

/**
 * 为了快速绘制底图
 */
GameGlobal.startTime = Date.now();
console.log("wx第一帧", Date.now() - startTime);
var systemInfo = wx.getSystemInfoSync();
let tW = 750,tH = 1334;
let tx = 0,ty = 0;
tW = systemInfo.screenWidth;
tH = 1650 * systemInfo.screenWidth / 750;
ty = (systemInfo.screenHeight - tH) / 2;

GameGlobal.userButton = wx.createUserInfoButton({
    type: "image",
    image: "loading/loading_bg.jpg",
    style: {
        left: tx,
        top: ty,
        width: tW,
        height: tH,
        lineHeight: 40,
        textAlign: "center",
        withCredentials: false
    }
});
/*********************************************** */
//使用引擎库
// requirePlugin("layaPlugin/laya.core.js");
// requirePlugin("layaPlugin/laya.d3.js");
// requirePlugin("layaPlugin/laya.particle.js");
// requirePlugin("layaPlugin/laya.ui.js");

/*********************************************** */

// require("./utils/ald-game.js");
require('./utils/yl_sdk.js');
require("wxplatform.js");
require("index.js");

// 启动时更新
if (typeof wx.getUpdateManager === 'function') {
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
        wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
                if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate()
                }
            }
        })
    })

    updateManager.onUpdateFailed(function () {
        // 新版本下载失败
    })
}

// 内存优化
if (typeof wx.onMemoryWarning === 'function') {
    wx.onMemoryWarning(function (res) {
        console.log('onMemoryWarning', res);
        if (wx.triggerGC) {
            wx.triggerGC();
        }
    })
}