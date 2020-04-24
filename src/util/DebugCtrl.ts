import UIMgr from "../mgr/UIMgr";
import GameMgr from "../mgr/GameMgr";
import SceneMgr from "../mgr/SceneMgr";
import CameraDebug from "./CameraDebug";
import EUI from "../const/EUI";

export default class DebugCtrl {

    private static _clickCnt: number = 0;
    private static _lastClickTime: number = 0;

    static setEnable(active:boolean) {
        if(active) {
            Laya.stage.on(Laya.Event.KEY_UP, this, this.showDebugView);
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        }
        else {
            Laya.stage.off(Laya.Event.KEY_UP, this, this.showDebugView);
            Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        }
        this._clickCnt = 0;
        this._lastClickTime = 0;
    }

    private static showDebugView(event: Laya.Event): void {
        switch(event.keyCode) {
            case Laya.Keyboard.F4:
                if (UIMgr.findUI(EUI.DebugView)) {
                    UIMgr.closeUI(EUI.DebugView);
                } else {
                    UIMgr.openUI(EUI.DebugView);
                }
                break;
            case Laya.Keyboard.F2:
                let camera:Laya.Camera = SceneMgr.instance.cameraCtrl.camera;
                SceneMgr.instance.cameraCtrl.destroy();
                let debug:CameraDebug = camera.addComponent(CameraDebug);
                debug.setActive(true);
                break;
        }
    }

    private static onMouseDown(e: Laya.EventData): void {
        let x = Laya.stage.mouseX;
        let y = Laya.stage.mouseY;
        if (x > Laya.stage.width / 4 || y > Laya.stage.height / 4) {
            return;
        }
        if (this._lastClickTime == 0)
            this._lastClickTime = GameMgr.nowTime;
        let deltaTime = GameMgr.nowTime - this._lastClickTime;
        if (deltaTime > 2000) {
            this._clickCnt = 0;
            this._lastClickTime = 0;
            return;
        }

        this._clickCnt++;
        this._lastClickTime = GameMgr.nowTime;
        if (this._clickCnt > 5) {
            UIMgr.updateUI(EUI.DebugView);
        }
    }

}