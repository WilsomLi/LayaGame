import UserData from "./UserData";

/**
 * 缓存格式
 */
interface ICache {
    lastIndex: number;  // 上次策略下标，默认-1
    sucCount: number;   // 同一策略累计成功分享次数，默认0
    failCount: number;  // 同一策略累计失败分享次数，默认0
}

/**
 * 策略阶段数
 */
const maxGrade = 5;

/**
 * 分享时长工具类
 */
export default class ShareTimeMgr {

    /**
     * 存放今日分享记录
     */
    private static $cache: ICache;

    /**
     * 策略配置
     */
    private static $configs: IScoreStrategy[] = [];

    /**
     * 当前正在使用的策略配置
     */
    private static $curConfig: IScoreStrategy;

    /**
     * 玩家当前的策略积分
     */
    public static score: number;

    /**
     * 初始化缓存
     * @param cache 
     */
    public static init(cache: string): void {
        var obj: ICache;
        try {
            obj = JSON.parse(cache);
        } catch {
            obj = <any>{};
        }
        ShareTimeMgr.$cache = obj;
        // 初始化
        if (isNaN(obj.lastIndex)) {
            ShareTimeMgr.clear();
        }
    }

    // /**
    //  * 初始化策略
    //  * @param values 后台开关数据
    //  * @param shareScenes 分享环境数组
    //  */
    // public static initValues(msgs: pb.IIntegralStrategyMsg[], shareScenes: string[]): void {
    //     var values = ShareTimeMgr.arrToObj(msgs);
    //     var configs = ShareTimeMgr.$configs = Utils.memset2(5, function () {
    //         return <IScoreStrategy>{};
    //     });
    //     // 解析方法
    //     var setStrategy = ShareTimeMgr.setStrategy, initShare = ShareTimeMgr.initShareTime;
    //     // 策略名称
    //     var name = values.Plan_Name;
    //     setStrategy(name, function(id, str) {
    //         configs[id - 1].name = str;
    //     });
    //     // 开始分数
    //     var figureMin = values.Figure_Min;
    //     setStrategy(figureMin, function(id, str) {
    //         configs[id - 1].beginScore = Number(str);
    //     });
    //     // 结束分数
    //     var figureMax = values.Figure_Max;
    //     setStrategy(figureMax, function(id, str) {
    //         configs[id - 1].endScore = Number(str);
    //     });
    //     // 分享失败加分
    //     var failShare = values.Share_failShare;
    //     setStrategy(failShare, function(id, str) {
    //         configs[id - 1].failScore = Number(str);
    //     });
    //     // 分享成功加分
    //     var scceShare = values.Share_scceShare;
    //     setStrategy(scceShare, function(id, str) {
    //         configs[id - 1].scceScore = Number(str);
    //     });
    //     // 分享切视频
    //     var shareToVideo = values.WXShare_Num_To_Play_AD;
    //     setStrategy(shareToVideo, function(id, str) {
    //         configs[id - 1].shareToVideo = Number(str);
    //     });
    //     // 每日减少分数上限
    //     var maxSubScore = values.Daily_koufen_Max;
    //     setStrategy(maxSubScore, function(id, str) {
    //         configs[id - 1].maxSubScore = Number(str);
    //     });
    //     // 分享卡片类型（ServerAgency需要加载）
    //     var shareType = values.Share_Pic_Tips;
    //     setStrategy(shareType, function(id, str) {
    //         let index = configs[id - 1].shareType = shareScenes.indexOf(str);
    //         if (index == -1) {
    //             throw 'error share pic:' + str;
    //         }
    //     });
    //     // 分享策略配置
    //     for (let i = 1; i < 5; i++) {
    //         let data = values['Share_strategy' + i];
    //         let times = configs[i - 1].shareTimes = [];
    //         setStrategy(data, function (id, str) {
    //             times[id - 1] = initShare(str, id);
    //         });
    //     }
    //     console.log('积分策略配置', configs);
    // }


