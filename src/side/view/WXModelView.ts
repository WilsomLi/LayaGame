import { ui } from "../../ui/layaMaxUI";
import Utils from "../../util/Utils";
import UIMgr from "../../mgr/UIMgr";
import { EUI } from "../../const/EUI";
import YLSDK from "../../platform/YLSDK";
import SideMgr from "../mgr/SideMgr";

/**
 * 仿微信界面
 */
export default class WXModelView extends ui.side.WXModelViewUI {

    /**
     * 重写
     */
    protected initView(datas: ISViewData[]): void {
        var self = this, ltCont = self.ltCont, height = 120;
        self.refresh();
        ltCont.selectEnable = true;
        ltCont.selectHandler = Laya.Handler.create(self, self.onSelect, void 0, false);
        Utils.addClick(self.boxBack, self.onClose, self);
        self.setAldEvent('仿微信界面卖量');
        // 适配
        var point = platform.getMenuButtonBoundingClientRect();
        if (point) {
            let newt = self.boxTop.top = Utils.screenToStage(point.top);
            height += (newt - 34);
        }
        self.spGray.graphics.drawRect(0, 0, 760, height, '#ededed');
        // 刷新
        // self.timer.loop(10000, self, self.refresh);

        YLSDK.ylBannerAdHide();
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
    protected onClear(): void {
        var self = this;
        super.onClear();
        self.timer.clearAll(self);
        self.ltCont.selectHandler.recover();
    }

    /**
     * 点击关闭
     */
    protected onClose(): void {
        UIMgr.closeUI(EUI.WXModelView);
    }

    /**
     * 重写
     */
    protected onRemoved(data: ISViewData): void {
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
            ltCont.selectedIndex = -1;
            self.changeItem(index, data);
            super.onClick(data);
        }
    }

    /**
     * 改变子项数据
     */
    protected changeItem(index: number, data: ISViewData): void {
        var rand = Utils.randomInArray(SideMgr.getSides(), data);
        this.ltCont.setItem(index, rand);
    }

    /**
     * 刷新图标
     */
    public refresh(): void {
        var self = this, caches = SideMgr.getSides(), cLen = caches.length;
        // 首次全部消失时显示banner
        if (cLen == 0) {
            self.onClose();
        }
        else {
            let datas = [], randomSort = Utils.randomSort;
            randomSort(caches = caches.concat());
            // 随机四星
            for (let i = 0; i < cLen; i++) {
                let data = datas[i] = <IWXModelItemData>Utils.copy(caches[i]);
                data.star = i < 4;
            }
            self.ltCont.array = randomSort(datas);
        }
    }
}