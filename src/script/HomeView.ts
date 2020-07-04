import { ui } from "./../ui/layaMaxUI";
import UIMgr from "../mgr/UIMgr";
import EUI from "../const/EUI";

/**
 * 主页
 */
export default class HomeView extends ui.view.HomeViewUI {

    public onAwake(){
        UIMgr.closeUI(EUI.LoadingView);

        this.regClick(this.btnStart,this.onStart);
    }

    private onStart(){
        
    }
}