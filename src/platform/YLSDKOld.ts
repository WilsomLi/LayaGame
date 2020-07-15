import EventMgr from "../mgr/EventMgr";
import GameConst from "../const/GameConst";
import UIMgr from "../mgr/UIMgr";
import EventType from "../const/EventType";
// 解释型声明
declare var wx: any;
declare var qq: any;
declare var qg: any;
declare var tt: any;

/**
 * 是否微信环境
 */
var support = false;
var pf: any;
if (typeof wx !== 'undefined') {
    pf = wx;
    support = true;
}
else if (typeof qq !== 'undefined') {
    pf = qq;
    support = true;
}
else if (typeof qg !== 'undefined') {
    pf = qg;
    support = true;
}
else if (typeof tt !== 'undefined') {
    pf = tt;
    support = true;
}

/**
 * YLSDK
 */
export default class YLSDKOld {
    static shortcuttime: number = 0;
    static InsertBannerShowTime = 0;//计入第一次展示的时间
    static InsertBanerLastShowTime = 0;//记录上一次展示时间
    static isNativeAdShow = false;
    static onhideStateVideo = false;
    static showFailTips = false;
    static onhideStateNative;
    private static canShowInsertBanner = false;
    private static nativeData:any[] = [];
    private static interstitialAd;

    constructor() { }
    static getnativeData() {
        return YLSDK.nativeData;
    }
    //初始化SDK
    static ylInitSDK(_callback: Function) {
        if (support) {
            pf.ylInitSDK(_callback);
        }
    }

    //设置当前场景
    static ylSetCurScene(_sceneName: string) {
        if (support) {
            pf.ylSetCurScene(_sceneName);
        }
    }

    //获取开关及用户账号信息(SDK服务器的)
    static ylGetUserInfo(): any {
        if (support) {
            return pf.ylGetUserInfo();
        }
        return null;
    }

    //获取游戏APPID
    static ylGetAppID(): string {
        if (support) {
            return pf.ylGetAppID();
        }
        return null;
    }

    //显示微信获取用户信息的按钮
    static ylUserInfoButtonShow(_btnInfo: any): void {
        pf.ylUserInfoButtonShow(_btnInfo);
    }
    //隐藏微信获取用户信息的按钮
    static ylUserInfoButtonHide(): void {
        pf.ylUserInfoButtonHide();
    }

    //获取用户微信账号信息
    static ylGetUserpfInfo(): any {
        if (support) {
            return pf.ylGetUserpfInfo();
        }
        return null;
    }

    //获取开关信息
    static ylGetSwitchInfo(): any {
        if (support) {
            return pf.ylGetSwitchInfo();
        }
        return null;
    }

    //小游戏跳转
    static ylNavigateToMiniProgram(_jumpInfo: any, _callback: Function) {
        if (support) {
            if (typeof qg !== 'undefined') {
                pf.ylNavigateToMiniGame(_jumpInfo, _callback);
            }
            else {
                pf.ylNavigateToMiniProgram(_jumpInfo, _callback);
            }

        } else {
            _callback(true);
        }
    }

    public static ylSideBox(_callback) {
        if (support && GameConst.SideSwitch) {
            pf.ylSideBox(function (data) {
                if (data && data.length > 0) {
                    //初始化测边栏列表数据 
                    console.log(data, "侧边栏数据");
                    _callback(data);
                }
            }.bind(this));

        }
    }

    //获取积分墙列表
    static ylIntegralWall(_callback: Function) {
        if (support) {
            pf.ylIntegralWall(_callback);
        }
    }
    //领取积分墙奖励
    static ylGetBoardAward(_id: string, _callback: Function) {
        if (support) {
            pf.ylGetBoardAward(_id, _callback);
        }
    }

    //获取分享图列表
    static ylShareCard(_callback: Function,_sceneName:string) {
        if (support) {
            pf.ylShareCard(_callback,_sceneName);
        }
    }

    //调用微信分享
    static ylShareAppMessage(_callback: Function,shareInfo:any) {
        if (support) {
            pf.ylShareAppMessage(_callback,shareInfo);
        }
    }

    //分享统计
    static ylStatisticShareCard(_callback: Function) {
        if (support) {
            pf.ylStatisticShareCard(_callback);
        }
    }

    //事件统计
    static ylEventCount(_eventName: string,_sceneName:string) {
        if (support) {
            pf.ylEventCount(_eventName,_sceneName);
        }
    }

    //获取自定义配置列表
    static ylGetCustom(_callback: Function) {
        if (support) {
            pf.ylGetCustom(_callback);
        }
    }

    /**
     * 点击按钮 视频分享策略
     * @param channel 渠道名 eg. wx qq tt qg
     * @param module 模块名
     * @param callback [0:无策略,1:分享,2:视频]
     */
    static ylShowShareOrVideo(channel: string, module: string, callback: (type: number) => void) {
        if (support) {
            pf.ylShowShareOrVideo(channel, module, callback);
        }
    }

