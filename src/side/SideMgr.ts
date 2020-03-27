import SideUtils from "./SideUtils";
import SideMsg, { ESMessage } from "./SideMsg";

/**
 * 卖量格式
 */
class SideData implements ISideboxData {

    sideboxId: number = 0;      // 盒子id
    type: number = 0;           // 0，小程序。1，图片
    title: string = '';         // 标题
    icon: string = '';          // 图标
    status: number = 0;         // 状态 0，关。1，开
    innerStatus: number = 0;    // 是否内部标识
    showTime: number = 0;       // 显示时间
    jumpAppid: string = '';     // 跳转appid
    path: string = '';          // 跳转路径
    shieldIos: number = 0;      // 是否屏蔽ios，0不屏蔽，1屏蔽

    constructor(data?: ISideboxData) {
        for (let i in data) {
            this[i] = data[i];
        }
    }
}

//// 本地配置相关 ////

/**
 * 本地信息配置，根据游戏自己定义
 */
interface ILocalConfig {
    local?: string;             // 本地卖量配置文件路径（注意必须放本地，请勿迁移至CDN）
    cache?: string;             // 本地缓存名称，不跟UserData存在的缓存变量冲突即可
    timeout?: number;           // http请求超时，超时状态，以本地缓存位置
    switch?: boolean;           // 卖量的开关，建议开着，当拉取不下数据时还能显示卖量
    checkUrl?: string;          // 卖量文件校验url
}

// 示例配置
const config: ILocalConfig = {
    local: 'wxlocal/adConfig.json',
    cache: '$adConfig$',
    timeout: 5000,
    switch: true,
    checkUrl: 'https://ydhwslb.szvi-bo.com/jslb/getUrl'
};

/**
 * 卖量数据管理类
 */
export default class SideMgr {

    /**
     * 平台工具
     */
    public static platform: IPlatform;

    /**
     * 缓存数据
     */
    private static $cache: IAdConfig;
    /**
     * 是否使用服务器卖量
     */
    private static $useSvr: boolean;
    /**
     * 标记数据是否初始化完毕
     */
    private static $complete: boolean;
    /**
     * 屏蔽的ID列表
     */
    private static $rmSides: any[];
    /**
     * 当前界面使用的卖量列表
     */
    private static $boxes: ISideboxData[];
    /**
     * 当前配置可使用的卖量列表
     */
    private static $boxesZ: ISideboxData[];
    /**
     * 服务器卖量配置
     */
    private static $svrConfig: IAdConfig;

    //// 卖量校验相关 ////

    /**
     * 初始化
     * 操作：获取本地缓存，若不存在则直接读取本地文件，本地文件必存在
     * @param platform 平台信息
     * @param enabled 是否启用本地缓存管理
     * @param localCfg 本地配置
     */
    public static init(platform: IPlatform, enabled?: boolean, localCfg?: ILocalConfig): void {
        var self = SideMgr;
        // 记录当前平台
        self.platform = platform;
        self.$useSvr = !enabled;
        // 替换配置属性
        for (let i in localCfg) {
            config[i] = localCfg[i];
        }
        // 注册事件
        var register = SideMsg.register;
        register(ESMessage.C2S_SWITCH, self.onSwitch, self, true);
        register(ESMessage.C2S_RM_SIDES, self.onRmSides, self);
        register(ESMessage.C2S_REMOVE, self.onRemove, self);
        register(ESMessage.C2S_RESET, self.onReset, self);
        // 加载缓存
        if (enabled) {
            let obj: IAdConfig;
            try {
                // JSON.parse(null) 不报错且返回null
                obj = JSON.parse(Laya.LocalStorage.getItem(config.cache));
            } catch { }
            // 若为非空对象，检测对象格式 todo
            if (obj !== null && typeof obj === 'object') {
                self.onCompleteL(obj);
            }
            else {
                SideUtils.getRes(config.local).then(self.onCompleteL);
            }
        }
    }

    /**
     * 检测配置对象
     * @param obj 
     */
    protected static checkObj(obj: IAdConfig): boolean {
        var result = false;
        if (obj) {
            let timestamp = obj.timestamp;
            if (!isNaN(timestamp)) {
                let boxes = obj.boxes;
                let length = boxes instanceof Array && boxes.length;
                if (length > 0) {
                    while (length--) {
                        boxes[length] = new SideData(boxes[length]);
                    }
                    result = true;
                }
            }
        }
        return result;
    }

