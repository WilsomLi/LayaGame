"undefined" != typeof qq && "qq" === qq.getSystemInfoSync().AppPlatform ? (console.log("qq"), require("qq-adapter.js"), require("libs/laya.wxmini.js"), require("qqplatform.js")) : console.error("项目发布平台为：QQ小游戏，与当前运行环境不符，请检查！"), window.loadLib = require;

//require("index.js");

//分包
if (typeof qq.loadSubpackage === 'function') {
  const loadTask = qq.loadSubpackage({
    name: 'nativescene', // name 可以填 name 或者 root
    success: function (res) {
      // 分包加载成功后通过 success 回调
      console.log('分包加载完成', res)
      require("index.js");
    },
    fail: function (res) {
      // 分包加载失败通过 fail 回调
      console.log('分包加载失败', res)
    }
  })

  loadTask.onProgressUpdate(res => {
    // console.log('下载进度', res.progress)
    // console.log('已经下载的数据长度', res.totalBytesWritten)
    // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
  })
}