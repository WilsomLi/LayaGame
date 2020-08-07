import SideNewMgr from "../side/mgr/SideNewMgr";
import GameConst from "../const/GameConst";
import EventMgr from "../mgr/EventMgr";
import EventType from "../const/EventType";

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

export interface IBtnMisTouch{
    switch: number,
    bannerTime:number,
    btnTime:number
}

export interface IInsertScreen{
    switch:number,             //插屏广告
    firstDelayTime:number,     //进游戏多久弹插屏
    spaceTime:number,          //间隔多久谈一次
    delayPopTime:number        //创建后多久显示
}


export default class YLSDK
{
    private static _ins:YLSDK;
    private _customSwitch = [];


    private _shortcuttime: number = 0;
    private _insertBannerShowTime: number = 0;  //计入第一次展示的时间
    private _insertBanerLastShowTime: number = 0; //记录上一次展示时间
    private _canShowInsertBanner = false;
    private _isNativeAdShow:boolean = false;
    
    //native 数据
    private _nativeData:any[] = [];




    //专门的按钮误触开关
    private _btnMisTouchInfo:IBtnMisTouch = <IBtnMisTouch>{};
    private _insertScreenInfo:IInsertScreen = <IInsertScreen>{};

    private _fuckAwayPaths = {};
    
    private constructor(){}
    public static get ins():YLSDK
    {
        if(!this._ins)
        {
            this._ins = new YLSDK();
            this._ins.init();
        }

        return this._ins;
    }


    /**
     * 登录成功后 玩家基本数据都可以通过ydhw.的方式获得 具体信息查看 ILoginResult
     */
    private init():void
    {
        (window.ydhw_wx) && (window.ydhw.Login(this, (isOK)=>{
			if(isOK)
			{
				SideNewMgr.ins.getBoxDatasSync();
                GameConst.MisTouchSwitch = window.ydhw.SwitchTouch;
                ydhw.GetCustomConfig(this, (res: IYDHW.GameBase.ICustomConfigResult[])=>{
                    this.initCustomSwitch(res)
                })

                ydhw.GetLayerList((layerList: IYDHW.GameBase.ILayerInfo[])=>{
                    for(let i = 0; i < layerList.length; i++)
                    {
                        let info = layerList[i] as IYDHW.GameBase.ILayerInfo;
                        if(!this._fuckAwayPaths[info.layer])
                        {
                            this._fuckAwayPaths[info.layer] = [];
                        }

                        this._fuckAwayPaths[info.layer].push(info);
                    }
                })
			}
		}))
    }

    /**
     * 自定义开关
     * @param data 
     */
    private initCustomSwitch(datas: IYDHW.GameBase.ICustomConfigResult[]) :void
    {
        if (!datas) {
            console.warn("未获取到自定义开关配置数据");
            return
        }

        for (let index = 0; index < datas.length; index++) {
            const e:IYDHW.GameBase.ICustomConfigResult = datas[index];
            if(EYLCustomSwitch[e.name] == void 0)
            {
                console.warn('Warn：请在枚举中 添加对应的自定义开关  e.name = ', e.name);
            }
            else
            {
                this._customSwitch[EYLCustomSwitch[e.name]] = e.value;
            }
        }
    }

    /**
     * 获得自定义开关  注意！！返回的是字符串, （0  1 之类的都是字符串）
     * @param type 
     */
    public getCustomSwitch(type:EYLCustomSwitch):string 
    {
        return this._customSwitch[type];
    }

