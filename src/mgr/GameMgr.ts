
import EventMgr from "./EventMgr";
import RolePlayer from "../logic/entity/RolePlayer";
import EventType from "../const/EventType";
import UIMgr from "./UIMgr";
import EUI from "../const/EUI";
import UserData from "./UserData";
import CfgDataMgr from "./CfgDataMgr";
import SceneMgr from "./SceneMgr";
import Player from "../logic/entity/Player";
import AldSDK from "../platform/AldSDK";
import ShopMgr from "./ShopMgr";
import BaseProp from "../logic/entity/BaseProp";
import DebugCtrl from "../util/DebugCtrl";
import SoundMgr from "./SoundMgr";

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
    private _playerCnt: number = 1;
    private _props:Array<BaseProp>;

    private _curPhase: EGamePhase = EGamePhase.None;

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
        SoundMgr.playBGM();

        if(platform.isOppo) {
            platform.reportMonitor('game_scene', 0);
        }

        // 首页显示
        this.initEntities();
        this.changePhase(EGamePhase.Prepare);

        //逻辑帧 15
        Laya.timer.frameLoop(4, this, this.updateLogic);
        //渲染帧 60
        Laya.timer.frameLoop(1, this, this.updateRender);
        
        this.addEvents();
    }
    
    private addEvents(){
        EventMgr.on(EventType.RefreshSkin, this, this.onRefreshSkin);        
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
                Laya.timer.once(500, this, this.onGameOver, [result]);
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

    //初始化游戏对象实体
    private initEntities() {
        this._players = new Array<Player>();

        let player: Player;
        for (let i = 0; i < this._playerCnt; i++) {
            let playerObj: Laya.Sprite3D = new Laya.Sprite3D("Player" + i, false);
            SceneMgr.instance.scene.addChild(playerObj);
            if (i == 0) {
                player = playerObj.addComponent(RolePlayer);
                this.role = player;
            }
            else {
                player = playerObj.addComponent(Player);
            }
            player.setPlayerId(i);
            this._players[i] = player;
        }
    }

    private onPreStartGame() {
        UIMgr.openUI(EUI.HomeView);
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
    }

    private onStartGame() {
        AldSDK.aldSendEvent('%u-进入关卡');
        // SceneMgr.instance.loadSceneData(1, Laya.Handler.create(this, this.initEntity));
    }

    /**
     * @todo 游戏正常结束
     */
    private onGameOver(_result: any) {
        
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
     * @todo 设置试玩皮肤，大关结束后切换使用中皮肤
     * @param skinId 皮肤ID
     */
    public setTrySkin(skinId: number): void {
        var self = this;
        self._skinId = skinId;
        self.role.changeModel(skinId);
    }
}