import { ui } from "../ui/layaMaxUI";
import UIMgr from "../mgr/UIMgr";
import YLSDK from "../platform/YLSDK";
import GameConst from "../const/GameConst";
import EventType from "../const/EventType";
import EUI from "../const/EUI";
import HomeView from "./HomeView";


export default class HomeSellView extends ui.view.HomeSellViewUI {

    onAwake() {
        this.regEvent(EventType.CloseUI,this.onCloseMoreGameView);
        this.regEvent(EventType.AddDesktopSuccess,this.refreshAddDesktop);

        this.regClick(this.btnMoreGame,this.onMoreGame);
        this.btnMoreGame.visible = GameConst.SideSwitch;

        this.regClick(this.addDesktop,this.onAddDesktop);
        this.regClick(this.nativeIcon,this.onNativeIcon);

        this.refresh();

        this.timer.loop(30000,this,this.refreshNative);
        this.refreshNative();
    }

    private refresh(){
        let startView = UIMgr.findUI(EUI.HomeView);
        let needShowNative = this.needShowNative();

        if(startView) {
            this.nativeBg.visible = needShowNative;
            this.addDesktop.visible = true;
        }
        else {
            this.nativeBg.visible = false;
            this.addDesktop.visible = false;
        }
        this.refreshAddDesktop();
    }

    private onMoreGame(){
        UIMgr.openUI(EUI.SideBoxView,null,true);

        this.btnMoreGame.visible = false;
        this.sell.visible = false;
    }

    private onCloseMoreGameView(uiCfg:IUIConfig){
        if(uiCfg == EUI.SideBoxView)
        this.btnMoreGame.visible = true;
        this.sell.visible = true;
    }

    private onAddDesktop(){
        let self = this;
        YLSDK.shortcuttime = Date.now();
        platform.installShortcut((isAdded:boolean)=>{
            Laya.timer.once(500,self,self.refreshAddDesktop);
        })
    }

    private refreshAddDesktop(){
        let self = this;
        platform.hasShortcut((isAdded:boolean)=>{
            self.addDesktopIcon.visible = !isAdded;
            if(self.addDesktopIcon.visible) {
                this.addIconAni.play(0,true);
            }
            else
            {
                this.addIconAni.stop();
                this.handImg.visible = false;
            }
        })
    }

    private onNativeIcon(){
        YLSDK.ylNativeAdClick(0);
    }

    private needShowNative():boolean {
        if(!GameConst.SwitchYS || !YLSDK.isNativeAdShow) return false;
        let arr = [
            EUI.SideBoxView,
            EUI.SettingView,
            EUI.GameView,
            EUI.TrySkinView,
        ]
        for(let i=0;i<arr.length;i++) {
            if( UIMgr.findUI(arr[i]) != null) {
                return false;
            }
        }
        return true;
    }

    private refreshNative(){
        if(this.needShowNative()==false) return;

        this.nativeBg.visible = false;
        YLSDK.ylNativeAdCreate(0,(data:IOppoNativeAdData)=>{
            this.nativeIcon.skin = data.iconUrlList[0];
            this.nativeBg.visible = true;
        })
    }
}