    /**
     * 清除旧策略
     */
    public static clear(): void {
        var cache = ShareTimeMgr.$cache;
        cache.failCount = cache.sucCount = 0;
        cache.lastIndex = -1;
    }

    /**
     * 添加分享结果次数
     * @param bool 是否分享成功
     */
    public static addShare(bool: boolean): void {
        var self = ShareTimeMgr;
        var cache = self.$cache;
        if (bool) {
            cache.sucCount++;
            cache.failCount = 0;
        }
        else {
            cache.failCount++;
        }
        self.saveCache();
        // 分数修改
        var config = self.$curConfig;
        if (config) {
            // ServerAgency.reqScoreUpdate(bool ? config.scceScore : config.failScore);
        }
    }

    /**
     * 获取当前分享策略
     * @returns 分享需拉起的时长，概率（0~1）
     */
    public static getShareTime(): ITimeItem {
        var self = ShareTimeMgr;
        var hour = new Date().getHours(), retT: IShareTime;
        var curConfig = self.$curConfig = self.getCurStrategy();
        var shareTimes = curConfig && curConfig.shareTimes, time: ITimeItem;
        // 检测时间阶段
        for (let i in shareTimes) {
            let times = shareTimes[i];
            // [start, end)
            if (self.hourInTime(hour, times)) {
                retT = times;
                break;
            }
        }
        if (retT) {
            let newId = retT.id;
            if (self.lastIndex !== newId) {
                self.clear();
                self.lastIndex = newId;
                ShareTimeMgr.saveCache();
            }
        }
        else {
            self.lastIndex = -1;
        }
        return self.getTime(shareTimes);
    }

    /**
     * 根据分数获取当前的策略
     */
    public static getCurStrategy(): IScoreStrategy {
        var configs = ShareTimeMgr.$configs, score = ShareTimeMgr.score;
        for (let i = 0, len = configs.length; i < len; i++) {
            let config = configs[i];
            if (score <= config.endScore) {
                return config;
            }
        }
    }

    /**
     * 获取分享切视频次数
     */
    public static getShareToVideoCount(): number {
        var config = ShareTimeMgr.getCurStrategy();
        return config ? config.shareToVideo : 0;
    }

    //// 策略刷新操作 ////

    /**
     * 检测当前时间（小时制）是否在该策略中
     */
    protected static hourInTime(hour: number, time: any): boolean {
        var start = time.start, end = time.end;
        return hour >= start ? hour < end : (end > 24 && hour < end % 24);
    }

    /**
     * 获取当前需要拉起的时长
     */
    protected static getTime(times: IShareTime[]): ITimeItem {
        var time: ITimeItem;
        if (times) {
            let self = ShareTimeMgr;
            let share = times[self.lastIndex];
            if (share) {
                let times = share.times;
                time = times[self.failCount] || times[times.length - 1];
            }
        }
        return time || { times: [3], rands: [0, 100] };  // 默认拉起3秒即成功
    }

    /**
     * 获取上次策略
     */
    protected static get lastIndex(): number {
        return ShareTimeMgr.$cache.lastIndex;
    }

    /**
     * 设置上次策略
     */
    protected static set lastIndex(value: number) {
        ShareTimeMgr.$cache.lastIndex = value;
        ShareTimeMgr.saveCache();
    }

    /**
     * 设置成功次数
     */
    protected static get sucCount(): number {
        return ShareTimeMgr.$cache.sucCount;
    }

    /**
     * 设置成功次数
     */
    protected static set sucCount(value: number) {
        ShareTimeMgr.$cache.sucCount = value;
        ShareTimeMgr.saveCache();
    }

    /**
     * 设置失败次数
     */
    protected static get failCount(): number {
        return ShareTimeMgr.$cache.failCount;
    }

