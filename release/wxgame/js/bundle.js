(function () {
	'use strict';

	var EventMgr = new Laya.EventDispatcher;

	var ESMessage;
	(function (ESMessage) {
	    ESMessage[ESMessage["C2S_SWITCH"] = 0] = "C2S_SWITCH";
	    ESMessage[ESMessage["C2S_RM_SIDES"] = 1] = "C2S_RM_SIDES";
	    ESMessage[ESMessage["C2S_RM_BOARDS"] = 2] = "C2S_RM_BOARDS";
	    ESMessage[ESMessage["C2S_REMOVE"] = 3] = "C2S_REMOVE";
	    ESMessage[ESMessage["C2S_RESET"] = 4] = "C2S_RESET";
	    ESMessage[ESMessage["S2C_REMOVE"] = 5] = "S2C_REMOVE";
	    ESMessage[ESMessage["S2C_CLICK_BTN"] = 6] = "S2C_CLICK_BTN";
	    ESMessage[ESMessage["S2C_CANCEL"] = 7] = "S2C_CANCEL";
	    ESMessage[ESMessage["S2C_DOT_SERVER"] = 8] = "S2C_DOT_SERVER";
	    ESMessage[ESMessage["S2C_DOT_ALD"] = 9] = "S2C_DOT_ALD";
	    ESMessage[ESMessage["S2C_DOT_EVENT"] = 10] = "S2C_DOT_EVENT";
	    ESMessage[ESMessage["S2S_REMOVE"] = 11] = "S2S_REMOVE";
	    ESMessage[ESMessage["S2S_REMOVE1"] = 12] = "S2S_REMOVE1";
	    ESMessage[ESMessage["S2S_COMPLETE"] = 13] = "S2S_COMPLETE";
	    ESMessage[ESMessage["S2S_COMPLETE1"] = 14] = "S2S_COMPLETE1";
	})(ESMessage || (ESMessage = {}));
	class SideMsg {
	    static $register(key, obj) {
	        var isReg = key && key.length > 0;
	        if (isReg) {
	            let self = SideMsg;
	            let targets = self.$targets;
	            let target = targets[key] || (targets[key] = []);
	            target.push(obj);
	            self.$removeLater(key);
	        }
	        return isReg;
	    }
	    static $removeLater(key) {
	        var self = SideMsg;
	        var laters = self.$laters;
	        var params = laters[key];
	        if (params !== void 0) {
	            delete laters[key];
	            self.$notice(key, params);
	        }
	    }
	    static $notice(key, params) {
	        var self = SideMsg;
	        params.unshift(ESMessage[key]);
	        self.notice.apply(self, params);
	    }
	    static register(msg, call, thisObj, once) {
	        return SideMsg.$register(ESMessage[msg], [call, thisObj, once]);
	    }
	    static notice(msg, ...params) {
	        var array = SideMsg.$targets[ESMessage[msg]];
	        if (array) {
	            array = array.concat();
	            for (let i = 0, len = array.length; i < len; i++) {
	                let target = array[i];
	                target[0].apply(target[1], params);
	                if (target[2]) {
	                    array.splice(i, 1);
	                    i--;
	                    len--;
	                }
	            }
	        }
	    }
	    static remove(msg, call, thisObj) {
	        var array = SideMsg.$targets[ESMessage[msg]];
	        if (array) {
	            for (let i = 0, len = array.length; i < len; i++) {
	                let target = array[i];
	                if (target[0] === call && target[1] === thisObj) {
	                    array.splice(i, 1);
	                    break;
	                }
	            }
	        }
	    }
	    static removeAll(msg) {
	        delete SideMsg.$targets[ESMessage[msg]];
	    }
	    static hasRegister(msg) {
	        return !!SideMsg.$targets[ESMessage[msg]];
	    }
	    static clear() {
	        var self = SideMsg;
	        self.$targets = {};
	        self.$laters = {};
	    }
	    static noticeLater(msg, ...params) {
	        var self = SideMsg;
	        var key = ESMessage[msg];
	        if (self.hasRegister(msg))
	            self.$notice(key, params);
	        else
	            self.$laters[key] = params;
	    }
	}
	SideMsg.$targets = {};
	SideMsg.$laters = {};

	class SideNewMgr {
	    constructor() {
	        this._boxDatas = [];
	    }
	    static get ins() {
	        if (this._ins == void 0) {
	            this._ins = new SideNewMgr();
	            this._ins.init();
	        }
	        return this._ins;
	    }
	    init() {
	    }
	    set boxDatas(boxs) {
	        this._boxDatas = boxs;
	    }
	    getBoxDatas() {
	        (this._boxDatas.length <= 0) && (console.warn('warn, side box null!!!!!!'));
	        return this._boxDatas;
	    }
	    getBoxDatasSync(func) {
	        if (this._boxDatas.length > 0) {
	            func && func(this._boxDatas);
	        }
	        else {
	            (window.ydhw_wx) && (window.ydhw.GetSideBox(this, (info) => {
	                this._boxDatas = info;
	                func && func(this._boxDatas);
	            }));
	        }
	    }
	    hasSide() {
	        return this._boxDatas && this._boxDatas.length > 0;
	    }
	    showMore() {
	        SideMsg.notice(ESMessage.S2C_CANCEL);
	    }
	}
	SideNewMgr._ins = null;

	var spScenes = [1011, 1017, 1047];
	var misScenes = [1005, 1006, 1007, 1008, 1011, 1012, 1013, 1017, 1027, 1042, 1047];
	var GameConst = {
	    CDN: "https://txext.ylxyx.cn/youdianhaowan/",
	    ResVersion: "1.0",
	    NetLog: false,
	    Log: true,
	    Env: "online",
	    BonusSwitch: false,
	    ShareSwitch: false,
	    SideSwitch: false,
	    SceneSwitch: false,
	    MisTouchSwitch: false,
	    GDMisTouchSwitch: false,
	    ScoreSwitch: false,
	    Openid: "",
	    SessionId: "",
	    ExtraData: "",
	    Channel: "",
	    Scene: 0,
	    NetType: "",
	    banner_switch: [1, 1.3],
	    banner_rf_time: [10, 15],
	    gamebanner: true,
	    BarViewSate: 0,
	    SwitchYS: false,
	    InsertBannerDelayTime: 700,
	    InsertbannerInterval: 10,
	    SwitchInsertBanner: false,
	    SwitchSkinTry: false,
	    WCBox: false,
	    BannerShowTime: 1000,
	    BtnReSize: 1300,
	    BigBox: false,
	    logAllSwitch: function () {
	        console.log('----------GameConst----------');
	        for (let key in GameConst) {
	            if (typeof (GameConst[key]) == 'boolean') {
	                console.log(key, GameConst[key]);
	            }
	        }
	    },
	    isSpecialScene: function () {
	        return spScenes.indexOf(this.Scene) > -1;
	    },
	    isMisScene: function () {
	        return misScenes.indexOf(this.Scene) > -1;
	    },
	    canShare: function () {
	        return GameConst.ShareSwitch;
	    },
	    openGDMistouch: function () {
	        return GameConst.GDMisTouchSwitch;
	    },
	    openMisScene: function () {
	        return GameConst.SceneSwitch && GameConst.isMisScene();
	    },
	    openMisTouch: function () {
	        return GameConst.MisTouchSwitch;
	    },
	    openSide: function () {
	        return GameConst.SideSwitch && (!GameConst.SceneSwitch || !GameConst.isSpecialScene()) && !platform.isOppo && !platform.isVivo;
	    }
	};

	let EventType = {
	    EnterLoading: "EnterLoading",
	    ResProgress: "ResProgress",
	    SubpkgProgress: "SubpkgProgress",
	    LoadingSuc: "LoadingSuc",
	    OpenUI: "OpenUI",
	    CloseUI: "CloseUI",
	    CheckNewDay: "CheckNewDay",
	    RefreshCacheData: "RefreshCacheData",
	    RefreshScoreSV: "RefreshScoreSV",
	    AddDesktopSuccess: "AddDesktopSuccess",
	    RefreshGold: "RefreshGold",
	    RefreshLevel: "RefreshLevel",
	    RefreshSkin: "RefreshSkin",
	    CloseSide: "CloseSide",
	    ChangeRoleModel: "ChangeRoleModel",
	};

	var EYLCustomSwitch;
	(function (EYLCustomSwitch) {
	    EYLCustomSwitch[EYLCustomSwitch["Record_screen_popup"] = 0] = "Record_screen_popup";
	    EYLCustomSwitch[EYLCustomSwitch["Video_Unlock_lvl"] = 1] = "Video_Unlock_lvl";
	    EYLCustomSwitch[EYLCustomSwitch["Check_box"] = 2] = "Check_box";
	    EYLCustomSwitch[EYLCustomSwitch["Insert_screen"] = 3] = "Insert_screen";
	    EYLCustomSwitch[EYLCustomSwitch["Native_Ads"] = 4] = "Native_Ads";
	    EYLCustomSwitch[EYLCustomSwitch["Skin_trial"] = 5] = "Skin_trial";
	    EYLCustomSwitch[EYLCustomSwitch["Lucky_wheel"] = 6] = "Lucky_wheel";
	    EYLCustomSwitch[EYLCustomSwitch["Game_scene_banner"] = 7] = "Game_scene_banner";
	    EYLCustomSwitch[EYLCustomSwitch["Button_mistake"] = 8] = "Button_mistake";
	    EYLCustomSwitch[EYLCustomSwitch["Baoxiang"] = 9] = "Baoxiang";
	    EYLCustomSwitch[EYLCustomSwitch["Button_to_banner"] = 10] = "Button_to_banner";
	    EYLCustomSwitch[EYLCustomSwitch["Text_button"] = 11] = "Text_button";
	    EYLCustomSwitch[EYLCustomSwitch["False_close_button"] = 12] = "False_close_button";
	    EYLCustomSwitch[EYLCustomSwitch["End_page_style"] = 13] = "End_page_style";
	    EYLCustomSwitch[EYLCustomSwitch["Game_name"] = 14] = "Game_name";
	    EYLCustomSwitch[EYLCustomSwitch["More_games"] = 15] = "More_games";
	    EYLCustomSwitch[EYLCustomSwitch["Game_scene_elect"] = 16] = "Game_scene_elect";
	    EYLCustomSwitch[EYLCustomSwitch["Pendant_8_elect"] = 17] = "Pendant_8_elect";
	})(EYLCustomSwitch || (EYLCustomSwitch = {}));
	class YLSDK {
	    constructor() {
	        this._customSwitch = [];
	        this._shortcuttime = 0;
	        this._insertBannerShowTime = 0;
	        this._insertBanerLastShowTime = 0;
	        this._canShowInsertBanner = false;
	        this._isNativeAdShow = false;
	        this._nativeData = [];
	        this._btnMisTouchInfo = {};
	        this._insertScreenInfo = {};
	        this._fuckAwayPaths = {};
	    }
	    static get ins() {
	        if (!this._ins) {
	            this._ins = new YLSDK();
	            this._ins.init();
	        }
	        return this._ins;
	    }
	    init() {
	        (window.ydhw_wx) && (ydhw.Login(this, (isOK) => {
	            if (isOK) {
	                SideNewMgr.ins.getBoxDatasSync();
	                GameConst.MisTouchSwitch = window.ydhw.SwitchTouch;
	                ydhw.GetCustomConfig(this, (res) => {
	                    this.initCustomSwitch(res);
	                });
	                ydhw.GetLayerList((layerList) => {
	                    for (let i = 0; i < layerList.length; i++) {
	                        let info = layerList[i];
	                        if (!this._fuckAwayPaths[info.layer]) {
	                            this._fuckAwayPaths[info.layer] = [];
	                        }
	                        this._fuckAwayPaths[info.layer].push(info);
	                    }
	                });
	            }
	        }));
	    }
	    initCustomSwitch(datas) {
	        if (!datas) {
	            console.warn("未获取到自定义开关配置数据");
	            return;
	        }
	        for (let index = 0; index < datas.length; index++) {
	            const e = datas[index];
	            if (EYLCustomSwitch[e.name] == void 0) {
	                console.warn('Warn：请在枚举中 添加对应的自定义开关  e.name = ', e.name);
	            }
	            else {
	                this._customSwitch[EYLCustomSwitch[e.name]] = e.value;
	            }
	        }
	    }
	    getCustomSwitch(type) {
	        return this._customSwitch[type];
	    }
	    getBtnMisData() {
	        if (this._customSwitch[EYLCustomSwitch.Button_mistake]) {
	            let serverInfo = this._customSwitch[EYLCustomSwitch.Button_mistake];
	            let datas = serverInfo.split(',');
	            this._btnMisTouchInfo.switch = Number(datas[0]);
	            this._btnMisTouchInfo.bannerTime = Number(datas[1]);
	            this._btnMisTouchInfo.btnTime = Number(datas[2]);
	        }
	        return this._btnMisTouchInfo;
	    }
	    getInsertScreenData() {
	        if (this._customSwitch[EYLCustomSwitch.Insert_screen]) {
	            let serverInfo = this._customSwitch[EYLCustomSwitch.Insert_screen];
	            let datas = serverInfo.split(',');
	            this._insertScreenInfo.switch = Number(datas[0]);
	            this._insertScreenInfo.firstDelayTime = Number(datas[1]);
	            this._insertScreenInfo.spaceTime = Number(datas[2]);
	            this._insertScreenInfo.delayPopTime = Number(datas[3]);
	        }
	        return this._insertScreenInfo;
	    }
	    getFuckAwayData(layer) {
	        return this._fuckAwayPaths[layer];
	    }
	    shortcut() {
	        if (ydhw_oppo) {
	            ydhw.HasShortcutInstalled(this, (res) => {
	                let foolState = false;
	                let timedelay = 0;
	                if (this._shortcuttime === 0) {
	                    this._shortcuttime = Date.now();
	                    foolState = true;
	                }
	                else {
	                    timedelay = Date.now() - this._shortcuttime;
	                    if (timedelay > 60 * 1000) {
	                        this._shortcuttime = Date.now();
	                        foolState = true;
	                    }
	                }
	                if (res == false && foolState) {
	                    ydhw.InstallShortcut(this, () => {
	                        Laya.timer.once(500, this, () => {
	                            EventMgr.event(EventType.AddDesktopSuccess);
	                        });
	                    }, () => {
	                    }, () => {
	                    });
	                }
	                else {
	                    console.log("用户有添加 游戏");
	                }
	            }, (err) => {
	                console.log(err);
	            }, () => {
	            });
	        }
	    }
	    createInserstitialAd() {
	        let insertData = this.getInsertScreenData();
	        if (!insertData.switch)
	            return;
	        if (this._canShowInsertBanner === false) {
	            let curtimeInterval = Date.now() - this._insertBannerShowTime;
	            if (curtimeInterval > 1000 * insertData.firstDelayTime) {
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
	        if (window.ydhw_wx && this._canShowInsertBanner && insertData.switch) {
	            Laya.timer.once(GameConst.InsertBannerDelayTime, this, () => {
	                ydhw.CreateInterstitialAd(true, this, () => {
	                    ydhw.ShowInterstitialAd();
	                    ydhw.HideBannerAd();
	                    this._insertBanerLastShowTime = Date.now();
	                }, () => {
	                }, () => {
	                    if (this._isNativeAdShow) { }
	                    else {
	                        ydhw.ShowBannerAd();
	                    }
	                });
	            });
	        }
	    }
	    createNative(index, _callback) {
	        if (ydhw_oppo) {
	            ydhw.CreateNativeAd(this, (list) => {
	                if (list) {
	                    this._isNativeAdShow = true;
	                    var data = list[0];
	                    this._nativeData[index] = list;
	                    _callback && _callback(data);
	                }
	                else {
	                    this._isNativeAdShow = false;
	                }
	            });
	        }
	    }
	    get nativeData() {
	        return this._nativeData;
	    }
	    clickNativeAd(index) {
	        if (ydhw_oppo) {
	            let list = this._nativeData[index];
	            if (list) {
	            }
	        }
	    }
	    set shortcuttime(time) {
	        this._shortcuttime = time;
	    }
	    set insertBannerShowTime(time) {
	        this._insertBannerShowTime = time;
	    }
	    get isNativeAdShow() {
	        return this._isNativeAdShow;
	    }
	}

	let addRoot = function (obj, root) {
	    for (let i in obj) {
	        obj[i] = root + obj[i];
	    }
	};
	let AtlasRoot = "nativescene/res/";
	let SceneRoot = "nativescene/scene/Conventional/";
	let SkinRoot = SceneRoot + "Assets/Resources/Texture2D/";
	let SoundRoot = "nativescene/sound/";
	let MapRoot = "nativescene/map/";
	let JsonRoot = "nativescene/";
	let EAtlas = {
	    Game: "game.atlas",
	};
	addRoot(EAtlas, AtlasRoot);
	let ESprite3D = {
	    MainCamera: "MainCamera.lh",
	    DirectionalLight: "DirectionalLight.lh",
	    Effect: "Effect.lh",
	};
	addRoot(ESprite3D, SceneRoot);
	let EJson = {
	    Configs: "configs.json"
	};
	let ECfg = {
	    GlobalCfg: "globalcfg",
	    LevelCfg: "level",
	    Player: "player",
	    ShopCfg: "shop",
	};
	addRoot(EJson, JsonRoot);
	let ESound = {
	    Bgm: "bgmusic.mp3",
	    BtnClick: "click.mp3"
	};
	addRoot(ESound, SoundRoot);

	class SoundMgr {
	    static init() {
	        var self = this;
	        var getItem = Laya.LocalStorage.getItem;
	        self.$openMusic = getItem(self.$cacheMusic) !== '0';
	        self.$openSound = getItem(self.$cacheSound) !== '0';
	        self.$openVibrate = getItem(self.$cacheVibrate) !== '0';
	        Laya.SoundManager.autoStopMusic = true;
	    }
	    static get openMusic() {
	        return this.$openMusic;
	    }
	    static set openMusic(open) {
	        var self = this;
	        if (self.$openMusic != open) {
	            self.$openMusic = open;
	            if (open)
	                self.playBGM();
	            else
	                self.stopBGM();
	            Laya.LocalStorage.setItem(self.$cacheMusic, Number(open) + '');
	        }
	    }
	    static get openSound() {
	        return this.$openSound;
	    }
	    static set openSound(open) {
	        var self = this;
	        if (self.$openSound != open) {
	            self.$openSound = open;
	            Laya.LocalStorage.setItem(self.$cacheSound, Number(open) + '');
	        }
	    }
	    static get openVibrate() {
	        return this.$openVibrate;
	    }
	    static set openVibrate(open) {
	        var self = this;
	        if (self.$openVibrate != open) {
	            self.$openVibrate = open;
	            Laya.LocalStorage.setItem(self.$cacheVibrate, Number(open) + '');
	        }
	    }
	    static playBGM() {
	        var self = this;
	        if (self.openMusic) {
	            if (!self.$channel) {
	                self.$channel = Laya.SoundManager.playMusic(ESound.Bgm);
	            }
	            self.setMusicVolume(0.2);
	        }
	    }
	    static stopBGM() {
	        this.setMusicVolume(0);
	    }
	    static playBtnClick() {
	        this.playSound(ESound.BtnClick);
	    }
	    static playSound(url, loops) {
	        if (this.openSound) {
	            Laya.SoundManager.playSound(url, loops);
	        }
	    }
	    static setMusicVolume(val) {
	        Laya.SoundManager.setMusicVolume(val);
	    }
	    static setSoundVolume(val) {
	        Laya.SoundManager.setSoundVolume(val);
	    }
	    static playVibrate(isLong) {
	        if (this.openVibrate) {
	            if (isLong) {
	                platform.vibrateLong();
	            }
	            else {
	                platform.vibrateShort();
	            }
	        }
	    }
	}
	SoundMgr.$cacheMusic = 'cacheMusic';
	SoundMgr.$cacheSound = "cacheSound";
	SoundMgr.$cacheVibrate = 'cacheVibrate';

	class Timer {
	    constructor(call, thisObj, delay = 1, isTime, isStop) {
	        this.$runTime = 0;
	        this.$runCount = 0;
	        this.$call = call;
	        this.$thisObj = thisObj;
	        isStop || this.start();
	        Laya.timer[isTime ? 'loop' : 'frameLoop'](delay, this, this.update);
	    }
	    update() {
	        var self = this;
	        if (self.$running) {
	            self.$runCount++;
	            self.$call.call(self.$thisObj);
	        }
	        else {
	            let aTime = self.$awaitTime;
	            if (aTime && aTime <= Date.now()) {
	                self.start();
	            }
	        }
	    }
	    start() {
	        var self = this;
	        if (!self.$running) {
	            self.$lastTime = Date.now();
	            self.$running = true;
	            self.$awaitTime = null;
	        }
	    }
	    stop() {
	        var self = this;
	        if (self.$running) {
	            let nowT = Date.now();
	            self.$runTime += nowT - self.$lastTime;
	            self.$lastTime = nowT;
	            self.$running = false;
	            self.$awaitTime = null;
	        }
	    }
	    await(time) {
	        var self = this;
	        if (time > 0) {
	            self.stop();
	            self.$awaitTime = Date.now() + time;
	        }
	        else {
	            self.start();
	        }
	    }
	    get running() {
	        return this.$running;
	    }
	    get runTime() {
	        var self = this;
	        return self.$runTime + (self.running ?
	            Date.now() - self.$lastTime : 0);
	    }
	    get runCount() {
	        return this.$runCount;
	    }
	    reset() {
	        var self = this;
	        self.$runTime = self.$runCount = 0;
	        self.$lastTime = Date.now();
	    }
	    clear() {
	        var self = this;
	        Laya.timer.clear(self, self.update);
	        self.$call = self.$thisObj = null;
	    }
	}

	var sign = 'LTween', cache = '$' + sign;
	var removeAt = function (array, item) {
	    var index = array.indexOf(item);
	    index > -1 && array.splice(index, 1);
	};
	class Tween {
	    $init(target, props) {
	        var self = this;
	        var tweens = target[cache] || (target[cache] = []);
	        tweens.push(self);
	        self.$target = target;
	        self.$frame = props.frame;
	        self.$loop = props.loop;
	        self.$once = props.once !== false;
	        self.$frameCall = props.frameCall;
	        self.$frameObj = props.frameObj;
	        self.$curTime = 0;
	        self.$needCopy = true;
	        self.$steps = [];
	        self.$cSteps = [];
	        self.$timer = new Timer(self.$update, self, 1, false, true);
	    }
	    get $runTime() {
	        var timer = this.$timer;
	        return this.$frame ? timer.runCount : timer.runTime;
	    }
	    $update() {
	        var self = this;
	        var steps = self.$steps, cSteps = self.$cSteps;
	        if (self.$needCopy) {
	            self.$needCopy = false;
	            cSteps.push.apply(cSteps, steps);
	        }
	        var runTime = self.$runTime, remove = 0;
	        for (let i = 0, len = steps.length; i < len; i++) {
	            let step = steps[i];
	            if (step.startTime > runTime)
	                break;
	            self.$runStep(step);
	            if (step.endTime <= runTime)
	                remove++;
	        }
	        remove > 0 && steps.splice(0, remove);
	        var call = self.$frameCall;
	        call && call.call(self.$frameObj);
	        steps = self.$steps;
	        if (steps && steps.length == 0) {
	            if (self.$loop) {
	                self.$timer.reset();
	                self.$steps = cSteps.concat();
	            }
	            else {
	                self.$once ? self.clear() : self.$pause();
	            }
	        }
	    }
	    $pause() {
	        var self = this;
	        var timer = self.$timer;
	        self.$needCopy = true;
	        self.$curTime = 0;
	        self.$steps = [];
	        timer.stop();
	        timer.reset();
	    }
	    $addStep(type, duration, param) {
	        var self = this;
	        var startTime = self.$curTime;
	        var endTime = self.$curTime = startTime + duration;
	        self.$steps.push({ type, startTime, endTime, param });
	        self.$timer.start();
	    }
	    $getIncrement(start, end) {
	        var copy = {};
	        var keys = Object.keys(end);
	        var hasv = function (obj) {
	            return !!obj || (obj != null && obj != void 0);
	        };
	        for (let i in keys) {
	            let key = keys[i];
	            let value = start[key];
	            if (hasv(value))
	                copy[key] = end[key] - value;
	        }
	        return copy;
	    }
	    $runStep(step) {
	        var self = this;
	        var type = step.type;
	        switch (type) {
	            case 0:
	                self.$to(step);
	                break;
	            case 1:
	                self.$set(step.param);
	                break;
	            case 2:
	                break;
	            case 3:
	                self.$call(step.param);
	                break;
	            case 4:
	                self.$form(step);
	                break;
	        }
	    }
	    $to(step) {
	        var self = this;
	        var start = step.startTime;
	        var ratio = Math.min((self.$runTime - start) / (step.endTime - start), 1);
	        var param = step.param;
	        var ease = param[0];
	        ease && (ratio = ease(ratio));
	        var target = self.$target, endp = param[1], dstp = param[2] || (param[2] = self.$getIncrement(target, endp));
	        for (let i in dstp) {
	            target[i] = endp[i] - dstp[i] * (1 - ratio);
	        }
	    }
	    $set(props) {
	        var self = this;
	        var target = self.$target;
	        for (let i in props)
	            target[i] = props[i];
	    }
	    $call(param) {
	        param[0].apply(param[1], param[2]);
	    }
	    $form(step) {
	        var self = this, props = step.param, target = self.$target, start = step.startTime, ratio = Math.min((self.$runTime - start) / (step.endTime - start), 1);
	        for (let i in props) {
	            target[i] = props[i](ratio);
	        }
	    }
	    to(props, duration, ease) {
	        var self = this;
	        if (isNaN(duration) || duration <= 0) {
	            self.set(props);
	        }
	        else {
	            self.$addStep(0, duration, [ease, props]);
	        }
	        return self;
	    }
	    set(props) {
	        var self = this;
	        self.$addStep(1, 0, props);
	        return self;
	    }
	    wait(delay) {
	        var self = this;
	        delay > 0 && self.$addStep(2, delay);
	        return self;
	    }
	    call(call, thisObj, params) {
	        var self = this;
	        call && self.$addStep(3, 0, [call, thisObj, params]);
	        return self;
	    }
	    form(props, duration) {
	        var self = this;
	        if (isNaN(duration) || duration <= 0) {
	            let obj = {};
	            for (let i in props) {
	                obj[i] = props[i](1);
	            }
	            self.set(obj);
	        }
	        else {
	            self.$addStep(4, duration, props);
	        }
	        return self;
	    }
	    repeat(repeat, step) {
	        var self = this;
	        if (repeat > 0 && self.$timer) {
	            let steps = self.$cSteps.concat().concat(self.$steps), len = steps.length;
	            if (len > 0) {
	                if (!(step > 0) || step > len)
	                    step = len;
	                let startI = len - step;
	                for (let i = 0; i < repeat; i++) {
	                    for (let j = 0; j < step; j++) {
	                        let step = steps[startI + j];
	                        self.$addStep(step.type, step.endTime - step.startTime, step.param);
	                    }
	                }
	            }
	        }
	        return self;
	    }
	    stop() {
	        var timer = this.$timer;
	        timer && timer.stop();
	    }
	    resume() {
	        var timer = this.$timer;
	        timer && timer.start();
	    }
	    clear() {
	        var self = this;
	        if (self.$timer) {
	            let target = self.$target;
	            let tweens = target[cache];
	            if (tweens instanceof Array) {
	                removeAt(tweens, self);
	                tweens.length == 0 && (delete target[cache]);
	            }
	            self.$timer.clear();
	            self.$timer = self.$steps = self.$cSteps = self.$target = self.$frameCall = self.$frameObj = null;
	            Laya.Pool.recover(sign, self);
	        }
	    }
	    static get(target, props) {
	        var tween = Laya.Pool.getItemByClass(sign, Tween);
	        tween.$init(target, props || {});
	        return tween;
	    }
	    static once(target, props) {
	        Tween.clear(target);
	        return Tween.get(target, props);
	    }
	    static clear(target) {
	        if (target) {
	            let tweens = target[cache];
	            if (tweens instanceof Array) {
	                for (let i = 0, len = tweens.length; i < len; i++) {
	                    let tween = tweens[i];
	                    tween instanceof Tween && tween.clear();
	                }
	            }
	            delete target[cache];
	        }
	    }
	    static clearAll(root) {
	        Tween.clear(root);
	        for (let i = 0, len = root.numChildren; i < len; i++) {
	            Tween.clearAll(root.getChildAt(i));
	        }
	    }
	    static turnEase(ease) {
	        return function (t) {
	            return ease(t, 0, 1, 1);
	        };
	    }
	}

	var outCode = 0, valCode = 0, timeout = {}, interval = {};
	var clear = function (data, key) {
	    var info = data[key];
	    if (info) {
	        delete data[key];
	        Laya.timer.clear(null, info);
	    }
	};
	class TimeUtils {
	    constructor() {
	    }
	    static formatTen(num) {
	        return (num > 9 ? '' : '0') + num;
	    }
	    static formatHour(second, sufix = ':') {
	        var ten = TimeUtils.formatTen;
	        var hour = second / 3600 | 0;
	        var min = (second / 60 | 0) % 60;
	        var sec = second % 60;
	        return ten(hour) + sufix + ten(min) + sufix + ten(sec);
	    }
	    static getDay(time) {
	        return (time / 3600000 + 8) / 24 | 0;
	    }
	    static isSameDay(time0, time1) {
	        var get = TimeUtils.getDay;
	        return get(time0) == get(time1);
	    }
	    static setTimeout(call, thisObj, delay, ...param) {
	        var curc = ++outCode;
	        var func = timeout[curc] = function () {
	            call.apply(thisObj, param);
	            delete timeout[curc];
	        };
	        Laya.timer.once(delay, null, func);
	        return curc;
	    }
	    static clearTimeout(key) {
	        clear(timeout, key);
	    }
	    ;
	    static setInterval(call, thisObj, delay, ...param) {
	        var curc = ++valCode;
	        var func = interval[curc] = function () {
	            call.apply(thisObj, param);
	        };
	        Laya.timer.loop(delay, null, func);
	        return curc;
	    }
	    static clearInterval(key) {
	        clear(interval, key);
	    }
	    ;
	}

	var Vector3 = Laya.Vector3;
	class Utils {
	    constructor() {
	    }
	    ;
	    static cloneArray(source) {
	        let result = [];
	        for (let i = 0; i < source.length; i++) {
	            result.push(source[i]);
	        }
	        return result;
	    }
	    static DistanceSquared(x1, y1, x2, y2) {
	        let offx = x1 - x2;
	        let offy = y1 - y2;
	        return offx * offx + offy * offy;
	    }
	    static MapDistanceSquared(pos1, pos2) {
	        let offx = pos1.x - pos2.x;
	        let offz = pos1.z - pos2.z;
	        let dist = offx * offx + offz * offz;
	        return dist;
	    }
	    static GetAngle(dx, dy) {
	        if (dy == 0) {
	            return dx > 0 ? 0 : 180;
	        }
	        let angle = Math.atan(dx / dy) * 180 / Math.PI;
	        if (dy < 0) {
	            if (dx < 0)
	                angle = 180 + Math.abs(angle);
	            else
	                angle = 180 - Math.abs(angle);
	        }
	        angle = 90 - angle;
	        return angle;
	    }
	    static parseInt(_strNum) {
	        if (_strNum == null || _strNum == "undefined") {
	            return 0;
	        }
	        let intNum = parseFloat(_strNum);
	        if (intNum) {
	            return Math.floor(intNum);
	        }
	        return 0;
	    }
	    static isEmpty(obj) {
	        if (typeof obj == "undefined" || obj == null || obj == "") {
	            return true;
	        }
	        else {
	            return false;
	        }
	    }
	    static isEqual(a, b) {
	        let offVal = a - b;
	        return Utils.nearZero(offVal);
	    }
	    static nearZero(val) {
	        return val >= -0.001 && val <= 0.001;
	    }
	    static equalVec(vecA, vecB) {
	        return this.isEqual(vecA.x, vecB.x) && this.isEqual(vecA.y, vecB.y) && this.isEqual(vecA.z, vecB.z);
	    }
	    static vec3NearZero(vec) {
	        return this.nearZero(vec.x) && this.nearZero(vec.y) && this.nearZero(vec.z);
	    }
	    static SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed = -1, deltaTime, output) {
	        if (maxSpeed == -1) {
	            maxSpeed = Number.MAX_VALUE;
	        }
	        smoothTime = Math.max(0.0001, smoothTime);
	        let omega = 2.0 / smoothTime;
	        let x = omega * deltaTime;
	        let exp = 1.0 / (1.0 + x + 0.48 * x * x + 0.235 * x * x * x);
	        Vector3.subtract(current, target, Utils._changeVec);
	        target.cloneTo(Utils._originalTo);
	        let maxChange = maxSpeed * smoothTime;
	        Utils.ClampMagnitude(Utils._changeVec, maxChange);
	        Vector3.subtract(current, Utils._changeVec, target);
	        Vector3.scale(Utils._changeVec, omega, Utils._tmpVec);
	        Vector3.add(currentVelocity, Utils._tmpVec, Utils._tmpVec);
	        Vector3.scale(Utils._tmpVec, deltaTime, Utils._tmpVec);
	        Vector3.scale(Utils._tmpVec, omega, Utils._tmpVec2);
	        Vector3.subtract(currentVelocity, Utils._tmpVec2, Utils._tmpVec2);
	        Vector3.scale(Utils._tmpVec2, exp, currentVelocity);
	        Vector3.add(Utils._changeVec, Utils._tmpVec, Utils._tmpVec);
	        Vector3.scale(Utils._tmpVec, exp, Utils._tmpVec);
	        Vector3.add(target, Utils._tmpVec, output);
	        Vector3.subtract(Utils._originalTo, current, Utils._tmpVec);
	        Vector3.subtract(output, Utils._originalTo, Utils._tmpVec2);
	        if (Vector3.dot(Utils._tmpVec, Utils._tmpVec2) > 0) {
	            Utils._originalTo.cloneTo(output);
	            Vector3.subtract(output, Utils._originalTo, Utils._tmpVec);
	            Vector3.scale(Utils._tmpVec, 1 / deltaTime, currentVelocity);
	        }
	    }
	    static ClampMagnitude(vec, maxLength) {
	        if (Vector3.scalarLengthSquared(vec) > maxLength * maxLength) {
	            Vector3.normalize(vec, vec);
	            Vector3.scale(vec, maxLength, vec);
	        }
	    }
	    static Range(min, max) {
	        return min + Math.random() * (max - min);
	    }
	    static IntRange(min, max) {
	        return Math.round(Utils.Range(min, max));
	    }
	    static DegToRad(deg) {
	        return deg * Math.PI / 180;
	    }
	    static RadToDeg(rad) {
	        return rad * 180 / Math.PI;
	    }
	    static getGravity(height, time) {
	        let gravity = 2 * height / (time * time);
	        return gravity;
	    }
	    static RotatePos(pos, centerPos, eulerY, outPos) {
	        let rad = Utils.DegToRad(eulerY - 180);
	        let cos = Math.cos(rad);
	        let sin = Math.sin(rad);
	        let x = (pos.x - centerPos.x) * cos + (pos.z - centerPos.z) * sin + centerPos.x;
	        let z = -(pos.x - centerPos.x) * sin + (pos.z - centerPos.z) * cos + centerPos.z;
	        outPos.setValue(x, 0, z);
	    }
	    static formatTimestamp(time) {
	        let str;
	        let hour;
	        let min;
	        let sec;
	        let hourStr;
	        let minStr;
	        let secStr;
	        hour = Math.floor(time / 3600);
	        min = Math.floor((time % 3600) / 60);
	        sec = Math.floor((time % 3600) % 60);
	        hourStr = (hour >= 10) ? hour.toString() : ('0' + hour);
	        minStr = (min >= 10) ? min.toString() : ('0' + min);
	        secStr = (sec >= 10) ? sec.toString() : ("0" + sec);
	        str = hourStr + ":" + minStr + ":" + secStr;
	        return str;
	    }
	    static formatTime(time) {
	        let str;
	        let min;
	        let sec;
	        let secStr;
	        min = Math.floor(time / 60);
	        sec = Math.floor(time % 60);
	        secStr = (sec >= 10) ? sec.toString() : ("0" + sec);
	        str = min + ":" + secStr;
	        return str;
	    }
	    static formatNum(num) {
	        let str = num.toString();
	        if (str.length == 1) {
	            str = "00" + num;
	        }
	        else if (str.length == 2) {
	            str = "0" + num;
	        }
	        return str;
	    }
	    static log(...params) {
	        let str = Utils.formatDate(new Date(), "[hh:mm:ss.S]");
	        params.forEach(element => {
	            str += " " + JSON.stringify(element);
	        });
	        console.log(str);
	    }
	    static formatDate(date, fmt) {
	        let o = {
	            "Y+": date.getFullYear(),
	            "M+": date.getMonth() + 1,
	            "d+": date.getDate(),
	            "h+": date.getHours(),
	            "m+": date.getMinutes(),
	            "s+": date.getSeconds(),
	            "S": date.getMilliseconds()
	        };
	        if (/(y+)/.test(fmt))
	            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	        for (let k in o)
	            if (new RegExp("(" + k + ")").test(fmt))
	                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	        return fmt;
	    }
	    static checkPhoneIsBangs() {
	        var systemInfo = platform.getSystemInfoSync();
	        return systemInfo ? systemInfo.windowHeight / systemInfo.windowWidth >= 2.1 : false;
	    }
	    static addRedPoint(btn, isRed, top = 8, right = 1) {
	        let _redPoint = btn.getChildByName("redPoint");
	        if (_redPoint) {
	            _redPoint.visible = isRed;
	        }
	        else if (isRed) {
	            _redPoint = new Laya.Image("game/game_redPoint.png");
	            _redPoint.name = "redPoint";
	            btn.addChild(_redPoint);
	            _redPoint.top = top;
	            _redPoint.right = right;
	        }
	    }
	    static shuffle(arr) {
	        var len = arr.length;
	        for (var i = 0; i < len - 1; i++) {
	            var index = Math.floor(Math.random() * (len - i));
	            var temp = arr[index];
	            arr[index] = arr[len - i - 1];
	            arr[len - i - 1] = temp;
	        }
	        return arr;
	    }
	    static getTodayDate() {
	        let myDate = new Date();
	        let year = myDate.getFullYear();
	        let month = myDate.getMonth() + 1;
	        let date = myDate.getDate();
	        let today = '' + year + '_' + month + '_' + date;
	        return today;
	    }
	    static mathSinCos(attr, angle) {
	        return Math[attr](angle * Math.PI / 180);
	    }
	    static sin(angle) {
	        return Utils.mathSinCos('sin', angle);
	    }
	    static cos(angle) {
	        return angle % 180 == 90 ? 0 : Utils.mathSinCos('cos', angle);
	    }
	    static initNativeFiles(path, files) {
	        var adpters = [Laya.MiniAdpter, Laya.VVMiniAdapter];
	        var hasChange = false;
	        for (let i in adpters) {
	            let adpter = adpters[i];
	            if (adpter) {
	                adpter.AutoCacheDownFile = true;
	                adpter.nativefiles = files;
	                hasChange = true;
	            }
	        }
	        if (hasChange) {
	            let fileMgr = Laya['MiniFileMgr'];
	            if (fileMgr) {
	                let pLen = path.length, fLen = files.length, i, file, sIdx;
	                fileMgr.isLocalNativeFile = function (url) {
	                    sIdx = url.indexOf(path) == 0 ? pLen : 0;
	                    if (url[0] !== '/') {
	                        for (i = 0; i < fLen; i++) {
	                            file = files[i];
	                            if (url.indexOf(file, sIdx) == sIdx && url[sIdx + file.length] == '/') {
	                                return true;
	                            }
	                        }
	                    }
	                    return false;
	                };
	            }
	            Laya.URL.basePath = Laya.URL['_basePath'] = path;
	        }
	    }
	    static initCDNFiles(path, files) {
	        var adpters = [Laya.MiniAdpter, Laya.VVMiniAdapter];
	        var hasChange = false;
	        for (let i in adpters) {
	            if (adpters[i]) {
	                hasChange = true;
	            }
	        }
	        if (hasChange) {
	            let url = Laya.URL;
	            let fuc = url.customFormat;
	            let format, index;
	            url.customFormat = function (url) {
	                url = fuc(url);
	                index = url.indexOf('/');
	                if (index > 0) {
	                    format = url.substr(0, index);
	                    for (let i in files) {
	                        if (files[i] === format) {
	                            url = path + url;
	                            break;
	                        }
	                    }
	                }
	                return url;
	            };
	        }
	    }
	    static memset(length, value) {
	        return Array.apply(null, Array(length)).map(function (v, i) { return value; });
	    }
	    static memset2(length, create) {
	        return Array.apply(null, Array(length)).map(function (v, i) {
	            return create(i);
	        });
	    }
	    static randomInArray(array, item) {
	        var length = array.length, splice = length;
	        if (length > 1 && item != void 0) {
	            let index = array.indexOf(item);
	            if (index > -1) {
	                length--;
	                splice = index;
	            }
	        }
	        var rndIdx = Math.random() * length | 0;
	        if (rndIdx >= splice)
	            rndIdx++;
	        return array[rndIdx];
	    }
	    static randomSort(array) {
	        return array.sort(function (a, b) {
	            return Math.random() - 0.5;
	        });
	    }
	    static rmSplice(array) {
	        var len = array.length;
	        var index = Math.random() * len | 0;
	        return array.splice(index, 1)[0];
	    }
	    static removeItem(array, rmFun) {
	        if (array) {
	            for (let i = 0, len = array.length; i < len; i++) {
	                if (rmFun(array[i])) {
	                    array.splice(i, 1);
	                    i--;
	                    len--;
	                }
	            }
	        }
	    }
	    static formatStringReg(reg, str, args) {
	        for (let i in args) {
	            let arg = args[i];
	            if (reg.test(str))
	                str = str.replace(reg, args[i]);
	            else
	                break;
	        }
	        return str;
	    }
	    static formatString(str, ...args) {
	        str = str.replace(/%%/g, '%');
	        return Utils.formatStringReg(/%d|%s/i, str, args);
	    }
	    static drawRoundRect(graphics, width, height, round) {
	        var paths = [
	            ['moveTo', round, 0],
	            ['lineTo', width - round, 0],
	            ['arcTo', width, 0, width, round, round],
	            ['lineTo', width, height - round],
	            ['arcTo', width, height, width - round, height, round],
	            ['lineTo', round, height],
	            ['arcTo', 0, height, 0, height - round, round],
	            ['lineTo', 0, round],
	            ['arcTo', 0, 0, round, 0, round]
	        ];
	        graphics.drawPath(0, 0, paths, { fillStyle: "#0" });
	    }
	    static screenToStage(pixel) {
	        var info = platform.getSystemInfoSync();
	        var scale = Laya.stage.height / info.screenHeight;
	        return pixel * scale;
	    }
	    static uiEnableCall(view, call, thisObj, ...params) {
	        if (view['_getBit'](Laya.Const.AWAKED)) {
	            call.apply(thisObj, params);
	        }
	        else {
	            let func = view.onEnable;
	            view.onEnable = function () {
	                func.call(view);
	                view.onEnable = func;
	                call.apply(thisObj, params);
	            };
	        }
	    }
	    static getRes(url, type) {
	        return new Promise(function (resolve) {
	            let loader = Laya.loader;
	            let res = loader.getRes(url);
	            if (res)
	                resolve(res);
	            else
	                loader.load(url, Laya.Handler.create(null, resolve), null, type);
	        });
	    }
	    static isIPhone() {
	        var systemInfo = platform.getSystemInfoSync();
	        if (systemInfo != null) {
	            let system = systemInfo.system.toLowerCase();
	            return system.indexOf('ios') > -1;
	        }
	        return false;
	    }
	    static multipleClick(view, multiple, distance, call, thisObj) {
	        var count = 0, lastTime, curTime, timeout;
	        view.on(Laya.Event.CLICK, this, function () {
	            curTime = Date.now();
	            if (curTime - lastTime > distance)
	                count = 0;
	            lastTime = curTime;
	            if (++count >= multiple) {
	                count = 0;
	                call && call.call(thisObj);
	            }
	            TimeUtils.clearTimeout(timeout);
	            timeout = TimeUtils.setTimeout(function () {
	                count = 0;
	            }, null, distance);
	        });
	    }
	    static loadingTask(task, call) {
	        var timeout = TimeUtils.setTimeout(platform.showLoading, platform, 1000);
	        var clear = function () {
	            platform.hideLoading();
	            TimeUtils.clearTimeout(timeout);
	            TimeUtils.clearTimeout(timeout1);
	        };
	        var timeout1 = TimeUtils.setTimeout(clear, null, 5000);
	        task.then(function (res) {
	            clear();
	            call && call(res);
	        }).catch(function () {
	            clear();
	        });
	    }
	    static copy(obj) {
	        var ret;
	        if (typeof obj === 'object') {
	            ret = obj instanceof Array ? [] : Object.create(null);
	            for (let i in obj) {
	                ret[i] = Utils.copy(obj[i]);
	            }
	        }
	        else
	            ret = obj;
	        return ret;
	    }
	    static copyAttrs(attrs, target, source) {
	        for (let i = 0, len = attrs.length; i < len; i++) {
	            let attr = attrs[i];
	            target[attr] = source[attr];
	        }
	    }
	    static globalToLocal(sprite, x, y) {
	        var temp = Laya.Point.TEMP;
	        temp.setTo(x, y);
	        sprite.globalToLocal(temp);
	        return temp;
	    }
	}
	Utils._originalTo = new Vector3();
	Utils._changeVec = new Vector3();
	Utils._tmpVec = new Vector3();
	Utils._tmpVec2 = new Vector3();

	var FSMState;
	(function (FSMState) {
	    FSMState[FSMState["None"] = 0] = "None";
	    FSMState[FSMState["GrabBallState"] = 1] = "GrabBallState";
	    FSMState[FSMState["AttackState"] = 2] = "AttackState";
	    FSMState[FSMState["AttackHoldBallState"] = 3] = "AttackHoldBallState";
	    FSMState[FSMState["DefenseState"] = 4] = "DefenseState";
	})(FSMState || (FSMState = {}));
	class ActionFSM {
	    constructor(player) {
	        this._stateMap = null;
	        this._aiInterval = 1;
	        this._nextCheckFrame = 0;
	        this._curFrame = 0;
	        this._stateMap = {};
	        this._player = player;
	        this._isRunning = false;
	    }
	    ;
	    changeState(type) {
	        let state = this._stateMap[type];
	        if (state == null) {
	            switch (type) {
	                default:
	                    break;
	            }
	            this._stateMap[type] = state;
	        }
	        if (this._curState)
	            this._curState.onExit(this._player);
	        state.onEnter(this._player);
	        this._curState = state;
	    }
	    setRunning(value) {
	        this._isRunning = value;
	    }
	    isRunning() {
	        return this._isRunning;
	    }
	    setAIInterval(val) {
	        this._aiInterval = val;
	    }
	    updateLogic() {
	        if (!this._isRunning || !this._curState)
	            return;
	        this._curFrame++;
	        if (this._curFrame < this._nextCheckFrame)
	            return;
	        if (this._player.isDead)
	            return;
	        this._curState.onRuning(this._player);
	        this._nextCheckFrame = this._curFrame + this._aiInterval;
	    }
	}

	var Vector3$1 = Laya.Vector3;
	class Vector3Ex {
	}
	Vector3Ex.ZERO = new Vector3$1(0, 0, 0);
	Vector3Ex.One = new Vector3$1(1, 1, 1);
	Vector3Ex.Up = new Vector3$1(0, 1, 0);
	Vector3Ex.ForwardLH = new Vector3$1(0, 0, 1);
	Vector3Ex.ForwardRH = new Vector3$1(0, 0, -1);
	Vector3Ex.UnitX = new Vector3$1(1, 0, 0);
	Vector3Ex.UnitY = new Vector3$1(0, 1, 0);
	Vector3Ex.UnitZ = new Vector3$1(0, 0, 1);

	class SceneConst {
	}
	SceneConst.Realtime_Shadow = false;
	SceneConst.Enable_Fog = false;
	SceneConst.Enable_Skybox = false;

	var Sprite3D = Laya.Sprite3D;
	var Texture2D = Laya.Texture2D;
	var MeshSprite3D = Laya.MeshSprite3D;
	var SkinnedMeshSprite3D = Laya.SkinnedMeshSprite3D;
	var Handler = Laya.Handler;
	var BaseMaterial = Laya.BaseMaterial;
	var Vector3$2 = Laya.Vector3;
	class ExUtils {
	    constructor() {
	    }
	    static setPathSkin(model, skinUrl) {
	        if (!skinUrl)
	            return;
	        Laya.loader.create(skinUrl, Laya.Handler.create(this, (texture) => {
	            ExUtils.setModelSkin(model, texture, null, "materials");
	            model.active = true;
	        }), null, Laya.Loader.TEXTURE2D, [256, 256, 0, false]);
	    }
	    static setModelSkinByUrl(model, skinUrl) {
	        if (!skinUrl)
	            return;
	        Texture2D.load(skinUrl, Handler.create(this, function (texture) {
	            ExUtils.setModelSkin(model, texture, null, "materials");
	            model.active = true;
	        }));
	    }
	    static setModelSkin(model, texture, color = null, matName = "sharedMaterials") {
	        if (model == null || texture == null)
	            return;
	        if (model instanceof MeshSprite3D) {
	            var meshSprite3D = model;
	            for (var i = 0; i < meshSprite3D.meshRenderer[matName].length; i++) {
	                var material = meshSprite3D.meshRenderer[matName][i];
	                material.albedoTexture = texture;
	                if (color)
	                    material.albedoColor = color;
	            }
	            meshSprite3D.meshRenderer.castShadow = SceneConst.Realtime_Shadow;
	        }
	        if (model instanceof SkinnedMeshSprite3D) {
	            var skinnedMeshSprite3D = model;
	            for (var i = 0; i < skinnedMeshSprite3D.skinnedMeshRenderer[matName].length; i++) {
	                var material = skinnedMeshSprite3D.skinnedMeshRenderer[matName][i];
	                material.albedoTexture = texture;
	                if (color)
	                    material.albedoColor = color;
	            }
	            skinnedMeshSprite3D.skinnedMeshRenderer.castShadow = SceneConst.Realtime_Shadow;
	        }
	        for (var i = 0, n = model.numChildren; i < n; i++) {
	            this.setModelSkin(model.getChildAt(i), texture, color, matName);
	        }
	    }
	    static setMatetial(node, path, handler = null) {
	        BaseMaterial.load(path, Handler.create(this, function (mat) {
	            let mesh = this.getMesh(node);
	            if (mesh) {
	                mesh.meshRenderer.material = mat;
	                mesh.meshRenderer.castShadow = SceneConst.Realtime_Shadow;
	                mesh.meshRenderer.receiveShadow = SceneConst.Realtime_Shadow;
	                if (handler)
	                    handler.run();
	            }
	        }));
	    }
	    static setSkinMeshMaterail(node, mat) {
	        let mesh = this.getSkinMesh(node);
	        if (mesh) {
	            mesh.skinnedMeshRenderer.material = mat;
	        }
	    }
	    static getMaterial(node) {
	        if (node == null)
	            return null;
	        let mesh = this.getMesh(node);
	        if (mesh) {
	            var material = mesh.meshRenderer.sharedMaterials[0];
	            return material;
	        }
	        let mat;
	        for (let i = 0; i < node.numChildren; i++) {
	            mat = this.getMaterial(node.getChildAt(i));
	            if (mat) {
	                return mat;
	            }
	        }
	        return null;
	    }
	    static setRecieveShadow(model, val) {
	        if (model instanceof MeshSprite3D) {
	            var meshSprite3D = model;
	            meshSprite3D.meshRenderer.receiveShadow = val;
	        }
	        if (model instanceof SkinnedMeshSprite3D) {
	            var skinnedMeshSprite3D = model;
	            skinnedMeshSprite3D.skinnedMeshRenderer.receiveShadow = val;
	        }
	        for (var i = 0; i < model.numChildren; i++) {
	            this.setRecieveShadow(model.getChildAt(i), val);
	        }
	    }
	    static setCastShadow(model, val) {
	        if (model instanceof MeshSprite3D) {
	            var meshSprite3D = model;
	            meshSprite3D.meshRenderer.castShadow = val;
	        }
	        if (model instanceof SkinnedMeshSprite3D) {
	            var skinnedMeshSprite3D = model;
	            skinnedMeshSprite3D.skinnedMeshRenderer.castShadow = val;
	        }
	        for (var i = 0; i < model.numChildren; i++) {
	            this.setCastShadow(model.getChildAt(i), val);
	        }
	    }
	    static getMesh(obj) {
	        if (obj == null)
	            return null;
	        let mesh;
	        if (obj instanceof MeshSprite3D) {
	            return obj;
	        }
	        for (let i = 0; i < obj.numChildren; i++) {
	            mesh = this.getMesh(obj.getChildAt(i));
	            if (mesh) {
	                return mesh;
	            }
	        }
	        return null;
	    }
	    static getSkinMesh(obj) {
	        if (obj == null)
	            return null;
	        let mesh;
	        if (obj instanceof SkinnedMeshSprite3D) {
	            return obj;
	        }
	        for (let i = 0; i < obj.numChildren; i++) {
	            mesh = this.getSkinMesh(obj.getChildAt(i));
	            if (mesh) {
	                return mesh;
	            }
	        }
	        return null;
	    }
	    static instanceSprite3D(path, parent, handler = null) {
	        let callback = Handler.create(this, function (obj) {
	            if (obj == null || obj == null) {
	                console.error("instanceSprite3D null", path);
	                return;
	            }
	            let instance = Sprite3D.instantiate(obj, parent, false);
	            if (handler)
	                handler.runWith(instance);
	        });
	        let obj = Laya.loader.getRes(path);
	        if (obj) {
	            callback.runWith(obj);
	            return;
	        }
	        Sprite3D.load(path, callback);
	    }
	    static getComponentInChild(obj, cls) {
	        let component = obj.getComponent(cls);
	        if (component instanceof cls) {
	            return component;
	        }
	        for (let i = 0; i < obj.numChildren; i++) {
	            component = this.getComponentInChild(obj.getChildAt(i), cls);
	            if (component instanceof cls) {
	                return component;
	            }
	        }
	        return null;
	    }
	    static addSingleComponent(obj, cls) {
	        if (obj == null) {
	            console.trace("addSingleComponent obj null", cls);
	            return null;
	        }
	        let component = obj.getComponent(cls);
	        if (component == null) {
	            component = obj.addComponent(cls);
	        }
	        return component;
	    }
	    static getChild(obj, path) {
	        let nodeNames = path.split("/");
	        for (let i = 0, size = nodeNames.length; i < size; i++) {
	            obj = obj.getChildByName(nodeNames[i]);
	        }
	        return obj;
	    }
	    static findChild(obj, name) {
	        if (obj.name == name) {
	            return obj;
	        }
	        let result = null;
	        for (let i = 0, size = obj.numChildren; i < size; i++) {
	            result = this.findChild(obj.getChildAt(i), name);
	            if (result) {
	                return result;
	            }
	        }
	        return null;
	    }
	    static LayaLookAt(tf, targetPos, ignoreY = false) {
	        Vector3$2.subtract(tf.position, targetPos, this._vec);
	        Vector3$2.add(tf.position, this._vec, this._vec);
	        if (ignoreY) {
	            this._vec.y = tf.position.y;
	        }
	        tf.lookAt(this._vec, Vector3Ex.Up, false);
	    }
	    static clearTrailPositions(trailSp) {
	        let trail = trailSp['trailFilter'];
	        if (!trail)
	            return;
	        trail['_lastPosition'].setValue(0, 0, 0);
	        trail['_curtime'] = 0;
	        trail['_totalLength'] = 0;
	        let geometry = trail['_trialGeometry'];
	        if (!geometry)
	            return;
	        geometry['_activeIndex'] = 0;
	        geometry['_endIndex'] = 0;
	        geometry['_disappearBoundsMode'] = false;
	        let subBirth = geometry['_subBirthTime'];
	        subBirth && subBirth.fill(0);
	        let subDistance = geometry['_subDistance'];
	        subDistance && subDistance.fill(0);
	        geometry['_segementCount'] = 0;
	        geometry['_isTempEndVertex'] = false;
	        geometry['_needAddFirstVertex'] = false;
	        geometry['_lastFixedVertexPosition'].setValue(0, 0, 0);
	    }
	}
	ExUtils._vec = new Vector3$2();

	var EntityType;
	(function (EntityType) {
	    EntityType[EntityType["Player"] = 0] = "Player";
	    EntityType[EntityType["Obstacle"] = 1] = "Obstacle";
	    EntityType[EntityType["SpeedupBuff"] = 2] = "SpeedupBuff";
	    EntityType[EntityType["Glod"] = 3] = "Glod";
	    EntityType[EntityType["Box"] = 4] = "Box";
	})(EntityType || (EntityType = {}));
	class BaseEntity extends Laya.Script {
	    constructor() {
	        super();
	        this._animatorSpeed = 0;
	        this._animatorName = "";
	    }
	    onAwake() {
	        this.gameObject = this.owner;
	        this.transform = this.gameObject.transform;
	        if (this.entityType == EntityType.Player) {
	            this.animator = ExUtils.getComponentInChild(this.gameObject, Laya.Animator);
	        }
	    }
	    updateLogic(now) {
	    }
	    getModelId() {
	        return this.modelId;
	    }
	    crossFade(name, time) {
	        if (!this.animator)
	            return;
	        this.animator.crossFade(name, time);
	    }
	    playAnimation(_animatorName, _isPlay = true) {
	        if (this.animator) {
	            if (_isPlay) {
	                if (this._animatorSpeed > 0) {
	                    this.animator.speed = this._animatorSpeed;
	                }
	                this._animatorSpeed = 0;
	                if (_animatorName.length > 0 && (_animatorName != this._animatorName)) {
	                    this._animatorName = _animatorName;
	                    this.crossFade(_animatorName, 0.1);
	                }
	            }
	            else {
	                if (this.animator.speed > 0) {
	                    this._animatorSpeed = this.animator.speed;
	                }
	                this.animator.speed = 0;
	            }
	        }
	    }
	    setData(data) {
	        this.cfgData = data;
	    }
	}

	class CfgDataMgr {
	    constructor() {
	    }
	    initConfigs() {
	        var configs = Laya.loader.getRes(EJson.Configs);
	        function loadFunc(name) {
	            return configs[name];
	        }
	        this.globalCfg = loadFunc(ECfg.GlobalCfg);
	        this.playerCfg = loadFunc(ECfg.Player);
	        this.levelCfg = loadFunc(ECfg.LevelCfg);
	        this.shopCfg = loadFunc(ECfg.ShopCfg);
	        this.initData();
	    }
	    initData() {
	    }
	    getGlobalCfg(key, defValue = 0) {
	        let cfg = CfgDataMgr.instance.globalCfg[key];
	        return cfg ? cfg.value : defValue;
	    }
	}
	CfgDataMgr.instance = new CfgDataMgr();

	const SvModule = {};
	const scoreCache = '积分策略模块列表';
	class StrategyMgr {
	    static setStrategy(array) {
	        if (array) {
	            let modules = StrategyMgr.$modules;
	            for (let i = 0, len = array.length; i < len; i++) {
	                let item = array[i];
	                modules[item.module] = item;
	            }
	        }
	    }
	    static getStrategy(module) {
	        return StrategyMgr.$modules[module];
	    }
	    static getStrategyByModule(module, noLimit) {
	        var value = 0;
	        var strategy = StrategyMgr.getStrategy(module);
	        if (strategy) {
	        }
	        if (value == 2 && !noLimit && !platform.hasVideo) {
	            value = 1;
	        }
	        return value;
	    }
	    static init(cache) {
	        var obj;
	        try {
	            obj = JSON.parse(cache);
	            for (let i in obj) {
	                if (typeof obj[i] !== 'object')
	                    obj[i] = {};
	            }
	        }
	        catch (e) {
	            obj = {};
	        }
	        StrategyMgr.$cache = obj;
	    }
	    static clear() {
	        StrategyMgr.$cache = {};
	    }
	    static getCacheName(strategy) {
	        return StrategyMgr.isSpecial(strategy) ? scoreCache : strategy.module;
	    }
	    static getTimesByModule(module) {
	        var strategy = StrategyMgr.$modules[module];
	        if (strategy) {
	            let data = StrategyMgr.$cache[StrategyMgr.getCacheName(strategy)];
	            if (data)
	                return data[strategy.policyType] || 0;
	        }
	        return 0;
	    }
	    static setTimesByModule(module) {
	        var strategy = StrategyMgr.getStrategy(module);
	        if (strategy) {
	            let type = strategy.policyType;
	            let cache = StrategyMgr.$cache;
	            let name = StrategyMgr.getCacheName(strategy);
	            let data = cache[name] || (cache[name] = {});
	            let count = data[type];
	            if (isNaN(count))
	                count = 1;
	            else
	                count++;
	            data[type] = count;
	            StrategyMgr.saveCache();
	            if (StrategyMgr.isSpecial(strategy)) {
	                EventMgr.event(EventType.RefreshScoreSV);
	            }
	        }
	    }
	    static setRefresh(module, caller, call) {
	        var setFunc = function (attr) {
	            EventMgr[attr](EventType.RefreshScoreSV, caller, call);
	        };
	        setFunc('off');
	        if (StrategyMgr.isSpecial(StrategyMgr.getStrategy(module))) {
	            setFunc('on');
	        }
	    }
	    static isSpecial(strategy) {
	        return true;
	    }
	    static saveCache() {
	        if (!StrategyMgr.$timeout) {
	            StrategyMgr.$timeout = TimeUtils.setTimeout(function () {
	                StrategyMgr.$timeout = null;
	                UserData.instance.setStrategyCountCache(JSON.stringify(StrategyMgr.$cache));
	            }, null, 40);
	        }
	    }
	}
	StrategyMgr.$modules = {};

	const maxGrade = 5;
	class ShareTimeMgr {
	    static init(cache) {
	        var obj;
	        try {
	            obj = JSON.parse(cache);
	        }
	        catch (_a) {
	            obj = {};
	        }
	        ShareTimeMgr.$cache = obj;
	        if (isNaN(obj.lastIndex)) {
	            ShareTimeMgr.clear();
	        }
	    }
	    static clear() {
	        var cache = ShareTimeMgr.$cache;
	        cache.failCount = cache.sucCount = 0;
	        cache.lastIndex = -1;
	    }
	    static addShare(bool) {
	        var self = ShareTimeMgr;
	        var cache = self.$cache;
	        if (bool) {
	            cache.sucCount++;
	            cache.failCount = 0;
	        }
	        else {
	            cache.failCount++;
	        }
	        self.saveCache();
	        var config = self.$curConfig;
	        if (config) {
	        }
	    }
	    static getShareTime() {
	        var self = ShareTimeMgr;
	        var hour = new Date().getHours(), retT;
	        var curConfig = self.$curConfig = self.getCurStrategy();
	        var shareTimes = curConfig && curConfig.shareTimes, time;
	        for (let i in shareTimes) {
	            let times = shareTimes[i];
	            if (self.hourInTime(hour, times)) {
	                retT = times;
	                break;
	            }
	        }
	        if (retT) {
	            let newId = retT.id;
	            if (self.lastIndex !== newId) {
	                self.clear();
	                self.lastIndex = newId;
	                ShareTimeMgr.saveCache();
	            }
	        }
	        else {
	            self.lastIndex = -1;
	        }
	        return self.getTime(shareTimes);
	    }
	    static getCurStrategy() {
	        var configs = ShareTimeMgr.$configs, score = ShareTimeMgr.score;
	        for (let i = 0, len = configs.length; i < len; i++) {
	            let config = configs[i];
	            if (score <= config.endScore) {
	                return config;
	            }
	        }
	    }
	    static getShareToVideoCount() {
	        var config = ShareTimeMgr.getCurStrategy();
	        return config ? config.shareToVideo : 0;
	    }
	    static hourInTime(hour, time) {
	        var start = time.start, end = time.end;
	        return hour >= start ? hour < end : (end > 24 && hour < end % 24);
	    }
	    static getTime(times) {
	        var time;
	        if (times) {
	            let self = ShareTimeMgr;
	            let share = times[self.lastIndex];
	            if (share) {
	                let times = share.times;
	                time = times[self.failCount] || times[times.length - 1];
	            }
	        }
	        return time || { times: [3], rands: [0, 100] };
	    }
	    static get lastIndex() {
	        return ShareTimeMgr.$cache.lastIndex;
	    }
	    static set lastIndex(value) {
	        ShareTimeMgr.$cache.lastIndex = value;
	        ShareTimeMgr.saveCache();
	    }
	    static get sucCount() {
	        return ShareTimeMgr.$cache.sucCount;
	    }
	    static set sucCount(value) {
	        ShareTimeMgr.$cache.sucCount = value;
	        ShareTimeMgr.saveCache();
	    }
	    static get failCount() {
	        return ShareTimeMgr.$cache.failCount;
	    }
	    static set failCount(value) {
	        ShareTimeMgr.$cache.failCount = value;
	        ShareTimeMgr.saveCache();
	    }
	    static saveCache() {
	        Laya.timer.once(100, ShareTimeMgr, ShareTimeMgr.onSave);
	    }
	    static onSave() {
	        UserData.instance.setShareTimeCache(JSON.stringify(ShareTimeMgr.$cache));
	    }
	    static initShareTime(starInfo, index) {
	        var share = {};
	        var array = starInfo.split(';');
	        if (array.length >= 2) {
	            let seHour = array[0].split('-');
	            let times = share.times = [];
	            let remain = array[1];
	            share.id = index;
	            share.start = Number(seHour[0]);
	            share.end = Number(seHour[1]);
	            while (remain) {
	                remain = ShareTimeMgr.parseJson(times, remain);
	            }
	        }
	        return share;
	    }
	    static parseJson(times, str) {
	        var index = str.indexOf('{'), remain1 = '';
	        var time = {};
	        if (index > -1) {
	            let count = 1, endi = index + 1, len = str.length;
	            for (; endi < len; endi++) {
	                if (str[endi] == '{')
	                    count++;
	                else if (str[endi] == '}') {
	                    if (--count == 0) {
	                        endi++;
	                        break;
	                    }
	                }
	            }
	            let data = str.substring(index, endi);
	            try {
	                time.tips = JSON.parse(data);
	            }
	            catch (_a) {
	                console.warn('error json:' + data);
	            }
	            while (str[endi] == ',') {
	                endi++;
	            }
	            remain1 = str.substr(endi);
	            str = str.substr(0, index);
	        }
	        var strs = [];
	        var remain0 = ShareTimeMgr.splitChar(strs, str, ',', 5);
	        var nums = strs.map(function (v) { return Number(v); });
	        time.times = nums.splice(0, 2);
	        time.rands = nums.splice(0, 3).map(function (v) { return v / 100; });
	        times.push(time);
	        return remain0 + remain1;
	    }
	    static splitChar(array, str, char, count) {
	        var index = -1;
	        while (count--) {
	            index = str.indexOf(char);
	            if (index == -1) {
	                if (str) {
	                    array.push(str);
	                    str = '';
	                }
	                break;
	            }
	            array.push(str.substr(0, index));
	            str = str.substr(index + 1);
	        }
	        return str;
	    }
	}
	ShareTimeMgr.$configs = [];

	var $loader;
	var getLoader = function () {
	    return $loader || ($loader = new Laya.LoaderManager, $loader.retryNum = 1, $loader);
	};
	class SideUtils {
	    static getRes(url, type) {
	        return new Promise(function (resolve) {
	            let loader = getLoader();
	            let res = loader.getRes(url);
	            if (res)
	                resolve(res);
	            else
	                loader.load(url, Laya.Handler.create(null, resolve), null, type);
	        });
	    }
	    static drawRoundRect(graphics, width, height, round) {
	        var paths = [
	            ['moveTo', round, 0],
	            ['lineTo', width - round, 0],
	            ['arcTo', width, 0, width, round, round],
	            ['lineTo', width, height - round],
	            ['arcTo', width, height, width - round, height, round],
	            ['lineTo', round, height],
	            ['arcTo', 0, height, 0, height - round, round],
	            ['lineTo', 0, round],
	            ['arcTo', 0, 0, round, 0, round]
	        ];
	        graphics.drawPath(0, 0, paths, { fillStyle: "#0" });
	    }
	    static randomSort(array) {
	        return array.sort(function (a, b) {
	            return Math.random() - 0.5;
	        });
	    }
	    static randomInArray(array, item) {
	        var length = array.length, splice = length;
	        if (length > 1 && item != void 0) {
	            let index = array.indexOf(item);
	            if (index > -1) {
	                length--;
	                splice = index;
	            }
	        }
	        var rndIdx = Math.random() * length | 0;
	        if (rndIdx >= splice)
	            rndIdx++;
	        return array[rndIdx];
	    }
	}

	class SideData {
	    constructor(data) {
	        this.sideboxId = 0;
	        this.type = 0;
	        this.title = '';
	        this.icon = '';
	        this.status = 0;
	        this.innerStatus = 0;
	        this.showTime = 0;
	        this.jumpAppid = '';
	        this.path = '';
	        this.shieldIos = 0;
	        for (let i in data) {
	            this[i] = data[i];
	        }
	    }
	}
	const config = {
	    local: 'wxlocal/adConfig.json',
	    cache: '$adConfig$',
	    timeout: 5000,
	    switch: true,
	    checkUrl: 'https://ydhwslb.szvi-bo.com/jslb/getUrl'
	};
	class SideMgr {
	    static init(platform, enabled, localCfg) {
	        var self = SideMgr;
	        self.platform = platform;
	        self.$useSvr = !enabled;
	        for (let i in localCfg) {
	            config[i] = localCfg[i];
	        }
	        var register = SideMsg.register;
	        register(ESMessage.C2S_SWITCH, self.onSwitch, self, true);
	        register(ESMessage.C2S_RM_SIDES, self.onRmSides, self);
	        register(ESMessage.C2S_RM_BOARDS, self.onRmBoards, self);
	        register(ESMessage.C2S_REMOVE, self.onRemove, self);
	        register(ESMessage.C2S_RESET, self.onReset, self);
	        if (enabled) {
	            let obj;
	            try {
	                obj = JSON.parse(Laya.LocalStorage.getItem(config.cache));
	            }
	            catch (_a) { }
	            if (obj !== null && typeof obj === 'object') {
	                self.onCompleteL(obj);
	            }
	            else {
	                SideUtils.getRes(config.local).then(self.onCompleteL);
	            }
	        }
	    }
	    static checkObj(obj) {
	        var result = false;
	        if (obj) {
	            let timestamp = obj.timestamp;
	            if (!isNaN(timestamp)) {
	                let boxes = obj.boxes;
	                let length = boxes instanceof Array && boxes.length;
	                if (length > 0) {
	                    while (length--) {
	                    }
	                    result = true;
	                }
	            }
	        }
	        return result;
	    }
	    static onCompleteL(data) {
	        console.log('data', data);
	        var self = SideMgr;
	        if (data) {
	            self.$cache = self.checkObj(data) && data;
	            self.checkCache();
	        }
	        else {
	            self.onErrorL();
	        }
	    }
	    static onErrorL() {
	        var self = SideMgr;
	        var config = self.$svrConfig;
	        self.$useSvr = true;
	        if (config) {
	            self.onComplete(config);
	        }
	        else {
	            self.checkCache();
	        }
	        console.error('请先设置好本地卖量配置');
	    }
	    static checkCache() {
	        var self = SideMgr;
	        var cache = self.$cache;
	        var timestamp = cache ? cache.timestamp : 0;
	        var platform = self.platform;
	        var data = {
	            appid: platform.appId,
	            version: platform.version,
	            timestamp: timestamp
	        };
	        Http.get(config.checkUrl, data, config.timeout).then(self.onCompleteC).catch(self.onError);
	    }
	    static onCompleteC(data) {
	        var self = SideMgr;
	        if (!data.newCofig) {
	            let url = data.url;
	            if (url) {
	                SideUtils.getRes(url + '?m=' + Date.now()).then(self.onComplete);
	                return;
	            }
	        }
	        self.onError();
	    }
	    static onError() {
	        var self = SideMgr;
	        self.onComplete(self.$cache);
	    }
	    static onComplete(data) {
	        var self = SideMgr;
	        if (!self.$complete && data) {
	            console.log('最终卖量数据', data);
	            self.$cache = data;
	            self.initSides();
	            self.$complete = true;
	            self.$useSvr || Laya.LocalStorage.setJSON(config.cache, data);
	            SideMsg.noticeLater(ESMessage.S2S_COMPLETE, data);
	        }
	    }
	    static initSides() {
	        var self = SideMgr;
	        var datas = self.$cache.boxes;
	        if (datas) {
	            let array = [], arrayZ = [];
	            let rmSides = self.$rmSides;
	            let rmFirst = rmSides && rmSides[0];
	            let rmFunc = rmFirst ? (typeof rmFirst === 'string' ? function (d) {
	                return rmSides.indexOf(d.jumpAppid) == -1;
	            } : function (d) {
	                return rmSides.indexOf(d.sideboxId) == -1;
	            }) : function (d) { return true; };
	            let noIPhone = !Laya.Browser.onIOS;
	            for (let i = 0, len = datas.length; i < len; i++) {
	                let data = datas[i];
	                if (data.status == 1 && (noIPhone || data.shieldIos != 1)) {
	                    arrayZ.push(data);
	                }
	            }
	            self.$boxes = array;
	            self.$boxesZ = arrayZ;
	        }
	    }
	    static initBoards() {
	        var self = SideMgr;
	        var datas = self.$boards;
	        if (datas) {
	            let rmBoards = self.$rmBoards;
	            let rmFirst = rmBoards && rmBoards[0];
	            let rmFunc = rmFirst ? (typeof rmFirst === 'string' ? function (d) {
	                return rmBoards.indexOf(d.jumpAppid) == -1;
	            } : function (d) {
	                return rmBoards.indexOf(d.sideboxId) == -1;
	            }) : function (d) { return true; };
	            let noIPhone = !Laya.Browser.onIOS;
	            for (let i = 0, len = datas.length; i < len; i++) {
	                let data = datas[i];
	                data.isAwarded = !rmFunc(data);
	            }
	        }
	    }
	    static onSwitch(bool) {
	        config.switch = !!bool;
	    }
	    static onRmSides(ids) {
	        var self = SideMgr;
	        if (ids) {
	            self.$rmSides = ids;
	            if (self.$complete) {
	                self.initSides();
	            }
	        }
	    }
	    static onRmBoards(ids) {
	        var self = SideMgr;
	        if (ids) {
	            self.$rmBoards = ids;
	            self.initBoards();
	        }
	    }
	    static onRemove(data) {
	        SideMgr.removeSide(data);
	    }
	    static onReset() {
	        SideMgr.resetSide();
	    }
	    static showMore() {
	        SideMsg.notice(ESMessage.S2C_CANCEL);
	    }
	    static loadSides(call, thisObj) {
	        var self = SideMgr;
	        var endc = function () {
	            call.call(thisObj, self.getSides());
	        };
	        if (self.$complete) {
	            endc();
	        }
	        else {
	            SideMsg.register(ESMessage.S2S_COMPLETE, endc, self, true);
	        }
	    }
	    static getSides() {
	        return config.switch ? SideMgr.$boxes : null;
	    }
	    static hasSide() {
	        var boxes = SideMgr.getSides();
	        return boxes && boxes.length > 0;
	    }
	    static checkShow(view) {
	        if (platform.isOppo) {
	            view.visible = false;
	        }
	        else {
	            view.visible = false;
	            SideMgr.loadSides(function (datas) {
	                view.visible = datas && datas.length > 0;
	            });
	        }
	    }
	    static removeSide(data) {
	        var boxes = SideMgr.$boxes;
	        var index = boxes && boxes.indexOf(data);
	        if (index > -1) {
	            boxes.splice(index, 1);
	            SideMsg.notice(ESMessage.S2S_REMOVE, data);
	        }
	    }
	    static resetSide() {
	        var self = SideMgr;
	        var boxesZ = self.$boxesZ;
	        boxesZ && (self.$boxes = boxesZ.concat());
	    }
	    static setSvrSide(datas) {
	        var self = SideMgr;
	        var config = self.$svrConfig = {
	            timestamp: 0,
	            version: '1.0.0',
	            boxes: datas
	        };
	        SideMgr.onComplete(config);
	    }
	    static setSvrSBoard(datas) {
	        if (!SideMgr.$boards && datas) {
	            let array = SideMgr.$boards = [];
	            for (let i = 0, len = datas.length; i < len; i++) {
	                let data = datas[i];
	                if (data.isOpen) {
	                    data.sideboxId = data.id;
	                    data.path = data.jumpPath;
	                    array.push(data);
	                }
	            }
	            SideMsg.notice(ESMessage.S2S_COMPLETE1, array);
	        }
	    }
	    static reqYLSideboxAndBoard() {
	        if (!SideMgr.$complete) {
	            let sideboxArr = [];
	            if (Laya.Browser.onPC) {
	                sideboxArr.push({
	                    icon: "https://ydhwimg.szvi-bo.com/wx94a280837610e390/sidebox/528b9fe9085146e7908123bc0dd077f9.jpg",
	                    innerStatus: 0,
	                    jumpAppid: "wxb2e8e6a45ee0f0dc",
	                    path: "",
	                    shieldIos: 0,
	                    showTime: 30,
	                    sideboxId: 5381,
	                    status: 1,
	                    title: "天天涂鸦",
	                    type: 0
	                }, {
	                    icon: "https://ydhwimg.szvi-bo.com/wx94a280837610e390/sidebox/f679c18745004196b3f9fd63106925ae.png",
	                    innerStatus: 0,
	                    jumpAppid: "wxdfd16d128b23abd4",
	                    path: "",
	                    shieldIos: 0,
	                    showTime: 30,
	                    sideboxId: 5382,
	                    status: 1,
	                    title: "我吃糖贼6",
	                    type: 0
	                }, {
	                    icon: "https://ydhwimg.szvi-bo.com/wx94a280837610e390/sidebox/f45857909999465cbc965f74e0d0c949.png",
	                    innerStatus: 0,
	                    jumpAppid: "wx994fa8e21a539e13",
	                    path: "",
	                    shieldIos: 0,
	                    showTime: 30,
	                    sideboxId: 5383,
	                    status: 1,
	                    title: "水上乐园",
	                    type: 0
	                });
	            }
	            else {
	            }
	        }
	        if (!SideMgr.$boards) {
	            let boardArr = [];
	            if (Laya.Browser.onPC) {
	                boardArr.push({
	                    award: "[{'type':'gold','value':'0'}]",
	                    icon: "https://ydhwimg.szvi-bo.com/wx94a280837610e390/scoreboard/00fd6134a02548c490f80368f82d75cc.jpg",
	                    id: 393,
	                    isOpen: true,
	                    jumpAppid: "wxb2e8e6a45ee0f0dc",
	                    path: "",
	                    sideboxId: 393,
	                    title: "天天涂鸦"
	                }, {
	                    award: "[{'type':'gold','value':'0'}]",
	                    icon: "https://ydhwimg.szvi-bo.com/wx38483cec31344b79/scoreboard/598c1db65dbc45738de7ebac2c404792.png",
	                    id: 409,
	                    isOpen: true,
	                    jumpAppid: "wx994fa8e21a539e13",
	                    path: "",
	                    sideboxId: 393,
	                    title: "水上乐园"
	                });
	                SideMgr.setSvrSBoard(boardArr);
	            }
	            else {
	            }
	        }
	    }
	    static loadBoards(call, thisObj) {
	        var self = SideMgr;
	        var endc = function () {
	            call.call(thisObj, self.getBoards());
	        };
	        if (self.$boards) {
	            endc();
	        }
	        else {
	            SideMsg.register(ESMessage.S2S_COMPLETE, endc, self, true);
	        }
	    }
	    static getBoards() {
	        return config.switch ? SideMgr.$boards : null;
	    }
	    static hasBoards() {
	        var boxes = SideMgr.getBoards();
	        return boxes && boxes.length > 0;
	    }
	    static removeBoard(boardId) {
	        var boards = SideMgr.$boards;
	        if (boards) {
	            for (let i = 0, len = boards.length; i < len; i++) {
	                let data = boards[i];
	                if (data.id === boardId) {
	                    data.isAwarded = true;
	                    SideMsg.notice(ESMessage.S2S_REMOVE1, data);
	                    break;
	                }
	            }
	        }
	    }
	}
	class Http extends Laya.HttpRequest {
	    addCall(call, error, thisObj, timeout) {
	        var self = this;
	        var lEvent = Laya.Event;
	        self.$comCall = call;
	        self.$errorCall = error;
	        self.$thisObj = thisObj;
	        self.once(lEvent.COMPLETE, self, self.onComplete);
	        self.once(lEvent.ERROR, self, self.onError);
	        Laya.timer.once(timeout > 0 ? timeout : 5000, self, self.onError);
	    }
	    onComplete(data) {
	        var self = this;
	        var call = self.$comCall;
	        call && call.call(self.$thisObj, data);
	        self.onClear();
	    }
	    onError(data) {
	        var self = this;
	        var call = self.$errorCall;
	        call && call.call(self.$thisObj, data);
	        self.onClear();
	    }
	    onClear() {
	        var self = this;
	        self.offAll();
	        self.$comCall = self.$errorCall = self.$thisObj = null;
	        Laya.timer.clear(self, self.onError);
	    }
	    static get(url, data, timeout) {
	        return new Promise(function (resolve, reject) {
	            let http = new Http;
	            if (data !== null && data !== undefined) {
	                if (typeof data === 'object') {
	                    var attr = [];
	                    for (let i in data) {
	                        attr.push(i + '=' + data[i]);
	                    }
	                    url += '?' + attr.join('&');
	                }
	                else {
	                    url += data;
	                }
	            }
	            http.send(url, null, 'get', 'json');
	            http.addCall(resolve, reject, null, timeout);
	        });
	    }
	}

	class UserData {
	    constructor() {
	        this.isNewPlayer = false;
	        this.localMap = {};
	        this.cacheTime = 0;
	        this._lastGameDate = -1;
	        this._gold = 0;
	        this._level = 1;
	        this._version = '';
	        this._isSubscribe = false;
	        this._strategyCountCache = '';
	        this._shareTimeCache = '';
	        this._rmSides = [];
	        this._shopCache = '';
	    }
	    init() {
	        var self = this, localMap = self.localMap;
	        var getItem = Laya.LocalStorage.getItem;
	        for (let key in self) {
	            if (key.indexOf("_") == 0) {
	                let val = getItem(key);
	                if (val != null && val.length > 0) {
	                    let old = localMap[key] = self[key];
	                    if (typeof old === 'object') {
	                        val = JSON.parse(val);
	                    }
	                    else if (typeof old === 'number' && !isNaN(old)) {
	                        val = +val || old;
	                    }
	                    else if (typeof old === 'boolean') {
	                        val = val === 'true';
	                    }
	                    self[key] = val;
	                }
	            }
	        }
	        self.formatAll();
	        var cacheTime = Number(getItem("cacheTime"));
	        self.cacheTime = isNaN(cacheTime) ? 0 : cacheTime;
	        Laya.timer.loop(30000, self, self.onUpdate);
	    }
	    parseDataFromSvr(data) {
	        var self = this, cacheTime = self.cacheTime;
	        console.log('parseDataFromSvr', data, data.cacheTime - cacheTime, data._level, self.level);
	        if (data.cacheTime > cacheTime || cacheTime == 0 || data._level > self.level) {
	            for (let key in data) {
	                if (key.indexOf("_") == 0) {
	                    let newV = data[key];
	                    let oldV = self[key];
	                    if (oldV !== void 0 && newV != oldV) {
	                        self[key] = newV;
	                        self.setData(key, data[key]);
	                    }
	                }
	            }
	            self.updateCacheTime();
	            self.formatAll();
	            EventMgr.event(EventType.RefreshCacheData);
	        }
	    }
	    checkNewDay() {
	        var self = this;
	        if (self.accountId) {
	            let curDate = Date.now();
	            if (!TimeUtils.isSameDay(curDate, self._lastGameDate)) {
	                self.setStrategyCountCache('');
	                StrategyMgr.clear();
	                self._lastGameDate = curDate;
	                self.cacheData("_lastGameDate");
	                self._rmSides = [];
	                self.cacheData('_rmSides');
	                SideMgr.resetSide();
	                EventMgr.event(EventType.CheckNewDay);
	                return true;
	            }
	        }
	    }
	    uploadToSvr() {
	        var self = this;
	        Laya.timer.once(100, self, self.onUpload);
	    }
	    clearData() {
	        var self = this;
	        if (!self.isClear || !isNaN(self.accountId)) {
	            let localMap = self.localMap;
	            self.needUpload = true;
	            Laya.LocalStorage.clear();
	            for (let i in localMap) {
	                self[i] = localMap[i];
	            }
	            self.updateCacheTime();
	            self.onUpload();
	            self.isClear = true;
	            Laya.timer.once(20000, self, function () {
	                self.isClear = false;
	            });
	        }
	    }
	    checkSubsMsg() {
	        var self = this;
	        if (!self.isSubscribe) {
	            let newVersion = platform.version;
	            if (newVersion !== self.version) {
	                self.version = newVersion;
	                platform.requestSubscribeMessage(function (bool) {
	                    if (bool) {
	                        self.isSubscribe = true;
	                    }
	                });
	            }
	        }
	    }
	    uploadWxData() {
	        var self = this;
	        var kvDataList = [{
	                key: "level",
	                value: "" + self.level
	            }, {
	                key: "userId",
	                value: "" + self.accountId
	            }];
	        platform.setUserCloudStorage(kvDataList);
	    }
	    formatAll() {
	        var self = this;
	        StrategyMgr.init(self._strategyCountCache);
	        ShareTimeMgr.init(self._shareTimeCache);
	        SideMsg.notice(ESMessage.C2S_RM_SIDES, self._rmSides);
	        ShopMgr.init(self._shopCache);
	    }
	    onUpdate() {
	        var self = this;
	        self.checkNewDay();
	        self.uploadToSvr();
	    }
	    onUpload() {
	        var self = this;
	    }
	    cacheData(key) {
	        var self = this;
	        if (!self.isClear) {
	            self.updateCacheTime();
	            self.setData(key, self[key]);
	            self.needUpload = true;
	        }
	    }
	    setData(key, value) {
	        if (typeof value === 'object')
	            value = JSON.stringify(value);
	        else
	            value += '';
	        Laya.LocalStorage.setItem(key, value);
	    }
	    updateCacheTime() {
	        var self = this, time = self.cacheTime = Date.now();
	        self.setData('cacheTime', '' + time);
	    }
	    get gold() {
	        return this._gold;
	    }
	    set gold(value) {
	        var self = this;
	        self._gold = value;
	        self.cacheData('_gold');
	        EventMgr.event(EventType.RefreshGold);
	    }
	    get level() {
	        return this._level;
	    }
	    set level(level) {
	        var self = this;
	        self._level = level;
	        self.cacheData("_level");
	        self.uploadWxData();
	        EventMgr.event(EventType.RefreshLevel);
	    }
	    get version() {
	        return this._version;
	    }
	    set version(v) {
	        this._version = v;
	        this.cacheData("_version");
	    }
	    get isSubscribe() {
	        return this._isSubscribe;
	    }
	    set isSubscribe(bool) {
	        this._isSubscribe = bool;
	        this.cacheData('_isSubscribe');
	    }
	    removeSide(data) {
	        var self = this, ret = false;
	        var rmSides = self._rmSides;
	        var sideBoxId = data._id;
	        if (rmSides.indexOf(sideBoxId) == -1) {
	            rmSides.push(sideBoxId);
	            self.cacheData('_rmSides');
	        }
	        SideMgr.removeSide(data);
	        if (!SideMgr.hasSide()) {
	            EventMgr.event(EventType.CloseSide);
	        }
	    }
	    setStrategyCountCache(str) {
	        this._strategyCountCache = str;
	        this.cacheData('_strategyCountCache');
	    }
	    setShareTimeCache(str) {
	        this._shareTimeCache = str;
	        this.cacheData('_shareTimeCache');
	    }
	    setShopCache(_strData) {
	        this._shopCache = _strData;
	        this.cacheData("_shopCache");
	    }
	}
	UserData.instance = new UserData();

	class TrySkinMgr {
	    static init(cache) {
	        var obj;
	        try {
	            obj = JSON.parse(cache);
	        }
	        catch (e) {
	            obj = {};
	        }
	        TrySkinMgr.$cache = obj;
	    }
	    static getSkins() {
	        var skins = TrySkinMgr.$skins;
	        if (!skins) {
	            let configs = CfgDataMgr.instance.shopCfg, hasShop = ShopMgr.hasShop;
	            skins = TrySkinMgr.$skins = [];
	            for (let i in configs) {
	                let config = configs[i];
	                if (config.IsExperience > 0 && !hasShop(config.id))
	                    skins.push(config);
	            }
	        }
	        return skins;
	    }
	    static inSkins(skinId) {
	        var skins = TrySkinMgr.getSkins();
	        for (let i = 0, len = skins.length; i < len; i++)
	            if (skins[i].id === skinId)
	                return true;
	        return false;
	    }
	    static remove(skinId) {
	        var skins = TrySkinMgr.getSkins();
	        for (let i = 0, len = skins.length; i < len; i++)
	            if (skins[i].id == skinId) {
	                skins.splice(i, 1);
	                break;
	            }
	    }
	    static canTry() {
	        var uInc = UserData.instance;
	        return GameConst.ShareSwitch && uInc.level >= 3;
	    }
	    static getRandomSkinId() {
	        var skinId = 0;
	        var skins = TrySkinMgr.getSkins();
	        var length = skins.length;
	        if (length > 0)
	            skinId = Utils.randomInArray(skins).id;
	        return skinId;
	    }
	    static getRemain(skinId) {
	        var count = TrySkinMgr.$cache[skinId] || 0;
	        var config = CfgDataMgr.instance.shopCfg[skinId];
	        return config ? config.ExperienceNumber - count : 0;
	    }
	    static addTryCount(skinId) {
	        var cache = TrySkinMgr.$cache;
	        var config = CfgDataMgr.instance.shopCfg[skinId];
	        var count = cache[skinId] = (cache[skinId] || 0) + 1;
	        var bool = count === config.ExperienceNumber;
	        if (bool) {
	            delete cache[skinId];
	            ShopMgr.unlockShop(skinId);
	        }
	        return bool;
	    }
	}
	TrySkinMgr.closeWin = 0;

	class ShopMgr {
	    static init(cache) {
	        var obj;
	        try {
	            obj = JSON.parse(cache);
	        }
	        catch (e) {
	            obj = {};
	        }
	        if (isNaN(obj.curSkinId))
	            obj.curSkinId = 1000;
	        var unlocks = obj.unlocks;
	        if (!unlocks || !(unlocks instanceof Array) || unlocks.length == 0)
	            obj.unlocks = [1000];
	        ShopMgr.$cache = obj;
	        ShopMgr.$unlocks = obj.unlocks;
	    }
	    static hasShop(shopId) {
	        return ShopMgr.$unlocks.indexOf(shopId) > -1;
	    }
	    static getShop(shopId) {
	        return CfgDataMgr.instance.shopCfg[shopId];
	    }
	    static unlockShop(shopId) {
	        var unlocks = ShopMgr.$unlocks, bool;
	        if (bool = unlocks.indexOf(shopId) == -1 && !!ShopMgr.getShop(shopId)) {
	            unlocks.push(shopId);
	            ShopMgr.saveCache();
	            TrySkinMgr.remove(shopId);
	        }
	        return bool;
	    }
	    static get curSkinId() {
	        return ShopMgr.$cache.curSkinId;
	    }
	    static set curSkinId(skinId) {
	        var cache = ShopMgr.$cache;
	        if (ShopMgr.hasShop(skinId) && cache.curSkinId != skinId) {
	            cache.curSkinId = skinId;
	            ShopMgr.saveCache();
	            EventMgr.event(EventType.RefreshSkin);
	        }
	    }
	    static isSpacial(shopId) {
	        return shopId == 1105 || shopId == 1101;
	    }
	    static saveCache() {
	        if (!ShopMgr.$timeout) {
	            ShopMgr.$timeout = TimeUtils.setTimeout(function () {
	                ShopMgr.$timeout = null;
	                UserData.instance.setShopCache(JSON.stringify(ShopMgr.$cache));
	            }, null, 40);
	        }
	    }
	}

	class Player extends BaseEntity {
	    constructor() {
	        super();
	        this.isRole = false;
	        this.skinId = 0;
	        this.isDead = false;
	        this._useOneLvSkin = false;
	    }
	    onAwake() {
	        super.onAwake();
	        this.entityType = EntityType.Player;
	        if (!this.isRole)
	            this.fsm = new ActionFSM(this);
	    }
	    setData(data) {
	        super.setData(data);
	    }
	    isRolePlayer() {
	        return this.isRole;
	    }
	    setPlayerId(id) {
	        this.playerId = id;
	    }
	    getPlayerId() {
	        return this.playerId;
	    }
	    set playerName(val) {
	        this._playerName = val;
	    }
	    get playerName() {
	        return this._playerName;
	    }
	    updateLogic(now) {
	        super.updateLogic(now);
	        this.fsm && this.fsm.updateLogic();
	    }
	    startAI() {
	        if (this.fsm) {
	            this.fsm.changeState(FSMState.AttackState);
	            this.fsm.setRunning(true);
	        }
	    }
	    stopAI() {
	        if (this.fsm) {
	            this.fsm.setRunning(false);
	            this.fsm.changeState(FSMState.None);
	        }
	    }
	    onCollisionEnter(collision) {
	    }
	    onTriggerEnter(other) {
	    }
	    doDead() {
	        this.isDead = true;
	        this.stopAI();
	    }
	    revive() {
	        this.isDead = false;
	        this.startAI();
	    }
	    changeModel(skinId, useOneLv = false, callback = null) {
	        this._useOneLvSkin = useOneLv;
	        var config = ShopMgr.getShop(skinId);
	        if (skinId != this.skinId && config) {
	            let modelName = config.url;
	            this.setData(config);
	            this.skinId = skinId;
	        }
	        if (name == this._modelName)
	            return;
	        this._modelName = name;
	        let path = SceneRoot + name + ".lh";
	        ExUtils.instanceSprite3D(path, null, Laya.Handler.create(this, (newModel) => {
	            let oldModel = this.gameObject.getChildAt(0);
	            if (oldModel)
	                oldModel.destroy();
	            this.gameObject.addChildAt(newModel, 0);
	            this.animator = ExUtils.getComponentInChild(newModel, Laya.Animator);
	            this.crossFade("run", 0);
	            this._mesh = ExUtils.getSkinMesh(newModel);
	            if (callback) {
	                callback.run();
	            }
	        }));
	    }
	}

	class RolePlayer extends Player {
	    onAwake() {
	        this.isRole = true;
	        super.onAwake();
	        this.playerName = "你";
	    }
	    updateLogic(now) {
	        super.updateLogic(now);
	    }
	}

	class TipView extends Laya.View {
	    constructor() {
	        super();
	        var width = 800, height = 80;
	        var img = new Laya.Image("common/blank.png");
	        img.width = width;
	        img.height = height;
	        var txt = new Laya.Text();
	        this._txt = txt;
	        txt.fontSize = 36;
	        txt.wordWrap = true;
	        txt.color = "#FFFFFF";
	        txt.width = width;
	        txt.height = height;
	        txt.align = "center";
	        txt.valign = "middle";
	        this.addChild(img);
	        this.addChild(txt);
	        this.width = width;
	        this.height = height;
	    }
	    set text(text) {
	        this._txt.text = text;
	    }
	    play(call, thisObj) {
	        var self = this;
	        self.scale(.8, .8);
	        self.alpha = 1;
	        Tween.get(self).
	            to({
	            scaleX: 1, scaleY: 1
	        }, 200, Tween.turnEase(Laya.Ease.backOut)).
	            wait(400).
	            to({ alpha: 0 }, 400).
	            call(call, thisObj);
	    }
	}
	const randomBanner = function () {
	    var banners = platform.banners;
	    return banners && banners[Math.random() * banners.length | 0];
	};
	class UIMgr {
	    static checkView(ui) {
	        if (ui.setCloseCall === void 0) {
	            ui.setCloseCall = function (call, obj) {
	                let ond = ui.onDisable;
	                ui.onDisable = function () {
	                    ond.call(ui);
	                    ui.onDisable = ond;
	                    call && call.call(obj);
	                };
	            };
	        }
	        if (ui.onShow === void 0) {
	            ui.onShow = function () { };
	        }
	        if (ui.onHide === void 0) {
	            ui.onHide = function () { };
	        }
	    }
	    static checkBanner(ui, bool) {
	        let uiConfig = ui.$uiConfig;
	        if (bool && uiConfig.banner) {
	            let misTouchInfo = YLSDK.ins.getBtnMisData();
	            let isMisTouchView = misTouchInfo.switch && uiConfig.misTouch;
	            let moveTime = misTouchInfo.bannerTime;
	            let time = moveTime || 0;
	            window.ydhw_wx && (ydhw.CreateBannerAd(false, false, this, () => {
	                if (time > 0 && isMisTouchView) {
	                    Laya.timer.once(time, this, () => {
	                        if (ui == UIMgr.topUI()) {
	                            ydhw.ShowBannerAd();
	                            ui.$showBanner = true;
	                        }
	                    });
	                }
	                else {
	                    ydhw.ShowBannerAd();
	                    ui.$showBanner = true;
	                }
	            }));
	            return;
	        }
	        ui.$showBanner = false;
	        window.ydhw_wx && (ydhw.HideBannerAd());
	    }
	    static checkMask(ui) {
	        var config = ui.$uiConfig;
	        config && config.mask ? UIMgr.showMaskBg(ui) : UIMgr.hideMaskBg();
	    }
	    static checkTop(topUI) {
	        var curTop = UIMgr.topUI();
	        if (topUI == curTop && curTop) {
	            UIMgr.checkBanner(topUI, true);
	            UIMgr.checkMask(topUI);
	            curTop.onShow();
	        }
	    }
	    static showSideList(ui) {
	    }
	    static hideSideList() {
	    }
	    static onUIClose(ui) {
	        var config = ui.$uiConfig;
	        var tween = config && config.tween;
	        if (tween) {
	            UIMgr.hideTween(ui);
	        }
	        else {
	            UIMgr.destroyUI(ui);
	        }
	    }
	    static destroyUI(ui) {
	        var list = ui._aniList;
	        UIMgr.checkBanner(ui, false);
	        if (list) {
	            for (let i = 0, len = list.length; i < len; i++) {
	                let ani = list[i];
	                if (ani instanceof Laya.AnimationBase)
	                    ani.clear();
	            }
	            ui._aniList = null;
	        }
	        Laya.timer.clearAll(ui);
	        Laya.stage.removeChild(ui);
	        Tween.clearAll(ui);
	        ui.close();
	        ui.destroy(true);
	    }
	    static showTween(ui) {
	        Utils.uiEnableCall(ui, UIMgr.onShowTween, UIMgr, ui);
	    }
	    static onShowTween(ui) {
	        var stage = Laya.stage;
	        if (isNaN(ui.anchorX)) {
	            ui.anchorX = .5;
	            ui.x += ui.width / 2;
	        }
	        if (isNaN(ui.anchorY)) {
	            ui.anchorY = .5;
	            ui.y += ui.height / 2;
	        }
	        ui.scale(0, 0);
	        stage.mouseEnabled = false;
	        Tween.get(ui).to({ scaleX: 1, scaleY: 1 }, 300, Tween.turnEase(Laya.Ease.backOut)).call(function () {
	            stage.mouseEnabled = true;
	        });
	    }
	    static hideTween(ui) {
	        var stage = Laya.stage;
	        UIMgr.showMaskBg(ui);
	        stage.mouseEnabled = false;
	        Tween.get(ui).to({ scaleX: 0, scaleY: 0 }, 300, Tween.turnEase(Laya.Ease.backIn)).call(function () {
	            UIMgr.hideMaskBg();
	            stage.mouseEnabled = true;
	            UIMgr.destroyUI(ui);
	        });
	    }
	    static showMaskBg(ui) {
	        var mask = UIMgr._maskBg;
	        var stage = Laya.stage;
	        if (!mask) {
	            mask = UIMgr._maskBg = new Laya.Image("common/blank_2.png");
	            mask.sizeGrid = "2,2,2,2";
	            mask.size(stage.width + 20, stage.height + 20);
	            mask.pos(-10, -10);
	            mask.alpha = .7;
	            mask.on(Laya.Event.MOUSE_DOWN, UIMgr, UIMgr.onStMask);
	        }
	        stage.addChild(mask);
	        mask.zOrder = ui.zOrder;
	        stage.setChildIndex(mask, stage.getChildIndex(ui));
	    }
	    static hideMaskBg() {
	        var mask = UIMgr._maskBg;
	        mask && mask.removeSelf();
	    }
	    static onStMask(e) {
	        e.stopPropagation();
	    }
	    static openUI(uiConfig, data, visible, isKeep = false) {
	        if (uiConfig) {
	            let old = UIMgr.findUI(uiConfig);
	            if (old) {
	                console.error('so quick');
	                return;
	            }
	            let clzz = Laya.ClassUtils.getRegClass(uiConfig.class);
	            if (clzz && clzz.prototype instanceof Laya.Sprite) {
	                let ui = new clzz;
	                let top = UIMgr.topUI();
	                if (data != null) {
	                    ui.dataSource = data;
	                }
	                if (isKeep) {
	                    ui.zOrder = UIMgr._keepZOrder;
	                }
	                else {
	                    ui.zOrder = UIMgr._zOrder++;
	                }
	                ui.visible = visible !== false;
	                ui.$uiConfig = uiConfig;
	                Laya.stage.addChild(ui);
	                UIMgr._uiArray.push(ui);
	                UIMgr.checkBanner(ui, true);
	                UIMgr.checkMask(ui);
	                UIMgr.checkView(ui);
	                top && top.onHide();
	                uiConfig.tween && UIMgr.showTween(ui);
	                ui.eventCount && ui.eventCount();
	                EventMgr.event(EventType.CloseUI, uiConfig);
	                return ui;
	            }
	            else
	                console.error("openUI error", uiConfig);
	        }
	    }
	    static openUIs(views, call) {
	        for (let i = views.length - 1; i >= 0; i--) {
	            let view = views[i];
	            let old = call;
	            call = function () {
	                UIMgr.openUI(view[0], view[1]).setCloseCall(old);
	            };
	        }
	        call && call();
	    }
	    static closeUI(uiConfig) {
	        var isTop = false;
	        if (uiConfig) {
	            let _uiArray = UIMgr._uiArray;
	            for (let endi = _uiArray.length - 1, i = endi; i >= 0; i--) {
	                let ui = _uiArray[i];
	                if (ui.$uiConfig == uiConfig) {
	                    _uiArray.splice(i, 1);
	                    UIMgr.onUIClose(ui);
	                    isTop = i == endi;
	                    break;
	                }
	            }
	        }
	        if (isTop) {
	            Laya.timer.frameOnce(2, UIMgr, UIMgr.checkTop, [UIMgr.topUI()]);
	        }
	        EventMgr.event(EventType.OpenUI, uiConfig);
	    }
	    static updateUI(uiConfig, data) {
	        var view = UIMgr.findUI(uiConfig);
	        if (view) {
	            UIMgr.setTop(uiConfig);
	        }
	        else
	            UIMgr.openUI(uiConfig, data);
	    }
	    static toUI(uiConfig, data) {
	        var array = UIMgr._uiArray, oldUI;
	        for (let i = array.length - 1; i >= 0; i--) {
	            let ui = array[i];
	            if (ui.$uiConfig != uiConfig) {
	                if (ui.zOrder != UIMgr._keepZOrder) {
	                    UIMgr.onUIClose(ui);
	                    array.splice(i, 1);
	                }
	            }
	            else {
	                oldUI = ui;
	                data !== void 0 && (ui.dataSource = data);
	            }
	        }
	        if (oldUI) {
	            UIMgr.checkTop(oldUI);
	        }
	        else {
	            oldUI = UIMgr.openUI(uiConfig, data);
	        }
	        return oldUI;
	    }
	    static showBanner(uiConfig, bool) {
	        var view = UIMgr.topUI();
	        if (view && view.$uiConfig == uiConfig) {
	            UIMgr.checkBanner(view, bool);
	        }
	    }
	    static showTips(msg) {
	        var tips = UIMgr._tipViews;
	        if (tips == null) {
	            let box = new Laya.Box();
	            tips = UIMgr._tipViews = [];
	            Laya.stage.addChild(box);
	            box.zOrder = UIMgr._tZOrder;
	            for (let i = 0; i < 3; i++) {
	                let subBox = new TipView;
	                subBox.alpha = 0;
	                box.addChild(subBox);
	                subBox.anchorX = subBox.anchorY = 0.5;
	                subBox.x = 400;
	                subBox.visible = false;
	                tips.push(subBox);
	            }
	            box.width = 800;
	            box.centerX = 0;
	            box.centerY = -20;
	        }
	        if (tips.length == 0)
	            return;
	        var txt = tips.shift();
	        txt.text = msg;
	        txt.visible = true;
	        txt.play(function () {
	            tips.push(txt);
	            txt.visible = false;
	        });
	    }
	    static findUI(uiConfig) {
	        if (uiConfig) {
	            let _uiArray = UIMgr._uiArray;
	            for (let i = _uiArray.length - 1; i >= 0; i--) {
	                let ui = _uiArray[i];
	                if (ui.$uiConfig == uiConfig)
	                    return ui;
	            }
	        }
	        return null;
	    }
	    static setTop(uiConfig) {
	        var ui = UIMgr.findUI(uiConfig);
	        if (ui) {
	            let _uiArray = UIMgr._uiArray;
	            let index = _uiArray.indexOf(ui);
	            _uiArray.splice(index, 1);
	            _uiArray.push(ui);
	            ui.visible = true;
	            ui.zOrder = UIMgr._zOrder++;
	            UIMgr.checkTop(ui);
	        }
	    }
	    static topUI() {
	        var array = UIMgr._uiArray;
	        var length = array.length;
	        if (length > 0)
	            return array[length - 1];
	    }
	    static setVisible(uiConfig, bool, isKeep) {
	        var ui = UIMgr.findUI(uiConfig);
	        if (bool && !ui) {
	            ui = UIMgr.openUI(uiConfig, null, bool, isKeep);
	        }
	        ui && (ui.visible = bool);
	        return ui;
	    }
	    static get topZOrder() {
	        return UIMgr._tZOrder - 1;
	    }
	}
	UIMgr._zOrder = 1000;
	UIMgr._keepZOrder = 80000;
	UIMgr._tZOrder = 100000;
	UIMgr._uiArray = [];

	let EUI = {
	    BigBoxView: {
	        class: "side/view/BigBoxView.ts",
	    },
	    GoldenEggView: {
	        class: "side/view/GoldenEggView.ts",
	        mask: true,
	        banner: true
	    },
	    MorePeopleView: {
	        class: "side/view/MorePeopleView.ts",
	        mask: true,
	        banner: true
	    },
	    SideMoreGameView: {
	        class: "side/view/SideMoreGameView.ts",
	        banner: true,
	        misTouch: "imgKeep",
	    },
	    SideBoxView: {
	        class: "side/view/SideBoxView.ts",
	        mask: true,
	    },
	    WXModelView: {
	        class: "model/side/WXModelView.ts"
	    },
	    DebugView: {
	        class: "script/DebugView.ts"
	    },
	    LoadingView: {
	        class: "script/LoadingView.ts"
	    },
	    HomeView: {
	        class: "script/HomeView.ts"
	    },
	    GameView: {
	        class: "script/GameView.ts",
	    },
	    RankingView: {
	        class: "script/RankingView.ts",
	        mask: true
	    },
	    TrySkinView: {
	        class: "script/TrySkinView.ts",
	        mask: true
	    },
	    SettingView: {
	        class: "script/SettingView.ts",
	        mask: true,
	        banner: true,
	    },
	    FailView: {
	        class: "script/FailView.ts",
	        mask: true,
	        banner: true,
	        misTouch: 'imgRestart'
	    },
	    ReviveView: {
	        class: "script/ReviveView.ts",
	        mask: true,
	        banner: true
	    },
	    ResultView: {
	        class: "script/ResultView.ts",
	        mask: true,
	        banner: true
	    }
	};

	const support = typeof wx !== 'undefined' || typeof qq !== 'undefined';
	class AldSDK {
	    static aldSendEvent(eventName, defaultData, params) {
	        if (support) {
	            let aldSendEvent = wx.aldSendEvent;
	            if (aldSendEvent) {
	                params || (params = {});
	                if (defaultData !== false) {
	                    let uInc = UserData.instance;
	                    params["玩家ID"] = uInc.accountId;
	                    params["关卡ID"] = uInc.level;
	                }
	                params.timeId = AldSDK.timeId;
	                aldSendEvent(eventName.replace(/%u/i, AldSDK.getNewName()), params);
	            }
	        }
	        console.log('打点：' + eventName.replace(/%u/i, AldSDK.getNewName()));
	    }
	    static aldStageStart(level) {
	        if (support) {
	            let aldStage = wx.aldStage;
	            if (aldStage) {
	                let id = level + '';
	                aldStage.onStart({
	                    stageId: id,
	                    stageName: id,
	                    userId: UserData.instance.accountId + ''
	                });
	            }
	        }
	    }
	    static aldStageEnd(level, clear) {
	        if (support) {
	            let aldStage = wx.aldStage;
	            if (aldStage) {
	                let id = level + '';
	                aldStage.onEnd({
	                    stageId: id,
	                    stageName: id,
	                    event: clear ? 'complete' : 'fail',
	                    userId: UserData.instance.accountId + '',
	                    params: {
	                        desc: '游戏通关：' + (clear ? '成功' : '失败')
	                    }
	                });
	            }
	        }
	    }
	    static getNewName() {
	        return AldSDK.$newName || (AldSDK.$newName = (UserData.instance.isNewPlayer ? '新' : '老') + '用户');
	    }
	    static getLoadTime() {
	        return AldSDK.homeTime - AldSDK.loadingTime;
	    }
	    static resetUser() {
	        AldSDK.$newName = null;
	    }
	}

	var Vector3$3 = Laya.Vector3;
	var Quaternion = Laya.Quaternion;
	class CameraDebug extends Laya.Script {
	    constructor() {
	        super(...arguments);
	        this.lastMouseX = NaN;
	        this.lastMouseY = NaN;
	        this.yawPitchRoll = new Vector3$3();
	        this.tempRotationZ = new Quaternion();
	        this.isMouseDown = false;
	        this.rotaionSpeed = 0.00006;
	        this.moveVec = new Vector3$3();
	        this.tmpVec = new Vector3$3();
	        this.isActive = false;
	    }
	    onAwake() {
	        this.camera = this.owner;
	    }
	    setActive(active) {
	        if (active == this.isActive) {
	            return;
	        }
	        this.isActive = active;
	        if (active) {
	            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
	            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
	            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
	        }
	        else {
	            Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
	            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
	            Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseOut);
	        }
	    }
	    onUpdate() {
	        if (this.isActive) {
	            this.updateCamera(Laya.timer.delta);
	        }
	    }
	    mouseDown(e) {
	        this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
	        this.lastMouseX = Laya.stage.mouseX;
	        this.lastMouseY = Laya.stage.mouseY;
	        this.isMouseDown = true;
	    }
	    mouseUp(e) {
	        this.isMouseDown = false;
	    }
	    mouseOut(e) {
	        this.isMouseDown = false;
	    }
	    updateRotation() {
	        var yprElem = this.yawPitchRoll;
	        if (Math.abs(yprElem.y) < 1.50) {
	            Quaternion.createFromYawPitchRoll(yprElem.x, yprElem.y, yprElem.z, this.tempRotationZ);
	            this.camera.transform.localRotation = this.tempRotationZ;
	        }
	    }
	    updateCamera(elapsedTime) {
	        if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY)) {
	            var scene = this.owner.scene;
	            Laya.KeyBoardManager.hasKeyDown(87) && this.moveForward(-0.01 * elapsedTime);
	            Laya.KeyBoardManager.hasKeyDown(83) && this.moveForward(0.01 * elapsedTime);
	            Laya.KeyBoardManager.hasKeyDown(65) && this.moveRight(-0.01 * elapsedTime);
	            Laya.KeyBoardManager.hasKeyDown(68) && this.moveRight(0.01 * elapsedTime);
	            Laya.KeyBoardManager.hasKeyDown(81) && this.moveVertical(0.01 * elapsedTime);
	            Laya.KeyBoardManager.hasKeyDown(69) && this.moveVertical(-0.01 * elapsedTime);
	            if (this.isMouseDown) {
	                var offsetX = Laya.stage.mouseX - this.lastMouseX;
	                var offsetY = Laya.stage.mouseY - this.lastMouseY;
	                var yprElem = this.yawPitchRoll;
	                yprElem.x -= offsetX * this.rotaionSpeed * elapsedTime;
	                yprElem.y -= offsetY * this.rotaionSpeed * elapsedTime;
	                this.updateRotation();
	            }
	        }
	        this.lastMouseX = Laya.stage.mouseX;
	        this.lastMouseY = Laya.stage.mouseY;
	    }
	    moveForward(distance) {
	        this.tmpVec.x = 0;
	        this.tmpVec.y = 0;
	        this.tmpVec.z = distance;
	        this.camera.transform.translate(this.tmpVec);
	    }
	    moveRight(distance) {
	        this.tmpVec.y = 0;
	        this.tmpVec.z = 0;
	        this.tmpVec.x = distance;
	        this.camera.transform.translate(this.tmpVec);
	    }
	    moveVertical(distance) {
	        this.tmpVec.x = this.tmpVec.z = 0;
	        this.tmpVec.y = distance;
	        this.camera.transform.translate(this.tmpVec, false);
	    }
	}

	class DebugCtrl {
	    static setEnable(active) {
	        if (active) {
	            Laya.stage.on(Laya.Event.KEY_UP, this, this.showDebugView);
	            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
	        }
	        else {
	            Laya.stage.off(Laya.Event.KEY_UP, this, this.showDebugView);
	            Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
	        }
	        this._clickCnt = 0;
	        this._lastClickTime = 0;
	    }
	    static showDebugView(event) {
	        switch (event.keyCode) {
	            case Laya.Keyboard.F4:
	                if (UIMgr.findUI(EUI.DebugView)) {
	                    UIMgr.closeUI(EUI.DebugView);
	                }
	                else {
	                    UIMgr.openUI(EUI.DebugView);
	                }
	                break;
	            case Laya.Keyboard.F2:
	                let camera = SceneMgr.instance.cameraCtrl.camera;
	                SceneMgr.instance.cameraCtrl.destroy();
	                let debug = camera.addComponent(CameraDebug);
	                debug.setActive(true);
	                break;
	        }
	    }
	    static onMouseDown(e) {
	        let x = Laya.stage.mouseX;
	        let y = Laya.stage.mouseY;
	        if (x > Laya.stage.width / 4 || y > Laya.stage.height / 4) {
	            return;
	        }
	        if (this._lastClickTime == 0)
	            this._lastClickTime = GameMgr.nowTime;
	        let deltaTime = GameMgr.nowTime - this._lastClickTime;
	        if (deltaTime > 2000) {
	            this._clickCnt = 0;
	            this._lastClickTime = 0;
	            return;
	        }
	        this._clickCnt++;
	        this._lastClickTime = GameMgr.nowTime;
	        if (this._clickCnt > 5) {
	            UIMgr.updateUI(EUI.DebugView);
	        }
	    }
	}
	DebugCtrl._clickCnt = 0;
	DebugCtrl._lastClickTime = 0;

	var EGamePhase;
	(function (EGamePhase) {
	    EGamePhase[EGamePhase["None"] = 0] = "None";
	    EGamePhase[EGamePhase["Prepare"] = 1] = "Prepare";
	    EGamePhase[EGamePhase["InGame"] = 2] = "InGame";
	    EGamePhase[EGamePhase["Over"] = 3] = "Over";
	    EGamePhase[EGamePhase["Pause"] = 4] = "Pause";
	})(EGamePhase || (EGamePhase = {}));
	class GameMgr {
	    constructor() {
	        this._playerCnt = 1;
	        this._curPhase = EGamePhase.None;
	        this._frameCnt = 0;
	        this._lastTimer = 0;
	    }
	    launchGame() {
	        AldSDK.aldSendEvent('loading完成', false, { time: Date.now() });
	        DebugCtrl.setEnable(true);
	        SoundMgr.playBGM();
	        if (platform.isOppo) {
	            platform.reportMonitor('game_scene', 0);
	        }
	        this.initEntities();
	        this.changePhase(EGamePhase.Prepare);
	        Laya.timer.frameLoop(4, this, this.updateLogic);
	        Laya.timer.frameLoop(1, this, this.updateRender);
	        this.addEvents();
	    }
	    addEvents() {
	        EventMgr.on(EventType.RefreshSkin, this, this.onRefreshSkin);
	    }
	    changePhase(phase, result = null) {
	        if (this._curPhase == phase)
	            return;
	        switch (phase) {
	            case EGamePhase.Prepare:
	                this.onPreStartGame();
	                break;
	            case EGamePhase.InGame:
	                this.onStartGame();
	                break;
	            case EGamePhase.Over:
	                Laya.timer.once(500, this, this.onGameOver, [result]);
	                break;
	        }
	        this._curPhase = phase;
	    }
	    isCurPhase(phase) {
	        return this._curPhase == phase;
	    }
	    isGamming() {
	        return this._curPhase == EGamePhase.InGame;
	    }
	    updateLogic() {
	        if (!this.isGamming())
	            return;
	        if (this.role) {
	            this.role.updateLogic(GameMgr.nowTime);
	        }
	    }
	    updateRender() {
	        GameMgr.nowTime = Laya.timer.currTimer;
	        GameMgr.deltaTime = Laya.timer.delta * 0.001;
	        if (GameMgr.deltaTime > 1) {
	            GameMgr.deltaTime = 0;
	        }
	        this._frameCnt++;
	        if (GameMgr.nowTime - this._lastTimer >= 1000) {
	            GameMgr.FPS = Math.round((this._frameCnt * 1000) / (GameMgr.nowTime - this._lastTimer));
	            this._lastTimer = GameMgr.nowTime;
	            this._frameCnt = 0;
	        }
	    }
	    initEntities() {
	        this._players = new Array();
	        let player;
	        for (let i = 0; i < this._playerCnt; i++) {
	            let playerObj = new Laya.Sprite3D("Player" + i, false);
	            SceneMgr.instance.scene.addChild(playerObj);
	            if (i == 0) {
	                player = playerObj.addComponent(RolePlayer);
	                this.role = player;
	            }
	            else {
	                player = playerObj.addComponent(Player);
	            }
	            player.setPlayerId(i);
	            this._players[i] = player;
	        }
	    }
	    onPreStartGame() {
	        UIMgr.openUI(EUI.HomeView);
	    }
	    refreshCacheStageLevel() {
	        EventMgr.event(EventType.RefreshLevel);
	        this.onPreStartGame();
	    }
	    onRefreshSkin() {
	        var self = this, role = self.role;
	        let skinId = self._skinId || ShopMgr.curSkinId;
	        role && role.changeModel(skinId);
	    }
	    onStartGame() {
	        AldSDK.aldSendEvent('%u-进入关卡');
	    }
	    onGameOver(_result) {
	    }
	    startGame() {
	        this.changePhase(EGamePhase.InGame);
	    }
	    pauseGame() {
	        this.changePhase(EGamePhase.Pause);
	    }
	    restart(revive) {
	        this.changePhase(EGamePhase.Prepare);
	        Laya.timer.frameOnce(2, this, this.changePhase, [EGamePhase.InGame]);
	    }
	    setTrySkin(skinId) {
	        var self = this;
	        self._skinId = skinId;
	        self.role.changeModel(skinId);
	    }
	}
	GameMgr.instance = new GameMgr();
	GameMgr.deltaTime = 0;
	GameMgr.nowTime = 0;
	GameMgr.FPS = 60;
	GameMgr.FixedDeltaTime = 1 / GameMgr.FPS;

	var Vector3$4 = Laya.Vector3;
	var ShakeType;
	(function (ShakeType) {
	    ShakeType[ShakeType["Light"] = 0] = "Light";
	    ShakeType[ShakeType["Medium"] = 1] = "Medium";
	    ShakeType[ShakeType["Heavy"] = 2] = "Heavy";
	})(ShakeType || (ShakeType = {}));
	class CameraCtrl extends Laya.Script {
	    constructor() {
	        super();
	        this.chaseTime = 0.3;
	        this.lookAroundRadius = 1.5;
	        this.curChaseTime = 0;
	        this.isPrePare = false;
	        this._velocity = new Vector3$4();
	        this._movePos = new Vector3$4();
	        this._rotation = new Laya.Quaternion();
	        this._deltaVec = new Vector3$4();
	        this._lookAtPos = new Vector3$4();
	        this._lookAtRot = new Laya.Quaternion();
	        this._lookAtDeltaVec = new Vector3$4();
	        this._startFlyPos = new Vector3$4();
	        this._startFlyRot = new Laya.Quaternion();
	        this._rotElements = new Float32Array(4);
	    }
	    onAwake() {
	        this.camera = this.owner;
	        this.transform = this.camera.transform;
	        this._initPos = this.camera.transform.position.clone();
	        this._initRot = this.camera.transform.rotation.clone();
	    }
	    onLateUpdate() {
	        if (GameMgr.instance.isCurPhase(EGamePhase.Prepare) && !this.isPrePare)
	            return;
	        if (this._aroundTf) {
	            this._rotation.rotateY(0.001, this._rotation);
	            this._rotation.forNativeElement(this._rotElements);
	            Laya.Utils3D.transformQuat(this._deltaVec, this._rotElements, this._movePos);
	            Vector3$4.add(this._aroundTf.position, this._movePos, this._movePos);
	            Utils.SmoothDamp(this.transform.position, this._movePos, this._velocity, this.chaseTime, -1, GameMgr.FixedDeltaTime, this._movePos);
	            this.transform.position = this._movePos;
	            this._lookAtDeltaVec.x = Laya.MathUtil.lerp(this._lookAtDeltaVec.x, this.lookAroundRadius, GameMgr.FixedDeltaTime * 0.5);
	            this._lookAtDeltaVec.z = this._lookAtDeltaVec.x;
	            this._rotation.cloneTo(this._lookAtRot);
	            this._lookAtRot.rotateY(Utils.DegToRad(90), this._lookAtRot);
	            this._lookAtRot.forNativeElement(this._rotElements);
	            Laya.Utils3D.transformQuat(this._lookAtDeltaVec, this._rotElements, this._lookAtPos);
	            Vector3$4.add(this._aroundTf.position, this._lookAtPos, this._lookAtPos);
	            this.transform.lookAt(this._lookAtPos, Vector3Ex.Up, false);
	        }
	        else {
	            if (this._moveToTf) {
	                Utils.SmoothDamp(this.transform.position, this._moveToTf.position, this._velocity, this.chaseTime, -1, GameMgr.FixedDeltaTime, this._movePos);
	                this.transform.position = this._movePos;
	            }
	            if (this._lookAtTf) {
	                this.transform.lookAt(this._lookAtTf.position, Vector3Ex.Up, false);
	            }
	        }
	    }
	    setLookAt(transform) {
	        this._lookAtTf = transform;
	    }
	    setMoveTo(transform) {
	        this._moveToTf = transform;
	    }
	    rotateAround(tf) {
	        this._aroundTf = tf;
	        this.transform.position.cloneTo(this._deltaVec);
	        Vector3$4.subtract(this._deltaVec, tf.position, this._deltaVec);
	        Laya.Quaternion.createFromYawPitchRoll(0, tf.rotationEuler.y, 0, this._rotation);
	        this._lookAtDeltaVec.setValue(0, 0, 0);
	    }
	    recordStartFlyState() {
	        this.transform.position.cloneTo(this._startFlyPos);
	        this.transform.rotation.cloneTo(this._startFlyRot);
	    }
	    revertStartFlyState() {
	        this.transform.position = this._startFlyPos;
	        this.transform.rotation = this._startFlyRot;
	    }
	    setRoleMoveSpeedPercent(scale) {
	        this.chaseTime = CameraCtrl.INIT_CHASE_TIME / scale;
	    }
	    reset() {
	        this.camera.transform.position = this._initPos;
	        this.camera.transform.rotation = this._initRot;
	        this._aroundTf = null;
	        this.isPrePare = false;
	    }
	}
	CameraCtrl.INIT_CHASE_TIME = 0.3;

	var Vector3$5 = Laya.Vector3;
	class BaseProp extends Laya.Script {
	    constructor() {
	        super(...arguments);
	        this._pos = new Vector3$5();
	        this._localPos = new Vector3$5();
	        this._forward = new Vector3$5();
	        this._normal = new Vector3$5();
	        this._degree = 0;
	        this.CollideDistSqr = 1.2 * 1.2;
	    }
	    onAwake() {
	        super.onAwake();
	        this.gameObject = this.owner;
	        this.transform = this.gameObject.transform;
	        this.subGo = this.gameObject.getChildAt(0);
	        this.subTF = this.subGo.transform;
	    }
	    onDisable() {
	        super.onDisable();
	        this.resetData();
	    }
	    resetData() {
	    }
	    setData(pos, forward, normal, degree) {
	        pos.cloneTo(this._pos);
	        forward.cloneTo(this._forward);
	        normal.cloneTo(this._normal);
	        this._degree = degree;
	        this.resetPos();
	    }
	    checkCollider(player) {
	        if (!this.subTF)
	            return false;
	        let distSqr = Vector3$5.distanceSquared(this.subTF.position, player.transform.position);
	        if (distSqr <= this.CollideDistSqr) {
	            this.onCollide(player);
	            return true;
	        }
	        return false;
	    }
	    onCollide(player) {
	    }
	    resetPos() {
	        if (!this.subTF || Utils.equalVec(this._pos, Vector3Ex.ZERO))
	            return false;
	        this.transform.position = this._pos;
	        Vector3$5.add(this._pos, this._forward, this._pos);
	        this.transform.lookAt(this._pos, this._normal, false);
	        return true;
	    }
	}

	class Obstacle extends BaseProp {
	    constructor() {
	        super();
	        this._speedPercent = 0;
	        this._speedTime = 0;
	    }
	    onAwake() {
	        super.onAwake();
	        this._speedPercent = CfgDataMgr.instance.getGlobalCfg("Obstacle_Bump_Speed");
	        this._speedTime = CfgDataMgr.instance.getGlobalCfg("Obstacle_Bump_Time");
	        this.resetPos();
	    }
	    onEnable() {
	        super.onEnable();
	    }
	    onDisable() {
	        super.onDisable();
	    }
	    setData(pos, forward, normal, degree) {
	        pos.cloneTo(this._pos);
	        forward.cloneTo(this._forward);
	        normal.cloneTo(this._normal);
	        this._degree = degree;
	        this.resetPos();
	    }
	    onCollide(player) {
	        if (player.isRolePlayer()) {
	            platform.vibrateShort();
	        }
	    }
	}

	var Sprite3D$1 = Laya.Sprite3D;
	var Scene3D = Laya.Scene3D;
	var Vector3$6 = Laya.Vector3;
	var Quaternion$1 = Laya.Quaternion;
	class SceneMgr {
	    constructor() {
	    }
	    init() {
	        this.scene = new Scene3D();
	        this.scene.ambientColor = new Vector3$6(0.6, 0.6, 0.6);
	        Laya.stage.addChild(this.scene);
	        let camera = Laya.loader.getRes(ESprite3D.MainCamera);
	        this.scene.addChild(camera);
	        this.cameraCtrl = camera.addComponent(CameraCtrl);
	        this.light = Laya.loader.getRes(ESprite3D.DirectionalLight);
	        this.scene.addChild(this.light);
	        this.initLight();
	        this.initFog();
	        this.initSkybox();
	        this.initPrefab();
	    }
	    initLight() {
	        var light = this.light;
	        if (SceneConst.Realtime_Shadow) {
	            light.shadow = true;
	            light.shadowDistance = 3;
	            light.shadowResolution = 1024;
	            light.shadowPSSMCount = 1;
	            light.shadowPCFType = 1;
	        }
	        return light;
	    }
	    initFog() {
	        if (!SceneConst.Enable_Fog)
	            return;
	        this.scene.enableFog = true;
	        this.scene.fogColor = new Vector3$6(0, 0, 0.6);
	        this.scene.fogStart = 10;
	        this.scene.fogRange = 40;
	    }
	    initSkybox() {
	        if (!SceneConst.Enable_Skybox)
	            return;
	        Laya.BaseMaterial.load("nativescene/Conventional/Assets/Resources/Mat/Sky.lmat", Laya.Handler.create(this, this.loadSkyMaterial));
	    }
	    loadSkyMaterial(mat) {
	        this.cameraCtrl.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
	        let skyRenderer = this.scene.skyRenderer;
	        skyRenderer.mesh = Laya.SkyBox.instance;
	        skyRenderer.material = mat;
	    }
	    initPrefab() {
	        this._prefabDic = {};
	        this._mapNode = new Sprite3D$1("Map", true);
	        this.scene.addChild(this._mapNode);
	        this.effects = Laya.loader.getRes(ESprite3D.Effect);
	        this._propParent = new Sprite3D$1("Props", false);
	        this.scene.addChild(this._propParent);
	    }
	    initSubPrefab(path) {
	        let node = Laya.loader.getRes(path);
	        let obj;
	        for (let i = 0, num = node.numChildren; i < num; i++) {
	            obj = node.getChildAt(i);
	            this._prefabDic[obj.name] = obj;
	        }
	    }
	    loadSceneData(lv, handler = null) {
	        this._levelId = lv;
	        let mapPath = MapRoot + `level${lv}.json`;
	        console.log("mapPath---", mapPath);
	        Laya.loader.load(mapPath, Laya.Handler.create(this, () => {
	            let json = Laya.loader.getRes(mapPath);
	            if (json == null) {
	                console.error("兼容错误，找不到地图配置,Level", lv);
	                this.loadSceneData(lv - 1, handler);
	            }
	            else {
	                this._levelCfg = json;
	                this.revertMapFromCfg();
	                if (Laya.Browser.onPC) {
	                    Laya.timer.once(100, this, () => {
	                        handler && handler.run();
	                    });
	                }
	                else {
	                    handler && handler.run();
	                }
	            }
	        }));
	    }
	    revertMapFromCfg() {
	        this.revertPrefabToPool();
	        let data;
	        for (let key in this._levelCfg) {
	            data = this._levelCfg[key];
	            this.instancePrefab(data);
	        }
	    }
	    revertPrefabToPool() {
	        for (let i = this._mapNode.numChildren - 1; i >= 0; i--) {
	            let node = this._mapNode.getChildAt(i).removeSelf();
	            node.active = false;
	            Laya.Pool.recover(node.name, node);
	        }
	    }
	    instancePrefab(data) {
	        let pos = new Vector3$6();
	        pos.fromArray(data.position);
	        let rot = new Quaternion$1();
	        rot.fromArray(data.rotation);
	        let scaleValue = new Vector3$6();
	        scaleValue.fromArray(data.scale);
	        let nodeName = data.name;
	        let nodePos = nodeName.indexOf('_stage');
	        if (nodePos > 0) {
	            nodeName = nodeName.substr(0, nodePos);
	        }
	        let obj = Laya.Pool.getItem(nodeName);
	        if (!obj) {
	            let prefab = this._prefabDic[nodeName];
	            if (prefab) {
	                obj = Sprite3D$1.instantiate(prefab, this._mapNode, false, pos, rot);
	            }
	            else {
	                obj = this._mapNode.addChild(new Sprite3D$1(nodeName));
	                obj.transform.position = pos;
	                obj.transform.rotation = rot;
	                obj.transform.setWorldLossyScale(scaleValue);
	            }
	        }
	        else {
	            this._mapNode.addChild(obj);
	            obj.transform.position = pos;
	            obj.transform.rotation = rot;
	            obj.transform.setWorldLossyScale(scaleValue);
	            obj.active = true;
	        }
	        obj.name = data.name;
	    }
	    createEffect(effectName, parent) {
	        let effect = Sprite3D$1.instantiate(this.effects.getChildByName(effectName), parent, false);
	        return effect;
	    }
	    showSceneEffect(pos, name, rot = null, parent = null, autoRecover = true) {
	        let effect = Laya.Pool.getItem(name);
	        if (parent == null)
	            parent = this._propParent;
	        if (effect == null) {
	            effect = this.createEffect(name, parent);
	        }
	        parent.addChild(effect);
	        effect.transform.position = pos;
	        if (rot) {
	            effect.transform.rotationEuler = rot;
	        }
	        effect.active = true;
	        if (autoRecover) {
	            Laya.timer.once(1000, this, () => {
	                this.recoverEffect(effect);
	            });
	        }
	        return effect;
	    }
	    recoverEffect(effect) {
	        effect.active = false;
	        effect.removeSelf();
	        Laya.Pool.recover(effect.name, effect);
	    }
	    getProp(entityType) {
	        let name = EntityType[entityType];
	        let prop = Laya.Pool.getItem(name);
	        if (prop == null) {
	            let obj;
	            if (entityType == EntityType.Obstacle) {
	                obj = Sprite3D$1.instantiate(this.obstacle, this._propParent, false);
	                prop = obj.addComponent(Obstacle);
	            }
	            obj.name = name;
	        }
	        this._propParent.addChild(prop.owner);
	        prop.owner.active = true;
	        return prop;
	    }
	    recoverProp(prop) {
	        prop.owner.removeSelf();
	        prop.owner.active = false;
	        Laya.Pool.recover(prop.gameObject.name, prop);
	    }
	}
	SceneMgr.instance = new SceneMgr();

	var Animator = Laya.Animator;
	class ViewModel extends Laya.Script3D {
	    onAwake() {
	        this.gameObject = this.owner;
	        this.transform = this.gameObject.transform;
	        EventMgr.on(EventType.ChangeRoleModel, this, this.changeModel);
	    }
	    onDestroy() {
	        super.onDestroy();
	        EventMgr.off(EventType.ChangeRoleModel, this, this.changeModel);
	    }
	    play(aniName) {
	        this._aniName = aniName;
	        if (this._animator && this._aniName) {
	            this._animator.play(this._aniName);
	        }
	    }
	    changeModel(url) {
	        if (url == null || url == this._url)
	            return;
	        this._url = url;
	        ExUtils.instanceSprite3D(url, null, Laya.Handler.create(this, (model) => {
	            if (this.destroyed)
	                return;
	            let oldModel = this.gameObject.getChildAt(0);
	            if (oldModel) {
	                oldModel.destroy();
	            }
	            this.gameObject.addChild(model);
	            this._animator = ExUtils.getComponentInChild(model, Animator);
	            if (this._animator && this._aniName) {
	                this._animator.play(this._aniName);
	            }
	        }));
	    }
	}

	class UIUtils {
	    static getCell(list, index) {
	        return list.getCell(index);
	    }
	    static globalToLocal(sprite, x, y) {
	        var temp = Laya.Point.TEMP;
	        temp.setTo(x, y);
	        sprite.globalToLocal(temp);
	        return temp;
	    }
	    static centerChild(parent, num, dist = 0) {
	        let len = parent.numChildren;
	        if (len > 0) {
	            let sum = 0, i, j = 0, arr = [];
	            num === void 0 && (num = len);
	            for (i = 0; i < len; i++) {
	                let csi = parent.getChildAt(i);
	                if (csi.visible) {
	                    sum += csi.width;
	                    arr.push(csi);
	                    if (++j >= num) {
	                        break;
	                    }
	                }
	            }
	            len = arr.length;
	            sum = (parent.width - sum - (len - 1) * dist) / 2;
	            for (i = 0; i < len; i++) {
	                arr[i].x = sum;
	                sum += arr[i].width + dist;
	            }
	        }
	    }
	    static initVSBtn(btn, module, childIdx, format) {
	        var bool = false, config = 0;
	        if (module) {
	            bool = config > 0;
	            if (bool && !(childIdx < 0)) {
	                let child = (childIdx > -1 && btn.getChildAt(childIdx) || btn);
	                let skin = Utils.formatString((format || 'main/icon_%s.png'), (config == 2 ? 'video' : 'share'));
	                if (child instanceof Laya.Image)
	                    child.skin = skin;
	                else {
	                    Utils.getRes(skin).then(function (res) {
	                        child.texture = res;
	                    });
	                }
	                child.visible = true;
	            }
	        }
	        if (!bool) {
	            let child = btn.getChildAt(childIdx);
	            if (child) {
	                child.visible = false;
	                UIUtils.centerChild(btn, 1);
	            }
	        }
	        return config;
	    }
	    static showMisTouch(view, time, offsetY = 0, later) {
	        if (!GameConst.openMisTouch())
	            return;
	        if (later) {
	            let arg = arguments;
	            arg[arg.length - 1] = false;
	            Laya.timer.frameOnce(2, UIUtils, UIUtils.showMisTouch, arg, false);
	        }
	        else {
	            let height = view.height;
	            let parent = view.parent;
	            let oldY = view.y, anchorY = view.anchorY || 0;
	            let point = UIUtils.globalToLocal(parent, 0, 1180 / 1334 * Laya.stage.height);
	            view.y = point.y + ((parent.anchorY || 0) * parent.height) + (anchorY - 0.5) * height + offsetY;
	            time = time || GameConst.BtnReSize;
	            Laya.timer.once(time, null, function () {
	                let offY = 0;
	                view.y = oldY + ((view.anchorY || 0) - anchorY) * height - offY;
	            });
	        }
	    }
	    static addClick(node, func, thisObj, once, data, time = 300) {
	        var fun = once ? "once" : "on", clickTime = 0, params = [], evtIdx;
	        node.offAll();
	        if (data !== void 0) {
	            params.push(data);
	            evtIdx = 1;
	        }
	        node[fun](Laya.Event.CLICK, thisObj, function (e) {
	            var now = Date.now();
	            e.stopPropagation();
	            if (now - clickTime < time) {
	                return;
	            }
	            params[evtIdx] = e;
	            SoundMgr.playBtnClick();
	            func.apply(thisObj, params);
	            clickTime = now;
	        });
	        var oldsx = node.scaleX, oldsy = node.scaleY;
	        if (node instanceof Laya.UIComponent) {
	            if (isNaN(node.anchorX)) {
	                node.anchorX = 0.5;
	                node.x += node.width * 0.5 * oldsx;
	            }
	            if (isNaN(node.anchorY)) {
	                node.anchorY = 0.5;
	                node.y += node.height * 0.5 * oldsy;
	            }
	        }
	        else {
	            if (node instanceof Laya.Sprite) {
	                if (node.pivotX == 0) {
	                    node.pivotX = node.width * 0.5 * oldsx;
	                    node.x += node.width * 0.5 * oldsx;
	                }
	                if (node.pivotY == 0) {
	                    node.pivotY = node.height * 0.5 * oldsy;
	                    node.y += node.height * 0.5 * oldsy;
	                }
	            }
	        }
	        var isTouch = false;
	        var nextx = oldsx + (oldsx > 0 ? 1 : -1) * 0.05;
	        var nexty = oldsy + (oldsy > 0 ? 1 : -1) * 0.05;
	        var tOnce = Tween.once;
	        var onDown = function (e) {
	            isTouch = true;
	            e.stopPropagation();
	            tOnce(node).to({ scaleX: nextx, scaleY: nexty }, 200);
	        };
	        var onOut = function (e) {
	            if (isTouch) {
	                isTouch = false;
	                e.stopPropagation();
	                tOnce(node).to({ scaleX: oldsx, scaleY: oldsy }, 200);
	            }
	        };
	        node.on(Laya.Event.MOUSE_DOWN, thisObj, onDown);
	        node.on(Laya.Event.MOUSE_UP, thisObj, onOut);
	        node.on(Laya.Event.MOUSE_OUT, thisObj, onOut);
	    }
	    static adapterTop(topBox) {
	        let menu = platform.getMenuButtonBoundingClientRect();
	        if (menu) {
	            let temp = Laya.Point.TEMP;
	            let info = platform.getSystemInfoSync();
	            temp.y = menu.top * Laya.stage.height / info.screenHeight;
	            if (Utils.checkPhoneIsBangs() && temp.y < 44) {
	                temp.y = 44;
	            }
	            if (!isNaN(topBox.top)) {
	                topBox.top = temp.y;
	            }
	            else {
	                topBox.parent.globalToLocal(temp);
	                topBox.y = temp.y;
	            }
	        }
	        if (platform.isOppo) {
	            topBox.top = 50;
	        }
	    }
	    static showViewModel(view, cameraUrl, url = null, aniName = null, zOrder = -1) {
	        let scene = new Laya.Scene3D();
	        scene.input.multiTouchEnabled = true;
	        if (zOrder != -1) {
	            view.addChildAt(scene, zOrder);
	        }
	        else {
	            view.addChild(scene);
	        }
	        scene.ambientColor = SceneMgr.instance.scene.ambientColor;
	        let lightOrigin = SceneMgr.instance.light;
	        let light = new Laya.DirectionLight();
	        light.transform.rotation = lightOrigin.transform.rotation;
	        var attrs = ['color', 'intensity', 'lightmapBakedType'];
	        Utils.copyAttrs(attrs, light, lightOrigin);
	        scene.addChild(light);
	        let camera = Laya.Sprite3D.instantiate(Laya.loader.getRes(cameraUrl), null, false);
	        scene.addChild(camera);
	        camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
	        camera.enableHDR = false;
	        let modelParent = new Laya.Sprite3D();
	        scene.addChild(modelParent);
	        modelParent.transform.localRotationEulerY = 180;
	        let model = modelParent.addComponent(ViewModel);
	        model.changeModel(url);
	        model.play(aniName);
	        model.camera = camera;
	        return model;
	    }
	    static drawTexture(camera, sp) {
	        let renderTarget = camera.renderTarget;
	        let rederTex = new Laya.Texture(renderTarget, Laya.Texture.DEF_UV);
	        sp.graphics.drawTexture(rederTex);
	    }
	    static getRightTop(node) {
	        let p = new Laya.Point(node.width, 0);
	        return p;
	    }
	    static addClick2(target, call, thisObj) {
	        target.on(Laya.Event.CLICK, thisObj, call);
	    }
	}

	class UIBaseView extends Laya.View {
	    constructor() {
	        super();
	        this.$events = {};
	        this.$calls = [];
	        this.$btnMisTouch = null;
	        this._misTouchBtnPos = new Laya.Vector2();
	    }
	    static init() {
	        Laya.UIBaseView = UIBaseView;
	    }
	    onEnable() {
	        this.showMisTouchBtn();
	    }
	    onDestroy() {
	        super.onDestroy();
	        var self = this, eventMgr = EventMgr, events = self.$events;
	        for (let name in events) {
	            eventMgr.off(name, self, events[name]);
	        }
	        self.$events = null;
	        var calls = self.$calls, param = self.closeParam;
	        for (let i in calls) {
	            let data = calls[i];
	            data[0].call(data[1], param);
	        }
	        self.timer.clearAll(this);
	        self.offAll();
	        self.$calls = self.closeParam = null;
	    }
	    regEvent(eventName, func) {
	        var self = this;
	        self.$events[eventName] = func;
	        EventMgr.on(eventName, self, func);
	    }
	    regClick(node, func, once, data, time) {
	        UIUtils.addClick(node, func, this, once, data, time);
	    }
	    onShow() {
	    }
	    onHide() {
	    }
	    setCloseCall(call, thisObj) {
	        this.$calls.push([call, thisObj]);
	    }
	    clearCloseCall() {
	        if (this.$calls) {
	            this.$calls.length = 0;
	        }
	    }
	    eventCount() {
	        if (this.$uiConfig) {
	            window.ydhw_wx && ydhw.StatisticEvent('ui', this.$uiConfig.name);
	        }
	    }
	    showMisTouchBtn() {
	        let misTouchInfo = YLSDK.ins.getBtnMisData();
	        let moveTime = misTouchInfo.btnTime;
	        let time = moveTime || 0;
	        let buttonName = this.$uiConfig ? this.$uiConfig.misTouch : '';
	        if (misTouchInfo.switch && buttonName && time && this[buttonName]) {
	            let misTouchBtn = this[buttonName];
	            this._misTouchBtnPos.setValue(misTouchBtn.x, misTouchBtn.y);
	            misTouchBtn.bottom = 60;
	            Laya.timer.once(time, this, () => {
	                misTouchBtn.bottom = NaN;
	                let x = this._misTouchBtnPos.x + misTouchBtn.width * (misTouchBtn.anchorX || 0);
	                let y = this._misTouchBtnPos.y + misTouchBtn.height * (misTouchBtn.anchorY || 0);
	                misTouchBtn.pos(x, y);
	            });
	        }
	    }
	}

	class SideView extends Laya.View {
	    constructor() {
	        super(...arguments);
	        this.$btnMisTouch = null;
	        this._misTouchBtnPos = new Laya.Vector2();
	    }
	    static init() {
	        Laya.SideView = SideView;
	    }
	    onEnable() {
	        var self = this;
	        self.showView(false);
	        self.callLater(self.initSide);
	    }
	    initSide() {
	        var self = this;
	        SideNewMgr.ins.getBoxDatasSync((datas) => {
	            if (self.parent) {
	                if (datas && datas.length > 0) {
	                    self.once(Laya.Event.UNDISPLAY, self, self.onClear);
	                    SideMsg.register(ESMessage.S2S_REMOVE, self.onRemoved, self);
	                    self.showView(true);
	                    self.showMisTouchBtn();
	                    self.initView(datas);
	                }
	                else {
	                    self.onClose();
	                }
	            }
	        });
	    }
	    showView(bool) {
	        for (let i = 0, len = this.numChildren; i < len; i++) {
	            let sp = this.getChildAt(i);
	            if (sp) {
	                sp.visible = bool;
	            }
	        }
	    }
	    initView(datas) {
	    }
	    onClear() {
	        var self = this;
	        SideMsg.remove(ESMessage.S2S_REMOVE, self.onRemoved, self);
	    }
	    onClose() {
	        this.removeSelf();
	    }
	    bind(img, data, datas) {
	        var self = this, type = Laya.Event.CLICK;
	        var old = img.dataSource;
	        img.skin = data.icon;
	        img.dataSource = data;
	        if (datas && old) {
	            datas.push(old);
	        }
	        img.off(type, self, self.onClick);
	        img.on(type, self, self.onClick, [data]);
	    }
	    onClick(side) {
	        var self = this;
	        SideMsg.notice(ESMessage.S2C_CLICK_BTN);
	        if (side) {
	            let appId = side.toAppid;
	            if (appId) {
	                let event = self.$event;
	                let event1 = self.$event1;
	                let reqC2SClick = function (enable) {
	                    event && SideMsg.notice(ESMessage.S2C_DOT_SERVER, event, side, enable);
	                };
	                window.ydhw_wx && window.ydhw.NavigateToMiniProgram(side._id, side.toAppid, side.toUrl, "", this, (success) => {
	                    if (success) {
	                        self.onSuccess(side);
	                        reqC2SClick(true);
	                    }
	                    else {
	                        self.onCancel(side);
	                        reqC2SClick(false);
	                    }
	                });
	                if (event) {
	                    let param = { iconId: side._id };
	                    SideMsg.notice(ESMessage.S2C_DOT_ALD, event, param);
	                }
	                if (event1) {
	                    SideMsg.notice(ESMessage.S2C_DOT_EVENT, event1, self.paramId);
	                }
	            }
	        }
	    }
	    onSuccess(data) {
	        SideMsg.notice(ESMessage.S2C_REMOVE, data);
	    }
	    onCancel(data) {
	    }
	    onRemoved(data) {
	    }
	    setAldEvent(event, event1) {
	        this.$event = event;
	        this.$event1 = event1;
	    }
	    showMisTouchBtn() {
	        let misTouchInfo = YLSDK.ins.getBtnMisData();
	        let moveTime = misTouchInfo.btnTime;
	        let time = moveTime || 0;
	        let buttonName = this.$uiConfig ? this.$uiConfig.misTouch : '';
	        if (misTouchInfo.switch && buttonName && time && this[buttonName]) {
	            let misTouchBtn = this[buttonName];
	            this._misTouchBtnPos.setValue(misTouchBtn.x, misTouchBtn.y);
	            misTouchBtn.bottom = 60;
	            Laya.timer.once(time, this, () => {
	                misTouchBtn.bottom = NaN;
	                let x = this._misTouchBtnPos.x + misTouchBtn.width * (misTouchBtn.anchorX || 0);
	                let y = this._misTouchBtnPos.y + misTouchBtn.height * (misTouchBtn.anchorY || 0);
	                misTouchBtn.pos(x, y);
	            });
	        }
	    }
	}

	UIBaseView.init();
	SideView.init();
	var REG = Laya.ClassUtils.regClass;
	var ui;
	(function (ui) {
	    var view;
	    (function (view) {
	        class DebugViewUI extends Laya.UIBaseView {
	            constructor() { super(); }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("view/DebugView");
	            }
	        }
	        view.DebugViewUI = DebugViewUI;
	        REG("ui.view.DebugViewUI", DebugViewUI);
	        class FailViewUI extends Laya.UIBaseView {
	            constructor() { super(); }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("view/FailView");
	            }
	        }
	        view.FailViewUI = FailViewUI;
	        REG("ui.view.FailViewUI", FailViewUI);
	        class HomeSellViewUI extends Laya.UIBaseView {
	            constructor() { super(); }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("view/HomeSellView");
	            }
	        }
	        view.HomeSellViewUI = HomeSellViewUI;
	        REG("ui.view.HomeSellViewUI", HomeSellViewUI);
	        class HomeViewUI extends Laya.UIBaseView {
	            constructor() { super(); }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("view/HomeView");
	            }
	        }
	        view.HomeViewUI = HomeViewUI;
	        REG("ui.view.HomeViewUI", HomeViewUI);
	        class LoadingViewUI extends Laya.UIBaseView {
	            constructor() { super(); }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("view/LoadingView");
	            }
	        }
	        view.LoadingViewUI = LoadingViewUI;
	        REG("ui.view.LoadingViewUI", LoadingViewUI);
	        class RankingViewUI extends Laya.UIBaseView {
	            constructor() { super(); }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("view/RankingView");
	            }
	        }
	        view.RankingViewUI = RankingViewUI;
	        REG("ui.view.RankingViewUI", RankingViewUI);
	        class ResultViewUI extends Laya.UIBaseView {
	            constructor() { super(); }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("view/ResultView");
	            }
	        }
	        view.ResultViewUI = ResultViewUI;
	        REG("ui.view.ResultViewUI", ResultViewUI);
	    })(view = ui.view || (ui.view = {}));
	})(ui || (ui = {}));
	(function (ui) {
	    var view;
	    (function (view) {
	        var item;
	        (function (item) {
	            class BigBoxItem0UI extends Laya.View {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/item/BigBoxItem0");
	                }
	            }
	            item.BigBoxItem0UI = BigBoxItem0UI;
	            REG("ui.view.item.BigBoxItem0UI", BigBoxItem0UI);
	            class BigBoxItem1UI extends Laya.View {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/item/BigBoxItem1");
	                }
	            }
	            item.BigBoxItem1UI = BigBoxItem1UI;
	            REG("ui.view.item.BigBoxItem1UI", BigBoxItem1UI);
	            class MoreGameItem1UI extends Laya.View {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/item/MoreGameItem1");
	                }
	            }
	            item.MoreGameItem1UI = MoreGameItem1UI;
	            REG("ui.view.item.MoreGameItem1UI", MoreGameItem1UI);
	            class OverGameItemUI extends Laya.View {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/item/OverGameItem");
	                }
	            }
	            item.OverGameItemUI = OverGameItemUI;
	            REG("ui.view.item.OverGameItemUI", OverGameItemUI);
	            class SideBotItemUI extends Laya.View {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/item/SideBotItem");
	                }
	            }
	            item.SideBotItemUI = SideBotItemUI;
	            REG("ui.view.item.SideBotItemUI", SideBotItemUI);
	            class SideBoxItemUI extends Laya.View {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/item/SideBoxItem");
	                }
	            }
	            item.SideBoxItemUI = SideBoxItemUI;
	            REG("ui.view.item.SideBoxItemUI", SideBoxItemUI);
	            class SideBoxItem0UI extends Laya.View {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/item/SideBoxItem0");
	                }
	            }
	            item.SideBoxItem0UI = SideBoxItem0UI;
	            REG("ui.view.item.SideBoxItem0UI", SideBoxItem0UI);
	            class SideBoxItem1UI extends Laya.View {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/item/SideBoxItem1");
	                }
	            }
	            item.SideBoxItem1UI = SideBoxItem1UI;
	            REG("ui.view.item.SideBoxItem1UI", SideBoxItem1UI);
	            class SideGridItemUI extends Laya.View {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/item/SideGridItem");
	                }
	            }
	            item.SideGridItemUI = SideGridItemUI;
	            REG("ui.view.item.SideGridItemUI", SideGridItemUI);
	            class SideListItemUI extends Laya.View {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/item/SideListItem");
	                }
	            }
	            item.SideListItemUI = SideListItemUI;
	            REG("ui.view.item.SideListItemUI", SideListItemUI);
	            class SideListItem4UI extends Laya.View {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/item/SideListItem4");
	                }
	            }
	            item.SideListItem4UI = SideListItem4UI;
	            REG("ui.view.item.SideListItem4UI", SideListItem4UI);
	            class SideNewItemUI extends Laya.View {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/item/SideNewItem");
	                }
	            }
	            item.SideNewItemUI = SideNewItemUI;
	            REG("ui.view.item.SideNewItemUI", SideNewItemUI);
	            class WXModelItemUI extends Laya.View {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/item/WXModelItem");
	                }
	            }
	            item.WXModelItemUI = WXModelItemUI;
	            REG("ui.view.item.WXModelItemUI", WXModelItemUI);
	        })(item = view.item || (view.item = {}));
	    })(view = ui.view || (ui.view = {}));
	})(ui || (ui = {}));
	(function (ui) {
	    var view;
	    (function (view) {
	        var side;
	        (function (side) {
	            class BigBoxViewUI extends Laya.SideView {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/side/BigBoxView");
	                }
	            }
	            side.BigBoxViewUI = BigBoxViewUI;
	            REG("ui.view.side.BigBoxViewUI", BigBoxViewUI);
	            class GoldenEggViewUI extends Laya.UIBaseView {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/side/GoldenEggView");
	                }
	            }
	            side.GoldenEggViewUI = GoldenEggViewUI;
	            REG("ui.view.side.GoldenEggViewUI", GoldenEggViewUI);
	            class MorePeopleViewUI extends Laya.SideView {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/side/MorePeopleView");
	                }
	            }
	            side.MorePeopleViewUI = MorePeopleViewUI;
	            REG("ui.view.side.MorePeopleViewUI", MorePeopleViewUI);
	            class SideBotListUI extends Laya.SideView {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/side/SideBotList");
	                }
	            }
	            side.SideBotListUI = SideBotListUI;
	            REG("ui.view.side.SideBotListUI", SideBotListUI);
	            class SideBoxViewUI extends Laya.SideView {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/side/SideBoxView");
	                }
	            }
	            side.SideBoxViewUI = SideBoxViewUI;
	            REG("ui.view.side.SideBoxViewUI", SideBoxViewUI);
	            class SideDoubleListUI extends Laya.SideView {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/side/SideDoubleList");
	                }
	            }
	            side.SideDoubleListUI = SideDoubleListUI;
	            REG("ui.view.side.SideDoubleListUI", SideDoubleListUI);
	            class SideGridUI extends Laya.SideView {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/side/SideGrid");
	                }
	            }
	            side.SideGridUI = SideGridUI;
	            REG("ui.view.side.SideGridUI", SideGridUI);
	            class SideIconRTUI extends Laya.SideView {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/side/SideIconRT");
	                }
	            }
	            side.SideIconRTUI = SideIconRTUI;
	            REG("ui.view.side.SideIconRTUI", SideIconRTUI);
	            class SideLeftListUI extends Laya.SideView {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/side/SideLeftList");
	                }
	            }
	            side.SideLeftListUI = SideLeftListUI;
	            REG("ui.view.side.SideLeftListUI", SideLeftListUI);
	            class SideMoreGameViewUI extends Laya.SideView {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/side/SideMoreGameView");
	                }
	            }
	            side.SideMoreGameViewUI = SideMoreGameViewUI;
	            REG("ui.view.side.SideMoreGameViewUI", SideMoreGameViewUI);
	            class SideOverListUI extends Laya.SideView {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/side/SideOverList");
	                }
	            }
	            side.SideOverListUI = SideOverListUI;
	            REG("ui.view.side.SideOverListUI", SideOverListUI);
	            class WXModelViewUI extends Laya.SideView {
	                constructor() { super(); }
	                createChildren() {
	                    super.createChildren();
	                    this.loadScene("view/side/WXModelView");
	                }
	            }
	            side.WXModelViewUI = WXModelViewUI;
	            REG("ui.view.side.WXModelViewUI", WXModelViewUI);
	        })(side = view.side || (view.side = {}));
	    })(view = ui.view || (ui.view = {}));
	})(ui || (ui = {}));

	class DebugView extends ui.view.DebugViewUI {
	    constructor() {
	        super();
	    }
	    onAwake() {
	        this.regClick(this.btnClear, this.onClear);
	        this.regClick(this.btnClose, this.onClose);
	        this.regClick(this.btn_makeSure, this.onMakeSure);
	        this.refreshView();
	    }
	    refreshView() {
	        let datas = [];
	        this.list.array = datas;
	        this.list.height = 51 * datas.length;
	        this.list.renderHandler = new Laya.Handler(this, this.renderItem);
	        this.btnBox.y = this.list.y + this.list.height + 20;
	    }
	    renderItem(item) {
	        let slide = item.getChildByName("slide");
	        let lblName = item.getChildByName("name");
	        let lblVal = item.getChildByName("val");
	        slide.value = parseFloat(lblVal.text);
	        slide.on(Laya.Event.CHANGED, this, this.onSlideChange, [lblName, lblVal, slide]);
	    }
	    onSlideChange(lblName, lblVal, slide) {
	        let val = slide.value;
	        lblVal.text = val + "";
	    }
	    onClear() {
	        UserData.instance.clearData();
	    }
	    onClose() {
	        UIMgr.closeUI(EUI.DebugView);
	    }
	    onMakeSure() {
	        let level = parseInt(this.imput_Num.text);
	        if (!isNaN(level)) {
	            SceneMgr.instance.loadSceneData(level);
	        }
	        let gold = parseInt(this.input_money.text);
	        if (!isNaN(gold)) {
	            UserData.instance.gold += gold;
	        }
	    }
	}

	class FailView extends ui.view.FailViewUI {
	    onEnable() {
	        super.onEnable();
	        var self = this, imgRestart = self.imgRestart;
	        var prob = 0;
	        self.lblProb.text = '完成' + prob + '%';
	        self.regClick(imgRestart, self.onRestart);
	        self.sideGrid.setAldEvent('重新开始页-卖量');
	    }
	    onRestart() {
	        if (SideNewMgr.ins.hasSide()) {
	            UIMgr.closeUI(EUI.FailView);
	            UIMgr.openUI(EUI.SideMoreGameView, () => {
	                UIMgr.openUI(EUI.MorePeopleView, () => {
	                    AldSDK.aldSendEvent('重新开始页' + (UserData.instance.isNewPlayer ? '新' : '老') + '用户-重新开始');
	                    GameMgr.instance.restart();
	                });
	            });
	        }
	        else {
	            UIMgr.closeUI(EUI.FailView);
	            AldSDK.aldSendEvent('重新开始页' + (UserData.instance.isNewPlayer ? '新' : '老') + '用户-重新开始');
	            GameMgr.instance.restart();
	        }
	    }
	}

	class SideGrid extends ui.view.side.SideGridUI {
	    initView(caches) {
	        var self = this, ltCont = self.ltCont;
	        self.$datas = caches.concat();
	        self.refresh();
	        ltCont.selectEnable = true;
	        ltCont.selectHandler = new Laya.Handler(self, self.onSelect);
	        Laya.timer.loop(10000, self, self.refresh);
	    }
	    onClear() {
	        var self = this;
	        super.onClear();
	        self.$datas = null;
	        self.ltCont.selectHandler.recover();
	        Laya.timer.clear(self, self.refresh);
	    }
	    onCancel() {
	        SideNewMgr.ins.showMore();
	    }
	    onRemoved(data) {
	        var self = this;
	        if (SideNewMgr.ins.hasSide()) {
	            let array = self.ltCont.array;
	            for (let i = 0, len = array.length; i < len; i++) {
	                if (array[i] == data) {
	                    self.changeItem(i, data);
	                }
	            }
	            let datas = self.$datas;
	            let index = datas.indexOf(data);
	            index > -1 && datas.splice(index, 1);
	        }
	        else {
	            self.onClose();
	        }
	    }
	    changeItem(index, data) {
	        var rand = SideUtils.randomInArray(SideNewMgr.ins.getBoxDatas(), data);
	        this.ltCont.setItem(index, rand);
	    }
	    onSelect(index) {
	        var self = this;
	        var ltCont = self.ltCont;
	        var data = ltCont.selectedItem;
	        if (data) {
	            ltCont.selectedIndex = -1;
	            self.changeItem(index, data);
	            super.onClick(data);
	        }
	    }
	    refresh() {
	        var self = this, caches = SideNewMgr.ins.getBoxDatas(), chLen = caches.length;
	        if (chLen == 0) {
	            self.onClose();
	        }
	        else {
	            let len = 6, datas = self.$datas, ltCont = self.ltCont, oldData = ltCont.array;
	            if (datas.length < len) {
	                let disL = len - chLen;
	                self.$datas = datas = caches.concat();
	                while (disL-- > 0)
	                    datas.push(caches[disL % chLen]);
	            }
	            SideUtils.randomSort(datas);
	            self.ltCont.array = datas.splice(0, len);
	            oldData && datas.push.apply(datas, oldData);
	        }
	    }
	}

	class HomeSellView extends ui.view.HomeSellViewUI {
	    onAwake() {
	        this.regEvent(EventType.CloseUI, this.onCloseMoreGameView);
	        this.regEvent(EventType.AddDesktopSuccess, this.refreshAddDesktop);
	        this.regClick(this.btnMoreGame, this.onMoreGame);
	        this.btnMoreGame.visible = GameConst.SideSwitch;
	        this.regClick(this.addDesktop, this.onAddDesktop);
	        this.regClick(this.nativeIcon, this.onNativeIcon);
	        this.refresh();
	        this.timer.loop(30000, this, this.refreshNative);
	        this.refreshNative();
	    }
	    refresh() {
	        let startView = UIMgr.findUI(EUI.HomeView);
	        let needShowNative = this.needShowNative();
	        if (startView) {
	            this.nativeBg.visible = needShowNative;
	            this.addDesktop.visible = true;
	        }
	        else {
	            this.nativeBg.visible = false;
	            this.addDesktop.visible = false;
	        }
	        this.refreshAddDesktop();
	    }
	    onMoreGame() {
	        UIMgr.openUI(EUI.SideBoxView, null, true);
	        this.btnMoreGame.visible = false;
	        this.sell.visible = false;
	    }
	    onCloseMoreGameView(uiCfg) {
	        if (uiCfg == EUI.SideBoxView)
	            this.btnMoreGame.visible = true;
	        this.sell.visible = true;
	    }
	    onAddDesktop() {
	        let self = this;
	        YLSDK.ins.shortcuttime = Date.now();
	        platform.installShortcut((isAdded) => {
	            Laya.timer.once(500, self, self.refreshAddDesktop);
	        });
	    }
	    refreshAddDesktop() {
	        let self = this;
	        platform.hasShortcut((isAdded) => {
	            self.addDesktopIcon.visible = !isAdded;
	            if (self.addDesktopIcon.visible) {
	                this.addIconAni.play(0, true);
	            }
	            else {
	                this.addIconAni.stop();
	                this.handImg.visible = false;
	            }
	        });
	    }
	    onNativeIcon() {
	        YLSDK.ins.clickNativeAd(0);
	    }
	    needShowNative() {
	        if (!YLSDK.ins.getInsertScreenData().switch || !YLSDK.ins.isNativeAdShow)
	            return false;
	        let arr = [
	            EUI.SideBoxView,
	            EUI.SettingView,
	            EUI.GameView,
	            EUI.TrySkinView,
	        ];
	        for (let i = 0; i < arr.length; i++) {
	            if (UIMgr.findUI(arr[i]) != null) {
	                return false;
	            }
	        }
	        return true;
	    }
	    refreshNative() {
	        if (this.needShowNative() == false)
	            return;
	        this.nativeBg.visible = false;
	        YLSDK.ins.createNative(0, (data) => {
	            this.nativeIcon.skin = data.iconUrlList[0];
	            this.nativeBg.visible = true;
	        });
	    }
	}

	class TweenModel {
	    static swingTween(sprite, wait = 2000, time = 100) {
	        Tween.get(sprite, { loop: true }).wait(wait).to({
	            rotation: 14
	        }, time).to({
	            rotation: -14
	        }, time * 1.6).to({
	            rotation: 7
	        }, time * 1.2).to({
	            rotation: -7
	        }, time * .8).to({
	            rotation: 0
	        }, time * .6);
	    }
	    static breatheTween(sprite, wait = 2000, time = 200) {
	        var size = Math.max(sprite.width, sprite.height);
	        var base = sprite.scaleX;
	        var next0 = base + 20 / size;
	        return Tween.get(sprite, { loop: true }).to({
	            scaleX: next0,
	            scaleY: next0
	        }, time).to({
	            scaleX: base,
	            scaleY: base
	        }, time).repeat(1, 2).wait(wait);
	    }
	    static dazzleTween(view, dazW = 30, wait = 2000) {
	        var sprite = new Laya.Sprite, dist = -10;
	        var width = view.width, height = view.height;
	        sprite.alpha = .3;
	        sprite.graphics.drawPoly(0, 0, [dist, dist, dazW + dist, dist, height - dist,
	            height - dist, height - dazW - dist, height - dist], '#ffffff');
	        sprite.x = -width;
	        view.addChild(sprite);
	        if (!view.mask) {
	            let mask = view.mask = new Laya.Sprite;
	            mask.graphics.drawRect(0, 0, width, height, '#0');
	        }
	        Tween.get(sprite, { loop: true }).wait(wait).to({ x: width }, width * 4);
	        return sprite;
	    }
	}

	class SideIconRT extends ui.view.side.SideIconRTUI {
	    onEnable() {
	        super.onEnable();
	        var self = this;
	        self.$isRT = self.x == 0 && self.y == 0;
	        self.callLater(self.updatePoint);
	    }
	    updatePoint() {
	        var self = this;
	        if (self.$isRT) {
	            let parent = self.parent;
	            if (parent) {
	                self.anchorX = self.anchorY = 0.5;
	                let temp = Laya.Point.TEMP;
	                let platform = SideMgr.platform;
	                let info = platform.getSystemInfoSync();
	                let point = platform.getMenuButtonBoundingClientRect();
	                temp.x = 666;
	                if (point) {
	                    let scale = Laya.stage.height / info.screenHeight;
	                    temp.y = point.bottom * scale + self.height / 2 + 6;
	                }
	                else {
	                    temp.y = 92 + (info.windowHeight / info.windowWidth > 2.1 ? 82 : 0);
	                }
	                parent.globalToLocal(temp);
	                self.pos(temp.x, temp.y);
	            }
	        }
	    }
	    initView(datas) {
	        var self = this;
	        if (self.$isRT) {
	            TweenModel.swingTween(self, 500);
	        }
	        else {
	            TweenModel.breatheTween(self);
	        }
	        self.bind(self.imgIcon, SideUtils.randomInArray(datas));
	        self.restart();
	    }
	    onClear() {
	        super.onClear();
	        var self = this;
	        Tween.clear(self);
	        Laya.timer.clear(self, self.refresh);
	    }
	    onClick(data) {
	        var self = this;
	        super.onClick(data);
	        self.restart();
	        self.refresh();
	    }
	    onCancel() {
	        SideMgr.showMore();
	    }
	    onRemoved(data) {
	        var self = this;
	        var curd = self.imgIcon.dataSource;
	        if (curd == data)
	            self.refresh();
	    }
	    restart() {
	        var self = this;
	        Laya.timer.once(4000, self, self.refresh);
	    }
	    refresh() {
	        var self = this;
	        var datas = SideMgr.getSides();
	        if (datas.length == 0) {
	            self.onClose();
	        }
	        else {
	            let old = self.imgIcon.dataSource;
	            self.bind(self.imgIcon, SideUtils.randomInArray(datas, old));
	        }
	    }
	}

	class HomeView extends ui.view.HomeViewUI {
	    onAwake() {
	        super.onAwake();
	        UIMgr.closeUI(EUI.LoadingView);
	        this.regClick(this.btnStart, this.onStart);
	    }
	    onStart() {
	        if (SideNewMgr.ins.hasSide()) {
	            UIMgr.openUI(EUI.SideBoxView, () => {
	                if (window.ydhw_wx && window.ydhw_wx.SwitchTouch) {
	                    UIMgr.openUI(EUI.GoldenEggView, () => {
	                        UIMgr.openUI(EUI.FailView);
	                    });
	                }
	                else {
	                    UIMgr.openUI(EUI.FailView);
	                }
	            });
	        }
	        else {
	            UIMgr.openUI(EUI.FailView);
	        }
	    }
	}

	class AutoScroll extends Laya.Script {
	    onEnable() {
	        var self = this, owner = self.owner;
	        if (owner instanceof Laya.List) {
	            let scroll = self.scrollBar = owner.scrollBar;
	            if (scroll) {
	                let min = scroll.min, max = scroll.max;
	                if (max > min) {
	                    let event = Laya.Event;
	                    self.$distance = 1;
	                    self.start();
	                    owner.on(event.MOUSE_DOWN, self, self.stop);
	                    owner.on(event.MOUSE_OUT, self, self.toStart);
	                    owner.on(event.MOUSE_OVER, self, self.toStart);
	                }
	            }
	        }
	    }
	    onDisable() {
	        var self = this;
	        self.owner.offAllCaller(self);
	        Laya.timer.clearAll(self);
	    }
	    onTimer() {
	        var self = this;
	        var scrollBar = self.scrollBar, dist = self.$distance, oDist = dist, value = scrollBar.value + dist * self.speed, max = scrollBar.max, min = scrollBar.min;
	        if (value >= max) {
	            dist = -1;
	            value = max;
	        }
	        else if (value <= min) {
	            dist = 1;
	            value = min;
	        }
	        scrollBar.value = value;
	        if (dist !== oDist) {
	            self.$distance = dist;
	            self.stop();
	            Laya.timer.once(self.wait, self, self.start);
	        }
	    }
	    toStart() {
	        var self = this;
	        Laya.timer.once(3000, self, self.start);
	    }
	    set speed(value) {
	        this.$speed = value;
	    }
	    get speed() {
	        return this.$speed || 1.5;
	    }
	    set wait(value) {
	        this.$wait = value;
	    }
	    get wait() {
	        return this.$wait || 200;
	    }
	    stop() {
	        Laya.timer.clearAll(this);
	    }
	    start() {
	        var self = this;
	        self.$distance && Laya.timer.frameLoop(1, self, self.onTimer);
	    }
	}

	let FirstFlag = true;
	class SideLeftList extends ui.view.side.SideLeftListUI {
	    constructor() {
	        super(...arguments);
	        this.platType = 4001;
	    }
	    onEnable() {
	        super.onEnable();
	        console.log('SideLeftList onEnable ');
	    }
	    onDisable() {
	        this.$scroll = null;
	    }
	    initView(datas) {
	        var self = this, addc = UIUtils.addClick2, list = self.list, scrollBar = list.scrollBar;
	        list.dataSource = Utils.randomSort(datas);
	        self.imgBg.visible = false;
	        self.zOrder = 10000;
	        this.mouseThrough = true;
	        addc(self.imgSlide, self.onSlide, self);
	        addc(self, self.onSelf, self);
	        list.selectEnable = true;
	        list.selectHandler = Laya.Handler.create(self, self.onSelect, void 0, false);
	        (self.$scroll = list.addComponent(AutoScroll)).stop();
	        if (FirstFlag) {
	            self.onSlide();
	            FirstFlag = false;
	        }
	    }
	    onSelect(index) {
	        var ltCont = this.list;
	        var data = ltCont.selectedItem;
	        if (data) {
	            let rand = Utils.randomInArray(SideNewMgr.ins.getBoxDatas(), data);
	            super.onClick(ltCont.selectedItem);
	            ltCont.selectedIndex = -1;
	            ltCont.setItem(index, rand);
	        }
	    }
	    onSlide(isShowAd = true) {
	        console.log('onSlide  1111111111111111111111111111111');
	        var self = this;
	        var imgBg = self.imgBg;
	        var isShow = self.$isShow, next = !isShow, time = 160;
	        Laya.timer.clear(self, self.showInsert);
	        self.mouseEnabled = self.mouseThrough = false;
	        imgBg.visible = true;
	        Tween.get(imgBg).to({ x: next ? -2 : -752 }, time);
	        Tween.get(self.boxMain).to({ x: next ? 0 : -615 }, time).call(function () {
	            let scroll = self.$scroll;
	            self.mouseEnabled = true;
	            imgBg.visible = self.$isShow = next;
	            self.mouseThrough = isShow;
	            self.changeState();
	            next ? scroll.start() : scroll.stop();
	        });
	    }
	    onSelf(e) {
	        var self = this;
	        if (self.$isShow) {
	            let target = e.target;
	            if (target == self || target == self.boxMain)
	                self.onSlide(false);
	        }
	    }
	    changeState() {
	        var self = this;
	    }
	    showInsert() {
	    }
	    onCancel(data) {
	        UIMgr.openUI(EUI.MorePeopleView);
	    }
	}

	class BigBoxItem0 extends ui.view.item.BigBoxItem0UI {
	    get dataSource() {
	        return this._dataSource;
	    }
	    set dataSource(data) {
	        var self = this;
	        self._dataSource = data;
	        if (data) {
	            self.imgIcon.skin = data.icon;
	            self.labelname.text = data.title;
	        }
	    }
	}

	class BigBoxItem1 extends ui.view.item.BigBoxItem1UI {
	    onAwake() {
	        var self = this;
	    }
	    get dataSource() {
	        return this._dataSource;
	    }
	    set dataSource(data) {
	        var self = this;
	        self._dataSource = data;
	        self.refresh();
	    }
	    refresh() {
	        var self = this;
	        var data = self.dataSource;
	        if (data) {
	            self.imgIcon.skin = data.icon;
	            self.lblName.text = data.title;
	        }
	    }
	}

	class MoreGameItem1 extends ui.view.item.MoreGameItem1UI {
	    get dataSource() {
	        return this._dataSource;
	    }
	    set dataSource(data) {
	        var self = this;
	        self._dataSource = data;
	        self.refresh();
	    }
	    refresh() {
	        var self = this;
	        var data = self.dataSource;
	        if (data) {
	            self.imgIcon.skin = data.icon;
	            self.lblName.text = data.title;
	        }
	    }
	}

	class OverGameItem extends ui.view.item.OverGameItemUI {
	    get dataSource() {
	        return this._dataSource;
	    }
	    set dataSource(data) {
	        var self = this;
	        self._dataSource = data;
	        self.refresh();
	    }
	    refresh() {
	        var self = this;
	        var data = self.dataSource;
	        if (data) {
	            self.imgIcon.skin = data.icon;
	        }
	    }
	}

	class SideBotItem extends ui.view.item.SideBotItemUI {
	    onEnable() {
	        TweenModel.swingTween(this.imgNew);
	    }
	    onDisable() {
	        Tween.clear(this.imgNew);
	    }
	    get dataSource() {
	        return this._dataSource;
	    }
	    set dataSource(data) {
	        var self = this;
	        self._dataSource = data;
	        self.refresh();
	    }
	    refresh() {
	        var self = this;
	        var data = self.dataSource;
	        if (data) {
	            let bool = self.imgNew.visible = Math.random() < 0.5, ani1 = self.ani1;
	            self.imgIcon.skin = data.icon;
	            if (bool) {
	                ani1.gotoAndStop(0);
	            }
	            else {
	                ani1.play(0, true);
	            }
	        }
	    }
	}

	class SideBoxItem extends ui.view.item.SideBoxItemUI {
	    onAwake() {
	        this.on(Laya.Event.CLICK, this, this.JumpOtherGame);
	    }
	    set dataSource(val) {
	        this._dataSource = val;
	        this.refresh();
	    }
	    get dataSource() {
	        return this._dataSource;
	    }
	    refresh() {
	        if (this.icon && this._dataSource) {
	            this.icon.skin = this._dataSource.icon;
	        }
	    }
	    JumpOtherGame() {
	    }
	}

	class SideBoxItem0 extends ui.view.item.SideBoxItem0UI {
	    get dataSource() {
	        return this._dataSource;
	    }
	    set dataSource(data) {
	        var self = this;
	        self._dataSource = data;
	        if (data) {
	            self.imgIcon.skin = data.icon;
	            self.labelname.text = data.title;
	        }
	    }
	}

	class SideBoxItem1 extends ui.view.item.SideBoxItem1UI {
	    onAwake() {
	        var self = this;
	    }
	    get dataSource() {
	        return this._dataSource;
	    }
	    set dataSource(data) {
	        var self = this;
	        self._dataSource = data;
	        self.refresh();
	    }
	    refresh() {
	        var self = this;
	        var data = self.dataSource;
	        if (data) {
	            self.imgIcon.skin = data.icon;
	            self.lblName.text = data.title;
	        }
	    }
	}

	class SideGridItem extends ui.view.item.SideGridItemUI {
	    onEnable() {
	        var self = this, imgIcon = self.imgIcon;
	        var mask = imgIcon.mask = new Laya.Sprite;
	        SideUtils.drawRoundRect(mask.graphics, imgIcon.width, imgIcon.height, 25);
	        TweenModel.swingTween(self.imgNew);
	    }
	    onDisable() {
	        Tween.clear(this.imgNew);
	    }
	    get dataSource() {
	        return this._dataSource;
	    }
	    set dataSource(data) {
	        var self = this;
	        self._dataSource = data;
	        self.refresh();
	    }
	    refresh() {
	        var self = this;
	        var data = self.dataSource;
	        if (data) {
	            let bool = self.imgNew.visible = Math.random() < 0.5, ani1 = self.ani1;
	            self.imgIcon.skin = data.icon;
	            self.lblName.text = data.title;
	            if (bool) {
	                ani1.gotoAndStop(0);
	            }
	            else {
	                ani1.play(0, true);
	            }
	        }
	    }
	}

	class SideListItem extends ui.view.item.SideListItemUI {
	    get dataSource() {
	        return this._dataSource;
	    }
	    set dataSource(data) {
	        var self = this;
	        self._dataSource = data;
	        self.refresh();
	    }
	    refresh() {
	        var self = this;
	        var data = self.dataSource;
	        if (data) {
	            self.imgIcon.skin = data.icon;
	            self.lblName.text = data.title;
	        }
	    }
	}

	class SideListItem4 extends ui.view.item.SideListItem4UI {
	    get dataSource() {
	        return this._dataSource;
	    }
	    set dataSource(data) {
	        var self = this;
	        self._dataSource = data;
	        self.refresh();
	    }
	    refresh() {
	        var self = this;
	        var data = self.dataSource;
	        if (data) {
	            let rand = Math.floor(Math.random() * 2);
	            self.imgRed.visible = rand == 0;
	            self.imgIcon.skin = data.icon;
	            self.lblName.text = data.title;
	        }
	    }
	}

	class ScaleAni extends Laya.Script {
	    constructor() {
	        super();
	        this._isStop = true;
	    }
	    onAwake() {
	        this._target = this.owner;
	    }
	    onEnable() {
	        this.start();
	    }
	    onDisable() {
	        this.destroy();
	    }
	    onChange(istop) {
	        if (istop) {
	            this.destroy();
	        }
	        else {
	            if (this._isStop) {
	                this.start();
	            }
	        }
	    }
	    start() {
	        if (this._target) {
	            this._isStop = false;
	            this.tweenSmall();
	        }
	    }
	    tweenBig() {
	    }
	    tweenSmall() {
	        Tween.get(this._target).to({ scaleX: 1.2, scaleY: 1.2 }, 300).wait(1200).to({ scaleX: 1.0, scaleY: 1.0 }, 300).call(() => {
	            this.tweenSmall();
	        }, this);
	    }
	    destroy() {
	        this._isStop = true;
	        if (this._target) {
	            Tween.clear(this._target);
	        }
	    }
	}

	class SideNewItem extends ui.view.item.SideNewItemUI {
	    onEnable() {
	        var self = this;
	        var imgIcon = self.imgIcon;
	        var mask = imgIcon.mask = new Laya.Sprite;
	        SideUtils.drawRoundRect(mask.graphics, imgIcon.width, imgIcon.height, 25);
	        TweenModel.swingTween(self.imgNew);
	    }
	    onDisable() {
	        Tween.clear(this.imgNew);
	    }
	    get dataSource() {
	        return this._dataSource;
	    }
	    set dataSource(data) {
	        var self = this;
	        self._dataSource = data;
	        self.refresh();
	    }
	    refresh() {
	        var self = this;
	        var data = self.dataSource;
	        if (data) {
	            let bool = self.imgNew.visible = Math.random() < 0.5, ani1 = self.ani1;
	            self.imgIcon.skin = data.icon;
	            self.lblName.text = data.title;
	            if (bool) {
	                ani1.gotoAndStop(0);
	            }
	            else {
	                ani1.play(0, true);
	            }
	        }
	    }
	}

	class WXModelItem extends ui.view.item.WXModelItemUI {
	    get dataSource() {
	        return this._dataSource;
	    }
	    set dataSource(data) {
	        var self = this;
	        self._dataSource = data;
	        self.refresh();
	    }
	    refresh() {
	        var self = this;
	        var data = self.dataSource;
	        if (data) {
	            self.imgIcon.skin = data.icon;
	            self.lblName.text = data.title;
	            self.imgStar.visible = data.star;
	        }
	    }
	}

	var Handler$1 = Laya.Handler;
	var Loader = Laya.Loader;
	class ResMgr {
	    static preLoadCfg() {
	        for (let key in EJson) {
	            let data = { url: EJson[key], type: Loader.JSON };
	            ResMgr.PreloadCfg.push(data);
	        }
	        Laya.loader.create(ResMgr.PreloadCfg, Handler$1.create(ResMgr, ResMgr.onComplete0), Handler$1.create(ResMgr, ResMgr.onProgress0));
	    }
	    static onProgress0(value) {
	        EventMgr.event(EventType.ResProgress, value * ResMgr._preWeight);
	    }
	    static onProgress1(value) {
	        var preWeight = ResMgr._preWeight;
	        EventMgr.event(EventType.ResProgress, value * (1 - preWeight) + preWeight);
	    }
	    static onComplete0() {
	        var reload = ResMgr.PreloadRes;
	        for (let key in ESprite3D) {
	            let data = { url: ESprite3D[key], type: Laya.Loader.HIERARCHY };
	            reload.push(data);
	        }
	        CfgDataMgr.instance.initConfigs();
	        Laya.loader.create(reload, Handler$1.create(ResMgr, ResMgr.onComplete1), Handler$1.create(ResMgr, ResMgr.onProgress1));
	        EventMgr.once(EventType.LoadingSuc, ResMgr, ResMgr.launchGame);
	    }
	    static onComplete1() {
	        var loader = Laya.loader;
	        ResMgr.launchGame();
	    }
	    static launchGame() {
	        if (++ResMgr._sucCount == 2) {
	            SceneMgr.instance.init();
	            GameMgr.instance.launchGame();
	        }
	    }
	}
	ResMgr.PreloadCfg = [];
	ResMgr.PreloadRes = [
	    { url: EAtlas.Game, type: Laya.Loader.ATLAS }
	];
	ResMgr._sucCount = 0;
	ResMgr._preWeight = 0.4;

	class LoadUtils {
	    constructor(keys, ratios) {
	        this.keys = keys;
	        this.ratios = ratios;
	        this.values = Utils.memset(keys.length, 0);
	    }
	    setValue(key, value) {
	        var self = this;
	        var index = self.keys.indexOf(key);
	        if (index > -1) {
	            self.values[index] = value;
	        }
	    }
	    getValue(key) {
	        var self = this;
	        return self.values[self.keys.indexOf(key)];
	    }
	    get value() {
	        var self = this, sum = 0, values = self.values, ratios = self.ratios;
	        for (let i in values) {
	            sum += values[i] * ratios[i];
	        }
	        return Math.floor(sum * 100 + 0.5) / 100;
	    }
	    clear() {
	        var self = this;
	        self.keys = self.values = self.ratios = null;
	    }
	    static create(keys, ratios) {
	        var len = keys.length;
	        if (len > 0 && len == ratios.length) {
	            let sum = 0;
	            for (let i = 0; i < len; i++)
	                sum += ratios[i];
	            if (sum !== 1) {
	                let sum1 = 0;
	                len -= 1;
	                for (let i = 0; i < len; i++) {
	                    sum1 += ratios[i] /= sum;
	                }
	                ratios[len] = 1 - sum1;
	            }
	            return new LoadUtils(keys, ratios);
	        }
	    }
	}

	var ResType;
	(function (ResType) {
	    ResType[ResType["Nativescene"] = 0] = "Nativescene";
	    ResType[ResType["PreloadRes"] = 1] = "PreloadRes";
	    ResType[ResType["ZipPack"] = 2] = "ZipPack";
	})(ResType || (ResType = {}));
	class LoadingView extends ui.view.LoadingViewUI {
	    onAwake() {
	        var self = this;
	        var loadingTime = AldSDK.loadingTime = Date.now();
	        self.regEvent(EventType.ResProgress, self.onPreloadResProgress);
	        self.regEvent(EventType.SubpkgProgress, self.onSubPackageProgress);
	        Laya.loader.on(Laya.Event.ERROR, self, self.onLoadError);
	        AldSDK.aldSendEvent('进入加载页', false, { time: loadingTime });
	        EventMgr.event(EventType.EnterLoading);
	        let keys = [ResType.Nativescene, ResType.PreloadRes];
	        let ratios = [0.5, 0.5];
	        self.util = LoadUtils.create(keys, ratios);
	        platform.loadSubpackage('nativescene', function (prog) {
	            self.setValue(0, prog / 100);
	        }).then(function () {
	            self.setValue(0, 1);
	            ResMgr.preLoadCfg();
	        });
	    }
	    onDisable() {
	        var self = this;
	        self.util.clear();
	        self.util = null;
	        Laya.loader.off(Laya.Event.ERROR, self, self.onLoadError);
	    }
	    onPreloadResProgress(value) {
	        var self = this;
	        self.setValue(ResType.PreloadRes, value);
	    }
	    onSubPackageProgress(data) {
	        var self = this;
	        self.setValue(data[0], data[1]);
	    }
	    setValue(key, value) {
	        var self = this;
	        self.util.setValue(key, value);
	        self.updateBar();
	    }
	    updateBar() {
	        var self = this, value = self.util.value;
	        self.bar.value = value;
	        self.txt.changeText("加载中，请稍等..." + (value * 100).toFixed(0) + "%");
	        if (value >= 1) {
	            EventMgr.event(EventType.LoadingSuc);
	        }
	    }
	    onLoadError() {
	        this.txt.color = "#FF0000";
	        this.txt.text = "加载失败，请确保网络正常，退出游戏重试";
	    }
	}

	class RankingView extends ui.view.RankingViewUI {
	    constructor() {
	        super();
	    }
	    onAwake() {
	        this.btnRanking.on(Laya.Event.CLICK, this, this.onShare);
	        this.wxOpenDataSp.on(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);
	        this.wxOpenDataSp.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
	        this.wxOpenDataSp.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
	        platform.postMessage({
	            key: "reqRankListData",
	            message: { keyList: 'user_id,ladder,score,ladderName,ladderUrl', sortList: 'ladder,score' }
	        });
	    }
	    onClickBg() {
	        UIMgr.closeUI(EUI.RankingView);
	    }
	    onShare() {
	    }
	    onTouchMove(e) {
	        if (this._lastY == null)
	            return;
	        var y = Laya.stage.mouseY;
	        var deltaY = this._lastY - y;
	        this._lastY = y;
	        platform.postMessage({
	            key: "wxRankListMove",
	            message: deltaY
	        });
	    }
	    onTouchUp() {
	        this._lastY = null;
	    }
	    onTouchDown() {
	        this._lastY = Laya.stage.mouseY;
	    }
	}

	class ResultView extends ui.view.ResultViewUI {
	    onAwake() {
	    }
	}

	const sign$1 = '$LFlyGold';
	class FlyGold extends Laya.Sprite {
	    constructor(skin) {
	        super();
	        this.mouseEnabled = this.visible = false;
	        this.$skin = skin || 'game/img_gold.png';
	    }
	    onDestroy() {
	        let clear = Tween.clear, recover = Laya.Pool.recover;
	        for (let i = 0, len = this.numChildren; i < len; i++) {
	            let gold = this.getChildAt(i);
	            clear(gold);
	            recover(sign$1, gold);
	        }
	    }
	    create() {
	        return new Laya.Image(this.$skin);
	    }
	    set number(v) {
	        let self = this, curL = self.numChildren;
	        if (curL != v) {
	            let create = Laya.Pool.getItemByCreateFun;
	            for (let i = v; i < curL; i++)
	                self.removeChildAt(v);
	            for (let i = curL; i < v; i++) {
	                let gold = create(sign$1, self.create.bind(self));
	                self.addChild(gold);
	            }
	        }
	    }
	    set minR(v) {
	        if (v >= 0)
	            this.$minR = v;
	    }
	    set maxR(v) {
	        if (v >= 1)
	            this.$maxR = v;
	    }
	    get minR() {
	        let r = this.$minR;
	        return r < 0 ? 0 : r;
	    }
	    get maxR() {
	        let r = this.$maxR;
	        return r < 1 ? 1 : r;
	    }
	    reset() {
	        for (let i = 0, len = this.numChildren; i < len; i++) {
	            let ci = this.getChildAt(i);
	            ci.pos(0, 0);
	            ci.visible = true;
	        }
	    }
	    init(number, minR, maxR) {
	        let self = this;
	        self.number = number;
	        self.minR = minR;
	        self.maxR = maxR;
	    }
	    play(point, speed0 = 1.5, speed1 = 1) {
	        let self = this;
	        return new Promise((resolve) => {
	            let cs = self['_children'], len = 0;
	            if (cs) {
	                len = cs.length;
	                if (len == 0) {
	                    self.init(len = 22, 80, 220);
	                    cs = self['_children'];
	                }
	            }
	            if (len == 0) {
	                resolve();
	                return;
	            }
	            let minR = self.minR, maxR = self.maxR, mgr = Laya.MouseManager;
	            let range = function () {
	                return Math.random() * (maxR - minR) + minR;
	            };
	            let sin = Utils.sin, cos = Utils.cos;
	            let count = 0, ex, ey, time = 0, end = function () {
	                if (++count == len) {
	                    self.visible = false;
	                    mgr.enabled = true;
	                    resolve();
	                }
	            }, hide = function () {
	            };
	            point = Laya.Point.TEMP.setTo(point.x, point.y);
	            self.reset();
	            self.visible = true;
	            mgr.enabled = false;
	            self.globalToLocal(point);
	            ex = point.x;
	            ey = point.y;
	            for (let i = 0; i < len; i++) {
	                let img = cs[i];
	                let dist = range();
	                let angle = Math.random() * 360;
	                let timei = speed0 * dist;
	                let tween = Tween.get(img).to({
	                    x: dist * cos(angle),
	                    y: dist * sin(angle)
	                }, timei);
	                if (timei > time)
	                    time = timei;
	                let dx = ex - img.x, dy = ey - img.y;
	                let dist1 = Math.sqrt(dx * dx + dy * dy);
	                tween.wait(timei * 1.5).to({
	                    x: ex,
	                    y: ey
	                }, dist1 * speed1).call(hide).set({ visible: false }).wait(100).call(end);
	            }
	        });
	    }
	}

	class SideBoxView extends ui.view.side.SideBoxViewUI {
	    constructor() {
	        super(...arguments);
	        this._firstClick = 0;
	    }
	    onAwake() {
	        this.showWcbanner();
	    }
	    showWcbanner() {
	        let self = this;
	        let isWc = GameConst.MisTouchSwitch;
	        if (isWc) {
	        }
	    }
	    initView(datas) {
	        var self = this, addClick = UIUtils.addClick, imgBack = self.imgBack;
	        self.initList(0, datas);
	        self.initList(1, datas);
	        var point = platform.getMenuButtonBoundingClientRect();
	        if (point) {
	            self.boxTop.y = Utils.screenToStage(point.top);
	        }
	        addClick(imgBack, self.onClose, self);
	        addClick(self.imgKeep, self.onKeep, self);
	        self.setAldEvent('积分墙卖量');
	        imgBack.visible = false;
	        Laya.timer.once(2000, self, function () {
	            imgBack.visible = true;
	        });
	    }
	    onClose() {
	        (this.dataSource && typeof this.dataSource === "function") && (this.dataSource());
	        UIMgr.closeUI(EUI.SideBoxView);
	    }
	    onKeep() {
	        var list = this.list0;
	        {
	            if (this._firstClick <= 0) {
	                list.selectedIndex = Math.random() * list.array.length | 0;
	                this._firstClick++;
	            }
	            else {
	                this.onClose();
	            }
	        }
	    }
	    onRemoved(data) {
	        var self = this;
	        let check = function (type) {
	            let list = self['list' + type];
	            let array = list.array;
	            for (let i = 0, len = array.length; i < len; i++) {
	                if (array[i] == data) {
	                    self.changeItem(list, i, data);
	                    array.splice(i, 1);
	                    break;
	                }
	            }
	            list.array = array;
	        };
	        check(0);
	        check(1);
	    }
	    initList(type, datas) {
	        var self = this;
	        var list = self['list' + type];
	        var scrollBar = list.scrollBar;
	        console.log("big box", datas);
	        list.array = datas.concat();
	        list.selectEnable = true;
	        list.selectHandler = Laya.Handler.create(self, self.onSelect, [list], false);
	        list.addComponent(AutoScroll);
	        list.getComponent(AutoScroll).speed = 0.5;
	    }
	    onSelect(list, index) {
	        var data = list.selectedItem;
	        if (data) {
	            list.selectedIndex = -1;
	            super.onClick(data);
	        }
	    }
	    changeItem(list, index, data) {
	        list.setItem(index, data);
	    }
	}

	class TimeLineUtils {
	    static tweenScale(node, to, durationIn, keepTime, durationOut, endCallback = null) {
	        let timeLine = new Laya.TimeLine();
	        timeLine.addLabel("tl1", 0).to(node, { scaleX: to, scaleY: to, alpha: 1 }, durationIn, Laya.Ease.linearNone)
	            .addLabel("tl2", 0).to(node, {}, keepTime)
	            .addLabel("tl2", 0).to(node, { scaleX: 0, scaleY: 0, alpha: 0 }, durationOut, Laya.Ease.linearNone);
	        timeLine.on(Laya.Event.COMPLETE, node, () => {
	            if (endCallback) {
	                endCallback.run();
	            }
	        });
	        timeLine.play(0, false);
	        return timeLine;
	    }
	    static tweenScaleCircle(node, scale, time) {
	        let timeLine = new Laya.TimeLine();
	        let initScale = node.scaleX;
	        timeLine.addLabel("tl1", 0).to(node, { scaleX: scale, scaleY: scale }, time, Laya.Ease.linearNone)
	            .addLabel("tl2", 0).to(node, { scaleX: initScale, scaleY: initScale }, time, Laya.Ease.linearNone);
	        return timeLine;
	    }
	    static tweenUpdown(node, offX, offY, time) {
	        let timeLine = new Laya.TimeLine();
	        let initX = node.x, initY = node.y;
	        timeLine.addLabel("tl1", 0).to(node, { x: offX + initX, y: offY + initY }, time, Laya.Ease.linearNone)
	            .addLabel("tl2", 0).to(node, { x: initX, y: initY }, time, Laya.Ease.linearNone);
	        return timeLine;
	    }
	}

	class GoldenEggView extends ui.view.side.GoldenEggViewUI {
	    constructor() {
	        super(...arguments);
	        this.$addProb = 0.1;
	        this.$subProb = 0.01;
	        this.$curProb = 0;
	        this.$total = 9000;
	        this.isBanner = false;
	        this.time_ = 0;
	    }
	    onEnable() {
	        var self = this, timer = self.timer, imgBtn = self.imgBtn;
	        self.regClick(imgBtn, self.onClick);
	        self.$startTime = Date.now();
	        self.showBanner(false);
	        self.isBanner = false;
	        this.time_ = Math.random() * 1000 + 2000;
	        timer.frameLoop(4, self, self.onSubProb);
	        this._handAni = TimeLineUtils.tweenUpdown(this.imgHand, 20, 30, 300);
	        this._handAni.play(0, true);
	    }
	    showBanner(visible) {
	        if (visible) {
	            window.ydhw_wx && ydhw.ShowBannerAd();
	        }
	        else {
	            window.ydhw_wx && ydhw.HideBannerAd();
	        }
	    }
	    onClose() {
	        let diamond = Math.floor(Math.random() * 40 + 10);
	        UserData.instance.gold += diamond;
	        this.clear();
	        UIMgr.closeUI(EUI.GoldenEggView);
	        (this.dataSource && typeof this.dataSource === "function") && (this.dataSource());
	        UIMgr.showTips("获得金币奖励" + diamond);
	    }
	    clear() {
	        var self = this;
	        var tween = self.$tween;
	        if (tween) {
	            tween.clear();
	            self.$tween = null;
	        }
	        self.timer.clearAll(self);
	        if (this._handAni) {
	            this._handAni.destroy();
	            this._handAni = null;
	        }
	    }
	    setMask(value) {
	        var graphics = this.spMask.graphics;
	        graphics.clear();
	        graphics.drawRect(0, 0, value * 417, 50, '#0');
	    }
	    onClick() {
	        var self = this;
	        this.ani1.play(0, false);
	        self.onAddProb();
	    }
	    onSubProb() {
	        var self = this;
	        var value = self.$curProb = Math.max(0, self.$curProb - self.$subProb);
	        var remain = self.$total - Date.now() + self.$startTime;
	        self.setMask(value);
	        if (remain > 0) {
	            self.lblRem.text = (remain / 1000 | 0) + '秒';
	            if (!self.isBanner && remain < this.time_) {
	                self.isBanner = true;
	                self.showBanner(true);
	            }
	        }
	        else {
	            self.onClose();
	        }
	    }
	    onAddProb() {
	        var self = this;
	        var curProb = self.$curProb += self.$addProb;
	        self.setMask(curProb);
	        if (curProb >= 0.5) {
	            let imgEgg = self.imgEgg;
	            self.closeParam = true;
	            self.clear();
	            imgEgg.skin = imgEgg.skin.replace('0', '1');
	            self.mouseEnabled = false;
	            self.showBanner(true);
	            self.timer.once(2000, self, self.onClose);
	        }
	    }
	}

	class MorePeopleView extends ui.view.side.MorePeopleViewUI {
	    initView(caches) {
	        var self = this, ltCont = self.list;
	        self.$datas = caches.concat();
	        self.refresh();
	        ltCont.selectEnable = true;
	        ltCont.selectHandler = new Laya.Handler(self, self.onSelect);
	        Laya.timer.loop(10000, self, self.refresh);
	        this.btn_close.visible = false;
	        UIUtils.addClick(self.btn_close, self.onClose);
	        Laya.timer.once(2000, this, function () {
	            self.btn_close.visible = true;
	        });
	    }
	    onSelect(index) {
	        var self = this;
	        var ltCont = self.list;
	        var data = ltCont.selectedItem;
	        if (data) {
	            ltCont.selectedIndex = -1;
	            self.changeItem(index, data);
	            super.onClick(data);
	        }
	    }
	    changeItem(index, data) {
	        var rand = SideUtils.randomInArray(SideNewMgr.ins.getBoxDatas(), data);
	        this.list.setItem(index, rand);
	    }
	    refresh() {
	        var self = this, caches = SideNewMgr.ins.getBoxDatas(), chLen = caches.length;
	        if (chLen == 0) {
	            self.onClose();
	        }
	        else {
	            let len = 50, datas = self.$datas, ltCont = self.list, oldData = ltCont.array;
	            if (datas.length < len) {
	                let disL = len - chLen;
	                self.$datas = datas = caches.concat();
	                while (disL-- > 0)
	                    datas.push(caches[disL % chLen]);
	            }
	            SideUtils.randomSort(datas);
	            self.list.array = datas.splice(0, len);
	            oldData && datas.push.apply(datas, oldData);
	        }
	    }
	    onRemoved(data) {
	        var self = this;
	        if (SideNewMgr.ins.hasSide()) {
	            let array = self.list.array;
	            for (let i = 0, len = array.length; i < len; i++) {
	                if (array[i] == data) {
	                    self.changeItem(i, data);
	                }
	            }
	            let datas = self.$datas;
	            let index = datas.indexOf(data);
	            index > -1 && datas.splice(index, 1);
	        }
	        else {
	            self.onClose();
	        }
	    }
	    onClear() {
	        var self = this;
	        super.onClear();
	        self.$datas = null;
	        self.list.selectHandler.recover();
	        Laya.timer.clear(self, self.refresh);
	        UIMgr.openUI(EUI.SideBoxView, () => {
	            (this.dataSource && typeof this.dataSource === "function") && (this.dataSource());
	        });
	    }
	    onCancel() {
	        SideNewMgr.ins.showMore();
	    }
	    onClose() {
	        UIMgr.closeUI(EUI.MorePeopleView);
	    }
	}

	class SideBotList extends ui.view.side.SideBotListUI {
	    initView(datas) {
	        var self = this, ltCont = self.ltCont;
	        self.refresh();
	        ltCont.addComponent(AutoScroll);
	        ltCont.selectEnable = true;
	        ltCont.selectHandler = Laya.Handler.create(self, self.onSelect, void 0, false);
	        self.timer.loop(10000, self, self.refresh);
	    }
	    onClear() {
	        super.onClear();
	        var self = this;
	        self.timer.clearAll(self);
	        self.ltCont.selectHandler.recover();
	    }
	    onCancel() {
	        SideNewMgr.ins.showMore();
	    }
	    onRemoved(data) {
	        var self = this;
	        if (SideNewMgr.ins.hasSide()) {
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
	    onSelect(index) {
	        var self = this;
	        var ltCont = self.ltCont;
	        var data = ltCont.selectedItem;
	        if (data) {
	            self.changeItem(index, data);
	            ltCont.selectedIndex = -1;
	            super.onClick(data);
	        }
	    }
	    changeItem(index, data) {
	        var rand = SideUtils.randomInArray(SideNewMgr.ins.getBoxDatas(), data);
	        this.ltCont.setItem(index, rand);
	    }
	    refresh() {
	        var self = this, caches = SideNewMgr.ins.getBoxDatas();
	        if (caches.length == 0) {
	            self.onClose();
	        }
	        else {
	            self.ltCont.array = SideUtils.randomSort(caches);
	        }
	    }
	}

	class SideDoubleList extends ui.view.side.SideDoubleListUI {
	    initView(datas) {
	        var self = this;
	        self.refresh();
	        this.rightList.selectEnable = true;
	        this.rightList.selectHandler = Laya.Handler.create(self, self.onRightSelect, void 0, false);
	        this.leftList.selectEnable = true;
	        this.leftList.selectHandler = Laya.Handler.create(self, self.onLeftSelect, void 0, false);
	        self.timer.loop(5000, self, self.refresh);
	    }
	    onClear() {
	        super.onClear();
	        var self = this;
	        self.timer.clearAll(self);
	        self.leftList.selectHandler.recover();
	        self.rightList.selectHandler.recover();
	    }
	    onCancel() {
	        SideNewMgr.ins.showMore();
	    }
	    onRemoved(data) {
	        var self = this;
	        if (SideNewMgr.ins.hasSide()) {
	            let array = self.rightList.array;
	            for (let i = 0, len = array.length; i < len; i++) {
	                if (array[i] == data) {
	                    self.changeItem(self.rightList, i, data);
	                }
	            }
	            array = self.leftList.array;
	            for (let i = 0, len = array.length; i < len; i++) {
	                if (array[i] == data) {
	                    self.changeItem(self.leftList, i, data);
	                }
	            }
	        }
	        else {
	            self.onClose();
	        }
	    }
	    onLeftSelect(index) {
	        var self = this;
	        var ltCont = self.leftList;
	        var data = ltCont.selectedItem;
	        if (data) {
	            self.changeItem(ltCont, index, data);
	            ltCont.selectedIndex = -1;
	            super.onClick(data);
	        }
	    }
	    onRightSelect(index) {
	        var self = this;
	        var ltCont = self.rightList;
	        var data = ltCont.selectedItem;
	        if (data) {
	            self.changeItem(ltCont, index, data);
	            ltCont.selectedIndex = -1;
	            super.onClick(data);
	        }
	    }
	    changeItem(list, index, data) {
	        var rand = SideUtils.randomInArray(SideNewMgr.ins.getBoxDatas(), data);
	        list.setItem(index, rand);
	    }
	    refresh() {
	        var self = this, caches = SideNewMgr.ins.getBoxDatas();
	        if (caches.length == 0) {
	            self.onClose();
	        }
	        else {
	            let array = SideUtils.randomSort(caches);
	            let lefts = [];
	            let rights = [];
	            for (let i = 0; i < 4; i++) {
	                lefts.push(array[i]);
	            }
	            for (let i = 4; i < 8; i++) {
	                rights.push(array[i]);
	            }
	            self.leftList.array = lefts;
	            self.rightList.array = rights;
	        }
	    }
	}

	class SideMoreGameView extends ui.view.side.SideMoreGameViewUI {
	    constructor() {
	        super(...arguments);
	        this._firstClick = 0;
	    }
	    onAwake() {
	    }
	    initView(datas) {
	        var self = this, addClick = UIUtils.addClick, imgBack = self.imgBack;
	        self.initList(0, datas);
	        self.initList(1, datas);
	        var point = platform.getMenuButtonBoundingClientRect();
	        if (point) {
	            self.boxTop.y = Utils.screenToStage(point.top);
	        }
	        addClick(imgBack, self.onBack, self);
	        addClick(self.imgKeep, self.onKeep, self);
	        self.setAldEvent('积分墙卖量');
	        imgBack.visible = false;
	        Laya.timer.once(2000, self, function () {
	            imgBack.visible = true;
	        });
	    }
	    onBack() {
	        UIMgr.openUI(EUI.SideBoxView, () => {
	            (this.dataSource && typeof this.dataSource === "function") && (this.dataSource());
	        });
	        UIMgr.closeUI(EUI.SideMoreGameView);
	    }
	    onClose() {
	        (this.dataSource && typeof this.dataSource === "function") && (this.dataSource());
	        UIMgr.closeUI(EUI.SideMoreGameView);
	    }
	    onKeep() {
	        var list = this.list0;
	        if (this._firstClick <= 0) {
	            list.selectedIndex = Math.random() * list.array.length | 0;
	            this._firstClick++;
	        }
	        else {
	            this.onClose();
	        }
	    }
	    onRemoved(data) {
	        var self = this;
	        let check = function (type) {
	            let list = self['list' + type];
	            let array = list.array;
	            for (let i = 0, len = array.length; i < len; i++) {
	                if (array[i] == data) {
	                    self.changeItem(list, i, data);
	                    array.splice(i, 1);
	                    break;
	                }
	            }
	            list.array = array;
	        };
	        check(0);
	        check(1);
	    }
	    initList(type, datas) {
	        var self = this;
	        var list = self['list' + type];
	        var scrollBar = list.scrollBar;
	        console.log("big box", datas);
	        list.array = datas.concat();
	        list.selectEnable = true;
	        list.selectHandler = Laya.Handler.create(self, self.onSelect, [list], false);
	        list.addComponent(AutoScroll);
	        list.getComponent(AutoScroll).speed = 0.5;
	    }
	    onSelect(list, index) {
	        var data = list.selectedItem;
	        if (data) {
	            list.selectedIndex = -1;
	            super.onClick(data);
	        }
	    }
	    changeItem(list, index, data) {
	        list.setItem(index, data);
	    }
	}

	class SideOverList extends ui.view.side.SideOverListUI {
	    initView(datas) {
	        var self = this, ltCont = self.list;
	        self.refreshList();
	        this.timer.loop(5000, this, this.refreshList);
	        ltCont.selectEnable = true;
	        ltCont.selectHandler = new Laya.Handler(self, self.onSelect);
	    }
	    onSelect(index) {
	        var ltCont = this.list;
	        var data = ltCont.selectedItem;
	        if (data) {
	            let rand = Utils.randomInArray(SideMgr.getSides(), data);
	            super.onClick(ltCont.selectedItem);
	            ltCont.selectedIndex = -1;
	            ltCont.setItem(index, rand);
	        }
	    }
	    refreshList() {
	        let datas = SideMgr.getSides();
	        if (!datas)
	            return;
	        let allData = datas.slice();
	        Utils.shuffle(allData);
	        let array = allData.slice(0, 8);
	        this.list.array = array;
	    }
	}

	class WXModelView extends ui.view.side.WXModelViewUI {
	    initView(datas) {
	        var self = this, ltCont = self.ltCont, height = 120;
	        self.refresh();
	        ltCont.selectEnable = true;
	        ltCont.selectHandler = Laya.Handler.create(self, self.onSelect, void 0, false);
	        UIUtils.addClick(self.boxBack, self.onClose, self);
	        self.setAldEvent('仿微信界面卖量');
	        var point = platform.getMenuButtonBoundingClientRect();
	        if (point) {
	            let newt = self.boxTop.top = Utils.screenToStage(point.top);
	            height += (newt - 34);
	        }
	        self.spGray.graphics.drawRect(0, 0, 760, height, '#ededed');
	        window.ydhw_wx && window.ydhw.HideBannerAd();
	    }
	    onCancel() {
	        SideMgr.showMore();
	    }
	    onClear() {
	        var self = this;
	        super.onClear();
	        self.timer.clearAll(self);
	        self.ltCont.selectHandler.recover();
	    }
	    onClose() {
	        UIMgr.closeUI(EUI.WXModelView);
	    }
	    onRemoved(data) {
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
	    onSelect(index) {
	        var self = this;
	        var ltCont = self.ltCont;
	        var data = ltCont.selectedItem;
	        if (data) {
	            ltCont.selectedIndex = -1;
	            self.changeItem(index, data);
	            super.onClick(data);
	        }
	    }
	    changeItem(index, data) {
	    }
	    refresh() {
	        var self = this, caches = SideMgr.getSides(), cLen = caches.length;
	        if (cLen == 0) {
	            self.onClose();
	        }
	        else {
	            let datas = [], randomSort = Utils.randomSort;
	            randomSort(caches = caches.concat());
	            for (let i = 0; i < cLen; i++) {
	            }
	            self.ltCont.array = randomSort(datas);
	        }
	    }
	}

	class GameConfig {
	    constructor() {
	    }
	    static init() {
	        var reg = Laya.ClassUtils.regClass;
	        reg("script/DebugView.ts", DebugView);
	        reg("script/FailView.ts", FailView);
	        reg("side/item/SideGrid.ts", SideGrid);
	        reg("script/HomeSellView.ts", HomeSellView);
	        reg("side/item/SideIconRT.ts", SideIconRT);
	        reg("script/HomeView.ts", HomeView);
	        reg("side/view/SideLeftList.ts", SideLeftList);
	        reg("side/item/BigBoxItem0.ts", BigBoxItem0);
	        reg("side/item/BigBoxItem1.ts", BigBoxItem1);
	        reg("side/item/MoreGameItem1.ts", MoreGameItem1);
	        reg("side/item/OverGameItem.ts", OverGameItem);
	        reg("side/item/SideBotItem.ts", SideBotItem);
	        reg("side/item/SideBoxItem.ts", SideBoxItem);
	        reg("side/item/SideBoxItem0.ts", SideBoxItem0);
	        reg("side/item/SideBoxItem1.ts", SideBoxItem1);
	        reg("side/item/SideGridItem.ts", SideGridItem);
	        reg("side/item/SideListItem.ts", SideListItem);
	        reg("side/item/SideListItem4.ts", SideListItem4);
	        reg("util/ScaleAni.ts", ScaleAni);
	        reg("side/item/SideNewItem.ts", SideNewItem);
	        reg("side/item/WXModelItem.ts", WXModelItem);
	        reg("script/LoadingView.ts", LoadingView);
	        reg("script/RankingView.ts", RankingView);
	        reg("script/ResultView.ts", ResultView);
	        reg("core/ui/FlyGold.ts", FlyGold);
	        reg("side/view/SideBoxView.ts", SideBoxView);
	        reg("side/view/GoldenEggView.ts", GoldenEggView);
	        reg("side/view/MorePeopleView.ts", MorePeopleView);
	        reg("side/item/SideBotList.ts", SideBotList);
	        reg("side/item/SideDoubleList.ts", SideDoubleList);
	        reg("side/view/SideMoreGameView.ts", SideMoreGameView);
	        reg("side/view/SideOverList.ts", SideOverList);
	        reg("side/view/WXModelView.ts", WXModelView);
	    }
	}
	GameConfig.width = 750;
	GameConfig.height = 1334;
	GameConfig.scaleMode = "fixedwidth";
	GameConfig.screenMode = "none";
	GameConfig.alignV = "top";
	GameConfig.alignH = "left";
	GameConfig.startScene = "view/DebugView.scene";
	GameConfig.sceneRoot = "";
	GameConfig.debug = false;
	GameConfig.stat = true;
	GameConfig.physicsDebug = false;
	GameConfig.exportSceneToJson = false;
	GameConfig.init();

	let DataStatisticsJs = {
	    dataTemp: [],
	    init: function () {
	        this.maxPostLength = 50;
	        this.commitDelayTime = 20;
	        this.cacheMaxLength = 10000;
	        this.database = [];
	        this.commit();
	        this.setCurrentTime();
	        this.startSchedule();
	        this._scheduleId = 0;
	    },
	    setCurrentTime: function () {
	        const timestamp = this.getTime();
	        this.intervalTime = timestamp;
	    },
	    isFixIntervalTime: function () {
	        const timestamp = this.getTime();
	        const diffTime = Math.floor(timestamp - this.intervalTime);
	        if (diffTime > this.commitDelayTime) {
	            return true;
	        }
	        return false;
	    },
	    checkTemp: function () {
	        var datas = this.dataTemp.shift();
	        if (datas) {
	            this.database.concat(datas);
	        }
	    },
	    commit: function () {
	        var commitData = this.database;
	        if (commitData.length > 0) {
	            let send = commitData.splice(0, this.maxPostLength);
	            this.dataTemp.push(send);
	            this.commitReq(send);
	            Laya.timer.once((this.commitDelayTime - 1) * 1000, this, this.checkTemp);
	        }
	    },
	    commitReq(cData) {
	    },
	    getTime: Date.now,
	    startSchedule: function () {
	        this.stopSchedule();
	        this._scheduleId = setInterval(this.commit.bind(this), this.commitDelayTime * 1000);
	    },
	    stopSchedule: function () {
	        if (this._scheduleId > 0) {
	            clearInterval(this._scheduleId);
	            this._scheduleId = 0;
	        }
	    },
	    logEvent: function (eventID, param, defParam) {
	        var data = Object.create(null);
	        var extra = param.extradata || '';
	        if (defParam) {
	            let ince = UserData.instance;
	            extra && (extra = ',' + extra);
	            extra = 'accountId:' + ince.accountId + ',level:' + ince.level + extra;
	        }
	        var paramID = param.paramID || '';
	        if (paramID) {
	            paramID = paramID.replace(/%u/i, this.getNewName());
	        }
	        data.eventID = eventID;
	        data.time = this.getTime();
	        data.paramID = paramID;
	        data.valueID = param.valueID || '';
	        data.extradata = extra;
	        this.database.push(data);
	    },
	    getNewName: function () {
	        return UserData.instance.isNewPlayer ? 'new' : 'old';
	    }
	};
	class DataStatistics {
	    static init() {
	        DataStatisticsJs.init();
	    }
	    static logEvent(eventID, param, defParam) {
	        DataStatisticsJs.logEvent(eventID, param, defParam !== false);
	    }
	    static clearSaveCommit() {
	        DataStatisticsJs.dataTemp.shift();
	    }
	}

	const platformType = {
	    None: 1001,
	    Wechat: 2001,
	    QQ: 3001,
	    Oppo: 4001,
	    Vivo: 5001,
	    Toutiao: 6001,
	    Xiaomi: 7001
	};
	const getKeys = function (obj) {
	    var keys = [];
	    if (obj && obj !== Object.prototype) {
	        keys = keys.concat(Object.getOwnPropertyNames(obj));
	        keys = keys.concat(getKeys(obj.__proto__));
	    }
	    return keys;
	};
	class WebPlatform {
	    constructor() {
	        this.platType = 1001;
	        this.appId = 'wx638732461656d042';
	        this.version = '1.0.1';
	        this.hasVideo = true;
	        this.bannerY = 1112;
	    }
	    static init() {
	        if (!WebPlatform.$init) {
	            WebPlatform.$init = true;
	            let webp = new WebPlatform;
	            let curp = window.platform;
	            if (curp) {
	                let keys = getKeys(webp);
	                for (let i in keys) {
	                    let key = keys[i];
	                    let data = curp[key];
	                    if (data === void 0) {
	                        curp[key] = webp[key];
	                    }
	                }
	            }
	            else
	                curp = window.platform = webp;
	            let curT = curp.platType;
	            for (let i in platformType) {
	                curp['is' + i] = curT === platformType[i];
	            }
	        }
	    }
	    login(cb) {
	        let wxcode = Laya.LocalStorage.getItem("wxcode");
	        if (wxcode == null) {
	            wxcode = Math.ceil(Math.random() * 100000).toString();
	            Laya.LocalStorage.setItem("wxcode", wxcode);
	        }
	        cb && cb({ code: 0, wxcode: wxcode });
	    }
	    launchInfo() {
	        return {};
	    }
	    getSystemInfoSync() {
	        return { brand: "PC", model: "web", benchmarkLevel: 100, system: "web" };
	    }
	    onShow(_callback) { }
	    onHide(_callback) { }
	    createFeedbackButton(_btnVect, hide) { }
	    ;
	    showFeedbackButton(visible) { }
	    exitMiniProgram() { }
	    onShare(_data) {
	        _data.success(true);
	    }
	    navigateToMiniProgram(_data) {
	        if (_data) {
	            let suc = _data.success;
	            if (suc instanceof Function)
	                suc();
	        }
	    }
	    createBannerAd(_adUnitId, func) { }
	    refreshBanner() { }
	    closeBannerAd() { }
	    setBannerVisible(val) { }
	    createRewardedVideoAd(type, func, load, preload) {
	        func && func(true);
	    }
	    vibrateShort() { }
	    vibrateLong() { }
	    setUserCloudStorage(_kvDataList) { }
	    postMessage(_data) { }
	    getMenuButtonBoundingClientRect() {
	        return null;
	    }
	    checkUpdate() { }
	    getNetworkType(call) {
	        call && call('wifi');
	    }
	    createVideo(data) {
	        return null;
	    }
	    createInsertAd(call) { }
	    loadSubpackage(name) {
	        return Promise.resolve();
	    }
	    showLoading() {
	    }
	    hideLoading() {
	    }
	    showShare(data) { }
	    showModal(modal) { }
	    requestSubscribeMessage(call) {
	        call(true);
	    }
	    hasShortcut(call) {
	        call && call(true);
	    }
	    installShortcut(call) {
	        call && call(true);
	    }
	    createNativeAd(call) { }
	    setFeedbackButtonVisible(visible) { }
	    destroyFeedBackBtn() { }
	    reportMonitor(name, value) { }
	}

	class SideReceiver {
	    static init() {
	        var self = SideReceiver;
	        var register = SideMsg.register;
	        register(ESMessage.S2C_REMOVE, self.onRemove, self);
	        register(ESMessage.S2C_CLICK_BTN, self.onClickBtn, self);
	        register(ESMessage.S2C_CANCEL, self.onCancel, self);
	        register(ESMessage.S2C_DOT_SERVER, self.onDotServer, self);
	        register(ESMessage.S2C_DOT_ALD, self.onDotAld, self);
	        register(ESMessage.S2C_DOT_EVENT, self.onDotEvent, self);
	    }
	    static onRemove(data) {
	        UserData.instance.removeSide(data);
	    }
	    static onClickBtn() {
	        SoundMgr.playBtnClick();
	    }
	    static onCancel() {
	    }
	    static onDotServer(event, side, enable) {
	    }
	    static onDotAld(event, data) {
	        AldSDK.aldSendEvent(event, true, data);
	    }
	    static onDotEvent(event, paramId) {
	        DataStatistics.logEvent(event, { paramID: paramId });
	    }
	}

	class Main {
	    constructor() {
	        if (window["Laya3D"])
	            Laya3D.init(GameConfig.width, GameConfig.height);
	        else
	            Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
	        Laya["Physics"] && Laya["Physics"].enable();
	        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
	        Laya.stage.scaleMode = GameConfig.scaleMode;
	        Laya.stage.screenMode = GameConfig.screenMode;
	        Laya.stage.alignV = GameConfig.alignV;
	        Laya.stage.alignH = GameConfig.alignH;
	        Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
	        if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
	            Laya.enableDebugPanel();
	        if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
	            Laya["PhysicsDebugDraw"].enable();
	        if (GameConfig.stat && Laya.Browser.onPC)
	            Laya.Stat.show();
	        Laya.alertGlobalError = true;
	        Laya.MouseManager.multiTouchEnabled = false;
	        let userButton = window['userButton'];
	        if (!userButton) {
	            var stage = Laya.stage, dir = 'loading/';
	            var height = stage.height;
	            var logingBg = new Laya.Image(dir + 'loading_bg.jpg');
	            logingBg.y = (height - 1650) / 2;
	            stage.addChild(logingBg);
	        }
	        EventMgr.once(EventType.EnterLoading, null, function () {
	            if (userButton) {
	                userButton.hide();
	            }
	            else {
	                logingBg && logingBg.removeSelf();
	            }
	        });
	        if (Laya.Browser.onPC) {
	            this.onVersionLoaded();
	            return;
	        }
	        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	    }
	    onVersionLoaded() {
	        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	    }
	    onConfigLoaded() {
	        AldSDK.timeId = Date.now();
	        AldSDK.aldSendEvent("开始游戏", false);
	        this.setupPlatform();
	        YLSDK.ins;
	        SideReceiver.init();
	        SoundMgr.init();
	        DataStatistics.init();
	        UserData.instance.init();
	        UIMgr.openUI(EUI.LoadingView);
	    }
	    initSDK(success) {
	        YLSDK.ins.insertBannerShowTime = Date.now();
	        window.ydhw_wx && window.ydhw.ShareCard('jiesuan', this, (result) => { });
	        {
	        }
	    }
	    initCDNConfig() {
	        var path = GameConst.CDN + platform.appId + "/cdn/";
	        Utils.initCDNFiles(path, ['scene']);
	    }
	    setupPlatform() {
	        let self = this;
	        platform.onShow((options) => {
	            console.info("options:", options);
	            Laya.timer.scale = 1;
	            SoundMgr.playBGM();
	            if (ydhw_wx) {
	                GameConst.Scene = options.scene;
	                if (options.scene == 1089 || options.scene == 1104) {
	                }
	            }
	            else if (ydhw_oppo) {
	                self.judgeTime();
	            }
	        });
	        platform.onHide(() => {
	            if (ydhw_wx) {
	                Laya.timer.scale = 0;
	            }
	            else if (ydhw_oppo) {
	                YLSDK.ins.shortcut();
	                self._hideTime = Date.now();
	            }
	        });
	    }
	    judgeTime() {
	        if (this._hideTime == 0)
	            return;
	        if ((Date.now() - this._hideTime) / 1000 > 30) {
	            platform.createInsertAd();
	            this._hideTime = 0;
	        }
	    }
	}
	WebPlatform.init();
	new Main();

}());
//# sourceMappingURL=bundle.js.map
