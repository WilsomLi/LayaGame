import { EJson,ECfg } from "../const/ERes";

/**
 * json配置数据管理
 */
export default class CfgDataMgr {
    static instance = new CfgDataMgr();

    private globalCfg: any;
    public playerCfg: any;
    public levelCfg: any;
    public shopCfg: { [key: string]: IShopCfg };    // 商城配置 TODO

    constructor() {

    }

    initConfigs() {
        var configs = Laya.loader.getRes(EJson.Configs);
        function loadFunc(name:string) {
            return configs[name];
        }
        
        this.globalCfg = loadFunc(ECfg.GlobalCfg);
        this.playerCfg = loadFunc(ECfg.Player);
        this.levelCfg =loadFunc(ECfg.LevelCfg);
        this.shopCfg = loadFunc(ECfg.ShopCfg);
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

}