    /**
     * 设置失败次数
     */
    protected static set failCount(value: number) {
        ShareTimeMgr.$cache.failCount = value;
        ShareTimeMgr.saveCache();
    }

    /**
     * 延迟保存缓存，避免同一时间调用太多次
     */
    protected static saveCache(): void {
        Laya.timer.once(100, ShareTimeMgr, ShareTimeMgr.onSave);
    }

    /**
     * 保存缓存
     */
    protected static onSave(): void {
        UserData.instance.setShareTimeCache(JSON.stringify(ShareTimeMgr.$cache));
    }

    //// 解析操作 ////

    /**
     * 初始化策略时间
     * @param starInfo 配置数据
     * @param index 下标/ID
     */
    protected static initShareTime(starInfo: string, index: number): IShareTime {
        var share = <IShareTime>{};
        var array = starInfo.split(';');
        if (array.length >= 2) {
            let seHour = array[0].split('-');
            let times = share.times = [];
            let remain = array[1];
            share.id = index;
            share.start = Number(seHour[0]);
            share.end = Number(seHour[1]);
            // 解析后缀成阶段
            while (remain) {
                remain = ShareTimeMgr.parseJson(times, remain);
            }
        }
        return share;
    }

    // /**
    //  * 策略设置
    //  * @param obj 
    //  * @param func 
    //  */
    // protected static setStrategy(obj: pb.IIntegralStrategyMsg, func: (i: number, str: string) => void): void {
    //     if (obj) {
    //         let count = 0;
    //         while (count++ < maxGrade) {
    //             func(count, obj['strategy' + count]);
    //         }
    //     }
    // }

    // /**
    //  * 策略数组转对象
    //  * @param array 
    //  */
    // protected static arrToObj(array: pb.IIntegralStrategyMsg[]): { [key: string]: pb.IIntegralStrategyMsg } {
    //     var obj = {};
    //     for (let i = 0, len = array.length; i < len; i++) {
    //         let data = array[i];
    //         obj[data.strategyName] = data;
    //     }
    //     return obj;
    // }

    /**
     * 解析json，返回当前阶段信息
     * @param str
     */
    protected static parseJson(times: any[], str: string): string {
        var index = str.indexOf('{'), remain1 = '';
        var time = <any>{};
        if (index > -1) {
            let count = 1, endi = index + 1, len = str.length;
            for (; endi < len; endi++) {
                if (str[endi] == '{')
                    count++;
                else if (str[endi] == '}') {
                    if (--count == 0) {
                        endi++;
                        break;
                    }
                }
            }
            let data = str.substring(index, endi);
            try {
                time.tips = JSON.parse(data);
            } catch {
                console.warn('error json:' + data);
            }
            // 避免阶段间隔之间存在多余逗号或者缺省逗号现象，一般有一个属于正规配置
            while (str[endi] == ',') {
                endi++;
            }
            // 记录后面的用于下阶段解析
            remain1 = str.substr(endi);
            // 分割出前面的用于解析时间
            str = str.substr(0, index);
        }
        var strs = [];
        var remain0 = ShareTimeMgr.splitChar(strs, str, ',', 5);
        var nums = strs.map(function (v) { return Number(v) });
        time.times = nums.splice(0, 2);
        time.rands = nums.splice(0, 3).map(function (v) { return v / 100 });
        times.push(time);
        return remain0 + remain1;
    }

    /**
     * 根据字符出现次数裁剪字符串
     * @param array 存放裁剪字符串的位置
     * @param str 被裁剪的字符串
     * @param char 需要裁剪的字符
     * @param count 出现的次数
     */
    protected static splitChar(array: string[], str: string, char: string, count: number): string {
        var index = -1;
        while (count--) {
            index = str.indexOf(char);
            if (index == -1) {
                if (str) {
                    array.push(str);
                    str = '';
                }
                break;
            }
            array.push(str.substr(0, index));
            str = str.substr(index + 1);
        }
        return str;
    }
}