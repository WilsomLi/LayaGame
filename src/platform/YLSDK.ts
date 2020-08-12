import SideNewMgr from "../side/mgr/SideNewMgr";
import GameConst from "../const/GameConst";
import EventMgr from "../mgr/EventMgr";
import EventType from "../const/EventType";
import UIMgr from "../mgr/UIMgr";

/**
 * 只需要把对应的 自定义字段往后面加就好了   顺序随便改变。
 * 注意：以后字段尽量全渠道统一，这里的枚举以后就是规范
 * code by lx
 */
export enum EYLCustomSwitch {
    Record_screen_popup,     //录屏弹窗  每隔多少关出现录屏弹窗
    Video_Unlock_lvl,        //视频解锁关卡  a值：是否开启视频解锁关卡功能，0关1开    b值：从第几关开始需视频解锁关卡    c值：从b关开始每隔c关需视频解锁关卡
    Check_box,               //页面复选框 （a,b,c）   a：开关,0关1开    b：延迟多少秒出现        c：每隔多少关默认/取消勾选
    Insert_screen,           //插屏    （a,b,c）    进游戏多长时间后可以显示插屏广告：a秒后    插屏广告间隔时间：b秒      插屏广告延迟弹出：c秒
    Native_Ads,              //原生广告
    Skin_trial,              //皮肤试用
    Lucky_wheel,             //幸运转盘/签到   幸运转盘主动拉起时机（a,b)   a：首次拉起的关卡b：后续拉起间隔的关卡
    Game_scene_banner,       //游戏中banner    游戏中是否展示banner（开关）
    Button_mistake,          //按钮误触    （a,b,c）    a：开关，0关1开    b：banner出现时     c：按钮上移时间
    Baoxiang,                //宝箱（砸金蛋）误触功能   （a,b,c）  a：是否展示    b：从多少关开始出现   c：从b关开始每隔c关出现
    Button_to_banner,        //按钮贴近banner     按钮是否贴近banner（开关）
    Text_button,             //文字按钮（基础方案）     （a,b）   a：是否展示，0关1开    b：延迟多少秒出现
    False_close_button,      //右上角关闭按钮（基础方案）   （a,b）    a：是否展示，0关1开   b：延迟多少秒出现
    End_page_style,          //结算页（基础方案）  选择展示样 式几的按钮
    Game_name,               //游戏名称（基础方案）  游戏名称是否展示（开关）
    More_games,              //更多游戏按钮（基础方案）     更多游戏按钮是否展示（开关）
    Game_scene_elect,        //游戏中互推（基础方案）   游戏中互推是否展示（开关）
    Pendant_8_elect,         //主页挂件8宫格icon（基础方案）  主页挂件8宫格icon是否展示（开关）
}

export interface IBtnMisTouch {
    switch: number,
    bannerTime: number,
    btnTime: number
}

export interface IInsertScreen {
    switch: number,             //插屏广告
    firstDelayTime: number,     //进游戏多久弹插屏
    spaceTime: number,          //间隔多久谈一次
    delayPopTime: number        //创建后多久显示
}

var sdkSuport = typeof(ydhw) != "undefined";

export default class YLSDK {
    private static _customSwitch = [];


    private static _shortcuttime: number = 0;
    private static _insertBannerShowTime: number = 0;  //计入第一次展示的时间
    private static _insertBanerLastShowTime: number = 0; //记录上一次展示时间
    private static _canShowInsertBanner = false;
    private static _isNativeAdShow: boolean = false;

    //native 数据
    private static _nativeData: any[] = [];




    //专门的按钮误触开关
    private static _btnMisTouchInfo: IBtnMisTouch = <IBtnMisTouch>{};
    private static _insertScreenInfo: IInsertScreen = <IInsertScreen>{};

    private static _fuckAwayPaths = {};
    private static _recordStartTime:number = 0;
    public static recorderTime:number;

    public static get isWX():boolean {
        return typeof(ydhw_wx) != "undefined";
    }

    public static get isTT():boolean {
        return typeof(ydhw_tt) != "undefined";
    }

    /**
     * 登录成功后 玩家基本数据都可以通过ydhw.的方式获得 具体信息查看 ILoginResult
     */
    public static init(): void {
        if(!sdkSuport) return;
        ydhw.Login(this, (isOK) => {
            if (isOK) {
                SideNewMgr.ins.getBoxDatasSync();
                GameConst.MisTouchSwitch = window.ydhw.SwitchTouch;
                ydhw.GetCustomConfig(this, (res: IYDHW.GameBase.ICustomConfigResult[]) => {
                    YLSDK.initCustomSwitch(res)
                })

                ydhw.GetLayerList((layerList: IYDHW.GameBase.ILayerInfo[]) => {
                    for (let i = 0; i < layerList.length; i++) {
                        let info = layerList[i] as IYDHW.GameBase.ILayerInfo;
                        if (!this._fuckAwayPaths[info.layer]) {
                            this._fuckAwayPaths[info.layer] = [];
                        }

                        this._fuckAwayPaths[info.layer].push(info);
                    }
                })
            }
        })
    }

