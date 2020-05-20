var exports = window;
exports.ylsdk_app_id = "30271212"; //游戏APPID
exports.ylsdk_version = "1.0.0";    //游戏版本号
exports.ylsdk_debug_model = true;   //是否debug模式 [true:打印日志,false:不打印日志]
exports.login_by_code = false;      //配置为true，则每次都会走平台登录
exports.ylsdk_platform = 2; 		//平台[ 0:微信,1:QQ,2:OPPO,3:VIVO,4:字节跳动,12:魅族 ]//暂未开放:5:百度,6:4399,7:趣头条,8:360,9:陌陌
exports.ylsdk_pkg_name="ylhy.fyqmx.nearme.gamecenter"; //游戏包名(OPPO、VIVO)
exports.side_min_num = 20;       //侧边栏列表item最小保留数(基于曝光策略)
exports.ylsdk_banner_ids = [	 //banner广告ID(微信、QQ、字节跳动、OPPO、VIVO、魅族)
    '182662'
]; 
exports.ylsdk_video_ids = [		//激励视频广告ID(微信、QQ、字节跳动、OPPO、VIVO、魅族)
    '182666'
];							  
exports.ylsdk_grid_ids = [		//格子广告ID(微信、QQ)
];
exports.ylsdk_interstitial_ids = [	//插屏广告ID(微信、VIVO、魅族、QQ)
    '182663'
];
exports.ylsdk_native_ids = [    //原生广告ID(OPPO)
    '182665'
];
exports.ylsdk_template_id = [	   //模板分享ID(字节跳动
];                   
/****************微信公众平台配置以下合法域名************************/
// 服务器地址：		   https://api.ylxyx.cn
// 图片服务器地址1：	   https://ql.ylxyx.cn
// 图片服务器地址2：      https://tx.ylxyx.cn
// 图片服务器地址3：	   https://ext.ylxyx.cn
// this.platType = 4001;
// this.appId = '30225241';
// this.pkgName = 'ydhw.thyq.nearme.gamecenter';
// this.version = "1.0.3";
// this.hasVideo = true;
// // 视频ID列表
// this.adUnitIds = [
//     '144369'
// ];
// this.banners = [
//     "144373"
// ];
/***************************************************************/