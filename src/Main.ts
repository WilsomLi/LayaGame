
import GameConfig from "./GameConfig";
import UIMgr from "./mgr/UIMgr";
import GameConst from "./const/GameConst";
import EventMgr from "./mgr/EventMgr";
import SoundMgr from "./mgr/SoundMgr";
import DataStatistics from "./core/DataStatistics";
import UserData from "./mgr/UserData";
import AldSDK from "./platform/AldSDK";
import Utils from "./util/Utils";
import WebPlatform from "./platform/WebPlatform";
import EventType from "./const/EventType";
import EUI from "./const/EUI";
import SideMgr from "./side/mgr/SideMgr";
import YLSDK from "./platform/YLSDK";

class Main {

	private _hideTime:number;//切后台时间

	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat && Laya.Browser.onPC)
			Laya.Stat.show();
			
		Laya.alertGlobalError = true;
		Laya.MouseManager.multiTouchEnabled = false;

		// 默认loading，减少黑屏几率，延迟等高度出来
		let userButton = window['userButton'];
		if(!userButton) {
			var stage = Laya.stage, dir = 'loading/';
			var height = stage.height;
			var logingBg = new Laya.Image(dir + 'loading_bg.jpg');
			logingBg.y = (height - 1650) / 2;
			stage.addChild(logingBg);
		}
		EventMgr.once(EventType.EnterLoading, null, function () {
			if(userButton) {
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

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		// 打点开始
		AldSDK.timeId = Date.now();
		AldSDK.aldSendEvent("开始游戏", false);
		// this.initCDNConfig();

		this.setupPlatform();
		YLSDK.ylInitSDK((success) => {
			if(typeof(success) == 'boolean') {
				this.initSDK(success);
			}
		});

		if(platform.isNone) {
			SideMgr.init(platform, platform.isNone);
		}

		SoundMgr.init();
		DataStatistics.init();
		UserData.instance.init();
		UIMgr.openUI(EUI.LoadingView);
	}

	initSDK(success: boolean): void {
		console.log("ylInitSDK", success);
		// 开关
		let userInfo: any = YLSDK.ylGetUserInfo();
		let switchInfo: any = YLSDK.ylGetSwitchInfo();
		console.log("YLSDK-user", userInfo);
		console.log("YLSDK-switch", switchInfo);
		
		//账号id
		if (userInfo) {
			console.log("userInfo", userInfo);
			UserData.instance.isNewPlayer = (userInfo.newPlayer === 1) ? true : false;
			console.log("sdk 新老用户", UserData.instance.isNewPlayer);
		}
		if (switchInfo) {
			GameConst.ShareSwitch = switchInfo.switchShare == 1;
			GameConst.SideSwitch = switchInfo.switchPush == 1;
			GameConst.MisTouchSwitch = switchInfo.switchTouch == 1;
		}
		//自定义开关
		YLSDK.initCustomSwitch(() => {
			// 延迟初始化
			GameConst.SceneSwitch = YLSDK.getDefValue("guanggaoSwitch") === "true";
			GameConst.GDMisTouchSwitch = YLSDK.getDefValue("gdMisTouchSwitch") === "true";
			GameConst.SwitchYS = YLSDK.getDefValue('yuanshengguangg') === 'true';
			GameConst.InsertBannerDelayTime = YLSDK.getDefValue("insertbannerdelay") * 1000;
			GameConst.SwitchSkinTry = YLSDK.getDefValue('pifushiyong') === "true";
			GameConst.SwitchInsertBanner = YLSDK.getDefValue("chapkaiguan") === "true";
			GameConst.InsertbannerInterval = YLSDK.getDefValue("chapjiange");
			GameConst.FirstShowInsertBannerShowTime = YLSDK.getDefValue("chapxianshishijian");
			
			GameConst.WCBox = YLSDK.getDefValue("WCBox") === "true";
			GameConst.BannerShowTime = parseInt(YLSDK.getDefValue("BannerShowTime")) || GameConst.BannerShowTime;
			GameConst.BtnReSize = parseInt(YLSDK.getDefValue("BtnReSize")) || GameConst.BtnReSize;
			GameConst.BigBox = YLSDK.getDefValue("out")  === "true";
			GameConst.gamebanner = YLSDK.getDefValue("game_banner")  === "false" ? false : true;
			
			GameConst.logAllSwitch();
		});
		YLSDK.InsertBannerShowTime = Date.now();
		SideMgr.init(platform, false);
		SideMgr.reqYLSideboxAndBoard();

		//拉取微信分享数据
		if(platform.isWechat) {
			YLSDK.ylShareCard(function (shareInfo) {
				if(shareInfo){
					console.log("----获取分享图:",JSON.stringify(shareInfo));
				}else{
					//获取失败
				}            
			}.bind(this),'jiesuan');
		}
	}

	/**
	 * 初始化CDN配置
	 */
	initCDNConfig(): void {
		var path = GameConst.CDN + platform.appId + "/cdn/";
		// 仅设置CDN目录，效果相对较好
		Utils.initCDNFiles(path, ['scene']);
	}

	/**
	 * 建立平台
	 */
	setupPlatform(): void {
		//切换前台
		let self = this;
		platform.onShow((options) => {
			console.info("options:", options);
			Laya.timer.scale = 1;
			SoundMgr.playBGM();
			if (platform.isWechat) {
				GameConst.Scene = options.scene;
				if (options.scene == 1089 || options.scene == 1104) {
					//已收藏 从我的小程序  已经得不到1104的场景值					
				}
			} else if (platform.isOppo) {
				//判断回到前台得时间
				self.judgeTime();
			}

		});
		//切换后台
		platform.onHide(() => {
			if (platform.isWechat) {
				Laya.timer.scale = 0;
			} else if (platform.isOppo) {
				YLSDK.Shortcut();
				self._hideTime = Date.now();
			}
		});
	}

	//判断回到前台的时间是否显示插屏广告
	judgeTime() {
		if (this._hideTime == 0) return;
		if ((Date.now() - this._hideTime) / 1000 > 30) {
			platform.createInsertAd();
			this._hideTime = 0;
		}
	}
}
// 优先于Main执行
WebPlatform.init();
//激活启动类
new Main();