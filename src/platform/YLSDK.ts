
// 解释型声明
declare var wx: any;
declare var qq: any;
declare var qg: any;
declare var tt: any;

/**
 * 是否微信环境
 */
var support = false;
var pf:any;
if(typeof wx !== 'undefined') {
    pf = wx;
    support = true;
}
else if(typeof qq !== 'undefined') {
    pf = qq;
    support = true;
} 
else if(typeof qg !== 'undefined') {
    pf = qg;
    support = true;
}
else if(typeof tt !== 'undefined') {
    pf = tt;
    support = true;
}

/**
 * YLSDK
 */
export default class YLSDK {

    constructor() {}

    //初始化SDK
    static ylInitSDK(_callback:Function) {
        if (support) {
            pf.ylInitSDK(_callback);
        }
    }

    //设置当前场景
    static ylSetCurScene(_sceneName:string) {
        if (support) {
            pf.ylSetCurScene(_sceneName);
        }
    }
    
    //获取开关及用户账号信息(SDK服务器的)
    static ylGetUserInfo():any {
        if (support) {
            return pf.ylGetUserInfo();
        }
        return null;
    }
    
    //获取游戏APPID
    static ylGetAppID():string {
        if (support) {
            return pf.ylGetAppID();
        }
        return null;
    }
    
    //显示微信获取用户信息的按钮
    static ylUserInfoButtonShow(_btnInfo:any):void {
        pf.ylUserInfoButtonShow(_btnInfo);
    }
    //隐藏微信获取用户信息的按钮
    static ylUserInfoButtonHide():void {
        pf.ylUserInfoButtonHide();
    }

    //获取用户微信账号信息
    static ylGetUserpfInfo():any {
        if (support) {
            return pf.ylGetUserpfInfo();
        }
        return null;
    }

    //获取开关信息
    static ylGetSwitchInfo():any {
        if (support) {
            return pf.ylGetSwitchInfo();
        }
        return null;
    }
    
    //小游戏跳转
    static ylNavigateToMiniProgram(_jumpInfo:any, _callback:Function) {
        if (support) {
            pf.ylNavigateToMiniProgram(_jumpInfo, _callback);
        } else {
            _callback(true);
        }
    }

    //获取侧边栏列表
    static ylSideBox(_callback:Function) {
        if (support) {
            pf.ylSideBox(_callback);
        }
    }
    
    //获取积分墙列表
    static ylIntegralWall(_callback:Function) {
        if (support) {
            pf.ylIntegralWall(_callback);
        }
    }
    //领取积分墙奖励
    static ylGetBoardAward(_id:string, _callback:Function) {
        if (support) {
            pf.ylGetBoardAward(_id, _callback);
        }
    }
    
    //获取分享图列表
    static ylShareCard(_callback:Function) {
        if (support) {
            pf.ylShareCard(_callback);
        }
    }
    
    //调用微信分享
    static ylShareAppMessage(_callback:Function) {
        if (support) {
            pf.ylShareAppMessage(_callback);
        }
    }
    
    //分享统计
    static ylStatisticShareCard(_callback:Function) {
        if (support) {
            pf.ylStatisticShareCard(_callback);
        }
    }

    //事件统计
    static ylEventCount(_eventName:string) {
        if (support) {
            pf.ylEventCount(_eventName);
        }
    }

    //获取自定义配置列表
    static ylGetCustom(_callback:Function) {
        if (support) {
            pf.ylGetCustom(_callback);
        }
    }

    //创建banner广告(填充屏幕宽度)
    static ylBannerAdCreate(_show:boolean=false) {
        if (support) {
            pf.ylBannerAdCreate(_show);
        }
    }
    //创建banner广告(小的)
    static ylBannerAdCreateSmall() {
        if (support) {
            pf.ylBannerAdCreateSmall();
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

    //创建视频广告
    static ylCreateVideoAd() {
        if (support) {
            pf.ylCreateVideoAd();
        }
    }
    //播放视频广告
    static ylShowVideoAd() {
        if (support) {
            pf.ylShowVideoAd();
        }
    }
    
    //创建格子广告
    static ylCreateGridAd(_adInfo:any) {
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

    //插屏广告
    static ylCreateInterstitialAd(_show:boolean=true) {
        if (support) {
            pf.ylCreateInterstitialAd(_show);
        }
    }
    static ylShowInterstitialAd() {
        if (support) {
            pf.ylShowInterstitialAd();
        }
    }

    //日志输出
    static ylLog(_eventName:string) {
        if (support) {
            pf.ylLog(_eventName);
        }
    }
}