import { ui } from "../ui/layaMaxUI";
import GameMgr from "../mgr/GameMgr";
import UIMgr from "../mgr/UIMgr";
import EUI from "../const/EUI";
import UserData from "../mgr/UserData";
import CfgDataMgr from "../mgr/CfgDataMgr";
import AldPlatform from "../platform/AldPlatform";
import FlyGold from "../core/ui/FlyGold";
import Utils from "../util/Utils";

/**
 * 成功通关页
 * @example dataSource类型：number，表示关卡，若101
 */
export default class ResultView extends ui.view.ResultViewUI {

    /**
     * 重写
     */
    public onEnable(): void {
        var self = this, imgClose = self.imgClose;
        self.regClick(imgClose, self.onClose);
        // 误触
        Utils.showMisTouch(imgClose);
        // 自动增加金币
        var uInc = UserData.instance, level = self.dataSource;
        var config = CfgDataMgr.instance.getStageLevelCfg(level);
        if (config) {
            let addGold = config.coinReward;
            self.lblAddGold.text = addGold + '';
            // uInc.addGold(addGold);
        }
        self.lblLevel.text = '关卡' + (level / 100 | 0); 
        self.lblGold.text = uInc.gold + '';
        // 卖量
        self.sideGrid.setAldEvent('结算页-卖量');
    }

    /**
     * 点击关闭
     */
    protected onClose(): void {
        var self = this;
        var endCall = function () {
            AldPlatform.aldSendEvent('结算页' + (UserData.instance.isNewPlayer ? '新' : '老') + '用户-下一关');
            UIMgr.closeUI(EUI.ResultView);
            GameMgr.instance.backHome();
        };
        // 飞金币
        var fly = <FlyGold>self.flyGold;
        var point = new Laya.Point(0, 0);
        self.imgGold.localToGlobal(point);
        fly.init(22, 120, 140);
        fly.play(point, 1, 0.5).then(function () {
            self.lblGold.text = UserData.instance.gold + '';
            self.timer.once(200, null, endCall);
        });
        self.mouseEnabled = false;
        // 增加金币
        UserData.instance.gold += (parseInt(self.lblAddGold.text));
    }
}