    /**
     * 完成本地卖量数据获取
     * @param data 卖量文件配置
     */
    protected static onCompleteL(data: IAdConfig): void {
        var self = SideMgr;
        if (data) {
            self.$cache = self.checkObj(data) && data;
            self.checkCache();
        }
        else {
            self.onErrorL();
        }
    }

    /**
     * 本地配置错误
     */
    protected static onErrorL(): void {
        var self = SideMgr;
        var config = self.$svrConfig;
        // 改为可从服务器获取
        self.$useSvr = true;
        // 本地配置错误的情况下则按照服务器或请求校验的数据为准，谁先获取就用谁的卖量，本质上二者没区别
        if (config) {
            self.onComplete(config);
        }
        else {
            self.checkCache();
        }
        console.error('请先设置好本地卖量配置');
    }

    /**
     * 请求校验本地缓存是否是最新的
     */
    protected static checkCache(): void {
        var self = SideMgr;
        var cache = self.$cache;
        var timestamp = cache ? cache.timestamp : 0;
        var platform = self.platform;
        var data = {
            appid: platform.appId,
            version: platform.version,
            timestamp: timestamp
        };
        // 发起请求
        Http.get(config.checkUrl, data, config.timeout).then(self.onCompleteC).catch(self.onError);
    }

    /**
     * 请求校验成功
     */
    protected static onCompleteC(data: any): void {
        var self = SideMgr;
        if (!data.newCofig) {
            let url = data.url;
            if (url) {
                SideUtils.getRes(url + '?m=' + Date.now()).then(self.onComplete);
                return;
            }
        }
        self.onError();
    }

    /**
     * 请求校验失败
     */
    protected static onError(): void {
        // 直接使用本地缓存
        var self = SideMgr;
        self.onComplete(self.$cache);
    }

    /**
     * 最终完成回调
     * @param data 最终卖量配置信息
     */
    protected static onComplete(data: IAdConfig): void {
        var self = SideMgr;
        if (!self.$complete && data) {
            self.$cache = data;
            self.initSides();
            self.$complete = true;
            self.$useSvr || Laya.LocalStorage.setJSON(config.cache, data);
            SideMsg.noticeLater(ESMessage.S2S_COMPLETE, data);
        }
    }

    /**
     * 初始化卖量列表
     * @param datas 
     */
    protected static initSides(): void {
        var self = SideMgr;
        var datas = self.$cache.boxes;
        if (datas) {
            let array = [], arrayZ = [];
            let rmSides = self.$rmSides;
            let rmFirst = rmSides && rmSides[0];
            // 是否能正常使用，即不受屏蔽
            let rmFunc = rmFirst ? (typeof rmFirst === 'string' ? function (d: ISideboxData) {
                return rmSides.indexOf(d.jumpAppid) == -1;
            } : function (d: ISideboxData) {
                return rmSides.indexOf(d.sideboxId) == -1;
            }) : function (d: ISideboxData) { return true };
            // 判断运行环境类型
            let noIPhone = !Laya.Browser.onIOS;
            for (let i = 0, len = datas.length; i < len; i++) {
                let data = datas[i];
                // 状态开且非IOS或IOS不屏蔽
                if (data.status == 1 && (noIPhone || data.shieldIos != 1)) {
                    arrayZ.push(data);
                    // 屏蔽卖量
                    if (rmFunc(data)) {
                        array.push(data);
                    }
                }
            }
            self.$boxes = array;
            self.$boxesZ = arrayZ;
        }
    }

    //// 接受业务层相关 ////

    /**
     * 卖量开关监听
     * @param bool 
     */
    protected static onSwitch(bool: boolean): void {
        config.switch = !!bool;
    }

    /**
     * 卖量屏蔽列表监听
     * @param ids 
     */
    protected static onRmSides(ids: number[] | string[]): void {
        var self = SideMgr;
        if (ids) {
            self.$rmSides = ids;
            if (self.$complete) {
                self.initSides();
            }
        }
    }

    /**
     * 卖量移除
     */
    protected static onRemove(data: ISideboxData): void {
        SideMgr.removeSide(data);
    }

    /**
     * 重置卖量
     */
    protected static onReset(): void {
        SideMgr.resetSide();
    }

    //// 视图基类接口 ////

    /**
     * 卖量取消时调用，显示更多游戏界面
     */
    public static showMore(): void {
        SideMsg.notice(ESMessage.S2C_CANCEL);
    }

