
import EventMgr from "./EventMgr";
import EventType from "../const/EventType";
import StrategyMgr from "../mgr/StrategyMgr";
import TimeUtils from "../util/TimeUtils";
import ShareTimeMgr from "./ShareTimeMgr";
import SideMgr from "../side/mgr/SideMgr";
import SideMsg, { ESMessage } from "../side/mgr/SideMsg";
import ShopMgr from "./ShopMgr";

/**
 * 玩家数据
 */
export default class UserData {

    static instance = new UserData();
    //// 公有变量
    public accountId: number;                   // 账号ID
    public isNewPlayer: boolean = false;        // 是否是新用户
    //// 私有变量
    private localMap: any = {};                 // 本地缓存列表
    private needUpload: boolean;                // 是否需要上传数据
    private isClear: boolean;                   // 是否清理了数据
    private cacheTime: number = 0;              // 缓存时间
    //// 缓存变量，带'_'开头，且必须初始化
    private _lastGameDate: number = -1;         // 上次游戏日期
    private _gold: number = 0;                  // 金币
    private _level: number = 1;                 // 关卡
    private _version: string = '';              // 版本号
    private _isSubscribe: boolean = false;      // 是否订阅
    private _strategyCountCache: string = '';   // 策略次数缓存  
    private _shareTimeCache: string = '';       // 分享策略记录
    private _rmSides: number[] = [];            // 今日移除的卖量

    private _shopCache:string = ''; //商店数据缓存

    //// 总缓存操作相关 ////

    /**
     * 本地缓存初始化
     */
    public init(): void {
        var self = this, localMap = self.localMap;
        var getItem = Laya.LocalStorage.getItem;
        for (let key in self) {
            if (key.indexOf("_") == 0) {
                let val: any = getItem(key);
                if (val != null && val.length > 0) {
                    let old = localMap[key] = self[key];
                    // 对象/数组
                    if (typeof old === 'object') {
                        val = JSON.parse(val);
                    }
                    // 数字
                    else if (typeof old === 'number' && !isNaN(old)) {
                        val = +val || old;    // 取数，默认原值
                    }
                    // 布尔值
                    else if (typeof old === 'boolean') {
                        val = val === 'true'
                    }
                    self[key] = val;
                }
            }
        }
        self.formatAll();
        // 缓存时间
        var cacheTime = Number(getItem("cacheTime"));
        self.cacheTime = isNaN(cacheTime) ? 0 : cacheTime;
        // 定时器刷新
        Laya.timer.loop(30000, self, self.onUpdate);
    }

    /**
     * 从服务器解析数据
     * @param data 
     */
    public parseDataFromSvr(data: any): void {
        var self = this, cacheTime = self.cacheTime;
        console.log('parseDataFromSvr', data, data.cacheTime - cacheTime, data._level, self.level);
        // 本地缓存比服务器旧，一般仅删端才会出现，因此无需考虑太多，基本上数据都是需要被换掉，【关卡额外判断】
        if (data.cacheTime > cacheTime || cacheTime == 0 || data._level > self.level) {
            // 遍历检测变更
            for (let key in data) {
                if (key.indexOf("_") == 0) {
                    // 当服务器的数据新于本地数据时，替换缓存
                    let newV = data[key];
                    let oldV = self[key];
                    if (oldV !== void 0 && newV != oldV) {
                        self[key] = newV;
                        self.setData(key, data[key]);
                    }
                }
            }
            // 更新缓存时间
            self.updateCacheTime();
            // 重新初始化
            self.formatAll();
            // 通知缓存变更
            EventMgr.event(EventType.RefreshCacheData);
        }
    }

    /**
     * 是否新的一天
     */
    public checkNewDay(): boolean {
        var self = this;
        // 登陆后再检测
        if (self.accountId) {
            let curDate = Date.now();
            if (!TimeUtils.isSameDay(curDate, self._lastGameDate)) {
                // 策略计数
                self.setStrategyCountCache('');
                StrategyMgr.clear();
                // 时间，置底
                self._lastGameDate = curDate;
                self.cacheData("_lastGameDate");
                // 卖量重置
                self._rmSides = [];
                self.cacheData('_rmSides');
                SideMgr.resetSide();
                // 事件分发
                EventMgr.event(EventType.CheckNewDay);
                return true;
            }
        }
    }

    /**
     * 上传数据到服务器，延迟上传，避免同一时间上传次数过于频繁
     */
    public uploadToSvr() {
        var self = this;
        Laya.timer.once(100, self, self.onUpload);
    }

    /**
     * 清理数据，包括服务器数据，调试用
     */
    public clearData(): void {
        var self = this;
        if (!self.isClear || !isNaN(self.accountId)) {
            let localMap = self.localMap;
            self.needUpload = true;
            Laya.LocalStorage.clear();
            for (let i in localMap) {
                self[i] = localMap[i];
            }
            self.updateCacheTime();
            self.onUpload();
            // 10秒不允许存储数据
            self.isClear = true;
            Laya.timer.once(20000, self, function () {
                self.isClear = false;
            });
        }
    }

