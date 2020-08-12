//请将以下配置拷贝到index.js文件中
//下面这段配置拷贝放到index.js最前面
var YDHW_CONFIG = {
    appid: "ttf5d583686aefb9c8",
    version: '1.0.0',
    banner_ad_unit_id_list: ['2g1g411488623pl1b8'],//Banner广告
    interstitial_ad_unit_id_list: ['154khig9jd313i00ch'],//插屏广告
    spread_ad_unit_id_list: ['xxxxx'],//开屏广告
    native_ad_unit_id_list: ['xxxxx'],//原生广告
    video_ad_unit_id_list: ['85j3fdmql851g19c74'],//视频广告
    grid_ad_unit_id_list: ['xxxxx'],//格子广告
    tt_template_id_list: ["xxxxx"],//TT 分享素材模板ID列表
    interstitialAd_first_show_wait_time: 30,//插屏广告-首次进入游戏展示时间(进入游戏后x秒后才能展示)（秒）
    interstitialAd_show_time_interval: 30,//插屏广告-两次展示之间时间间隔（秒）
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
//这个引入需要根据自己放置的SDK位置修改
loadLib("./sdk/ydhw.tt.sdk.min.js"); 
