import { ui } from "../../ui/layaMaxUI";

export default class OverGameItem extends ui.view.item.OverGameItemUI {

    /**
     * 获取数据源
     */
    public get dataSource(): ISViewData {
        return this._dataSource;
    }

    /**
     * 设置数据源
     */
    public set dataSource(data: ISViewData) {
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
        }
    }
}