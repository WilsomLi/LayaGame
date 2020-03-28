import { ui } from "./../ui/layaMaxUI";
import DataStatistics from "../core/DataStatistics";
import GameMgr from "../mgr/GameMgr";
import AldSDK from "../platform/AldSDK";
import UserData from "../mgr/UserData";
import GameConst from "../const/GameConst";
import UIMgr from "../mgr/UIMgr";
import EventMgr from "../mgr/EventMgr";
import EventType from "../const/EventType";
import CfgDataMgr from "../mgr/CfgDataMgr";
import Utils from "../util/Utils";
import TrySkinMgr from "../mgr/TrySkinMgr";
import EUI from "../const/EUI";
import SideMgr from "../side/mgr/SideMgr";
import SideMsg, { ESMessage } from "../side/mgr/SideMsg";

/**
 * 主页
 */
export default class HomeView extends ui.view.HomeViewUI {

    private _camera: Laya.Camera;
    private _ballpos: Laya.Vector3 = new Laya.Vector3;
    private _color: string;

    /**
     * 显示页面，由loading调用
     */
    public onAwake(): void {
        var self = this, imgMore = self.imgMore, eInc = EventMgr;
        self.regClick(self.imgRelay, self.onRelay);
        self.regClick(self.imgPause, self.onPause);
        self.regClick(imgMore, self.onMore);
        self.regClick(self.imgSkin, self.onSkin);
        self.regClick(self.imgStart, self.onStart);
        // 测试需求
        Utils.multipleClick(self.imgGold, 6, 300, self.onDebug, self);
        // 界面初始
        self.resetGame(false);
        // 打点
        AldSDK.homeTime = Date.now();
        AldSDK.aldSendEvent((UserData.instance.isNewPlayer ? '新' : '老') + '用户-loading完成');
        // 事件
        self.regEvent(EventType.RefreshLevel, self.updateLevel);
        self.regEvent(EventType.RefreshGold, self.updateGold);
        self.regEvent(EventType.CloseSide, self.onCloseSide);       // 每日屏蔽卖量
        self.regEvent(EventType.CheckNewDay, self.onCloseSide);     // 每日屏蔽卖量
        // 卖量打点
        self.sideList.setAldEvent('主页-猜你喜欢');
        self.sideIcon0.setAldEvent('主页-右上角卖量');
        self.sideIcon1.setAldEvent('关卡内-右上角卖量');
        // 关卡/金币调整
        Laya.timer.frameOnce(2, null, function () {
            let point = platform.getMenuButtonBoundingClientRect();
            if (point) {
                let temp = Laya.Point.TEMP;
                let top = temp.y = Utils.screenToStage(point.top);
                // 刘海屏保证额外高度
                if (Utils.checkPhoneIsBangs())
                    temp.y = Math.max(88, top);
                self.globalToLocal(temp);
                top = temp.y;
                self.imgGoldBg.y += top - 72;
            }
        });
        // 由于首次加载过慢，打开游戏页后再关掉loading
        UIMgr.closeUI(EUI.LoadingUI);
        // 添加桌面功能
        if (platform.isOppo) {
            platform.hasShortcut(function (bool) {
                if (!bool) {
                    // 显示桌面图标 todo
                    // 首次发起安装
                    platform.installShortcut(function (bool: boolean) {
                        console.log('是否安装成功', bool);
                        // 安装成功隐藏图标 todo
                    });
                }
            });
        }
    }

    /**
     * 重写
     */
    public onDisable(): void {
        var self = this;
        EventMgr.off(EventType.RefreshLevel, self, self.updateLevel);
    }

    /**
     * 显示调试
     */
    protected onDebug(): void {
        UIMgr.openUI(EUI.DebugView);
    }

    /**
     * 点击中继按钮
     */
    protected onRelay(): void {
        // AldSDK.aldSendEvent('主页-中继页');
        // if (UserData.instance.hasSideData())
        //     UIMgr.openUI(EUI.JumpGameView, {
        //         eventName: '主页中继页卖量',
        //         eventName1: '主页中继页-'
        //     }).setCloseCall(function (bool: boolean) {
        //         bool && platform.exitMiniProgram();  
        //     });
        // else
        //     platform.exitMiniProgram();    
    }
    /**
     * 点击暂停
     */
    protected onPause(): void {
        // var self = this;
        // AldSDK.aldSendEvent('关卡内-中继页');
        // if (UserData.instance.hasSideData()) {
        //     GameMgr.instance.pauseGame();
        //     UIMgr.openUI(EUI.JumpGameView, {
        //         eventName: '关卡内中继页卖量',
        //         eventName1: '关卡内中继页-'
        //     }).setCloseCall(self.onCloseGame, self);
        // }
        // else {
        //     self.onCloseGame(true);
        // }
    }

    /**
     * 结束游戏回调
     * @param bool 是否点击了中继页的退出
     */
    protected onCloseGame(bool?: boolean): void {
        var gInc = GameMgr.instance;
        if (bool) {
            gInc.backHome();
        }
        else {
            gInc.startGame();
        }
    }

    /**
     * 点击更多游戏
     */
    protected onMore(): void {
        AldSDK.aldSendEvent('主页-更多好玩');
        UIMgr.openUI(EUI.MoreGameView);
    }

    /**
     * 点击皮肤
     */
    protected onSkin(): void {
        AldSDK.aldSendEvent('主页-皮肤%u用户');
        // UIMgr.openUI(EUI.SkinView);
    }


    /**
     * 点击开始游戏
     */
    protected onStart(): void {
        // var self = this;
        // /**
        //  * 进游戏触发的回调
        //  */
        // var enter = function () {
        //     self.resetGame(true);
        //     // 直接开始游戏
        //     GameMgr.instance.startGame();
        // };
        // AldSDK.aldSendEvent("主页-" + (UserData.instance.isNewPlayer ? "新" : "老") + "用户开始游戏",
        //     true, { level: UserData.instance.level });
        // // 皮肤试用
        // if (TrySkinMgr.canTry()) {
        //     let skinId = TrySkinMgr.getRandomSkinId();
        //     if (skinId > 0) {
        //         // 关闭后进入游戏
        //         UIMgr.openUI(EUI.TrySkinView, skinId).setCloseCall(enter);
        //         return;
        //     }    
        // }
        // // 直接进游戏
        // enter();
    }

    /**
     * 关闭卖量触发回调
     */
    protected onCloseSide(): void {
        this.imgMore.visible = SideMgr.hasSide();
    }

    /**
     * 重置游戏界面
     * @param isStart 是否开启游戏
     */
    public resetGame(isStart: boolean): void {
        var self = this;
        self.vwMain.visible = !isStart;
        self.vwGame.visible = isStart;
        // 开始游戏
        if (isStart) {
        }
        // 回到游戏
        else {
            self.updateLevel();
            self.updateGold();
        }
    }

    /**
     * 更新关卡
     */
    public updateLevel(): void {
    }

    /**
     * 更新金币
     */
    public updateGold(): void {
        this.lblGold.text = UserData.instance.gold + '';
    }
}