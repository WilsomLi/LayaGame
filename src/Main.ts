
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
		
		SideReceiver.init();
		SoundMgr.init();
		DataStatistics.init();
		UserData.instance.init();
		UIMgr.openUI(EUI.LoadingView);
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
			if (window.ydhw_wx) {
				GameConst.Scene = options.scene;
				if (options.scene == 1089 || options.scene == 1104) {
					//已收藏 从我的小程序  已经得不到1104的场景值					
				}
			} else if (window.ydhw_oppo) {
				//判断回到前台得时间
				self.judgeTime();
			}

		});
		//切换后台
		platform.onHide(() => {
			if (window.ydhw_wx) {
				Laya.timer.scale = 0;
			} else if (window.ydhw_oppo) {
				YLSDK.shortcut();
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