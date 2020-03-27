if ((typeof swan !== 'undefined') && (typeof swanGlobal !== 'undefined')) {
	require("swan-game-adapter.js");
	require("libs/laya.bdmini.js");
} else if (typeof wx!=="undefined") {
	require("weapp-adapter.js");
	require("libs/laya.wxmini.js");
}
window.loadLib = require;
require("bdplatfrom.js");
require("index.js");
if(typeof swan.loadSubpackage === 'function') {
    const loadTask = swan.loadSubpackage({
        name: 'nativescene', // name 可以填 name 或者 root
        success: function(res) {
          // 分包加载成功后通过 success 回调
          console.log('分包加载完成', res)
          require("index.js");
        },
        fail: function(res) {
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