"undefined" != typeof swan && "undefined" != typeof swanGlobal ? (require("swan-game-adapter.js"), require("libs/laya.bdmini.js")) : "undefined" != typeof wx && (require("weapp-adapter.js"), require("libs/laya.wxmini.js")),
    window.loadLib = require;

require("./sdk/config.js");
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

// // 分包
// if(typeof wx.loadSubpackage === 'function') {
//     const loadTask = wx.loadSubpackage({
//         name: 'scene', // name 可以填 name 或者 root
//         success: function(res) {
//           // 分包加载成功后通过 success 回调
//           console.log('分包加载完成', res)
//           require("index.js");
//         },
//         fail: function(res) {
//           // 分包加载失败通过 fail 回调
//           console.log('分包加载失败', res)
//         }
//       })

//       loadTask.onProgressUpdate(res => {
//         // console.log('下载进度', res.progress)
//         // console.log('已经下载的数据长度', res.totalBytesWritten)
//         // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
//       })
// }