import { ui } from "../../ui/layaMaxUI";
import Tween from "../../util/Tween";

/**
 * 大盒子卖量子项
 */
export default class BigBoxItem0 extends ui.view.item.BigBoxItem0UI {

    /**
     * 获取数据源
     */
    public get dataSource(): IScoreBoardData {
        return this._dataSource;
    }

    /**
     * 设置数据源
     */
    public set dataSource(data: IScoreBoardData) {
        var self = this;
        self._dataSource = data;
        if (data) {
            self.imgIcon.skin = data.icon;
            self.labelname.text = data.title;
            // self.boxGold.visible = !data.isAwarded;
        }
    }
}