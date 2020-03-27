/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_landscape";

// require("./libs/cannon.js")
//-----libs-begin-----
require("./libs/laya.core.js")
require("./libs/laya.webgl.js")
require("./libs/laya.particle.js")
require("./libs/laya.ui.js")
require("./libs/laya.d3.js")

//-----libs-end-------
//require("xmplatform");
require("./js/UIBaseView.js");
require("./js/bundle.js");
require("./js/bignumber.js");
