import CfgDataMgr from "./CfgDataMgr";
import UserData from "./UserData";
import TimeUtils from "../util/TimeUtils";
import EventMgr from "./EventMgr";
import EventType from "../const/EventType";
import TrySkinMgr from "./TrySkinMgr";

/**
 * 缓存格式
 */
interface ICache {
    curSkinId: number;  // 当前选中的皮肤ID
    unlocks: number[];  // 解锁的商品列表
}

/**
 * 商城管理类
 * 注：缓存采用JSON格式存储
 */
export default class ShopMgr {

    /**
     * 已解锁的商品列表
     */
    private static $cache: ICache;
    /**
     * 已解锁列表，方便操作用
     */
    private static $unlocks: number[];
    /**
     * 缓存延迟
     */
    private static $timeout: number;

    /**
     * 初始化
     * @param cache 缓存
     */
    public static init(cache: string): void {
        var obj: ICache;
        try {
            obj = JSON.parse(cache);   
        } catch (e) {
            obj = <any>{};
         }
        // 默认选中ID
        if (isNaN(obj.curSkinId))
            obj.curSkinId = 1000;
        // 默认解锁列表
        var unlocks = obj.unlocks;
        if (!unlocks || !(unlocks instanceof Array) || unlocks.length == 0)
            obj.unlocks = [1000];    
        ShopMgr.$cache = obj;
        ShopMgr.$unlocks = obj.unlocks;
    }

    /**
     * 检测是否拥有商品
     * @param shopId
     */
    public static hasShop(shopId: number): boolean {
        return ShopMgr.$unlocks.indexOf(shopId) > -1;
    }

    /**
     * 获取商品配置
     * @param shopId 
     */
    public static getShop(shopId: number): IShopCfg {
        return CfgDataMgr.instance.shopCfg[shopId];
    }

    /**
     * 解锁商品
     * @param shopId 
     * @returns 是否解锁成功
     */
    public static unlockShop(shopId: number): boolean {
        var unlocks = ShopMgr.$unlocks, bool;
        // 存在该商品且未解锁
        if (bool = unlocks.indexOf(shopId) == -1 && !!ShopMgr.getShop(shopId)) {
            unlocks.push(shopId);
            ShopMgr.saveCache();
            // 其他地方的清除
            TrySkinMgr.remove(shopId);
        }
        return bool;
    }

    /**
     * 返回当前选中的皮肤
     */
    public static get curSkinId(): number {
        return ShopMgr.$cache.curSkinId;
    }

    /**
     * 设置当前选中的皮肤
     */
    public static set curSkinId(skinId: number) {
        var cache = ShopMgr.$cache;
        if (ShopMgr.hasShop(skinId) && cache.curSkinId != skinId) {
            cache.curSkinId = skinId;
            ShopMgr.saveCache();
            EventMgr.event(EventType.RefreshSkin);
        }
    }

    /**
     * 是否特殊皮肤，戴帽子
     */
    public static isSpacial(shopId: number): boolean {
        return shopId == 1105 || shopId == 1101;
    }

    /**
     * 保存到缓存
     */
    public static saveCache(): void {
        // 防止同一时间多次调用
        if (!ShopMgr.$timeout) {
            ShopMgr.$timeout = TimeUtils.setTimeout(function () {
                ShopMgr.$timeout = null;
                UserData.instance.setShopCache(JSON.stringify(ShopMgr.$cache));
            }, null, 40);
        }
    }
}