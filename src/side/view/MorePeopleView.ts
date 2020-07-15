import { ui } from "../../ui/layaMaxUI";
import UIMgr from "../../mgr/UIMgr";
import EUI from "../../const/EUI";
import Utils from "../../util/Utils";
import SideUtils from "../mgr/SideUtils";
import SideNewMgr from "../mgr/SideNewMgr";
import UIUtils from "../../util/UIUtils";

/**
 * 很多王八蛋都在玩
 */
export default class MorePeopleView extends ui.view.side.MorePeopleViewUI{
 
    private $datas: IYDHW.GameBase.ISideBoxResult[];
     /**
     * 重写
     */
    protected initView(caches: IYDHW.GameBase.ISideBoxResult[]): void {
        var self = this, ltCont = self.list;
        self.$datas = caches.concat();
        self.refresh();
        ltCont.selectEnable = true;
        ltCont.selectHandler = new Laya.Handler(self, self.onSelect);
        Laya.timer.loop(10000, self, self.refresh);
        this.btn_close.visible = false;
        
        UIUtils.addClick(self.btn_close, self.onClose);
        Laya.timer.once(2000,this,function(){ 
            self.btn_close.visible = true;
        })
    }

    protected onSelect(index: number): void {
        var self = this;
        var ltCont = self.list;
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
    protected changeItem(index: number, data: IYDHW.GameBase.ISideBoxResult): void {
        var rand = SideUtils.randomInArray(SideNewMgr.ins.getBoxDatas(), data);
        this.list.setItem(index, rand);
    }
  
 /**
     * 刷新图标
     */
    public refresh(): void {
        var self = this, caches = SideNewMgr.ins.getBoxDatas(), chLen = caches.length;
        if (chLen == 0) {
            self.onClose();
        }
        else {
            // 限定8个
            let len = 50, datas = self.$datas, ltCont = self.list, oldData = ltCont.array;
            if (datas.length < len) {
                let disL = len - chLen;
                self.$datas = datas = caches.concat();
                // 当数据的长度小于子项的长度时，从缓存里面随机取出来
                while (disL-- > 0)
                    datas.push(caches[disL % chLen]);
            }
            SideUtils.randomSort(datas);
            self.list.array = datas.splice(0, len);
            // 存入旧数据
            oldData && datas.push.apply(datas, oldData);
        }
    }

     /**
     * 重写
     */
    protected onRemoved(data: IYDHW.GameBase.ISideBoxResult): void {
        var self = this;
        if (SideNewMgr.ins.hasSide()) {
            // 刷新显示列表
            let array = self.list.array;
            for (let i = 0, len = array.length; i < len; i++) {
                if (array[i] == data) {
                    self.changeItem(i, data);
                }
            }
            // 更新未显示列表
            let datas = self.$datas;
            let index = datas.indexOf(data);
            index > -1 && datas.splice(index, 1);
        }
        else {
            self.onClose();
        }
    }

    
    /**
     * 重写
     */
    protected onClear(): void {
        var self = this;

        super.onClear();
        self.$datas = null;
        self.list.selectHandler.recover();
        Laya.timer.clear(self, self.refresh);

        UIMgr.openUI(EUI.SideBoxView, ()=>{
            (this.dataSource && typeof this.dataSource  === "function") && (this.dataSource());
        })
    }

    /**
     * 重写
     */
    protected onCancel(): void {
        SideNewMgr.ins.showMore();
    }

    onClose(){ 
        UIMgr.closeUI(EUI.MorePeopleView);
    }

}