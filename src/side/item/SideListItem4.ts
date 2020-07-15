import { ui } from "../../ui/layaMaxUI";

/**
 * 卖量列表子项
 */
export default class SideListItem4 extends ui.view.item.SideListItem4UI{
    
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
            let rand = Math.floor(Math.random() * 2);
            self.imgRed.visible = rand == 0;
            self.imgIcon.skin = data.icon;
            self.lblName.text = data.title;
        }
    }
}