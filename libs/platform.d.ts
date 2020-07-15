

//// 平台 ////

/**
 * 微信矩形
 */
interface IWXRect {
    top: number;
    bottom: number;
    left: number;
    right: number;
    width: number;
    height: number;
}

/**
 * 矩形
 */
interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

// 模态窗口成功函数
type TModalSuc = (res: { confirm: boolean, cancel: boolean }) => void;

/**
 * 模态窗口
 */
interface IModal {
    title: string;          // 标题
    content: string;        // 内容
    showCancel?: boolean;   // 是否显示取消按钮
    cancelText?: string;    // 左边按钮文字
    cancelColor?: string;   // 左边按钮文字颜色
    confirmText?: string;   // 右边按钮文字
    confirmColor?: string;  // 右边按钮文字颜色
    success?: TModalSuc;    // 成功执行回调
    fail?: Function;        // 失败执行回调
}

/**
 * 分享参数
 */
interface IShareData {
    title: string;          // 分享文案
    imageUrl: string;       // 分享图
    query: string;          // 携带参数
    type?: number;          // 分享类型
    shareTime?: ITimeItem;  // 假策略拉起数据
    isNormal?: boolean;     // 是否普通分享
    aldShare?: boolean;     // 是否是阿拉丁分享
    success?: Function;     // 成功回调
    fail?: Function;        // 失败回调
}

/**
 * 提示文本
 */
interface ITipRand {
    tips: string[];             // 失败提示文本
    prob: number[];             // 出现的概率
}


/**
 * 自定义开关分享参数格式：中的time格式
 */
interface ITimeItem {
    times: number[];            // 时间阶段
    rands: number[];            // 对应概率
    tips?: ITipRand;            // 提示文本
}


/**
 * 自定义开关分享参数格式
 */
interface IShareTime {
    id: number;                 // 策略标识，0~
    times: ITimeItem[];         // 时间阶段
    start: number;              // 策略启动的小时（24小时制）
    end: number;                // 策略结束的小时（24小时制）
    tips: ITimeItem;            // 提示文本
}


/**
 * 自定义积分策略
 */
interface IScoreStrategy {
    name: string;
    beginScore: number;         // 用户区间开始分数
    endScore: number;           // 用户结束开始分数
    shareTimes: IShareTime[];   // 时间阶段
    failScore: number;          // 分享成功获得的分数
    scceScore: number;          // 分享失败减去的分数
    shareToVideo: number;       // 多少次后切换视频
    maxSubScore: number;        // 当天减分最大数字
    shareType: number;          // 分享卡片类型
}

/**
 * 创建视频参数，注：矩形参数传入是游戏内的参数
 */
interface IVideoData extends IRect {
    src: string;                        // 视频地址
    poster: string;                     // 视频封面
    initialTime?: number;               // 初始播放位置，单位秒，默认0
    playbackRate?: number;              // 视频的播放速率，有效值有 0.5、0.8、1.0、1.25、1.5，默认1
    live?: boolean;                     // 视频是否为直播，默认false
    objectFit?: string;                 // 视频的缩放模式，默认contain
    controls?: boolean;                 // 视频是否显示自带控件，默认true
    autoplay?: boolean;                 // 视频是否自动播放，默认false
    loop?: boolean;                     // 视频是否循环播放，默认false
    muted?: boolean;                    // 视频是否禁音播放，默认false
    enableProgressGesture?: boolean;    // 是否启用手势控制播放进度，默认true
    enablePlayGesture?: boolean;        // 是否开启双击播放的手势，默认false
    showCenterPlayBtn?: boolean;        // 是否显示视频中央的播放按钮，默认true
}

/**
 * 视频控件，注：矩形参数是相对于屏幕的参数
 */
interface IVideo extends IVideoData {
    /**
     * 监听视频缓冲事件
     */
    onWaiting(call: Function): void;
    /**
     * 取消监听视频缓冲事件
     */
    offWaiting(call: Function): void;
    /**
     * 监听视频播放事件
     */
    onPlay(call: Function): void;
    /**
     * 取消监听视频播放事件
     */
    offPlay(call: Function): void;
    /**
     * 监听视频暂停事件
     */
    onPause(call: Function): void;
    /**
     * 取消监听视频暂停事件
     */
    ofPause(call: Function): void;
    /**
     * 监听视频播放结束事件
     */
    onEnded(call: Function): void;
    /**
     * 取消监听视频播放结束事件
     */
    offEnded(call: Function): void;
    /**
     * 监听视频播放进度更新事件
     */
    onTimeUpdate(call: Function): void;
    /**
     * 取消监听视频播放进度更新事件
     */
    offTimeUpdate(call: Function): void;
    /**
     * 监听视频缓冲事件
     */
    onError(call: Function): void;
    /**
     * 取消监听视频缓冲事件
     */
    offError(call: Function): void;
    /**
     * 暂停
     */
    pause(): void;
    /**
     * 播放
     */
    play(): void;
    /**
     * 销毁视频
     */
    destroy(): void;
    /**
     * 跳转
     */
    seek(sec: number): void;
    /**
     * 是否隐藏
     */
    hide: boolean;
}

/**
 * oppo原生广告信息
 */
interface INativeInfo {
    adId: string;               // 广告标识，用来上报曝光与点击
    title: string;              // 广告标题
    desc: string;               // 广告描述
    icon: string;               // 推广应用的 Icon 图标
    imgUrlList: string[];       // 广告图片
    logoUrl: string;            // “广告”标签图片
    clickBtnTxt: string;        // 点击按钮文本描述
    creativeType: number;       // 广告类型
    interactionType: number;    // 广告点击之后的交互类型
    iconUrlList: string[];
}

