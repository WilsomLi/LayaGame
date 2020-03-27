const Utils = require("wxUtils")

class SubRenderer {
	constructor() {
		// 所有好友的数据;
		console.log("SubRenderer constructor");
		this.allFriendData = null;
		if(wx.getSharedCanvas==null) return;
		// 初始化模块;
		this.init();
	}

	/**
	 * 初始化;
	 */
	init() {
		// 排行榜模块;
		this.rankListLayer = require("wxRankListModule");
		
		// 超越好友模块;
		this.surpassLayer = require("wxSurpassModule");

		// 结算排行模块;
		this.only3Layer = require("wxOnly3Module");
		this.reqOnwerData();
		this.reqAllFriendData('user_id,level','level');
	}

	// 更新所有界面的绘制;
	updateAllLayerRender() {
		this.rankListLayer._updateDrawCanvas()
		this.surpassLayer._updateDrawCanvas()
		this.only3Layer._updateDrawCanvas()
	}
	
	/**
	 * 消息监听;
	 */
	listen() {
		wx.onMessage(msg => {
            console.log("wx.onMessage reqRankListData = ",msg);
			if(wx.getSharedCanvas==null) return;
			
			switch (msg.key) {
				// 排行榜部分;
				case "reqRankListData": // 获取排行榜数据;
					//console.log("wx.onMessage reqRankListData = ",msg.message);
					this.surpassLayer.clear();	
					var configData = msg.message;
					this.reqAllFriendData(
						configData.keyList, // 获取参数key列表，"money,level" ///////   "level"
						configData.sortList, // 排序列表， "level,money" //////   "level"
						data=>{
							this.rankListLayer.showLayer(configData, data, ()=>{
								this.updateAllLayerRender();
							});
						},
						true
					);
					break;
				case "updateWordRankListData":
					this.rankListLayer.clear();
					break;

				case "updateRankListData": // 刷新排行榜数据;
					var configData = msg.message;
					this.reqAllFriendData(
						configData.keyList, 
						configData.sortList,
						data=>{
							this.rankListLayer.showLayer(configData, data, ()=>{
								this.updateAllLayerRender();
							});	
						},
						true
					);
					break;

				case "wxRankListMove": // 滚动排行榜;
					const deltaY = msg.message;
					this.rankListLayer.moveScrollView(deltaY);
					break;

				case "clearRankListData":
					this.rankListLayer.clear();
					break;
					
				// 超越好友部分;
				case "reqSurpassData":
					this.rankListLayer.clear();
					var configData = msg.message;
					// this.reqAllFriendData(
					// 	configData.keyList,
					// 	configData.keyList,
					// 	data=>{
							this.surpassLayer.showLayer(configData, this.allFriendData, ()=>{
								this.updateAllLayerRender();
							});	
					// 	},
					// 	true,
					// );
					break;
				
				case "clearSurpassData":
					this.surpassLayer.clear();	
					this.updateAllLayerRender();
					break;

				case "surpassMoveEnd":
					this.surpassLayer.moveEnd();	
					// this.updateAllLayerRender();
					break;
				
				// 三人排行部分;
				case "reqOnly3Data":
					var configData = msg.message;
					this.reqAllFriendData(
						configData.keyList,
						configData.keyList,
						data=>{
							this.only3Layer.showLayer(configData, data, ()=>{
								this.updateAllLayerRender();
							});	
						},
						true
					);
					break;

				case "updateOnly3Data":
					this.only3Layer.clear();	
					break;

				case "clearOnly3Data":
					this.only3Layer.clear();	
					break;

				// 获取自己的数据;
				case "reqOnwerData":
					this.reqOnwerData();
					break;
				
				case "setOwnerData":
					this.setOwnerData(msg.message);
					break;

				case "setCurMaxScore":
					Utils.setCurMaxScore(msg.message);
					break;

				// 查看群排行;
				case "reqGroupCloudStrage":
					var configData = msg.message;
					this.reqGroupCloudStrage(
						configData.shareTicket,
						configData.keyList,
						data=>{
							this.rankListLayer.showLayer(configData, data, ()=>{
								this.updateAllLayerRender();
							});	
						}
					);
					break;
			}
		});
	}

	/**
	 * 请求自己的消息
	 */
	reqOnwerData(){
		// console.log("reqOnwerData")
		wx.getUserInfo({
			openIdList: ["selfOpenId"],
			lang:"zh_CN",
			success: res => {
				console.log("reqOnwerData success res=>", res)
				const ownerData = res.data[0]
				Utils.saveOwnerData(ownerData);
			}
		})
	}
	
	/**
	 * 设置自己的信息;
	 * @param {自己的数据key和值} obj [{key: bestScore, value: 100}, {}, {}]
	 */
	setOwnerData(obj){
		let data = Utils.getOwnerData();
		if(data == null) return;

		data.KVDataList = null; //无效
		data.KVDataList = obj;
		// for(var k in obj){
		// 	data.KVDataList
		// }
		Utils.saveOwnerData(data);
		// console.log("setOwnerData",obj);
		// console.log("setOwnerData",data);
	}

	/**
	 * 取出所有好友数据
	 * @param {参数列表} keyList 
	 * @param {回调创建排行UI界面} callFunc 
	 * @param {是否强制更新数据} isUpdate 
	 */
	reqAllFriendData(keyList, sortList, callFunc, isUpdate){
		const _keyList = Utils.get_keyList(keyList);
		const _sortList = Utils.get_keyList(sortList);
		// 有数据的话就不再次请求;
		if(this.allFriendData && !isUpdate){
			if(callFunc){
				callFunc(this.allFriendData);
			}
			return;
		}

		this.allFriendData = null;
		wx.getFriendCloudStorage({
			keyList:_keyList,
			success: res => {
				// console.log("reqAllFriendData success", res);
				this.allFriendData = Utils.data_sort(res.data, _sortList);
				if(callFunc){
					callFunc(this.allFriendData);
				}
			},
			fail: res => {
				// console.log("reqAllFriendData fail", res);
			},
		});
	}
	
	reqGroupCloudStrage(shareTicket, keyList, sortList, callFunc, isUpdate){
		const _keyList = Utils.get_keyList(keyList);
		const _sortList = Utils.get_keyList(sortList);

		// 有数据的话就不再次请求;
		if(this.allFriendData && !isUpdate){
			if(callFunc){
				callFunc(this.allFriendData);
			}
			return;
		}

		this.allFriendData = null;
		wx.getGroupCloudStorage({
			shareTicket,
			keyList:_keyList,
			success: res => {
				console.log("reqGroupCloudStrage success", res);
				this.allFriendData = Utils.data_sort(res.data, _sortList);
				if(callFunc){
					callFunc(this.allFriendData);
				}
			},
			fail: res => {
				console.log("reqGroupCloudStrage fail", res);
			},
		});
	}
}

const sub = new SubRenderer();
sub.listen();
