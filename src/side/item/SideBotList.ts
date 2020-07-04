import { ui } from "../../ui/layaMaxUI";
import AutoScroll from "../../util/AutoScroll";
import SideMgr from "../mgr/SideMgr";
import SideUtils from "../mgr/SideUtils";

/**
 * 主页底部卖量
 */
export default class SideBotList extends ui.view.side.SideBotListUI {

    /**
     * 重写
     * @param datas 
     */
    protected initView(datas: ISideboxData[]): void {
        var self = this, ltCont = self.ltCont;
        self.refresh();
        ltCont.addComponent(AutoScroll);
        ltCont.selectEnable = true;
        ltCont.selectHandler = Laya.Handler.create(self, self.onSelect, void 0, false);
        // 刷新
        self.timer.loop(10000, self, self.refresh);
    }

    /**
     * 重写
     */
    protected onClear(): void {
        super.onClear();
        var self = this;
        self.timer.clearAll(self);
        self.ltCont.selectHandler.recover();
    }

    /**
     * 重写
     */
    protected onCancel(): void {
        SideMgr.showMore();
    }

    /**
     * 重写
     */
    protected onRemoved(data: ISideboxData): void {
        var self = this;
        if (SideMgr.hasSide()) {
            let array = self.ltCont.array;
            for (let i = 0, len = array.length; i < len; i++) {
                if (array[i] == data) {
                    self.changeItem(i, data);
                }
            }
        }
        else {
            self.onClose();
        }
    }

    /**
     * 选中
     */
    protected onSelect(index: number): void {
        var self = this;
        var ltCont = self.ltCont;
        var data = ltCont.selectedItem;
        if (data) {
            self.changeItem(index, data);
            ltCont.selectedIndex = -1;
            super.onClick(data);
        }
    }

    /**
     * 改变子项数据
     */
    protected changeItem(index: number, data: ISideboxData): void {
        var rand = SideUtils.randomInArray(SideMgr.getSides(), data);
        this.ltCont.setItem(index, rand);
    }

    /**
     * 刷新图标
     */
    public refresh(): void {
        var self = this, caches = SideMgr.getSides();
        // 首次全部消失时显示banner
        if (caches.length == 0) {
            self.onClose();
        }
        else {
            self.ltCont.array = SideUtils.randomSort(caches)
        }
    }
}