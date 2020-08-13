"undefined" != typeof swan && "undefined" != typeof swanGlobal ? (require("swan-game-adapter.js"), require("libs/laya.bdmini.js")) : "undefined" != typeof wx && (require("weapp-adapter.js"), require("libs/laya.wxmini.js")),
    window.loadLib = require;

var YDHW_CONFIG = {
    appid: "wx3081deb3d8205f2b",
    version: '1.0.5',
    banner_ad_unit_id_list: ['adunit-56102e0a2976b693', 'adunit-9ca7a5d0e702359c'],//Banner广告
    interstitial_ad_unit_id_list: ['xxxxx'],//插屏广告
    spread_ad_unit_id_list: ['xxxxx'],//开屏广告
    native_ad_unit_id_list: ['xxxxx'],//原生广告
    video_ad_unit_id_list: ['adunit-4d5f167e5d1cc14d', 'adunit-f6a240e0c5ce9735'],//视频广告  
    grid_ad_unit_id_list: ['xxxxx'],//格子广告
    tt_template_id_list: ["xxxxx"],//TT 分享素材模板ID列表
    interstitialAd_first_show_wait_time: 10,//插屏广告-首次进入游戏展示时间(进入游戏后x秒后才能展示)（秒）
    interstitialAd_show_time_interval: 10,//插屏广告-两次展示之间时间间隔（秒）
    side_box_count: 20,//侧边栏列表item最小保留数(基于曝光策略)
    pkg_name: "",  //包名OPPO、VOVP、魅族平台需要

    //--------------以下配置CP无需理会------------
    project: '',
    platform: 'web',
    env: 'dev',//online or dev
    debug: true,
    inspector: false,
    engine: 'laya',
    res_version: '20200310',
    appkey: "30248858",
    resource_url: 'http://127.0.0.1:3100',
    scene_white_list: [1005, 1006, 1037, 1035],
};

window.YDHW_CONFIG = YDHW_CONFIG;


// require("./utils/ald-game.js");
require("ydhw.wx.sdk.min.js"); 
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