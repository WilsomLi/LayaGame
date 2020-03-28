import { ui } from "../../ui/layaMaxUI";
import TweenModel from "../../util/TweenModel";
import Tween from "../../util/Tween";
import SideUtils from "../mgr/SideUtils";

/**
 * 好消息子项
 */
export default class SideNewItem extends ui.item.SideNewItemUI {

    /**
     * 重写
     */
    public onEnable(): void {
        var self = this;
        var imgIcon = self.imgIcon;
        var mask = imgIcon.mask = new Laya.Sprite;
        SideUtils.drawRoundRect(mask.graphics, imgIcon.width, imgIcon.height, 25);
        TweenModel.swingTween(self.imgNew);
    }

    /**
     * 重写
     */
    public onDisable(): void {
        Tween.clear(this.imgNew);
    }

    /**
     * 获取数据源
     */
    public get dataSource(): ISideboxData {
        return this._dataSource;
    }

    /**
     * 设置数据源
     */
    public set dataSource(data: ISideboxData) {
        var self = this;
        self._dataSource = data;
        self.refresh();
    }

    /**
     * 刷新
     */
    public refresh(): void {
        var self = this;
        var data = self.dataSource;
        if (data) {
            let bool = self.imgNew.visible = Math.random() < 0.5, ani1 = self.ani1;
            self.imgIcon.skin = data.icon;
            self.lblName.text = data.title;
            if (bool) {
                ani1.gotoAndStop(0);
            }
            else {
                ani1.play(0, true);
            }
        }
    }
}