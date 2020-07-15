import { ui } from "../../ui/layaMaxUI";
import YLSDK from "../../platform/YLSDK";

export default class SideBoxItem extends ui.view.item.SideBoxItemUI {

    onAwake() {
        this.on(Laya.Event.CLICK, this, this.JumpOtherGame);
    }
    public set dataSource(val) {
        //  console.log("val", val);
        this._dataSource = val;
        this.refresh();
    }

    public get dataSource() {
        return this._dataSource;
    }

    public refresh() {
        if (this.icon && this._dataSource) {
            this.icon.skin = this._dataSource.icon;
        }
    }

    private JumpOtherGame() {

        // YLSDK.ylNavigateToMiniProgram({
        //     _id: this._dataSource._id,
        //     toAppid: this._dataSource.toAppid,
        //     toUrl: this._dataSource.toUrl,
        //     type: this._dataSource.type,
        //     source: 'trygame',//从哪个模块导出的，该字段具体值由调用方
        // }, (status) => {
        //     if (status) {

        //     }
        //     else {

        //     }
        // });
    }
}