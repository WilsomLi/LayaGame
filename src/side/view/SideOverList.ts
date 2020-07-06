import { ui } from "../../ui/layaMaxUI";
import SideMgr from "../mgr/SideMgr";
import MoreGameItem from "../item/SideBoxItem";
import UIMgr from "../../mgr/UIMgr";
import UIBaseView from "../../UIBaseView";
import Utils from "../../util/Utils";
import YLSDK from "../../platform/YLSDK";

export default class SideOverList extends ui.view.side.SideOverListUI {

    /**
     * 重写
     */
    protected initView(datas: ISideboxData[]): void {
        var self = this, ltCont = self.list;
        self.refreshList();
        this.timer.loop(5000, this, this.refreshList);

        ltCont.selectEnable = true;
        ltCont.selectHandler = new Laya.Handler(self, self.onSelect);        
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

    private refreshList() {
        //克隆数组
        let datas = SideMgr.getSides();
        if(!datas) return;
        let allData = datas.slice();
        Utils.shuffle(allData);
        let array = allData.slice(0, 8);
        this.list.array = array;
    }
}