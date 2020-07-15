declare module Laya {

    /**
     * <code>UIBaseView</code> 是一个基础视图类，添加基本页面管理
     */
    class UIBaseView extends View {
        /**
         * 误触按钮
         */
        public $btnMisTouch:Laya.Image;
        /**
         * 自定义数据
         */
        public $userdata:any;

        // public usedata:any;
        /**
         * 关闭回调内的参数
         */
        protected closeParam: any;
        /**
         * 注册事件，只管注册，底层负责注销
         * @param eventName 事件名。
         * @param func 方法。
         */
        protected regEvent(eventName: string, func: Function): void;
        /**
         * 注册自身监听事件，同时清空之前注册事件
         * @param node 节点
         * @param func 回调
         * @param once 是否只触发一次
         * @param data 回调参数
         * @param time 多次点击阻断，默认300
         */
        protected regClick(node: Laya.Node, func: Function, once?: boolean, data?: any, time?: number): void;
        /**
         * 层级变化——显示时调用（创建不调用）
         */
        public onShow(): void;
        /**
         * 层级变化——被覆盖时调用
         */
        public onHide(): void;
        /**
         * 设置关闭回调
         * @param call 
         * @param thisObj 
         */

        /**
         * 界面事件打点，默认上报ui类名，需要自定义事件名的重载此方法
         */
        public eventCount():void;

        public setCloseCall(call: (param?: any) => void, thisObj?: any): void;
        /**
         * 设置界面误触
         * @param misTouchBtn  误触按钮 
         * @param  sec  时间
         */
        public showMisTouchBtn(sec:any, misTouchBtn?: any): void
    }
}

/**
 * 混淆函数
 */
declare let xxxx: Function;


//// 数据格式 ////

/**
 * Http返回参数
 */
interface ILoginInfo {
    accountId: number;
    isUserInfoFull: boolean;
    msg: string;
    newDayPlayer: boolean;      // 当天的新用户
    newPlayer: boolean          // 首次进入的新用户
    sessionId: string;
    success: boolean;
    userInfoFull: boolean;
    wenIp: string;
    wenPort: number;
}

/**
 * 成就配置子项
 */
interface IAchieCfg {
    id: number;
    type: number;
    index: number;      // 阶段
    name: string;
    condition: string;
    value: number;
    prize: string;
    reward: number;
    rewardType: number;
    parma: number;
    eventType: number;
    // 额外添加参数，只能获取，无法修改
    progress?: number;  // 进度
    // receive?: number;   // 已领取的阶段
    state?: number;     // 状态，0未完成，1可领取，2已完成
    // realIndex?: number; // 位于配置的实际下表
}

/**
 * 每日任务配置子项
 */
interface IDailyTaskCfg {
    id: number;
    grade: number;
    type: number;
    name: string;
    condition: string;
    value: number;
    prize: string;
    reward: number;
    rewardType: number;
    parma: number;
    eventType: number;
    // 额外添加参数，只能获取，无法修改
    progress?: number;  // 进度
    // receive?: number;   // 已领取的阶段
    state?: number;     // 状态，0未完成，1可领取，2已完成
    // realIndex?: number; // 位于配置的实际下表
}

/**
 * 每日签到配置
 * 注：类型说明：1为金币，其它为皮肤或动作ID；现在的原理是默认金币奖励，而皮肤或者动作是附加奖励
 */
interface IDailySignCfg {
    id: number;
    rewardNum: number;              // 奖励金币数量
    rewardName: string;             // 金币描述，即“金币”。。
    alternativeType: number;        // 附加奖励类型，现在可理解为奖励类型，全为金币
    alternativeRewardNum: number;   // 附加奖励ID（对应商城表），实际用于判断附加的类型
    alternativeRewardName: string;  // 附加奖励名称
    extraType: number;              // 再来一份奖励类型
    extra: number;                  // 再来一份奖励数量
}

/**
 * 商城配置
 */
interface IShopCfg {
    id: number;
    getType: number;            // 解锁类型，看ShopMgr
    tag: number;
    order: number;
    resources: string;
    ConsumptionType: number;    // 消耗类型，暂无用
    consumer: number;           // 消耗数量
    url: string;
    model: string;
    icon: string;
    resType: number;
    IsExperience: number;       // 是否能试用，1为是
    ExperienceNumber: number;   // 试用解锁次数
}

//// 视图数据接口 ////

/**
 * UI界面的配置
 */
interface IUIConfig {
    class: string;              // UI类路径
    mask?: boolean;             // 是否显示遮罩
    banner?: boolean;           // 是否显示banner
    tween?: boolean;            // 显示和隐藏伴随动画
    res?: any;                  // 预加载资源，格式同Laya.loader.load，暂无效
    misTouch?:string;           // 是否有误触  且传入误触按钮的名字 
    name?:string;               // event 事件
}

/**
 * 签到子项数据
 */
interface IDailySignItem {
    day: number;    // 天数
    kind: number;   // 奖励类型
    num: number;    // 奖励数量
    name: string;   // 奖励名称
    extra: number;  // 再来一份奖励
    shopId?: number;// 商城ID
}

/**
 * 皮肤子项数据
 */
interface ISkinItemData {
    id: number;
    getType: number;
    resources: string;
    consumer: number;
    tag: number;
    order: number;
    // isChoice: boolean;  // 是否选中
    isUnlock: boolean;  // 是否解锁
}

/**
 * 分享链接自定义参数
 */
interface IQueryData {
    from: string;
    accountId: number;      // 链接发起者
    sharecardId: number;    // 分享图卡片ID
}