    /**
     * 按钮误触信息
     */
    public getBtnMisData():IBtnMisTouch
    {
        if(this._customSwitch[EYLCustomSwitch.Button_mistake])
        {
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
    public getInsertScreenData():IInsertScreen
    {
        if(this._customSwitch[EYLCustomSwitch.Insert_screen])
        {
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
    public getFuckAwayData(layer:string):IYDHW.GameBase.ILayerInfo[]
    {
        return this._fuckAwayPaths[layer];
    }


    /**
     * oppo 添加 游戏窗口    还没再3.0SDK 测试！！
     */
    public shortcut() {
        if(ydhw_oppo)
        {
            ydhw.HasShortcutInstalled(this, (res)=>{
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
                    ydhw.InstallShortcut(this, ()=>{
                        Laya.timer.once(500,this,()=>{
                            EventMgr.event(EventType.AddDesktopSuccess);
                        });
                    }, ()=>{

                    }, ()=>{

                    })
                }
                else {
                    console.log("用户有添加 游戏");
                }
            }, (err)=>{
                console.log(err);
            }, ()=>{

            })
        }
    }

   /**
    * 插屏广告  还未测试
    */
   public createInserstitialAd() {
        let insertData:IInsertScreen = this.getInsertScreenData();
        if(!insertData.switch)
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
                ydhw.CreateInterstitialAd(true, this, ()=>{
                    ydhw.ShowInterstitialAd();
                    ydhw.HideBannerAd();
                    this._insertBanerLastShowTime = Date.now();
                }, ()=>{
                }, ()=>{
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
    public createNative(index:number,_callback:(data:IOppoNativeAdData)=>void):void {
        if(ydhw_oppo)
        {
            ydhw.CreateNativeAd(this, (list)=>{
                if(list)
                {
                    this._isNativeAdShow = true;
                    // ydhw.ShowNativeAd();
                    var data:IOppoNativeAdData = list[0];
                    this._nativeData[index] = list;
                    _callback && _callback(data);
                }
                else
                {
                    this._isNativeAdShow = false;
                }
            })
        }
    }

    public get nativeData():any[]
    {
        return this._nativeData;
    }


    /**
     * 原生广告点击
     * @param index 
     */
    public clickNativeAd(index:number) {
        if (ydhw_oppo) {
            let list = this._nativeData[index];
            if(list) {
                // ydhw.ClickNativeAd();
            }
        }
    }


    public set shortcuttime(time:number)
    {
        this._shortcuttime = time;
    }

    public set insertBannerShowTime(time:number)
    {
        this._insertBannerShowTime = time;
    }

    public get isNativeAdShow():boolean
    {
        return this._isNativeAdShow;
    }
}





// // 解释型声明
// declare var wx: any;
// declare var qq: any;
// declare var qg: any;
// declare var tt: any;

// /**
//  * 是否微信环境
//  */
// var support = false;
// var pf: any;
// if (typeof wx !== 'undefined') {
//     pf = window['ydhw_wx'];
//     support = true;
// }
// else if (typeof qq !== 'undefined') {
//     pf = window['ydhw_qq'];
//     support = true;
// }
// else if (typeof qg !== 'undefined') {
//     pf = qg;
//     support = true;
// }
// else if (typeof tt !== 'undefined') {
//     pf = tt;
//     support = true;

// }

// /**
//  * YLSDK
//  */
// export default class YLSDK {

//     constructor() { }

//     //初始化SDK
//     static ylInitSDK(_callback: Function) {
//         if (support) {
//             pf.ylInitSDK(_callback);
//         }
//     }

//     //设置当前场景
//     static ylSetCurScene(_sceneName: string) {
//         if (support) {
//             pf.ylSetCurScene(_sceneName);
//         }
//     }

//     //获取开关及用户账号信息(SDK服务器的)
//     static ylGetUserInfo(): any {
//         if (support) {
//             return pf.ylGetUserInfo();
//         }
//         return null;
//     }

//     static GetServerInfo():any{
//         if (support) {
//             return pf.ylGetServerInfo();
//         }
//         return null;
//     }

//     //获取游戏APPID
//     static ylGetAppID(): string {
//         if (support) {
//             return pf.ylGetAppID();
//         }
//         return null;
//     }

//     //显示微信获取用户信息的按钮
//     static ylUserInfoButtonShow(_btnInfo: any): void {
//         pf.ylUserInfoButtonShow(_btnInfo);
//     }
//     //隐藏微信获取用户信息的按钮
//     static ylUserInfoButtonHide(): void {
//         pf.ylUserInfoButtonHide();
//     }

//     //获取用户微信账号信息
//     static ylGetUserpfInfo(): any {
//         if (support) {
//             return pf.ylGetUserpfInfo();
//         }
//         return null;
//     }

//     //获取开关信息
//     static ylGetSwitchInfo(): any {
//         if (support) {
//             return pf.ylGetSwitchInfo();
//         }
//         return null;
//     }

//     //小游戏跳转
//     static ylNavigateToMiniProgram(_jumpInfo: any, _callback: Function) {
//         if (support) {
//             pf.ylNavigateToMiniProgram(_jumpInfo, _callback);
//         } else {
//             _callback(true);
//         }
//     }

//     //获取侧边栏列表
//     static ylSideBox(_callback: Function) {
//         if (support) {
//             pf.ylSideBox(_callback);
//         }
//     }

//     //获取积分墙列表
//     static ylIntegralWall(_callback: Function) {
//         if (support) {
//             pf.ylIntegralWall(_callback);
//         }
//     }
//     //领取积分墙奖励
//     static ylGetBoardAward(_id: string, _callback: Function) {
//         if (support) {
//             pf.ylGetBoardAward(_id, _callback);
//         }
//     }

//     //获取分享图列表
//     static ylShareCard(_callback: Function) {
//         if (support) {
//             pf.ylShareCard(_callback);
//         }
//     }

//     //调用微信分享
//     static ylShareAppMessage(_callback: Function) {
//         if (support) {
//             pf.ylShareAppMessage(_callback);
//         }
//     }

//     //分享统计
//     static ylStatisticShareCard(_callback: Function) {
//         if (support) {
//             pf.ylStatisticShareCard(_callback);
//         }
//     }

//     //事件统计
//     static ylEventCount(_eventName: string) {
//         if (support) {
//             pf.ylEventCount(_eventName);
//         }
//     }

//     //获取自定义配置列表
//     static ylGetCustom(_callback: Function) {
//         if (support) {
//             pf.ylGetCustom(_callback);
//         }
//     }

//     //创建banner广告(填充屏幕宽度)
//     static ylBannerAdCreate(_show: boolean = false) {
//         if (support) {
//             pf.ylBannerAdCreate(_show);
//         }
//     }
//     //创建banner广告(小的)
//     static ylBannerAdCreateSmall() {
//         if (support) {
//             pf.ylBannerAdCreateSmall();
//         }
//     }
//     //显示banner广告
//     static ylBannerAdShow() {
//         if (support) {
//             pf.ylBannerAdShow();
//         }
//     }
//     //隐藏banner广告
//     static ylBannerAdHide() {
//         if (support) {
//             pf.ylBannerAdHide();
//         }
//     }
//     //创建视频广告
//     static ylCreateVideoAd() {
//         if (support) {
//             pf.ylCreateVideoAd();
//         }
//     }
//     //播放视频广告
//     static ylShowVideoAd(_callback_cancel, _callback_complete, _callback_fail, unlockCustomNum?) {
//         if (support) {
//             pf.ylShowVideoAd((status) => {
//                 switch (status) {
//                     case 0:
//                         _callback_fail && _callback_fail();
//                         break;
//                     case 1:
//                         _callback_complete && _callback_complete();
//                         break;
//                     case 2:
//                         _callback_cancel && _callback_cancel();
//                         break;
//                 }
//             }, unlockCustomNum);
//         } else {
//             _callback_complete && _callback_complete();
//         }
//     }

//     //创建格子广告
//     static ylCreateGridAd(_adInfo: any) {
//         if (support) {
//             pf.ylCreateGridAd(_adInfo);
//         }
//     }
//     //显示格子广告
//     static ylShowGridAd() {
//         if (support) {
//             pf.ylShowGridAd();
//         }
//     }
//     //隐藏格子广告
//     static ylHideGridAd() {
//         if (support) {
//             pf.ylHideGridAd();
//         }
//     }

//     //插屏广告
//     static ylCreateInterstitialAd(_show: boolean = true) {
//         if (support) {
//             pf.ylCreateInterstitialAd(_show);
//         }
//     }
//     static ylShowInterstitialAd() {
//         if (support) {
//             pf.ylShowInterstitialAd();
//         }
//     }

//     /** 录屏  状态回调  0  1  2 */
//     static ylRecorderStart(duration, _callback0, _callback1, _callback2) {
//         if (support) {
//             pf.ylRecorderStart(duration, (state) => {
//                 switch (state) {
//                     case 0:
//                         _callback0 && _callback0();
//                         break;
//                     case 1:
//                         _callback1 && _callback1();
//                         break;
//                     case 2:
//                         _callback2 && _callback2();
//                         break;
//                 }
//             })
//         }
//     }
//     /**停止录屏 */
//     static ylRecorderStop() {
//         if (support) {
//             pf.ylRecorderStop();
//         }
//     }
//     /**暂停录屏 */
//     static ylPause() {
//         if (support) {
//             pf.ylPause();
//         }
//     }
//     /**继续录屏 */
//     static ylResume() {
//         if (support) {
//             pf.ylResume();
//         }
//     }
//     /**获取录屏状态 */
//     static ylGetRecorderStatus() {
//         if (support) {
//             return pf.ylGetRecorderStatus();
//         }
//         return null;
//     }
//     /**获取录屏资源路径 */
//     static ylGetVideoPath() {
//         if (support) {
//             return pf.ylGetVideoPath();
//         }
//         return null;
//     }
//     /**分享视频  标题文字信息   成功回调  失败回调   videoPath  videoTopisc  必须填*/
//     static ylShareVideo(title, desc, query, videoPath, videoTopics, success, fail) {
//         if (support) {
//             let info = {
//                 channel: "",
//                 title: title,
//                 desc: desc,
//                 query: "",
//                 imageUrl: "",
//                 templateId: "",
//                 extra: {
//                     videoPath: videoPath,
//                     videoTopics: videoTopics
//                 }
//             };
//             pf.ylShareVideo(info, function (status) {
//                 console.log("分享回调", status);
//                 if (status) {
//                     success && success();
//                 }
//                 else {
//                     fail && fail();
//                 }

//             });
//             // tt.shareAppMessage({
//             //     channel: "video",
//             //     title: "测试分享视频",
//             //     desc: "测试描述",
//             //     imageUrl: "",
//             //     templateId: "", // 替换成通过审核的分享ID
//             //     query: "",
//             //     extra: {
//             //       videoPath: this.ylGetVideoPath(), // 可替换成录屏得到的视频地址
//             //       videoTopics: ["话题1", "话题2"]
//             //     },
//             //     success() {
//             //       console.log("分享视频成功");
//             //     },
//             //     fail(e) {
//             //       console.log("分享视频失败1",e,"1");
//             //     }
//             //   });

//         } else {
//             success && success();
//         }

//     }
//     /**获取平台  Name */
//     static getSystemInfoSync() {
//         if (support) {
//             console.log(pf.getSystemInfoSync().appName, "平台名字");
//             return pf.getSystemInfoSync();
//         }
//         return null;
//     }
//     //日志输出
//     static ylLog(_eventName: string) {
//         if (support) {
//             pf.ylLog(_eventName);
//         }
//     }
// }