import { EJson } from "../const/ERes";

/**
 * json配置数据管理
 */
export default class CfgDataMgr {
    static instance = new CfgDataMgr();

    private globalCfg: any;
    public playerCfg: any;
    public mLevelCfg: any;
    public shopCfg: { [key: string]: IShopCfg };    // 商城配置 TODO
    public mNpcCfg: any; //NPC配置

    constructor() {

    }

    initConfigs() {
        this.globalCfg = Laya.loader.getRes(EJson.GlobalCfg);
        this.playerCfg = Laya.loader.getRes(EJson.Player);
        this.mLevelCfg = Laya.loader.getRes(EJson.LevelCfg);
        this.shopCfg = Laya.loader.getRes(EJson.ShopCfg);
        this.mNpcCfg = Laya.loader.getRes(EJson.NpcCfg);
        this.initData();
    }

    private initData() {

    }

    /**
     * 获取全局配置
     * @param key 
     * @param defValue 获取不到则采取该值，默认0
     */
    getGlobalCfg(key: string, defValue: number = 0): number {
        let cfg = CfgDataMgr.instance.globalCfg[key];
        return cfg ? cfg.value : defValue;
    }

    /**
     * 获取关卡配置
     */
    getStageLevelCfg(_stageLevel: number): any {
        if (this.mLevelCfg) {
            return this.mLevelCfg[_stageLevel];
        }
        return null;
    }
    /**
     * 获取关卡小关总数
     */
    getSmallStageCount(_stageLevel: number): number {
        let stageCount: number = 0;
        if (this.mLevelCfg) {
            let stageLevel: number = Math.floor(_stageLevel / 100);
            for (let index = 1; index < 10; index++) {
                const element = this.mLevelCfg[stageLevel * 100 + index];
                if (element) {
                    stageCount++;
                } else {
                    break;
                }
            }
        }
        return stageCount;
    }

    /**
     * 获取NPC配置
     */
    getNpcCfg(_npcModel:string):any {
        if (this.mNpcCfg) {
            for (const key in this.mNpcCfg) {
                const element = this.mNpcCfg[key];
                if (element && element["npcModel"] ==_npcModel) {
                    return element;
                }
            }
        }
        return null;
    }
}