/**
 * 数值兼容新后台
 */
const platformType = {
    None: 1001,
    Wechat: 2001,
    QQ: 3001,
    Oppo: 4001,
    Vivo: 5001,
    Toutiao: 6001,
    Xiaomi: 7001
};



/**
 * 获取对象所有可用的属性，兼容ES6class写法
 * @param obj 
 */
const getKeys = function (obj: any): string[] {
    var keys = [];
    if (obj && obj !== Object.prototype) {
        keys = keys.concat(Object.getOwnPropertyNames(obj));
        keys = keys.concat(getKeys(obj.__proto__));
    }
    return keys;
}

/**
 * Web平台类，也是平台接口模板类，该类的作用是可以兼容在浏览器运行（即合并所有sdk的接口及默认数据），
 * 并提供给其它sdk未支持的方法（你可以理解为所有的sdk都继承自WebPlatform）
 * 微信下为sdk/wx/wxplatform.js
 * Oppo下为sdk/qg/qgplatform.js
 */
export default class WebPlatform implements Platform {

    private static $init: boolean;

	/**
	 * 初始化
	 */
    public static init(): void {
        if (!WebPlatform.$init) {
            WebPlatform.$init = true;
            // 属性复制
            let webp = new WebPlatform;
            let curp = window.platform;
            if (curp) {
                let keys = getKeys(webp);
                for (let i in keys) {
                    let key = keys[i];
                    let data = curp[key];
                    if (data === void 0) {
                        curp[key] = webp[key];
                    }
                }
            }
            else
                curp = window.platform = webp;
            // 定义平台判断属性
            let curT = curp.platType;
            for (let i in platformType) {
                curp['is' + i] = curT === platformType[i];
            }
        }
    }
	/**
	 * 平台类型，想在浏览器调试对应平台界面，请修改该值，值类型请查看GameCost#PlatformType
	 */
    readonly platType: number = 1001;
	/**
	 * 平台游戏ID
	 */
    readonly appId: string = 'wx638732461656d042';
	/**
	 * 版本号
	 */
    readonly version: string = '1.0.1';
    /**
     * 是否有视频
     */
    readonly hasVideo: boolean = true;
	/**
	 * 底部bannerID
	 */
    readonly banners: string[];
    /**
     * banner的Y值
     */
    readonly bannerY: number = 1112;

    //// 以下是否平台的属性仅一个为true，属性命名参照platformType，加上前缀is ////

    /**
     * 是否是web调试端
     */
    readonly isNone: boolean;
    /**
     * 是否是微信平台
     */
    readonly isWechat: boolean;
    /**
     * 是否是手Q平台
     */
    readonly isQQ: boolean;
    /**
     * 是否是oppo平台
     */
    readonly isOppo: boolean;
    /**
     * 是否是vivo平台
     */
    readonly isVivo: boolean;
    /**
     * 是否是头条平台
     */
    readonly isToutiao: boolean;
    /**
     * 是否是小米平台
     */
    readonly isXiaomi: boolean;

    /**
     * 分享配置列表
     */
    shareConfigs: IShareCardDetail[];

	/**
	 * 登录
	 * @param cb 
	 */
    login(cb: Function): void {
        //本地缓存随机账号，避免多人调试同用一个账号
        let wxcode = Laya.LocalStorage.getItem("wxcode");
        if (wxcode == null) {
            wxcode = Math.ceil(Math.random() * 100000).toString();
            Laya.LocalStorage.setItem("wxcode", wxcode);
        }
        cb && cb({ code: 0, wxcode: wxcode });
    }

	/**
	 * 获取启动参数
	 */
    launchInfo(): any {
        return {};
    }

	/**
	 * 获取系统信息
	 */
    getSystemInfoSync(): any {
        return { brand: "PC", model: "web", benchmarkLevel: 100, system: "web" };
    }

	/**
	 * 切到前台
	 * @param _callback 
	 */
    onShow(_callback: Function): void { }

	/**
	 * 切到后台台
	 * @param _callback 
	 */
    onHide(_callback: Function): void { }

	/**
     * 创建建议按钮
     * @param _btnVect 
     * @param hide 是否隐藏
     */
    createFeedbackButton(_btnVect: IRect, hide?: boolean): void { };

	/**
	 * 显示建议按钮
	 * @param visible 
	 */

    showFeedbackButton(visible: boolean): void { }

	/**
     * 退出游戏
     */
    exitMiniProgram(): void { }

	/**
	 * 分享
	 * @param _data 
	 */
    onShare(_data: any): void {
        _data.success(true)
    }

	/**
	 * 小程序跳转
	 * @param _data 
	 */
    navigateToMiniProgram(_data: any): void {
        if (_data) {
            let suc = _data.success;
            if (suc instanceof Function)
                suc();
        }
    }

	/**
	 * 创建底部banner
	 */
    createBannerAd(_adUnitId: string, func?: Function): void { }

    /**
     * 刷新banner
     */
    refreshBanner(): void { }

	/**
	 * 关闭banner
	 */
    closeBannerAd(): void { }

	/**
	 * 显示banner
	 * @param val 
	 */

    setBannerVisible(val: boolean) { }

	/**
     * 创建激励视频
     * @param type 面板类型，由游戏确定
     * @param func 回调函数
     * @param load 加载回调
     * @param preload 是否只是预加载，不播放
     */
    createRewardedVideoAd(type: number, func?: Function, load?: Function, preload?: boolean): void {
        func && func(true);
    }

	/**
	 * 短震动
	 */
    vibrateShort(): void { }

	/**
	 * 长震动
	 */
    vibrateLong(): void { }

	/**
	 * 设置玩家云数据
	 * @param _kvDataList 
	 */

    setUserCloudStorage(_kvDataList): any { }

	/**
	 * 向子域推送消息
	 * @param _data 
	 */
    postMessage(_data: any): void { }

	/**
	 * 获取胶囊位置
	 */
    getMenuButtonBoundingClientRect(): IWXRect {
        return null;
    }

	/**
	 * 检查版本更新
	 */
    checkUpdate(): void { }

    /**
     * 获取网络状态
     * @param call 
     */
    getNetworkType(call?: (type: string) => void): void {
        call && call('wifi');
    }

	/**
	 * 创建音频文件
	 */
    createVideo(data: IVideoData): IVideo {
        return null;
    }

	/**
	 * 创建插屏广告
	 */
    createInsertAd(call?: Function): any { }

    /**
     * 分包加载
     * @param name 分包名
     */
    loadSubpackage(name: string): Promise<void> {
        return Promise.resolve();
    }

    /**
     * 显示loading
     */
    showLoading(): void {

    }

    /**
     * 关闭loading
     */
    hideLoading(): void {

    }

    showShare(data: IShareData): void { }

    /**
     * 显示模态窗口
     * @param modal
     */
    showModal(modal: IModal): void { }

    /**
     * 请求订阅消息
     */
    requestSubscribeMessage(call: (bool: boolean) => void): void {
        call(true);
    }

    /**
     * 是否已创建桌面图标，oppo专属
     */
    hasShortcut(call?: (bool: boolean) => void): void {
        call && call(true);
    }

    /**
     * 安卓桌面图标，oppo专属
     */
    installShortcut(call?: (bool: boolean) => void): void {
        call && call(true);
    }

    /**
     * 创建原生广告，创建一次即可
     * @param call 回调，参数是原生广告信息，为undefined表示无数据
     */
    createNativeAd(call?: (nativeAd: any, infos: INativeInfo[]) => void) { }

    setFeedbackButtonVisible(visible:boolean) {}

    destroyFeedBackBtn(){}

    reportMonitor(name:string,value:number){}
}