    /**
     * 
     * @param _show 是否展示
     * @param isTouch  是否为误触
     */
    //创建banner广告(填充屏幕宽度)
    static ylBannerAdCreate(_show: boolean = false, success_?, faill_?, isTouch: boolean = false) {
        if (support) {
            pf.ylBannerAdCreate(_show, function (success) {
                if (success) {
                    //
                    console.log("创建成功");
                    success_ && success_();

                }
                else {
                    console.log("创建失败");
                    faill_ && faill_();
                }
            }, isTouch);
            // pf.ylBannerAdShow();
            console.log("创建 新的 banner", isTouch);
        }
    }
    //创建banner广告(小的)
    static ylBannerAdCreateSmall(_show: boolean = false) {
        if (support) {
            pf.ylBannerAdCreateSmall(_show);
        }
    }
    //显示banner广告
    static ylBannerAdShow() {
        if (support) {
            pf.ylBannerAdShow();
        }
    }
    //隐藏banner广告
    static ylBannerAdHide() {
        if (support) {
            pf.ylBannerAdHide();
        }
    }
    static ylRemoveBannerAd() {
        if(support) {
            pf.removeBannerAd();
        }
    }
    //创建视频广告
    static ylCreateVideoAd() {
        if (support) {
            pf.ylCreateVideoAd();
        }
    }
    static ylNativeAdCreate(index:number,_callback:(data:IOppoNativeAdData)=>void) {
        if (support) {
            pf.ylNativeAdCreate(index,function (list) {
                console.log("ylNativeAdCreate--data:", JSON.stringify(list));
                if (list) {
                    YLSDK.isNativeAdShow = true;
                    YLSDK.nativeData[index] = list;//保存数据，用于展示和点击上报
                    var data:IOppoNativeAdData = list[0];
                    pf.ylNativeAdShow(data.adId);
                    _callback && _callback(data);
                }
                else {
                    //广告异常处理
                    YLSDK.isNativeAdShow = false;
                }
            }.bind(this));
        }
    }
    //原生广告点击
    static ylNativeAdClick(index:number) {
        if (support) {
            let list = YLSDK.nativeData[index];
            if(list) {
                pf.ylNativeAdClick(list[0].adId);
            }
        }
    }

    /**
     * 播放视频广告
     * @param _callback isOk:boolean
     * @param unlockCustomNum 
     */
    static ylShowVideoAd(_callback: (isOk: boolean) => void, unlockCustomNum?) {
        if (support) {
            YLSDK.showFailTips = false;
            console.log("////showVideo:");
            YLSDK.onhideStateVideo = true;
            pf.ylShowVideoAd((status) => {
                console.log("----showVideo:" + status);
                switch (status) {
                    case 0:
                        if (YLSDK.showFailTips === false) {
                            _callback && _callback(false);
                            YLSDK.onhideStateVideo = false;
                            UIMgr.showTips("广告拉取繁忙，稍后再试!");
                            YLSDK.showFailTips = true;
                        }
                        break;
                    case 1:
                        _callback && _callback(true);
                        YLSDK.onhideStateVideo = false;
                        break;
                    case 2:
                        _callback && _callback(false);
                        UIMgr.showTips("视频未看完，无法获取奖励！");
                        YLSDK.onhideStateVideo = false;
                        break;
                }
            }, unlockCustomNum);
        } else {
            _callback && _callback(true);
        }
    }

    //创建格子广告
    static ylCreateGridAd(_adInfo: any) {
        if (support) {
            pf.ylCreateGridAd(_adInfo);
        }
    }
    //显示格子广告
    static ylShowGridAd() {
        if (support) {
            pf.ylShowGridAd();
        }
    }
    //隐藏格子广告
    static ylHideGridAd() {
        if (support) {
            pf.ylHideGridAd();
        }
    }

