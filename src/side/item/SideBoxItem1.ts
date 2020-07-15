import { ui } from "../../ui/layaMaxUI";
import TweenModel from "../../util/TweenModel";
import Tween from "../../util/Tween";

/**
 * 大盒子卖量子项
 */
export default class SideBoxItem1 extends ui.view.item.SideBoxItem1UI {

    /**
     * 重写
     */
    public onAwake(): void {
        var self = this;
        //TweenModel.swingTween(self.imgNew);
    }

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
        self.refresh();
    }

    /**
     * 刷新
     */
    public refresh(): void {
        var self = this;
        var data = self.dataSource;
        if (data) {
            self.imgIcon.skin = data.icon;
            self.lblName.text = data.title;
           // self.imgNew.skin = 'side/img_' + (Math.random() < 0.5 ? 'new' : 'hot') + '.png';
            // self.boxGold.visible = !data.isAwarded;
        }
    }
}