    /**
     * 自定义开关
     * @param data 
     */
    public static initCustomSwitch(datas: IYDHW.GameBase.ICustomConfigResult[]): void {
        if (!datas) {
            console.warn("未获取到自定义开关配置数据");
            return
        }

        for (let index = 0; index < datas.length; index++) {
            const e: IYDHW.GameBase.ICustomConfigResult = datas[index];
            if (EYLCustomSwitch[e.name] == void 0) {
                console.warn('Warn：请在枚举中 添加对应的自定义开关  e.name = ', e.name);
            }
            else {
                this._customSwitch[EYLCustomSwitch[e.name]] = e.value;
            }
        }
    }

    /**
     * 获得自定义开关  注意！！返回的是字符串, （0  1 之类的都是字符串）
     * @param type 
     */
    public static getCustomSwitch(type: EYLCustomSwitch): string {
        return this._customSwitch[type];
    }

    /**
     * 按钮误触信息
     */
    public static getBtnMisData(): IBtnMisTouch {
        if (this._customSwitch[EYLCustomSwitch.Button_mistake]) {
            let serverInfo = this._customSwitch[EYLCustomSwitch.Button_mistake] as String;
            let datas = serverInfo.split(',');

            this._btnMisTouchInfo.switch = Number(datas[0]);
            this._btnMisTouchInfo.bannerTime = Number(datas[1]);
            this._btnMisTouchInfo.btnTime = Number(datas[2]);
        }

        return this._btnMisTouchInfo;
    }

    /**
     * 获得插屏的信息
     */
    public static getInsertScreenData(): IInsertScreen {
        if (this._customSwitch[EYLCustomSwitch.Insert_screen]) {
            let serverInfo = this._customSwitch[EYLCustomSwitch.Insert_screen] as String;
            let datas = serverInfo.split(',');

            this._insertScreenInfo.switch = Number(datas[0]);
            this._insertScreenInfo.firstDelayTime = Number(datas[1]);
            this._insertScreenInfo.spaceTime = Number(datas[2]);
            this._insertScreenInfo.delayPopTime = Number(datas[3]);
        }

        return this._insertScreenInfo;
    }

    /**
     * 获取流失路径管理
    */
   public static getFuckAwayData(layer: string): IYDHW.GameBase.ILayerInfo[] {
        return this._fuckAwayPaths[layer];
    }


    /**
     * oppo 添加 游戏窗口    还没再3.0SDK 测试！！
     */
    public static shortcut() {
        if (ydhw_oppo) {
            ydhw.HasShortcutInstalled(this, (res) => {
                let foolState = false;
                let timedelay: number = 0;
                if (this._shortcuttime === 0) {
                    this._shortcuttime = Date.now();
                    foolState = true;
                } else {
                    timedelay = Date.now() - this._shortcuttime;
                    if (timedelay > 60 * 1000) {
                        this._shortcuttime = Date.now();
                        foolState = true;
                    }
                }
                // 判断图标未存在时，创建图标
                if (res == false && foolState) {
                    ydhw.InstallShortcut(this, () => {
                        Laya.timer.once(500, this, () => {
                            EventMgr.event(EventType.AddDesktopSuccess);
                        });
                    }, () => {

                    }, () => {

                    })
                }
                else {
                    console.log("用户有添加 游戏");
                }
            }, (err) => {
                console.log(err);
            }, () => {

            })
        }
    }