    static ylDestoryInserstitialAd() {
        if (support) {
            YLSDK.interstitialAd && YLSDK.interstitialAd.destory();
        }
    }
    //插屏广告
    static ylCreateInserstitialAd(_show: boolean = true) {

        if (YLSDK.canShowInsertBanner === false) {
            let curtimeInterval = Date.now() - YLSDK.InsertBannerShowTime;
            if (curtimeInterval > 1000 * GameConst.FirstShowInsertBannerShowTime) {//第一次展示时间间隔
                YLSDK.canShowInsertBanner = true;
            }
            console.log("插屏  时间判断", curtimeInterval);
        }
        if (this.InsertBanerLastShowTime !== 0) {
            let curtimeLasttime = Date.now() - YLSDK.InsertBanerLastShowTime;
            if (curtimeLasttime < (GameConst.InsertbannerInterval * 1000)) {
                console.log("插屏展示时间加个太短  ");
                return;
            }
        }
        if (support && YLSDK.canShowInsertBanner && GameConst.SwitchInsertBanner) {//开关控制   时间  10秒 平台 判断
            Laya.timer.once(GameConst.InsertBannerDelayTime, this, () => {
                //  pf.ylCreateInterstitialAd(_show);
                /**
                 * ylsdk  单独插屏
                 */
                YLSDK.interstitialAd = pf.createInterstitialAd({
                    adUnitId: '182663'
                })
                YLSDK.interstitialAd.load().then(() => {
                    YLSDK.interstitialAd.show();
                    /**
                     * oppo  插屏和banner 不能同时展示
                     */
                    pf.ylBannerAdHide();
                    this.InsertBanerLastShowTime = Date.now();
                });
                YLSDK.interstitialAd.onLoad(function () {
                    console.log('插屏广告加载')
                })
                YLSDK.interstitialAd.onClose(function () {
                    console.log('插屏广告关闭');
                    if (YLSDK.isNativeAdShow) { }
                    else {//没有原生广告时候出现banner
                        pf.ylBannerAdShow();
                    }
                    // YLSDK.interstitialAd.offLoad();
                    // YLSDK.interstitialAd.offClose((res) => {
                    //     console.log("移除插屏  关闭监听");
                    // });
                    YLSDK.interstitialAd && YLSDK.interstitialAd.destroy();
                })
                YLSDK.interstitialAd.onError(function (err) {
                    console.log(err);
                })
            })
        }
    }
    static ylShowInterstitialAd() {
        if (support) {
            pf.ylShowInterstitialAd();
        }
    }

    /**获取平台  Name */
    static getSystemInfoSync() {
        if (support) {
            console.log(pf.getSystemInfoSync().appName, "平台名字");
            return pf.getSystemInfoSync();
        }
        return null;
    }
    //日志输出
    static ylLog(_eventName: string) {
        if (support) {
            pf.ylLog(_eventName);
        }
    }


    //以上为sdk接口/////////////////////////////////////////////////////////////

    /**
     * 自定义开关列表的值
     */
    private static defValues: { [key: string]: string } = {};

    /**
     * 是否已登陆
     */
    public static loginSuc: boolean = false;

    /**
     * 初始化自定义开关
     */
    public static initCustomSwitch(_callback?: Function): void {
        YLSDK.ylGetCustom((_dataArr: any) => {
            var data = YLSDK.defValues;
            if (_dataArr) {
                for (let i = 0, len = _dataArr.length; i < len; i++) {
                    let item = _dataArr[i];
                    if (item) {
                        if (item.type == 2) {
                            //受误触总开关控制
                            if(parseInt(item.switchTouchUse) == 1 && !GameConst.MisTouchSwitch) {
                                data[item.name] = "false";
                            }
                            else {
                                data[item.name] = (item.value == 1) ? "true" : "false";
                            }
                        } else {
                            data[item.name] = item.value;
                        }
                    }
                }
                _callback && _callback();
            }
        });
    }
    /**
     * 获取自定义开关数据
     * @param name 
     */
    public static getDefValue(_name: string): any {
        return YLSDK.defValues[_name];
    };
    /**
     * 分享兼容
     */
    public static showShare(_callback?: (_isSuc?: boolean) => void, _shareData?: any): void {
        var shareInfo = {
            // channel:_channel,
            // module:_module,
            scene: 'normal',
            inviteType: ''
        };
        if (_shareData) {
            if (_shareData.scene) {
                shareInfo.scene = _shareData.scene;
            }
            if (_shareData.from) {
                shareInfo.inviteType = _shareData.from;
            }
        }
        // YLSDK.ylShareAppMessage((status)=>{
        //     _callback && _callback(status);
        // }, shareInfo);
        YLSDK.ylShareAppMessage((status) => {
            _callback && _callback(status);
        },shareInfo);
    }

    /**
     * oppo 添加 游戏窗口
     */
    static Shortcut() {
        if (support) {
            if(!pf.hasShortcutInstalled) return;
            pf.hasShortcutInstalled({
                success: function (res) {
                    let foolState = false;
                    let timedelay: number = 0;
                    if (YLSDK.shortcuttime === 0) {
                        YLSDK.shortcuttime = Date.now();
                        foolState = true;
                    } else {
                        timedelay = Date.now() - YLSDK.shortcuttime;
                        if (timedelay > 60 * 1000) {
                            YLSDK.shortcuttime = Date.now();
                            foolState = true;
                        }
                    }
                    // 判断图标未存在时，创建图标
                    if (res == false && foolState) {
                        pf.installShortcut({
                            success: function () {
                                // 执行用户创建图标奖励
                                Laya.timer.once(500,this,()=>{
                                    EventMgr.event(EventType.AddDesktopSuccess);
                                });
                            },
                            fail: function (err) { },
                            complete: function () { }
                        })
                    }
                    else {
                        console.log("用户有添加 游戏");
                    }
                },
                fail: function (err) {
                    console.log(err);
                },
                complete: function () { }
            })
        }
    }

}