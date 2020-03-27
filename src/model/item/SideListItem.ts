import { ui } from "../../ui/layaMaxUI";

/**
 * 卖量列表子项
 */
export default class SideListItem extends ui.item.SideListItemUI {
    
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
            self.imgIcon.skin = data.icon;
            self.lblName.text = data.title;
        }
    }
}