    /**
     * 插屏广告  还未测试
     */
    public static createInserstitialAd() {
        let insertData: IInsertScreen = this.getInsertScreenData();
        if (!insertData.switch)
            return;

        if (this._canShowInsertBanner === false) {
            let curtimeInterval = Date.now() - this._insertBannerShowTime;
            if (curtimeInterval > 1000 * insertData.firstDelayTime) {//第一次展示时间间隔
                this._canShowInsertBanner = true;
            }

            console.log("插屏  时间判断", curtimeInterval);
        }

        if (this._insertBanerLastShowTime !== 0) {
            let curtimeLasttime = Date.now() - this._insertBanerLastShowTime;
            if (curtimeLasttime < insertData.spaceTime) {
                console.log("插屏展示时间加个太短  ");
                return;
            }
        }
        if (window.ydhw_wx && this._canShowInsertBanner && insertData.switch) {//开关控制   时间  10秒 平台 判断
            Laya.timer.once(GameConst.InsertBannerDelayTime, this, () => {
                ydhw.CreateInterstitialAd(true, this, () => {
                    ydhw.ShowInterstitialAd();
                    ydhw.HideBannerAd();
                    this._insertBanerLastShowTime = Date.now();
                }, () => {
                }, () => {
                    if (this._isNativeAdShow) { }
                    else {//没有原生广告时候出现banner
                        ydhw.ShowBannerAd();
                    }
                })
            })
        }
    }

    /**
     * 创建native
     */
    public static createNative(index: number, _callback: (data: IOppoNativeAdData) => void): void {
        if (ydhw_oppo) {
            ydhw.CreateNativeAd(this, (list) => {
                if (list) {
                    this._isNativeAdShow = true;
                    ydhw.ShowNativeAd();
                    var data: IOppoNativeAdData = list[0];
                    this._nativeData[index] = list;
                    _callback && _callback(data);
                }
                else {
                    this._isNativeAdShow = false;
                }
            })
        }
    }

    public static get nativeData(): any[] {
        return this._nativeData;
    }


    /**
     * 原生广告点击
     * @param index 
     */
    public static clickNativeAd(index: number) {
        if (ydhw_oppo) {
            let list = this._nativeData[index];
            if (list) {
                ydhw.ClickNativeAd();
            }
        }
    }


    public static set shortcuttime(time: number) {
        this._shortcuttime = time;
    }

    public static set insertBannerShowTime(time: number) {
        this._insertBannerShowTime = time;
    }

    public static get isNativeAdShow(): boolean {
        return this._isNativeAdShow;
    }

    // 显示激励视频
    static showRewardVideoAd(callFun: (isOk: boolean) => void) {
        if(!sdkSuport) {
            callFun(true);
            return;
        }
        ydhw.ShowRewardVideoAd(0, true, this, (type: IYDHW.EM_VIDEO_PLAY_TYPE) => {
            console.log("video play state", type);

            let isOk=true;
            if (type == 2) {
                UIMgr.showTips("您的视频还没看完，无法获得奖励!");
                isOk = false;
            } else if (type == 0) {
                UIMgr.showTips("广告拉取繁忙，稍后再试!");
                isOk = false;
            }
            callFun(isOk);
        })
    }

    /**
     * 流失打点
     * @param name 后台配置名称
     * @param param 参数字典
     */
    static statisResult(name:string,param:object=null) {
        if(!sdkSuport) return;
        let fuckAwayLists = YLSDK.getFuckAwayData(name);
        fuckAwayLists && ydhw.StatisticResult(param);
    }

    /**
     * 事件打点
     * @param scene 
     * @param name 
     */
    static statisEvent(name:string,scene:string) {
        if(!sdkSuport) return;
        ydhw.StatisticEvent(name,scene);
    }

    static RecorderStart(): void {
        if(!sdkSuport || !YLSDK.isTT || this._recordStartTime>0) return;
        this._recordStartTime = new Date().getTime();
        console.log("-------------RecorderStart--------:", this._recordStartTime);
        //duration:录屏的时长，单位 s，必须 >3 &&  <= 300s（5 分钟）
        let duration = 100;
        ydhw_tt.RecorderStart(duration,
            (result) => {
                console.log("YLSDK -RecorderStart-onStart:", JSON.stringify(result));
            }, (result) => {
                console.log("YLSDK -RecorderStart-onError:", JSON.stringify(result));
            }
        );
    }
    // 停止录屏
    static RecorderStop() {
        if(!sdkSuport || !YLSDK.isTT || this._recordStartTime==0) return;
        this._recordStartTime = 0;
        this.recorderTime = (new Date().getTime() - this._recordStartTime) * 0.001;
        console.log("-------------RecorderStop--------:", this.recorderTime);
        ydhw_tt.RecorderStop(() =>{});
    }

    /**
     * tt 分享
     */
    static ShareVideo(title:string, desc:string, query:string, success:Function) {
        if (!sdkSuport ||!YLSDK.isTT) {
            success && success();
            return;
        }
        ydhw_tt.ShareVideo(title,desc,query, (isOk: boolean)=> {
            console.log("分享回调", isOk);
            if (isOk) {
                success && success();
            }
            else {
                console.log(isOk);
                UIMgr.showTips("分享视频失败!");
            }

        });
    }
}