
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
import SideReceiver from "./mgr/SideReceiver";
import NativeMgr from "./mgr/NativeMgr";
import YLSDK from "./platform/YLSDK";

class Main {
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
		Laya.timer.callLater(null, function () {
			var stage = Laya.stage, dir = 'loading/';
			var logingBg = new Laya.Image(dir + 'loading_bg.jpg');
			var height = stage.height;
			logingBg.y = (height - 1650) / 2;
			stage.addChild(logingBg);
			EventMgr.once(EventType.EnterLoading, null, function () {
				logingBg.removeSelf();
			});
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
		this.initCDNConfig();
		this.setupPlatform();
		YLSDK.ylInitSDK((success) => {
			console.log("ylInitSDK", success);
			// console.log("YLSDK-user", YLSDK.ylGetUserInfo());
			// console.log("YLSDK-switch", YLSDK.ylGetSwitchInfo());
		});

		SideMgr.init(platform, platform.isWechat || platform.isNone);
		SideReceiver.init();
		SideMgr.reqYLSideboxAndBoard();
		SoundMgr.init();
		DataStatistics.init();
		UserData.instance.init();
		UIMgr.openUI(EUI.LoadingUI);
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
		var timer = Laya.timer, isWechat = platform.isWechat, isOppo = platform.isOppo;
		// 切换前台
		platform.onShow(function (options) {
			if (isWechat) {
				timer.scale = 1;
			}
			SoundMgr.playBGM();
		});
		// 切换后台
		platform.onHide(function (res) {
			if (isWechat) {
				timer.scale = 0;
				if (res) {
					let mode = res.mode;
					// home键、正常退出游戏
					if (mode === 'close' || (mode === 'hide' && res.targetAction === 7)) {
						// ServerAgency.reqExit(1);
					}
				}
			}
		});
		// oppo专属
		if (isOppo) {
			// 原生初始化
			platform.createNativeAd(NativeMgr.init);
		}
	}
}
// 优先于Main执行
WebPlatform.init();
//激活启动类
new Main();