import CfgDataMgr from "./CfgDataMgr";
import Utils from "../util/Utils";
import ShopMgr from "./ShopMgr";
import UserData from "./UserData";
import GameConst  from "../const/GameConst";

/**
 * 使用皮肤管理类
 */
export default class TrySkinMgr {

    private static $skins: IShopCfg[];
    private static $cache: { [key: string]: number };

    /**
     * 关闭试用窗口次数
     */
    public static closeWin: number = 0;

    /**
     * 初始化
     */
    public static init(cache: string): void {
        var obj;
        try {
            obj = JSON.parse(cache);
        } catch (e) { obj = <any>{} }
        TrySkinMgr.$cache = obj;
    }

    /**
     * 获取可试用的皮肤列表
     */
    public static getSkins(): IShopCfg[] {
        var skins = TrySkinMgr.$skins;
        if (!skins) {
            let configs = CfgDataMgr.instance.shopCfg, hasShop = ShopMgr.hasShop;
            skins = TrySkinMgr.$skins = [];
            for (let i in configs) {
                let config = configs[i];
                if (config.IsExperience > 0 && !hasShop(config.id))
                    skins.push(config);
            }
        }
        return skins;
    }

    /**
     * 检测皮肤ID是否是在试玩列表
     * @param skinId 
     */
    public static inSkins(skinId: number): boolean {
        var skins = TrySkinMgr.getSkins();
        for (let i = 0, len = skins.length; i < len; i++)
            if (skins[i].id === skinId)
                return true;
        return false;
    }

    /**
     * 移除皮肤
     */
    public static remove(skinId: number): void {
        var skins = TrySkinMgr.getSkins();
        for (let i = 0, len = skins.length; i < len; i++)
            if (skins[i].id == skinId) {
                skins.splice(i, 1);
                break;
            }
    }

    /**
     * 是否能试玩皮肤
     */
    public static canTry(): boolean {
        var uInc = UserData.instance;
        // 前两关不弹、当天放弃次数达2
        return GameConst.ShareSwitch && uInc.level >= 3/*  && !uInc.closeTry */;
    }

    /**
     * 获取随机的试用皮肤ID，如果试用皮肤已经拥有了，返回0
     */
    public static getRandomSkinId(): number {
        var skinId = 0;
        var skins = TrySkinMgr.getSkins();
        var length = skins.length;
        if (length > 0)
            skinId = Utils.randomInArray(skins).id;
        return skinId;
    }

    /**
     * 获取待解锁次数
     */
    public static getRemain(skinId: number): number {
        var count = TrySkinMgr.$cache[skinId] || 0;
        var config = CfgDataMgr.instance.shopCfg[skinId];
        return config ? config.ExperienceNumber - count : 0;
    }

    /**
     * 添加试用次数
     * @returns 是否解锁
     */
    public static addTryCount(skinId: number): boolean {
        var cache = TrySkinMgr.$cache;
        var config = CfgDataMgr.instance.shopCfg[skinId];
        var count = cache[skinId] = (cache[skinId] || 0) + 1;
        var bool = count === config.ExperienceNumber;
        if (bool) {
            delete cache[skinId];   // 已解锁删除记录
            ShopMgr.unlockShop(skinId);
        }
        // UserData.instance.setTryCache(JSON.stringify(cache));
        return bool;
    }
}