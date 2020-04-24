
import EventMgr from "./EventMgr";
import RolePlayer from "../logic/entity/RolePlayer";
import EventType from "../const/EventType";
import UIMgr from "./UIMgr";
import EUI from "../const/EUI";
import UserData from "./UserData";
import CfgDataMgr from "./CfgDataMgr";
import SceneMgr from "./SceneMgr";
import Player from "../logic/entity/Player";
import HomeView from "../script/HomeView";
import AldSDK from "../platform/AldSDK";
import ShopMgr from "./ShopMgr";
import BaseProp from "../logic/entity/BaseProp";
import DebugCtrl from "../util/DebugCtrl";

export enum EGamePhase {
    None,
    Prepare,
    InGame,
    Over,
    Pause,
}

/**
 * 游戏管理
 */
export default class GameMgr {
    static instance = new GameMgr();

    public role: RolePlayer;
    private _players: Array<Player>;
    private _playerCnt: number = 0;
    private _props:Array<BaseProp>;

    private _curPhase: EGamePhase = EGamePhase.None;

    private _clickCnt: number = 0;
    private _lastClickTime: number = 0;
    private _frameCnt: number = 0;
    private _lastTimer: number = 0;
    private _skinId: number;

    static deltaTime: number = 0;
    static nowTime: number = 0;
    static FPS: number = 60;
    static FixedDeltaTime: number = 1 / GameMgr.FPS;

    constructor() {
    }

    launchGame() {
        AldSDK.aldSendEvent('loading完成', false, { time: Date.now() });
        DebugCtrl.setEnable(true);
        // SoundMgr.playBGM();
        // 首页显示
        UIMgr.openUI(EUI.HomeView);
        // UIMgr.openUI(EUI.DebugView);
        this.changePhase(EGamePhase.Prepare);

        //逻辑帧 15
        Laya.timer.frameLoop(4, this, this.updateLogic);
        //渲染帧 60
        Laya.timer.frameLoop(1, this, this.updateRender);
        //缓存完成刷新游戏场景
        EventMgr.on(EventType.RefreshSkin, this, this.onRefreshSkin);
    }

    private onPreStartGame() {
        SceneMgr.instance.loadSceneData(UserData.instance.level, Laya.Handler.create(this, this.initEntity));
        this.adjustCamera();
    }

    /**
     * 刷新缓存关卡
     */
    refreshCacheStageLevel():void {
        EventMgr.event(EventType.RefreshLevel);
        this.onPreStartGame();
    }

    /**
     * 刷新选中皮肤
     */
    private onRefreshSkin(): void {
        var self = this, role = self.role;
        let skinId:number = self._skinId || ShopMgr.curSkinId
        role && role.changeModel(skinId);
        
        // SceneMgr.instance.refreshNPC(skinId); //刷新场景中的npc
    }

    private onStartGame() {
        var uInc = UserData.instance;
        AldSDK.aldSendEvent('%u-进入关卡');
        // SceneMgr.instance.loadSceneData(1, Laya.Handler.create(this, this.initEntity));
    }

    /**
     * @todo 游戏正常结束
     */
    private onGameOver(_result: any) {
        var uInc = UserData.instance;
        var stageLevel: number = uInc.level;
        var succeed = _result.succeed;
        /**
         * 刷新主页回调函数，关卡改变调用
         */
        var refresh = function () {
            EventMgr.event(EventType.RefreshLevel);
        };
        if (succeed) {
            // 检测是否最后一小关
            let nextStageLevel: number = stageLevel + 1;
            let stageLevelCfg = CfgDataMgr.instance.getStageLevelCfg(nextStageLevel);
            if (stageLevelCfg) {
                //下一小关
                console.log("下一小关", stageLevel);
                uInc.level = nextStageLevel;
                //进入
                this.initEntity(nextStageLevel);
                Laya.timer.once(300, this, this.adjustCamera, [true]);
                Laya.timer.once(350, this, this.changePhase, [EGamePhase.InGame]);
            } else {
                //下一关
                let nextStageLevel: number = Math.floor(stageLevel / 100 + 1) * 100 + 1;
                let stageLevelCfg2 = CfgDataMgr.instance.getStageLevelCfg(nextStageLevel);
                if (stageLevelCfg2) {
                    console.log("下一关", stageLevel);
                    uInc.level = nextStageLevel;
                } else {
                    console.log("已达最高关卡");
                }
                UIMgr.openUI(EUI.ResultView, stageLevel);
            }
            // 通关立即刷新
            refresh();
        } else {
            // 失败的话关闭后刷新
            UIMgr.openUI(0 < 0.5 ? EUI.FailView : EUI.ReviveView, stageLevel).setCloseCall(refresh);
        }
        AldSDK.aldSendEvent((uInc.isNewPlayer ? '新' : '老') + '用户-挑战' + (succeed ? '成功' : '失败'), true, { level: stageLevel });
    }

    /**
     * 延时弹出结束页
     */
    private onLaterOver(result?: any): void {
        // var self = this, jump = <JumpGameView>UIMgr.findUI(EUI.JumpGameView);    
        // // 如果弹出中继页且点了退出，无需操作
        // if (jump) {
        //     jump.setCloseCall(function (bool) {
        //         bool || self.onGameOver(result);
        //     });
        // }
        // else
        //     self.onGameOver(result);
    }

    /**
     * 镜头调整
     */
    adjustCamera(_isAnim: boolean = false): void {
        // if (SceneMgr.instance.cameraCtrl) {
        //     SceneMgr.instance.cameraCtrl.moveToForward(25, _isAnim);
        // }
    }

