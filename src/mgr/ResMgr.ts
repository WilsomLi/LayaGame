
import Handler = Laya.Handler;
import Loader = Laya.Loader;

import EventMgr from "./EventMgr";
import GameMgr from "./GameMgr";
import EventType from "../const/EventType";
import { ESprite3D, EJson, EAtlas } from "../const/ERes";
import CfgDataMgr from "./CfgDataMgr";
import SceneMgr from "./SceneMgr";

/**
 * 资源管理，支持分步（目前两部分）
 */
export default class ResMgr {

    // 进游戏预加载配置
    private static PreloadCfg = [];

    // 进游戏预加载资源
    private static PreloadRes = [
        // 必须置顶
        { url: EAtlas.Game, type: Laya.Loader.ATLAS }
    ]

    /**
     * 加载成功次数
     */
    private static _sucCount: number = 0;
    /**
     * 当前预加载权重
     */
    private static _preWeight: number = 0.4;

    /**
     * 预加载配置（预加载资源会自己触发）
     */
    public static preLoadCfg(): void {
        for (let key in EJson) {
            let data = { url: EJson[key], type: Loader.JSON };
            ResMgr.PreloadCfg.push(data);
        }
        Laya.loader.create(ResMgr.PreloadCfg, Handler.create(ResMgr, ResMgr.onComplete0), Handler.create(ResMgr, ResMgr.onProgress0));
    }

    /**
     * 资源首次（配置）加载进度
     * @param value 
     */
    private static onProgress0(value: number): void {
        EventMgr.event(EventType.ResProgress, value * ResMgr._preWeight);
    }

    /**
     * 资源二次（资源）加载进度
     * @param value 
     */
    private static onProgress1(value: number): void {
        var preWeight = ResMgr._preWeight;
        EventMgr.event(EventType.ResProgress, value * (1 - preWeight) + preWeight);
    }

    /**
     * 资源首次（配置）加载成功
     */
    private static onComplete0(): void {
        var reload = ResMgr.PreloadRes;
        for (let key in ESprite3D) {
            let data= { url: ESprite3D[key], type: Laya.Loader.HIERARCHY};
            reload.push(data);
        }
        
        // 初始化配置
        CfgDataMgr.instance.initConfigs();
        // 这里可以加上根据玩家的信息获取关卡配置、模型等数据存放到reload
        // var config = CfgDataMgr.instance.levelCfg[UserData.isntance.level];
        // reload.push(config);
        // 加载资源
        Laya.loader.create(reload, Handler.create(ResMgr, ResMgr.onComplete1), Handler.create(ResMgr, ResMgr.onProgress1));
        // loading结束执行一次进入游戏检测
        EventMgr.once(EventType.LoadingSuc, ResMgr, ResMgr.launchGame);
    }

    /**
     * 资源二次（资源）加载成功
     */
    private static onComplete1(): void {
        var loader = Laya.loader;
        // 预加载资源
        // loader.load(EAtlas.Other, null, null, Loader.ATLAS);
        // 进入游戏检测
        ResMgr.launchGame();
    }

    /**
     * 进入游戏检测
     */
    private static launchGame(): void {
        if (++ResMgr._sucCount == 2) {
            // 进入游戏，根据游戏自定 todo
            SceneMgr.instance.init();
            GameMgr.instance.launchGame();
        }
    }
}