    //// 卖量数据相关 ////

    /**
     * 加载卖量数据，适用于首屏界面
     * @param call 回调，参数为卖量数据
     * @param thisObj 回调所属对象
     */
    public static loadSides(call: (datas: ISideboxData[]) => void, thisObj?: any): void {
        var self = SideMgr;
        // 结束回调
        var endc = function () {
            call.call(thisObj, self.getSides());
        };
        if (self.$complete) {
            endc();
        }
        else {
            SideMsg.register(ESMessage.S2S_COMPLETE, endc, self, true);
        }
    }

    /**
     * 获取卖量数据，适用于非首屏界面
     */
    public static getSides(): ISideboxData[] {
        return config.switch ? SideMgr.$boxes : null;
    }

    /**
     * 是否还有卖量
     */
    public static hasSide(): boolean {
        var boxes = SideMgr.getSides();
        return boxes && boxes.length > 0;
    }

    /**
     * 检测是否能显示卖量相关的控件
     * @param view 
     */
    public static cehckShow(view: Laya.Sprite): void {
        view.visible = false;
        SideMgr.loadSides(function (datas) {
            view.visible = datas && datas.length > 0;
        });
    }

    /**
     * 移除卖量
     * @param data 
     */
    public static removeSide(data: ISideboxData): void {
        var boxes = SideMgr.$boxes;
        var index = boxes && boxes.indexOf(data);
        if (index > -1) {
            boxes.splice(index, 1);
            SideMsg.notice(ESMessage.S2S_REMOVE, data);
            boxes.length == 0 && SideMsg.notice(ESMessage.S2C_CLEAR);
        }
    }

    /**
     * 重置卖量
     */
    public static resetSide(): void {
        var self = SideMgr;
        var boxesZ = self.$boxesZ;
        boxesZ && (self.$boxes = boxesZ.concat());
    }

    /**
     * 使用服务器（socket）卖量，前提是SideMgr.init第二个参数传false
     */
    public static setSvrSide(datas: ISideboxData[]): void {
        var self = SideMgr;
        var config = self.$svrConfig = {
            timestamp: 0,
            version: '1.0.0',
            boxes: datas
        };
        if (SideMgr.$useSvr) {
            SideMgr.onComplete(config);
        }
    }
}

/**
 * 简化版Http请求工具
 */
class Http extends Laya.HttpRequest {

    private $comCall: (any) => void;
    private $errorCall: (any) => void;
    private $thisObj: any;

    /**
     * 添加监听
     * @param call 正常返回
     * @param error 错误返回
     * @param thisObj 回调所属对象
     * @param timeout 超时时间，默认10秒
     */
    public addCall(call: (any) => void, error?: (any) => void, thisObj?: any, timeout?: number): void {
        var self = this;
        var lEvent = Laya.Event;
        self.$comCall = call;
        self.$errorCall = error;
        self.$thisObj = thisObj;
        self.once(lEvent.COMPLETE, self, self.onComplete);
        self.once(lEvent.ERROR, self, self.onError);
        // 超时检测
        Laya.timer.once(timeout > 0 ? timeout : 5000, self, self.onError);
    }

    /**
     * 请求成功
     */
    protected onComplete(data: any): void {
        var self = this;
        var call = self.$comCall;
        call && call.call(self.$thisObj, data);
        self.onClear();
    }

    /**
     * 请求失败
     */
    protected onError(data: any): void {
        var self = this;
        var call = self.$errorCall;
        call && call.call(self.$thisObj, data);
        self.onClear();
    }

    /**
     * 清理数据
     */
    protected onClear(): void {
        var self = this;
        self.offAll();
        self.$comCall = self.$errorCall = self.$thisObj = null;
        Laya.timer.clear(self, self.onError);
    }

    /**
     * 发起get请求
     */
    public static get(url: string, data?: any, timeout?: number): Promise<any> {
        return new Promise<any>(function (resolve, reject) {
            let http = new Http;
            if (data !== null && data !== undefined) {
                if (typeof data === 'object') {
                    // get参数调整
                    var attr = [];
                    for (let i in data) {
                        attr.push(i + '=' + data[i]);
                    }
                    url += '?' + attr.join('&');
                }
                else {
                    url += data;
                }
            }
            http.send(url, null, 'get', 'json');
            http.addCall(resolve, reject, null, timeout);
        });
    }
}