    changePhase(phase: EGamePhase, result: any = null) {
        if (this._curPhase == phase) return;
        switch (phase) {
            case EGamePhase.Prepare:
                this.onPreStartGame();
                break;
            case EGamePhase.InGame:
                this.onStartGame();
                break;
            case EGamePhase.Over:
                Laya.timer.once(500, this, this.onLaterOver, [result]);
                break;
        }
        this._curPhase = phase;
    }

    isCurPhase(phase: EGamePhase): boolean {
        return this._curPhase == phase;
    }

    isGamming() {
        return this._curPhase == EGamePhase.InGame;
    }

    updateLogic() {
        if (!this.isGamming()) return;
        if (this.role) {
            this.role.updateLogic(GameMgr.nowTime);
        }
        // for(let i=0; i<this._playerCnt; i++) {
        //     this._players[i].updateLogic(GameMgr.nowTime);
        // }
        // SceneMgr.instance.updateLogic();
    }

    updateRender() {
        GameMgr.nowTime = Laya.timer.currTimer;
        GameMgr.deltaTime = Laya.timer.delta * 0.001;
        if (GameMgr.deltaTime > 1)//切后台回来时间过长
        {
            GameMgr.deltaTime = 0;
        }
        this._frameCnt++;
        if (GameMgr.nowTime - this._lastTimer >= 1000) {
            GameMgr.FPS = Math.round((this._frameCnt * 1000) / (GameMgr.nowTime - this._lastTimer));
            this._lastTimer = GameMgr.nowTime;
            this._frameCnt = 0;
        }
    }

    private initEntity(_stageLevel:number=0) {
        if (this.role) {
            this.role.destroy();
            this.role = null;
        }
        let smallStage:number = _stageLevel;
        // //主角
        // let roleNode: Laya.Sprite3D = SceneMgr.instance.getStageNode('Role', smallStage);
        // if (roleNode) {
        //     // console.log("Role_01", roleSp);
        //     if (this.role ==null) {
        //         let prefabSp = Laya.loader.getRes(ESprite3D.Role).getChildAt(0) as Laya.Sprite3D;
        //         if (prefabSp) {
        //             prefabSp = prefabSp.getChildByName("Role_01") as Laya.Sprite3D;
        //             let roleSp = Laya.Sprite3D.instantiate(prefabSp, roleNode.parent, false, roleNode.transform.localPosition) as Laya.Sprite3D;
        //             if (roleSp) {
        //                 this.role = roleSp.addComponent(RolePlayer);
        //             }
        //         }
        //     }
        // }
        // if (this.role) {
        //     //球
        //     let ballNode: Laya.Sprite3D = SceneMgr.instance.getStageNode('Football', smallStage);
        //     if (ballNode) {
        //         // console.log("Role_01", roleSp);
        //         let prefabSp = Laya.loader.getRes(ESprite3D.Props).getChildAt(0) as Laya.Sprite3D;
        //         if (prefabSp) {
        //             prefabSp = prefabSp.getChildByName("Football_01") as Laya.Sprite3D;
        //             let ballSp = Laya.Sprite3D.instantiate(prefabSp, ballNode.parent, false, ballNode.transform.localPosition) as Laya.Sprite3D;
        //             if (ballSp) {
        //                 // console.log("Football_01", ballSp);
        //                 this.role.setBall(ballSp);
        //             }
        //         }
        //     } else {
        //         console.warn("ballNode", ballNode);
        //     }
        //     //球门
        //     let goalSp: Laya.Sprite3D = SceneMgr.instance.getStageNode('QiuMen_01', smallStage);
        //     if (goalSp) {
        //         // console.log("QiuMen", goalSp);
        //         this.role.setGoal(goalSp);
        //     } else {
        //         let goalSp2: Laya.Sprite3D = SceneMgr.instance.getStageNode('QiuMen_02', smallStage);
        //         if (goalSp2) {
        //             // console.log("QiuMen", goalSp);
        //             this.role.setGoal(goalSp2);
        //         } else {
        //             console.warn("goalSp", goalSp);
        //         }
        //     }
        //     this.role.initData();
        // } else {
        //     console.warn("this.role", this.role);
        // }
        // // 刷新皮肤
        // this.onRefreshSkin();
    }

    /**
     * @todo 开始游戏
     */
    public startGame(): void {
        this.changePhase(EGamePhase.InGame);
    }

    /**
     * @todo 暂停游戏
     */
    public pauseGame(): void {
        this.changePhase(EGamePhase.Pause);
    }

    /**
     * @todo 重置游戏进度
     * @param revive 是否复活
     */
    public restart(revive?: boolean): void {
        // 界面重置
        this.changePhase(EGamePhase.Prepare);
        // 进入游戏
        Laya.timer.frameOnce(2, this, this.changePhase, [EGamePhase.InGame]);
    }

    /**
     * @todo 返回主页，若还在游戏中，则直接结束游戏
     */
    public backHome(): void {
        var self = this;
        var view = <HomeView>UIMgr.findUI(EUI.HomeView);
        self.changePhase(EGamePhase.Prepare);
        self._skinId = null;        // 清除试用皮肤
        view && view.resetGame(false);
    }

    /**
     * @todo 设置试玩皮肤，大关结束后切换使用中皮肤
     * @param skinId 皮肤ID
     */
    public setTrySkin(skinId: number): void {
        var self = this;
        self._skinId = skinId;
        self.role.changeModel(skinId);

        // SceneMgr.instance.refreshNPC(skinId); //刷新场景中的npc
    }
}