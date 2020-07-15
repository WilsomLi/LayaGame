import { ui } from "../../ui/layaMaxUI";
import Tween from "../../util/Tween";
import TimeLineUtils from "../../util/TimeLineUtils";
import UserData from "../../mgr/UserData";
import UIMgr from "../../mgr/UIMgr";
import EUI from "../../const/EUI";


/**
 * 砸金蛋
 */
export default class GoldenEggView extends ui.view.side.GoldenEggViewUI {


    /**
     * 锤子动画
     */
    private $tween: Tween;
    /**
     * 一锤子增加的进度
     */
    private $addProb: number = 0.1;
    /**
     * 每4帧减少的进度
     */
    private $subProb: number = 0.01;
    /**
     * 当前进度
     */
    private $curProb: number = 0;
    /**
     * 启动时间
     */
    private $startTime: number;
    /**
     * 总时间
     */
    private $total: number = 9000;

    private isBanner: boolean = false;
    /**倒计时 剩余时间 */
    private time_: number = 0;  //毫秒

    private _handAni:Laya.TimeLine;

    /**
    * 重写
    */
    public onEnable(): void {

        var self = this, timer = self.timer, imgBtn = self.imgBtn;
        self.regClick(imgBtn, self.onClick);
        self.$startTime = Date.now();
        self.showBanner(false);
        self.isBanner = false;
        this.time_ = Math.random() * 1000 + 2000;
        timer.frameLoop(4, self, self.onSubProb);

        this._handAni = TimeLineUtils.tweenUpdown(this.imgHand,20,30,300);
        this._handAni.play(0,true);
    }

    /**
     * 显示banner
     */
    protected showBanner(visible: boolean): void {
        // visible ? (YLSDK.ylBannerAdShow()) : YLSDK.ylBannerAdHide();
        if(visible)
        {
            window.ydhw_wx && ydhw.ShowBannerAd()

        }
        else
        {
            window.ydhw_wx && ydhw.HideBannerAd()
        }
    }

    /**
     * 关闭
     */
    protected onClose(): void {
        let diamond =Math.floor(Math.random() * 40 + 10);
        // UserData.instance.addDiamond(diamond);
        UserData.instance.gold += diamond;
        this.clear();
        UIMgr.closeUI(EUI.GoldenEggView);
        (this.dataSource && typeof this.dataSource  === "function") && (this.dataSource());
        UIMgr.showTips("获得金币奖励" + diamond);
    }

    /**
     * 清除动画逻辑
     */
    protected clear(): void {
        var self = this;
        var tween = self.$tween;
        if (tween) {
            tween.clear();
            self.$tween = null;
        }
        self.timer.clearAll(self);
        if(this._handAni) {
            this._handAni.destroy();
            this._handAni = null;
        }
    }

    /**
     * 设置遮罩
     */
    protected setMask(value: number): void {
        var graphics = this.spMask.graphics;
        graphics.clear();
        graphics.drawRect(0, 0, value * 417, 50, '#0');
    }

    /**
     * 开砸
     */
    protected onClick(): void {
        var self = this;
        // var tween = self.$tween || (self.$tween = Tween.get(self.imgHam, { once: false }));
        // tween.to({
        //     rotation: 10
        // }, 100).to({
        //     rotation: -10
        // }, 200).to({
        //     rotation: 10
        // }, 200).to({
        //     rotation: -10
        // }, 200).to({
        //     rotation: 0
        // }, 100);
        this.ani1.play(0, false);
        self.onAddProb();
    }

    /**
     * 减少进度
     */
    protected onSubProb(): void {
        var self = this;
        var value = self.$curProb = Math.max(0, self.$curProb - self.$subProb);
        // 更新时间
        var remain = self.$total - Date.now() + self.$startTime;
        self.setMask(value);
        if (remain > 0) {
            self.lblRem.text = (remain / 1000 | 0) + '秒';

            if (!self.isBanner && remain < this.time_) {
                self.isBanner = true;
                self.showBanner(true);
            }
        }
        else {
            self.onClose();
        }
        // self.hideBanner();
    }

    /**
     * 增减进度
     */
    protected onAddProb(): void {
        var self = this;
        var curProb = self.$curProb += self.$addProb;
        self.setMask(curProb);
        if (curProb >= 0.5) {
            let imgEgg = self.imgEgg;
            self.closeParam = true;
            self.clear();
            imgEgg.skin = imgEgg.skin.replace('0', '1');
            self.mouseEnabled = false;
            // 显示banner
            self.showBanner(true);
            // 两秒后关闭
            self.timer.once(2000, self, self.onClose);
        }
    }
}