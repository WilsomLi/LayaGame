window.navigator.userAgent = 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 OPPO MiniGame NetType/WIFI Language/zh_CN';

require("laya.quickgamemini.js");
// require("opplatform.js");
require("utils/yl_sdk_conf.js");
require("utils/yl_sdk.js");
require("index.js");


// var subTask = qg.loadSubpackage({
//     // manifest.json中配置的子包包名
//     name:"scene",
//     // 子包加载成功回调
//     success:function(){
//         console.log("scene 子包加载成功");
//         require("index.js");
//     }
// })
// subTask.onProgressUpdate(function(res){
//     // 加载进度百分比
//     var progress = res["progress"];
//     // 下载数据
//     var totalBytesWritten = res["totalBytesWritten"];
//     // 总长度
//     var totalBytesExpectedToWrite = res["totalBytesExpectedToWrite"];
// })