/**
 * 分享信息
 */
interface IShareCardDetail {
    title: string;          //名称
    img: string;            //图片路径
    shareId: number;        //ID
}

/**
 * Web平台类，该类的作用是可以兼容在浏览器运行（即合并所有sdk的接口及默认数据），
 * 并提供给其它sdk未支持的方法（你可以理解为所有的sdk都继承自WebPlatform）
 * 微信下为sdk/wx/wxplatform.js
 * Oppo下为sdk/op/qgplatform.js
 */
interface Platform {

	/**
	 * 平台类型，值类型请查看GameCost#PlatformType
	 */
    readonly platType: number;
	/**
	 * 平台游戏ID
	 */
    readonly appId: string;
    /**
     * 游戏包名，oppo
     */
    readonly pkgName?: string;
	/**
	 * 版本号
	 */
    readonly version: string;

    /**
     * 分享配置列表
     */
    shareConfigs: IShareCardDetail[];
    /**
     * 是否有视频
     */
    readonly hasVideo: boolean;
    /**
     * 底部bannerID，可为空
     */
    readonly banners: string[];
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
     * banner的坐标值
     */
    readonly bannerY: number;
    /**
     * banner广告
     */
    readonly bannerAd?: any;
	/**
	 * 登录
	 * @param cb 
	 */
    login(cb: Function): void;

	/**
	 * 获取启动参数
	 */
    launchInfo(): any;

	/**
	 * 获取系统信息
	 */
    getSystemInfoSync(): any;

	/**
	 * 切到前台
	 * @param _callback 
	 */
    onShow(_callback: Function): void;

	/**
	 * 切到后台台
	 * @param _callback 
	 */
    onHide(_callback: Function): void;
	/**
     * 创建建议按钮
     * @param _btnVect 
     * @param hide 是否隐藏
     */
    createFeedbackButton(_btnVect: IRect, hide?: boolean): void;

	/**
	 * 显示建议按钮
	 * @param visible 
	 */

    showFeedbackButton(visible: boolean): void;

	/**
     * 退出游戏
     */
    exitMiniProgram(): void;

	/**
	 * 分享
	 * @param _data 
	 */
    onShare(_data: any): void;

	/**
	 * 小程序跳转
	 * @param _data 
	 */
    navigateToMiniProgram(_data: any): void;

	/**
	 * 创建底部banner
	 */
    createBannerAd(_adUnitId: string, func?: Function, force?: boolean): void;

	/**
	 * 关闭banner
	 */
    closeBannerAd(): void;

    /**
     * 刷新banner
     */
    refreshBanner(): void;

	/**
	 * 显示banner
	 * @param val 
	 */
    setBannerVisible(val: boolean): void;

	/**
     * 创建激励视频
     * @param type 面板类型，由游戏确定：0皮肤界面，1增加金币（通用），2、3建造界面，4离线，5签到，6无敌，7金币不足，8体力不足，9在线金币，10再来一份，11结算冠军，12结算亚军，13试用
     * @param func 回调函数
     * @param preload 是否只是预加载，不播放
     */
    createRewardedVideoAd(type: number, func?: Function, load?: Function, preload?: boolean): void;

	/**
	 * 短震动
	 */
    vibrateShort(): void;

	/**
	 * 长震动
	 */
    vibrateLong(): void;

	/**
	 * 设置玩家云数据
	 * @param _kvDataList 
	 */

    setUserCloudStorage(_kvDataList): any;

	/**
	 * 向子域推送消息
	 * @param _data 
	 */
    postMessage(_data: any): void;

	/**
	 * 获取胶囊位置
	 */
    getMenuButtonBoundingClientRect(): IWXRect;

	/**
	 * 检查版本更新
	 */
    checkUpdate(): void;

    /**
     * 获取网络状态
     * @param call 
     */
    getNetworkType(call?: (type: string) => void): void;

	/**
	 * 创建音频文件
	 */
    createVideo(data: IVideoData): IVideo;

	/**
	 * 创建插屏广告
     * @param call 显示回调
	 */
    createInsertAd(call?: Function): void;

    /**
     * 分包加载
     * @param name 分包名
     * @param update 进度更新函数
     */
    loadSubpackage(name: string, update?: (prog: number) => void): Promise<void>;

    /**
     * 显示loading
     */
    showLoading(): void;

    /**
     * 关闭loading
     */
    hideLoading(): void;

    /**
     * 纯分享，无success和fail回调
     * @param data
     */
    showShare(data: IShareData): void;

    /**
     * 显示模态窗口
     * @param modal
     */
    showModal(modal: IModal): void;

    /**
     * 请求订阅消息
     * @param call 参数是否订阅
     */
    requestSubscribeMessage(call: (bool: boolean) => void): void;

    /**
     * 是否已创建桌面图标，oppo专属
     */
    hasShortcut(call?: (bool: boolean) => void): void;

    /**
     * 安卓桌面图标，oppo专属
     */
    installShortcut(call?: (bool: boolean) => void): void;

    /**
     * 订阅
     * @param call 
     */
    requestSubscribeMessage(call?: (bool: boolean) => void): void;

    /**
     * 创建原生广告，创建一次即可
     * @param call 回调，参数是原生广告对象及原生广告信息，为undefined表示无数据
     */
    createNativeAd(call?: (nativeAd: any, infos: INativeInfo[]) => void);
    destroyFeedBackBtn():void;
    setFeedbackButtonVisible(visible:boolean):void;
    
    reportMonitor(name:string,value:number):void;
}

declare const platform: Platform;
declare interface Window {
    platform: Platform
}