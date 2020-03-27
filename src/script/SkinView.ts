// import { ui } from "../ui/layaMaxUI";
// import SortTools from "../util/SortTools";
// import CfgDataMgr from "../mgr/CfgDataMgr";
// import ShopMgr from "../mgr/ShopMgr";
// import UIMgr from "../mgr/UIMgr";
// import UserData from "../mgr/UserData";
// import Utils from "../util/Utils";
// import StrategyMgr, { SvModule } from "../mgr/StrategyMgr";
// import ServerAgency from "../core/ServerAgency";
// import AldPlatform from "../platform/AldPlatform";
// import SkinItem from "./item/SkinItem";
// import { ESprite3D } from "../const/ERes";
// import SceneMgr from "../mgr/SceneMgr";
// import RolePlayer from "../logic/entity/RolePlayer";
// import EventMgr from "../mgr/EventMgr";
// import TrySkinMgr from "../mgr/TrySkinMgr";
// import EUI from "../const/EUI";

// /**
//  * 皮肤界面
//  */
// export default class SkinView extends ui.view.SkinViewUI {

//     private $scene3D: Laya.Scene3D;
//     private $rolePlayer: RolePlayer;
//     private $showAdd: boolean;
//     private $isVideo: boolean;
//     private freeCoin: number;

//     /**
//      * 重写
//      */
//     public onEnable(): void {
//         var self = this, skins = self.skins;
//         var shops = CfgDataMgr.instance.shopCfg, array = [],
//             hasShop = ShopMgr.hasShop, curSkinId = ShopMgr.curSkinId, curData;
//         for (let i in shops) {
//             let shop = shops[i];
//             let data = <ISkinItemData>{};
//             let shopId = data.id = shop.id;
//             data.getType = shop.getType;
//             data.resources = shop.resources;
//             data.consumer = shop.consumer;
//             data.tag = shop.tag;
//             data.order = shop.order;
//             data.isUnlock = hasShop(shopId);
//             // 默认选中当前使用的皮肤
//             (shopId == curSkinId) && (curData = data);
//             array.push(data);
//         }
//         // 排序
//         SortTools.sortMaps(array, ['tag', 'order']);
//         // 初始化界面
//         self.initModel();
//         self.updateGold();
//         self.updateStrategy();
//         // 列表
//         skins.array = array;
//         skins.vScrollBarSkin = "";
//         skins.selectEnable = true;
//         skins.selectHandler = Laya.Handler.create(self, self.onSelect, void 0, false);
//         skins.selectedIndex = array.indexOf(curData);
//         // 其它
//         self.regClick(self.imgClose, self.onClose);
//         self.regClick(self.imgBuy, self.onBuy);
//         self.regClick(self.imgAdd, self.onFree);
//         self.lblFree.text = '+' + (self.freeCoin = CfgDataMgr.instance.getGlobalCfg('freeCoin', 300));
//         EventMgr.instance.on(EventType.RefreshGold, self, self.updateGold);
//     }

//     /**
//      * 点击关闭
//      */
//     protected onClose(): void {
//         var self = this, scene3D = self.$scene3D;
//         if (scene3D) {
//             scene3D.destroy();
//             self.$rolePlayer = self.$scene3D = null;
//         }
//         UIMgr.instance.closeUI(EUI.SkinView);
//         EventMgr.instance.off(EventType.RefreshGold, self, self.updateGold);
//     }

//     /**
//      * 初始化模型环境
//      */
//     protected initModel(): void {
//         var self = this;
//         var scene3D = self.$scene3D = new Laya.Scene3D;
//         scene3D.ambientColor = new Laya.Vector3(0.6, 0.6, 0.6);
//         // 镜头
//         var cameraOrigin = Laya.loader.getRes(ESprite3D.SkinCamera).getChildAt(0) as Laya.Camera;
//         var camera = Laya.Camera.instantiate(cameraOrigin) as Laya.Camera;
//         scene3D.addChild(camera);
//         camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
//         // 灯光
//         var light = SceneMgr.instance.createLight();
//         scene3D.addChild(light);
//         self.addChild(scene3D);
//         // 刷新模型皮肤
//         var name = 'Role_01', role = <Laya.Sprite3D>(scene3D.getChildByName(name) ||
//             (scene3D.addChild(new Laya.Sprite3D(name))));
//         var rolePlayer = self.$rolePlayer = role.getComponent(RolePlayer) || role.addComponent(RolePlayer);
//         var transform = role.transform;
//         // var scale = 1000 / 1334;
//         // RolePlayer修改了角度，必须置于最后设置
//         transform.localRotationEulerY = 0;
//         // 屏幕适配
//         self.callLater(function () {
//             let temp = Laya.Point.TEMP, scale = Laya.stage.height / 1334;
//             temp.y = 220;
//             self.imgFrame.localToGlobal(temp);
//             transform.localPositionY = (667 - temp.y) * Math.pow(scale, 1.8) / 325;    // 667和325为正常状态，舞台宽高的一半
//         });
//         // 等比例缩小
//         // transform.localScale = new Laya.Vector3(scale, scale, scale);
//     }

