import { ui } from "../../ui/layaMaxUI";


/**
 * 更多卖量子项
 */
export default class MoreGameItem1 extends ui.view.item.MoreGameItem1UI {
    
    /**
     * 获取数据源
     */
    public get dataSource(): IYDHW.GameBase.ISideBoxResult {
        return this._dataSource;
    }

    /**
     * 设置数据源
     */
    public set dataSource(data: IYDHW.GameBase.ISideBoxResult) {
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
        }
    }
}