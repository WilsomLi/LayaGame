import { ui } from "../../ui/layaMaxUI";
import AutoScroll from "../../util/AutoScroll";
import SideUtils from "../mgr/SideUtils";
import SideNewMgr from "../mgr/SideNewMgr";

/**
 * 主页底部卖量
 */
export default class SideDoubleList extends ui.view.side.SideDoubleListUI {

    /**
     * 重写
     * @param datas 
     */
    protected initView(datas: IYDHW.GameBase.ISideBoxResult[]): void {
        var self = this
        self.refresh();

        // this.leftList.addComponent(AutoScroll);
        // this.rightList.addComponent(AutoScroll);

        this.rightList.selectEnable = true;
        this.rightList.selectHandler = Laya.Handler.create(self, self.onRightSelect, void 0, false);

        this.leftList.selectEnable = true;
        this.leftList.selectHandler = Laya.Handler.create(self, self.onLeftSelect, void 0, false);

        // 刷新
        self.timer.loop(5000, self, self.refresh);
    }

    /**
     * 重写
     */
    protected onClear(): void {
        super.onClear();
        var self = this;
        self.timer.clearAll(self);
        self.leftList.selectHandler.recover();
        self.rightList.selectHandler.recover();
    }

    /**
     * 重写
     */
    protected onCancel(): void {
        SideNewMgr.ins.showMore();
    }

    /**
     * 重写
     */
    protected onRemoved(data: IYDHW.GameBase.ISideBoxResult): void {
        var self = this;
        if (SideNewMgr.ins.hasSide()) {
            let array = self.rightList.array;
            for (let i = 0, len = array.length; i < len; i++) {
                if (array[i] == data) {
                    self.changeItem(self.rightList, i, data);
                }
            }

            array = self.leftList.array;
            for (let i = 0, len = array.length; i < len; i++) {
                if (array[i] == data) {
                    self.changeItem(self.leftList, i, data);
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
    protected onLeftSelect(index: number): void {
        var self = this;
        var ltCont = self.leftList;
        var data = ltCont.selectedItem;
        if (data) {
            self.changeItem(ltCont, index, data);
            ltCont.selectedIndex = -1;
            super.onClick(data);
        }
    }

    protected onRightSelect(index: number): void {
        var self = this;
        var ltCont = self.rightList;
        var data = ltCont.selectedItem;
        if (data) {
            self.changeItem(ltCont, index, data);
            ltCont.selectedIndex = -1;
            super.onClick(data);
        }
    }

    /**
     * 改变子项数据
     */
    protected changeItem(list:Laya.List, index: number, data: IYDHW.GameBase.ISideBoxResult): void {
        var rand = SideUtils.randomInArray(SideNewMgr.ins.getBoxDatas(), data);
        list.setItem(index, rand);
    }

    /**
     * 刷新图标
     */
    public refresh(): void {
        var self = this, caches = SideNewMgr.ins.getBoxDatas();
        // 首次全部消失时显示banner
        if (caches.length == 0) {
            self.onClose();
        }
        else {
            let array = SideUtils.randomSort(caches);
            let lefts = []
            let rights = []

            for(let i = 0; i < 4; i++)
            {
                lefts.push(array[i]);
            }

            for(let i = 4; i < 8; i++)
            {
                rights.push(array[i]);
            }

            self.leftList.array = lefts;
            self.rightList.array = rights;
        }
    }
}