//     /**
//      * 切换模型
//      * @param skinId 
//      */
//     protected changeModel(skinId: number): void {
//         this.$rolePlayer.changeModel(skinId);
//     }

//     /**
//      * 刷新界面
//      */
//     protected refresh(): void {
//         var self = this;
//         self.onSelect(self.skins.selectedIndex);
//         self.updateGold();
//     }

//     /**
//      * 更新金币
//      */
//     protected updateGold(): void {
//         this.lblGold.text = UserData.instance.gold + '';
//     }

//     /**
//      * 更新策略按钮
//      */
//     protected updateStrategy(): void {
//         var self = this, config = Utils.initVSBtn(self.imgAdd, SvModule.FreeGold, 'skin/btn_yellow_');
//         if (self.$showAdd = config > 0) {
//             self.$isVideo = config == 2;
//         }
//     }

//     /**
//      * 选中
//      */
//     protected onSelect(index: number): void {
//         var self = this;
//         var data = <ISkinItemData>self.skins.getItem(index);
//         var isGold = self.imgBuy.visible = data.getType == 1;
//         var isUnlock = data.isUnlock, skinId = data.id;
//         var remain = TrySkinMgr.getRemain(skinId);
//         self.imgAdd.visible = self.$showAdd && isGold;
//         isGold && self.refreshBuy(!isUnlock && UserData.instance.gold >= data.consumer);
//         // 自动使用
//         isUnlock && (ShopMgr.curSkinId = data.id);
//         // 切换模型
//         self.changeModel(skinId);
//         // tip
//         (self.imgTip.visible = !isUnlock && remain > 0) &&
//             (self.lblRemain.text = '再试用' + remain + '次\n永久解锁');
//     }

//     /**
//      * 刷新购买按钮
//      */
//     protected refreshBuy(normal: boolean): void {
//         var imgBuy = this.imgBuy;
//         imgBuy.skin = 'skin/img_buy' + Number(!!normal) + '.png';
//         imgBuy.mouseEnabled = normal;
//     }

//     /**
//      * 购买皮肤
//      */
//     protected onBuy(): void {
//         var self = this, skins = self.skins;
//         var index = skins.selectedIndex;
//         // var item = <SkinItem>skins.getCell(index); //TER-v2.2.0
//         var item = skins.getCell(index).getChildAt(0) as SkinItem;
//         if (item) {
//             let data = item.dataSource;
//             // todo根据类型解锁
//             if (data.getType == 1) {
//                 let uInc = UserData.instance;
//                 let remain = uInc.gold - data.consumer;
//                 if (remain >= 0) {
//                     uInc.set_gold(remain);
//                     data.isUnlock = ShopMgr.unlockShop(data.id);
//                 }
//             }
//             // 刷新子项
//             item.refresh();
//             // 刷新自身
//             self.refresh();
//         }
//         AldPlatform.aldSendEvent('皮肤-购买');
//     }

//     /**
//      * 免费金币
//      */
//     protected onFree(): void {
//         var self = this;
//         if (self.$isVideo)
//             self.onVideo();
//         else
//             self.onShare();    
//     }

//     /**
//      * 看视频
//      */
//     protected onVideo(): void {
//         var self = this;
//         platform.createRewardedVideoAd(2, self.onCallback.bind(self));
//     }

//     /**
//      * 分享
//      */
//     protected onShare(): void {
//         var self = this;
//         ServerAgency.instance.shareCard(self.onCallback.bind(self));
//     }

//     /**
//      * 视频/分享回调
//      */
//     protected onCallback(res: boolean): void {
//         var self = this;
//         if (res) {
//             UserData.instance.addGold(self.freeCoin);
//             self.refresh();
//             // 次数增加更新按钮
//             StrategyMgr.setTimesByModule(SvModule.FreeGold);
//             self.updateStrategy();
//             AldPlatform.aldSendEvent('皮肤-' + (UserData.instance.isNewPlayer ? '新' : '老') + '用户-' + (self.$isVideo ? '视频' : '分享') + '得金币');
//         }
//     }
// }