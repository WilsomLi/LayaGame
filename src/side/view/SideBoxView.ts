import { ui } from "../../ui/layaMaxUI";
import SideMgr from "../mgr/SideMgr";
import UIMgr from "../../mgr/UIMgr";
import EventMgr from "../../mgr/EventMgr";
import AutoScroll from "../../util/AutoScroll";
import Utils from "../../util/Utils";
import UIUtils from "../../util/UIUtils";
import SoundMgr from "../../mgr/SoundMgr";
import Tween from "../../util/Tween";
import EUI from "../../const/EUI";

export default class SideBoxView extends ui.view.side.SideBoxViewUI {

    /**
     * 是否显示着
     */
    private $isShow: boolean = false;
    /**
     * 自动滚动脚本
     */
    private $scroll: AutoScroll;

    /**
     * 重写
     */
    public onDisable(): void {
        // console.info("++++++++++++++");
        this.$scroll = null;
    }

    /**
     * 重写
     */
    protected initView(datas: ISideboxData[]): void {
        var self = this, addc = UIUtils.addClick2, list = self.list,
            scrollBar = list.scrollBar;
        list.dataSource = Utils.randomSort(datas);
        // 点击相关
        addc(self.imgSlide, self.onClose, self);
        list.selectEnable = true;
        list.selectHandler = Laya.Handler.create(self, self.onSelect, void 0, false);
        // 动画相关
        (self.$scroll = list.addComponent(AutoScroll)).stop();  // 先不开始
        
    }

    /**
     * 重写
     */
    protected onSelect(index: number): void {
        var ltCont = this.list;
        var data = ltCont.selectedItem;
        if (data) {
            let rand = Utils.randomInArray(SideMgr.getSides(), data);
            super.onClick(ltCont.selectedItem);
            ltCont.selectedIndex = -1;
            ltCont.setItem(index, rand);
        }
    }
    
    onClose() {
        SoundMgr.playBtnClick();        
        UIMgr.closeUI(EUI.SideBoxView);
    }
}