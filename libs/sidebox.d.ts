//// 卖量TS版参数说明文件，建议拷进工程时将该文件置于libs目录下 ////

/**
 * 卖量格式：同socket版本格式，为防止后期socket删除该字段，所以此处拷贝一份
 */
interface ISideboxData {
    sideboxId?: number;         // 盒子id
    type?: number;              // 0，小程序。1，图片
    title?: string;             // 标题
    icon?: string;              // 图标
    status?: number;            // 状态 0，关。1，开
    innerStatus?: number;       // 是否内部标识，0不是，1是
    showTime?: number;          // 显示时间
    jumpAppid?: string;         // 跳转appid
    path?: string;              // 跳转路径
    shieldIos?: number;         // 是否屏蔽ios，0不屏蔽，1屏蔽
}

/**
 * 游戏平台信息
 */
interface IPlatform {
    /**
     * 游戏应用ID
     */
    appId: string | number;
    /**
     * 游戏当前版本号
     */
    version: string;
    /**
     * 小程序跳转
     * @param data 
     */
    navigateToMiniProgram(data: any): void;
    /**
     * 获取系统信息
     */
    getSystemInfoSync(): any;
    /**
     * 获取胶囊体位置
     */
    getMenuButtonBoundingClientRect(): any;
}

/**
 * 卖量文件格式
 */
interface IAdConfig {
    version: string;                            // 文件格式的版本号，注意不是游戏的版本号，后期格式发生变动，需要用其来检测文件是否生效
    timestamp: number;                          // 文件时间戳，单位秒，文件唯一标识符
    boxes: ISideboxData[];                      // 卖量列表
}

//// 卖量基类说明文件，支持在皮肤界面也能继承基类，需F9引入SideVide，并加上SideView.init();不使用SideView或者有自己一套管理的可删除下面注释 ////

declare module Laya {

    /**
     * 数据、皮肤、监听，包含三者的对象
     */
    interface ISideIcon extends EventDispatcher {
        dataSource: ISideboxData;
        skin?: string;
    }

    /**
     * 卖量基类
     */
    class SideView extends Laya.View {

        /**
         * 显示视图，由于卖量本身会受外部控制，因此自身的visible属性不能动，那么只能从子控件的visible入手
         * 目的：数据加载中视图不显示，待数据出来后才显示，而本身的visible可能是隐藏的状态，因此数据出来后显示的对象不能是本身
         * @param bool 
         */
        protected showView(bool: boolean): void;

        /**
         * 初始化界面，虚方法，子类重写该方法绘制界面
         * @param datas 卖量数据
         */
        protected initView(datas: ISideboxData[]): void;

        /**
         * 有数据时离开父控件调用，不为空
         */
        protected onClear(): void;

        /**
         * 无数据时调用，默认离开父控件
         */
        protected onClose(): void;

        /**
         * 绑定数据和点击事件
        * @param img 图标
        * @param data 数据
        * @param datas 数据列表，如存在则会将img的旧数据存入
         */
        protected bind(img: ISideIcon, data: ISideboxData, datas?: ISideboxData[]): void;

        /**
         * 图标点击事件
         */
        protected onClick(data: ISideboxData, e?: Laya.Event): void;

        /**
         * 跳转取消
         */
        protected onCancel(data: ISideboxData): void;

        /**
         * 数据移除时调用，必须重写，多个卖量存在时，卖量删除会同时触发该函数
         */
        protected onRemoved(data: ISideboxData): void;

        /**
         * 发送阿拉丁打点
         * @param event 事件名
         * @param level 是否传送等级参数
         */
        public setAldEvent(event: string, level?: boolean): void;
    }
}