    /**
     * 检测订阅消息
     */
    public checkSubsMsg(): void {
        var self = this;
        // 未订阅
        if (!self.isSubscribe) {
            let newVersion = platform.version;
            // 版本变更
            if (newVersion !== self.version) {
                self.version = newVersion;
                platform.requestSubscribeMessage(function (bool) {
                    // 订阅成功
                    if (bool) {
                        self.isSubscribe = true;
                        // ServerAgency.reqSubscribe();
                    }
                });
            }
        }
    }

    /**
     * 上传微信云数据
     */
    public uploadWxData(): void {
        var self = this;
        var kvDataList = [{
            key: "level",
            value: "" + self.level
        }, {
            key: "userId",
            value: "" + self.accountId
        }];
        platform.setUserCloudStorage(kvDataList);
    }

    /**
     * 数据格式化，带格式的缓存必须在缓存拉下来和服务器数据拉下来都进行初始化，保证格式正确
     */
    private formatAll(): void {
        var self = this;
        // 是否初始化，防登录太快，资源还未拉取成功
        // 初始化策略次数
        StrategyMgr.init(self._strategyCountCache);
        // 初始化分享策略记录
        ShareTimeMgr.init(self._shareTimeCache);
        // 通知移除卖量列表
        SideMsg.notice(ESMessage.C2S_RM_SIDES, self._rmSides);
        // 商店缓存数据
        ShopMgr.init(self._shopCache);
    }

    /**
     * 刷新数据
     */
    private onUpdate(): void {
        var self = this;
        self.checkNewDay();
        self.uploadToSvr();
    }

    /**
     * 上传数据
     */
    private onUpload(): void {
        var self = this;
        // if (self.needUpload && ServerAgency.cacheSuc()) {
        //     let data: any = {};
        //     //TODO 
        //     // let msg = new pb.C2S_UploadCache();
        //     // for (let key in self) {
        //     //     if (key.indexOf("_") == 0) {
        //     //         data[key] = self[key];
        //     //     }
        //     // }
        //     // data.cacheTime = self.cacheTime;
        //     // msg.cacheKey = "user";
        //     // msg.cacheData = JSON.stringify(data);
        //     // NetMgr.instance.send(msg);
        //     self.needUpload = false;
        // }
    }

    //// 本地缓存机制 ////

    /**
     * 存放缓存数据，同时修改缓存时间，注意只带‘_’开头的属性
     * @param key 
     */
    private cacheData(key: string): void {
        var self = this;
        if (!self.isClear) {
            self.updateCacheTime();
            self.setData(key, self[key]);
            self.needUpload = true;
        }
    }

    /**
     * 存放缓存数据
     * @param key 
     * @param value 
     */
    private setData(key: string, value: any): void {
        if (typeof value === 'object')
            value = JSON.stringify(value);
        else
            value += '';
        Laya.LocalStorage.setItem(key, value);
    }

    /**
     * 更新缓存时间
     */
    private updateCacheTime(): void {
        var self = this, time = self.cacheTime = Date.now();
        self.setData('cacheTime', '' + time);
    }

    //// 本地缓存属性 ////

    /**
     * 获取金币
     */
    public get gold(): number {
        return this._gold;
    }

    /**
     * 设置金币
     */
    public set gold(value: number) {
        var self = this;
        self._gold = value;
        self.cacheData('_gold');
        EventMgr.event(EventType.RefreshGold);
    }

    /**
     * 关卡
     */
    public get level(): number {
        return this._level;
    }

    /**
     * 关卡
     */
    public set level(level: number) {
        var self = this;
        self._level = level;
        self.cacheData("_level");
        self.uploadWxData();        // 关卡为标志性属性，一经修改需要立即上传
        EventMgr.event(EventType.RefreshLevel);
    }

    /**
     * 获取当前进度
     */
    public get version(): string {
        return this._version;
    }

    /**
     * 设置当前进度
     */
    public set version(v: string) {
        this._version = v;
        this.cacheData("_version");
    }

    /**
     * 是否订阅消息
     */
    public get isSubscribe(): boolean {
        return this._isSubscribe;
    }

    /**
     * 是否订阅消息
     */
    public set isSubscribe(bool: boolean) {
        this._isSubscribe = bool;
        this.cacheData('_isSubscribe');
    }

    //// 侧边栏相关 ////

    /**
     * 卖量移除——每日屏蔽版本
     * @param data 
     */
    public removeSide(data: IYDHW.GameBase.ISideBoxResult): void {
        var self = this, ret = false;
        var rmSides = self._rmSides;
        var sideBoxId = data._id;
        if (rmSides.indexOf(sideBoxId) == -1) {
            rmSides.push(sideBoxId);
            self.cacheData('_rmSides');
        }
        SideMgr.removeSide(data);
        // 无卖量
        if (!SideMgr.hasSide()) {
            EventMgr.event(EventType.CloseSide);
        }
    }

    //// 带格式缓存 ////

    /**
     * 设置策略次数缓存
     */
    public setStrategyCountCache(str: string): void {
        this._strategyCountCache = str;
        this.cacheData('_strategyCountCache');
    }

    /**
     * 设置分享策略记录
     * @param str 
     */
    public setShareTimeCache(str: string): void {
        this._shareTimeCache = str;
        this.cacheData('_shareTimeCache');
    }

    /**
     * 商店数据缓存
     */
    public setShopCache(_strData:string):void {
        this._shopCache = _strData;
        this.cacheData("_shopCache");
    }
}