
import YLSDK, { IBtnMisTouch } from "../../platform/YLSDK";
import SideMgr from "../mgr/SideMgr";
import SideMsg, { ESMessage } from "../mgr/SideMsg";
import SideNewMgr from "../mgr/SideNewMgr";
import GameConst from "../../const/GameConst";



/**
 * 卖量视图基类
 */
export default class SideView extends Laya.View {

    private $event: string;
    private $event1: string;
    /**
     * 新后台参数
     */
    protected paramId: string;
    private $uiConfig:IUIConfig;
    public $btnMisTouch:Laya.Image = null;
    private _misTouchBtnPos:Laya.Vector2 = new Laya.Vector2();

    /**
     * 初始化
     */
    public static init(): void {
        Laya.SideView = <any>SideView;
    }

    //// 界面逻辑 ////

    /**
     * 重写
     */
    public onEnable(): void {
        var self = this;
        self.showView(false);
        self.callLater(self.initSide);

    }

    /**
     * 初始化边栏信息
     */
    private initSide(): void {
        var self = this;
        // 加载侧边栏数据，存在则显示
        SideNewMgr.ins.getBoxDatasSync( (datas:IYDHW.GameBase.ISideBoxResult[])=> {
            // 未离开场景显示
            if (self.parent) {
                if (datas && datas.length > 0) {
                    self.once(Laya.Event.UNDISPLAY, self, self.onClear);
                    // 添加卖量刷新（目前只有移除）监听
                    SideMsg.register(ESMessage.S2S_REMOVE, self.onRemoved, self);
                    // 显示界面
                    self.showView(true);
                    self.showMisTouchBtn();
                    // 初始化界面
                    self.initView(datas);
                }
                else {
                    self.onClose();
                }
            }
        });
    }

    /**
     * 显示视图，由于卖量本身会受外部控制，因此自身的visible属性不能动，那么只能从子控件的visible入手
     * 目的：数据加载中视图不显示，待数据出来后才显示，而本身的visible可能是隐藏的状态，因此数据出来后显示的对象不能是本身
     * @param bool 
     */
    protected showView(bool: boolean): void {
        for (let i = 0, len = this.numChildren; i < len; i++) {            
            let sp = this.getChildAt(i) as laya.display.Sprite;
            if(sp) {
                sp.visible = bool;
            }
        }
    }

    /**
     * 初始化界面，子类重写该方法绘制界面
     * @param datas 卖量数据
     */
    protected initView(datas: IYDHW.GameBase.ISideBoxResult[]): void {

    }

    /**
     * 离开父控件调用
     */
    protected onClear(): void {
        var self = this;
        SideMsg.remove(ESMessage.S2S_REMOVE, self.onRemoved, self);
    }

    /**
     * 开关被关闭时调用
     */
    protected onClose(): void {
        this.removeSelf();
    }

    /**
     * 绑定数据和点击事件
     * @param img 图标
     * @param data 数据
     * @param datas 数据列表，如存在则会将img的旧数据存入
     */
    protected bind(img: Laya.ISideIcon, data: IYDHW.GameBase.ISideBoxResult, datas?: IYDHW.GameBase.ISideBoxResult[]): void {
        var self = this, type = Laya.Event.CLICK;
        var old = img.dataSource;
        img.skin = data.icon;
        img.dataSource = data;
        if (datas && old) {
            datas.push(old);
        }
        img.off(type, self, self.onClick)
        img.on(type, self, self.onClick, [data]);
    }

    /**
     * 点击图标
     */
    protected onClick(side: IYDHW.GameBase.ISideBoxResult): void {
        var self = this;
        SideMsg.notice(ESMessage.S2C_CLICK_BTN);
        // 小程序跳转
        if (side) {
            let appId = side.toAppid;
            if (appId) {
                // 打点
                let event = self.$event;
                let event1 = self.$event1;
                let reqC2SClick = function (enable: boolean) {
                    event && SideMsg.notice(ESMessage.S2C_DOT_SERVER, event, side, enable);
                };

                window.ydhw_wx && window.ydhw.NavigateToMiniProgram(side._id, side.toAppid, side.toUrl, "", this, (success)=>{
                    if(success) {
                        self.onSuccess(side);
                        reqC2SClick(true);
                    } else {
                        self.onCancel(side);
                        reqC2SClick(false);
                    }
                })

                if (event) {
                    // 阿拉点
                    let param = <any>{ iconId: side._id };
                    SideMsg.notice(ESMessage.S2C_DOT_ALD, event, param);
                }
                if (event1) {
                    SideMsg.notice(ESMessage.S2C_DOT_EVENT, event1, self.paramId);
                }
            }
        }
    }

    /**
     * 跳转成功
     */
    protected onSuccess(data: IYDHW.GameBase.ISideBoxResult): void {
        // 卖量屏蔽
        SideMsg.notice(ESMessage.S2C_REMOVE, data)
    }

    /**
     * 跳转取消，子类重写
     */
    protected onCancel(data: IYDHW.GameBase.ISideBoxResult): void {

    }

    /**
     * 移除时回调，子类重写
     */
    protected onRemoved(data: IYDHW.GameBase.ISideBoxResult): void {
        
    }

    /**
     * 设置打点事件
     */
    public setAldEvent(event: string, event1: string): void {
        this.$event = event;
        this.$event1 = event1;
    }

    /**
     * 设置界面误触
     */
    public showMisTouchBtn(): void {
        let misTouchInfo = YLSDK.ins.getBtnMisData() as IBtnMisTouch;
        let moveTime = misTouchInfo.btnTime;        
        let time = moveTime || 0;
        let buttonName = this.$uiConfig ? this.$uiConfig.misTouch : '';
        if(misTouchInfo.switch && buttonName && time && this[buttonName])
        {
            let misTouchBtn = this[buttonName];
            this._misTouchBtnPos.setValue(misTouchBtn.x, misTouchBtn.y);
            misTouchBtn.bottom = 60;

            Laya.timer.once(time, this, () => {
                misTouchBtn.bottom = NaN;
                let x = this._misTouchBtnPos.x + misTouchBtn.width * (misTouchBtn.anchorX || 0);
                let y = this._misTouchBtnPos.y + misTouchBtn.height * (misTouchBtn.anchorY || 0);

                misTouchBtn.pos(x, y);            
            })
        }
    }
}