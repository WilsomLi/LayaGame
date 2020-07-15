import { ui } from "../ui/layaMaxUI";
import UIMgr from "../mgr/UIMgr";
import EUI from "../const/EUI";
import GameMgr from "../mgr/GameMgr";
import UserData from "../mgr/UserData";
import AldSDK from "../platform/AldSDK";
import Utils from "../util/Utils";
import SideNewMgr from "../side/mgr/SideNewMgr";

/**
 * 失败页——失败，进度小于50%触发
 */
export default class FailView extends ui.view.FailViewUI {

    /**
     * 重写
     */
    public onEnable(): void {
        super.onEnable();
        var self = this, imgRestart = self.imgRestart;
        var prob = 0;
        self.lblProb.text = '完成' + prob + '%';
        self.regClick(imgRestart, self.onRestart);
        // 卖量
        self.sideGrid.setAldEvent('重新开始页-卖量');
    }

    /**
     * 点击重新开始
     */
    protected onRestart(): void {

        if(SideNewMgr.ins.hasSide())
        {
            UIMgr.closeUI(EUI.FailView);
            UIMgr.openUI(EUI.SideMoreGameView, ()=>{
                UIMgr.openUI(EUI.MorePeopleView, ()=>{
                    AldSDK.aldSendEvent('重新开始页' + (UserData.instance.isNewPlayer ? '新' : '老') + '用户-重新开始');
                    GameMgr.instance.restart();
                })
            })
        }
        else
        {
            UIMgr.closeUI(EUI.FailView);
            AldSDK.aldSendEvent('重新开始页' + (UserData.instance.isNewPlayer ? '新' : '老') + '用户-重新开始');
            GameMgr.instance.restart();
        }
    }
}