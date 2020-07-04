
import Tween from "../../util/Tween";
import TweenModel from "../../util/TweenModel";
import { ui } from "../../ui/layaMaxUI";

/**
 * 主页底部卖量子项
 */
export default class SideBotItem extends ui.view.item.SideBotItemUI {

    /**
     * 重写
     */
    public onEnable(): void {
        TweenModel.swingTween(this.imgNew);
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
            if (bool) {
                ani1.gotoAndStop(0);
            }
            else {
                ani1.play(0, true);
            }
        }
    }
}