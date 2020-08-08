import { ui } from "./../ui/layaMaxUI";
import UIMgr from "../mgr/UIMgr";
import EUI from "../const/EUI";
import SideNewMgr from "../side/mgr/SideNewMgr";
import SideLeftList from "../side/view/SideLeftList";

/**
 * 主页   误触已经集成到框架，请统一使用
 */
export default class HomeView extends ui.view.HomeViewUI {

    public onAwake(){
        super.onAwake();
        UIMgr.closeUI(EUI.LoadingView);
        this.regClick(this.btnStart,this.onStart);
    }

    private onStart(){
        if(SideNewMgr.ins.hasSide())
        {
            UIMgr.openUI(EUI.SideBoxView, ()=>{                
                if(window.ydhw_wx && window.ydhw_wx.SwitchTouch)
                {
                    UIMgr.openUI(EUI.GoldenEggView, ()=>{
                        UIMgr.openUI(EUI.FailView);
                    })
                }
                else
                {
                    UIMgr.openUI(EUI.FailView);
                }
            })
        }
        else
        {
            UIMgr.openUI(EUI.FailView);
        }
    }
}