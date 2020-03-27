import LEvent = Laya.Event;
import Tween from "./Tween";

type TRender = new () => Laya.UIComponent;

/**
 * 左右切换脚本，可无限左右滑动
 * 容器最多显示两张（初版）
 */
export default class SwitchLR extends Laya.Script {

    /** @prop {name:itemRender,tips:"渲染子项",type:Prefab} */

    /**
     * 绑定对象
     */
    public owner: Laya.Sprite;
    /**
     * 滚动结束是否自动定位
     */
    public local: boolean = true;

    /**
     * 缓存对象
     */
    private $caches: any[] = [];
    /**
     * 是否按下
     */
    private $isDown: boolean;
    /**
     * 按下的坐标
     */
    private $startX: number;
    /**
     * 移动过程的坐标
     */
    private $mouseX: number;
    /**
     * 单位宽度
     */
    private $unitW: number;
    /**
     * 滚动宽度
     */
    private $slideW: number;
    /**
     * 当前定位的值
     */
    private $slideX: number = 0;

    /**
     * 重写
     */
    public onEnable(): void {
        this.refresh();
    }

    /**
     * 重写
     */
    public onDisable(): void {
        var self = this;
        self.$caches = null;
        Laya.timer.clearAll(self);
    }

    /**
     * 修改缓存
     * @param index 缓存下标
     * @param value 缓存值
     */
    protected setCache(index: number, value: any): void {
        var self = this, caches = self.$caches;
        if (caches[index] !== value) {
            caches[index] = value;
            Laya.timer.frameOnce(1, self, self.refresh);
        }
    }

    /**
     * 添加活动监听
     */
    protected addEvent(): void {
        var self = this;
        var owner = self.owner;
        self.$slideW = (self.$unitW = owner.width) * self.array.length;
        owner.on(LEvent.MOUSE_DOWN, self, self.onMsDown);
    }

    /**
     * 鼠标按下
     */
    protected onMsDown(): void {
        var self = this, stage = Laya.stage;
        Tween.clearAll(self.owner);
        self.$isDown = true;
        self.$startX = self.$mouseX = Laya.stage.mouseX;
        stage.on(LEvent.MOUSE_MOVE, self, self.onMsMove);
        stage.on(LEvent.MOUSE_UP, self, self.onMsUp);
        stage.on(LEvent.MOUSE_OVER, self, self.onMsUp);
    }

    /**
     * 鼠标移动
     */
    protected onMsMove(): void {
        var self = this;
        if (self.$isDown) {
            let curX = Laya.stage.mouseX;
            self.slideX += self.$mouseX - curX;
            self.$mouseX = curX;
        }
    }

    /**
     * 鼠标松开
     */
    protected onMsUp(): void {
        var self = this;
        if (self.$isDown) {
            let stage = Laya.stage;
            self.$isDown = false;
            // 清理
            stage.off(LEvent.MOUSE_MOVE, self, self.onMsMove);
            stage.off(LEvent.MOUSE_UP, self, self.onMsUp);
            stage.off(LEvent.MOUSE_OVER, self, self.onMsUp);
            // 自动定位
            if (self.local) {
                self.onLocal();
            }
        }
    }

    /**
     * 自动定位
     */
    protected onLocal(): void {
        var self = this, slideX;
        var oldSX = self.slideX;
        var unitW = self.$unitW;
        var subX = self.$startX - self.$mouseX;
        if (Math.abs(subX) > 100) {
            oldSX += (subX > 0 ? 1 : -1) * unitW / 2;
        }
        slideX = Math.round(oldSX / unitW) * unitW;
        Tween.get(self).to({ slideX: slideX }, Math.abs(oldSX - slideX) / 2);
    }

    /**
     * 执行回调
     */
    protected excuteCall(view: Laya.UIComponent): void {
        var caches = this.$caches;
        var call = caches[2];
        call && call.call(caches[3], view);
    }

    /**
     * 设置渲染子项
     */
    public set itemRender(item: TRender) {
        this.setCache(0, item);
    }

    /**
     * 获取渲染子项
     */
    public get itemRender(): TRender {
        return this.$caches[0];
    }

    /**
     * 设置渲染数据
     */
    public set array(datas: any[]) {
        this.setCache(1, datas);
    }

    /**
     * 获取渲染子项
     */
    public get array(): any[] {
        return this.$caches[1];
    }

    /**
     * 定位当前X
     */
    public set slideX(value: number) {
        var self = this;
        var slideW = self.$slideW;
        if (value < 0) {
            self.slideX = (value + 100 * slideW) % slideW;
        }
        else if (self.$slideX !== value) {
            let unitW = self.$unitW;
            let index = (value = value % slideW) / unitW | 0;
            let array = self.array;
            self.$slideX = value;
            value = value % unitW;
            let childA = self.owner.getChildAt(0) as Laya.UIComponent;
            let childB = self.owner.getChildAt(1) as Laya.UIComponent;
            childA.x = -value;
            childB.x = unitW - value;
            childA.dataSource = array[index];
            childB.dataSource = array[(index + 1) % array.length];
        }
    }

    /**
     * 获取当前滚动的X值
     */
    public get slideX(): number {
        return this.$slideX;
    }

    /**
     * 刷新界面
     */
    public refresh(): void {
        var self = this;
        var owner = self.owner;
        if (owner) {
            let render = self.itemRender, array = self.array, len = array && array.length;
            if (render && len > 0) {
                let width = owner.width, height = owner.height;
                len = Math.min(len, 2);
                for (let i = 0; i < len; i++) {
                    let item = new render;
                    item.dataSource = array[i];
                    item.size(width, height);
                    item.x = width * i;
                    owner.addChild(item);
                    self.excuteCall(item);
                }
                len == 2 && self.addEvent();
            }
        }
    }

    /**
     * 设置渲染回调
     */
    public setRenderCall(call: (view: any) => void, thisObj?: any): void {
        var caches = this.$caches;
        caches[2] = call;
        caches[3] = thisObj;
    }
}