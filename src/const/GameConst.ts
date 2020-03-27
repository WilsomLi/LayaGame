
/**
 * 微信特殊场景值  卖量
 */
var spScenes = [1011, 1017, 1047];
/**
 * 误触屏蔽场景值   误触
 */
var misScenes = [1005, 1006, 1007, 1008, 1011, 1012, 1013, 1017, 1027, 1042, 1047]; //群里进来 可能1044  1008  

/**
 * 游戏全局变量
 */
var GameConst = {
    CDN: "https://ext.ylxyx.cn/youdianhaowan/",
    NetLog: false,
    Env: "online",                  // "dev"
    // 后台相关字段
    BonusSwitch: false,
    ShareSwitch: false,
    SideSwitch: false,              // 默认true，因为登陆问题会导致开关未出来
    SceneSwitch: false,             // 场景值开关
    MisTouchSwitch: false,          // 误触总开关
    GDMisTouchSwitch: false,        // 地区屏蔽开关
    ScoreSwitch: false,             // 积分策略开关
    Openid: "",                     // 第三方平台账号
    SessionId: "",
    ExtraData: "",
    Channel: "",
    Scene: 0,
    NetType: "",                    // 网络状态

    banner_switch:[1,1.3], //前一个banner出现时间 后一个按钮上移时间,按钮弹起时间控制
    banner_rf_time:[10,15], //banner最小刷新间隔，对局内banner刷新时间
    gamebanner:false,

    /**
     * 是否特殊场景，屏蔽误触和互推
     */
    isSpecialScene: function (): boolean {
        return spScenes.indexOf(this.Scene) > -1;
    },
    /**
     * 是否屏蔽误触场景值
     */
    isMisScene: function (): boolean {
        return misScenes.indexOf(this.Scene) > -1;
    },
    /**
     * 总开关
     */
    canShare: function () {
        return GameConst.ShareSwitch;
    },
    /**
     * 是否开启广东误触
     */
    openGDMistouch: function (): boolean {
        return GameConst.GDMisTouchSwitch;
    },
    /**
     * 误触场景屏蔽开关
     */
    openMisScene: function (): boolean {
        return GameConst.SceneSwitch && GameConst.isMisScene();
    },
    /**
     * 是否开启了误触
     */
    openMisTouch: function () {
        return GameConst.MisTouchSwitch && !GameConst.openMisScene() && !GameConst.openGDMistouch();
    },
    /**
     * 是否开启了卖量
     */
    openSide: function () {
        return GameConst.SideSwitch && (!GameConst.SceneSwitch || !GameConst.isSpecialScene()) && !platform.isOppo && !platform.isVivo;    // vivo无卖量
    }
}

export default GameConst;