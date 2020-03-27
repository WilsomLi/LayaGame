import TimeUtils from "../util/TimeUtils";
import UserData from "./UserData";
import ShareTimeMgr from "./ShareTimeMgr";
import EventMgr from "./EventMgr";
import EventType from "../const/EventType";

/**
 * 模块名，代码调用时添加
 */
export const SvModule = {
};

type ISVStrategy = any;//pb.S2C_EnterGame.ISVStrategy;

/**
 * 积分策略共用一个缓存变量
 */
const scoreCache = '积分策略模块列表';

/**
 * 视频/分享策略管理类
 */
export default class StrategyMgr {

    private static $cache: { [key: string]: {[key: number]: number} };
    private static $modules: { [key: string]: ISVStrategy } = {};
    private static $timeout: number;

    /**
     * 初始化
     * @param array 后端返回的策略数组
     */
    public static setStrategy(array: ISVStrategy[]): void {
        if (array) {
            let modules = StrategyMgr.$modules;
            for (let i = 0, len = array.length; i < len; i++) {
                let item = array[i];
                modules[item.module] = item;
            }
        }
    }

    /**
     * 根据模块名获取策略配置
     * @param module 
     */
    public static getStrategy(module: string): ISVStrategy {
        return StrategyMgr.$modules[module];
    }
    
    /**
     *  获取分享视频策略，支持所有模块的所有策略
     * @param module 模块名
     * @param noLimit 是否不受看视频失败限制（默认无法看视频时会自动转分享，为true时则不自动转换）
     * @returns 返回0（关闭）、1（分享）、2（视频）
     */
    public static getStrategyByModule(module: string, noLimit?: boolean): number {
        var value = 0;
        var strategy = StrategyMgr.getStrategy(module);
        if (strategy) {
            // policyType 为0不传，因此需要调整
            // let clzz = pb.S2C_EnterGame.PolicyType,
            //     type = strategy.policyType || 0,
            //     count = StrategyMgr.getTimesByModule(module);
            // switch (type) {
            //     case clzz.share_only:
            //         value = 1;
            //         break;
            //     case clzz.video_only:
            //         value = 2;
            //         // “只视频”不自动转分享
            //         noLimit = true;
            //         break;
            //     case clzz.share_video_cyclic:  
            //         value = count % 2 + 1;
            //         break;
            //     case clzz.video_share_cyclic:
            //         value = 2 - count % 2;
            //         break;    
            //     case clzz.video_first:
            //         value = count < strategy.videoNum ? 2 : 1;
            //         break;
            //     case clzz.video_switch_to_share:
            //         value = 2;
            //         break;
            //     case clzz.share_control:
            //         value = count < strategy.shareNum ? 1 : 2;
            //         break; 
            //     case clzz.score_sv:
            //         value = count < ShareTimeMgr.getShareToVideoCount() ? 1 : 2;    
            //         break;    
            //     default:
            //         break;
            // }
        }
        // 如果是看视频状态，不受限制时且没有视频可看则转分享
        if (value == 2 && !noLimit && !platform.hasVideo) {
            value = 1;
        }
        return value;
    }

    //// 记录次数相关 ////

    /**
     * 初始化缓存
     * @param cache 
     */
    public static init(cache: string): void {
        var obj;
        try {
            obj = JSON.parse(cache);
            // 格式化
            for (let i in obj) {
                if (typeof obj[i] !== 'object')
                    obj[i] = {};    
            }
        } catch (e) { obj = <any>{} }
        StrategyMgr.$cache = obj;
    }

    /**
     * 清理缓存
     */
    public static clear(): void {
        StrategyMgr.$cache = {};
    }

    /**
     * 获取策略实际的缓存名称
     * @param strategy 
     */
    public static getCacheName(strategy: ISVStrategy): string {
        return StrategyMgr.isSpecial(strategy) ? scoreCache : strategy.module;
    }

    /**
     * 获取策略的使用次数
     * @param module 
     */
    public static getTimesByModule(module: string): number {
        var strategy = StrategyMgr.$modules[module];
        if (strategy) {
            let data = StrategyMgr.$cache[StrategyMgr.getCacheName(strategy)];
            if (data)
                return data[strategy.policyType] || 0;    
        }
        return 0;
    }

    /**
     * 更新策略的使用次数
     */
    public static setTimesByModule(module: string): void {
        var strategy = StrategyMgr.getStrategy(module);
        if (strategy) {
            let type = strategy.policyType;
            let cache = StrategyMgr.$cache;
            let name = StrategyMgr.getCacheName(strategy);
            let data = cache[name] || (cache[name] = {});
            let count = data[type];
            if (isNaN(count))
                count = 1;
            else
                count++;
            data[type] = count;
            StrategyMgr.saveCache();
            // 次数刷新
            if (StrategyMgr.isSpecial(strategy)) {
                EventMgr.event(EventType.RefreshScoreSV);
            }
        }
    }

    /**
     * 设置刷新函数
     * @param module 
     * @param caller 
     * @param call 
     */
    public static setRefresh(module: string, caller: any, call: Function): void {
        var setFunc = function (attr) {
            EventMgr[attr](EventType.RefreshScoreSV, caller, call);
        };
        // 先清除旧的，防止监听多次
        setFunc('off');
        // 仅积分策略需要增加
        if (StrategyMgr.isSpecial(StrategyMgr.getStrategy(module))) {
            setFunc('on');
        }
    }

    /**
     * 特殊策略
     */
    public static isSpecial(strategy: ISVStrategy): boolean {
        // return strategy && strategy.policyType === pb.S2C_EnterGame.PolicyType.score_sv;
        return true;
    }

    /**
     * 保存到缓存
     */
    public static saveCache(): void {
        // 防止同一时间多次调用
        if (!StrategyMgr.$timeout) {
            StrategyMgr.$timeout = TimeUtils.setTimeout(function () {
                StrategyMgr.$timeout = null;
                UserData.instance.setStrategyCountCache(JSON.stringify(StrategyMgr.$cache));
            }, null, 40);
        }
    }
}