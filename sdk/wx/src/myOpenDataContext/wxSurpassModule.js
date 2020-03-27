const Utils = require("wxUtils")

class wxSurpassModule {
	constructor() {
		this.init();
	}

	// 初始化;
	init() {
		this.gameDatas = null;
		this.config = null;

		// 公共画布;
		this.sharedCanvas = wx.getSharedCanvas();
		this.sharedCtx = this.sharedCanvas.getContext('2d');

		// 排行榜的画布;
		this.canvas = wx.createCanvas();
		this.canvasCtx = this.canvas.getContext('2d');
		this.lastSurpassData = null;
		this.initX = -27;
	}

	// 重置排行榜画布大小;
	resetCanvasSize(width, height) {
		this.canvas.width = width;
		this.canvas.height = height;
		// console.log("canvas",width,height)
	}

	// 设置配置;
	setConfigData(data) {
		this.config = data;
	}

	// 设置游戏数据;
	setGameData(data) {
		this.gameDatas = data;
	}

	// 展示排行榜;
	showLayer(configData, listData, updateAllLayerFunc) {
		this._updateAllLayerFunc = updateAllLayerFunc;

		this.setConfigData(configData);
		this.setGameData(listData);

		// 重置排行榜大小;
		this.resetCanvasSize(this.sharedCanvas.width, this.sharedCanvas.height);

		// 开始绘制排行榜;
		this.drawSurpass();
	}

	// 获取需要超越的好友;
	getNeedSurpassFriend() {
		let ownerData = Utils.getOwnerData();
		if (ownerData == null || this.gameDatas == null) return null;

		let curScore = Utils.getCurMaxScore();

		let data;
		for (var i = this.gameDatas.length - 1; i >= 0; i--) {
			data = this.gameDatas[i];
			if (data.nickname === ownerData.nickname) { // 名字相同则为同一个人;
				continue;
			}
			if (data.KVDataList.length > 0) {
				if (curScore < parseInt(data.KVDataList[1].value)) {
					return data;
				}
			}
		}
		return null;
	}

	// 绘制排行榜;
	drawSurpass() {
		var surpassData = this.getNeedSurpassFriend();
		const ownerData = Utils.getOwnerData();

		// const compareKey = this.config.keyList; // 对比数据key;
		// const diff = surpassData ? Utils.getValueByKey(surpassData, compareKey) - Utils.getValueByKey(ownerData, compareKey) : 0;

		if (!surpassData) { // 不存在可超越的好友，不做绘制;
			// return;
			surpassData = ownerData;
		}

		if (this.lastSurpassData == null || surpassData.openid != this.lastSurpassData.openid) {
			// this.initX = -160;
			this.lastSurpassData = surpassData;
		}

		const _ctx = this.canvasCtx;

		const _avatarUrl = surpassData.avatarUrl || '';//TODO 默认头像路径; 

		const avatarW = 110; //TODO 头像宽度;
		const avatarH = 110; //TODO 头像高度;

		const centerPx = this.sharedCanvas.width / 2;
		const centerPy = this.sharedCanvas.height / 2;

		const starPx = centerPx; // TODO 开始位置偏移x;
		const starPy = centerPy - 220; // TODO 开始位置偏移y

		const _surpassBgUrl = null;//"images/surpass.png"; // TODO 背景图;
		// 背景图;
		const drawSurpassBg = function () {
			if (_surpassBgUrl !== null) {
				Utils.loadImage(_surpassBgUrl, (_img) => {
					const offset_y = _img.height > avatarH ? -(_img.height - avatarH) / 2 : -(_img.height - avatarH) / 2;
					_ctx.drawImage(_img, starPx, starPy + offset_y);
					// 向下绘制;
					drawPhoto();
				})
			} else {
				// 向下绘制;
				drawPhoto();
			}
		}.bind(this)

		// 头像; （头像绘制圆形还是方块;）
		const avatarPx = starPx - avatarW * 0.5 - 2; //TODO 头像位置偏移x
		const avatarPy = starPy - avatarH * 0.5 - 3; //TODO 头像位置偏移y
		const drawPhoto = function () {
			Utils.loadImage(_avatarUrl, (_img) => {
				_ctx.drawImage(_img, avatarPx, avatarPy, avatarW, avatarH);

				// _ctx.save() //保存上下文
				// _ctx.beginPath()//开始绘制
				// _ctx.arc(avatarPx + avatarW / 2, avatarPy + avatarH / 2, avatarW / 2, 0, 2 * Math.PI, false)//画一个圆
				// _ctx.clip()
				// _ctx.drawImage(_img, avatarPx, avatarPy, avatarW, avatarH);
				// _ctx.restore()//恢复上下文 接下来可以进行其他绘制操作

				// 向下绘制;
				// drawHeadBg();
				drawLabel();
			})
		}.bind(this)

		// 文字（判断换行, 字符替换, 行高设置);
		// const _descX = headBgPx + avatarW/2; //TODO 文字开始偏移量x
		// const _descY = headBgPy - avatarH/2; //TODO 文字开始偏移量y;
		const labelX = starPx;
		const labelY = starPy + 80;
		const drawLabel = function () {
			// const topDescArr = surpassDesc.split(`|`);
			// for(var i in topDescArr){
			// 	const descArr = topDescArr[i].split(`\n`);
			// 	for(var index in descArr){
			// 		const lineHeight = surpassDescLineSpacing[i][index];

			// 		let desc = descArr[index];
			// 		desc = desc.replace(`%s`, surpassSplitValue[i][index]);
			// 		Utils.drawLabel(_ctx, desc, _descX, _descY+lineHeight, fontsize, surpassDescFontColorArr[i]);
			// 	}
			// }
			if (surpassData == ownerData) {
				//超越自己
				Utils.drawLabel(_ctx, "超越自己！", labelX + 10, labelY + 32, 30, "#185ea9", "center", "bold");
			} else {
				const score = surpassData.KVDataList ? (surpassData.KVDataList[1].value + "关") : "1关";
				var name = surpassData.nickname;
				if (name && name.length > 6) {
					name = name.substring(0, 5) + "..";
				}
				Utils.drawLabel(_ctx, name, labelX, labelY, 24, "#4d8abc", "center", "bold");
				Utils.drawLabel(_ctx, score, labelX, labelY + 32, 30, "#185ea9", "center", "bold");
			}
			// console.log("绘制完成;");
			this.clearShareCanvas();
		}.bind(this);

		drawSurpassBg();
	}

	// 刷新界面;
	_updateDrawCanvas() {
		if (this._updateAllLayerFunc == null) return;
		//绘制;
		this.sharedCtx.drawImage(
			this.canvas,
			0,
			0,
			this.sharedCanvas.width,
			this.sharedCanvas.height,
			0,
			0,
			this.sharedCanvas.width,
			this.sharedCanvas.height
		);

		// this.initX+=2;
		// if(this.initX >= 0) {
		// 	this.initX = 0;
		// 	// console.log("initX", this.initX)
		// 	return;
		// }

		// if(this.initX<0) {
		// 	this._updateAllLayerFunc && this.drawSurpass();
		// 	// this._updateAllLayerFunc && this._updateAllLayerFunc();
		// }
	}

	// 清除排行榜;
	clear() {
		if (this._updateAllLayerFunc == null) return;
		this.setConfigData(null);
		this.setGameData(null);
		this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.clearShareCanvas();

		this._updateAllLayerFunc = null;
		this.lastSurpassData = null;
	}

	clearShareCanvas() {
		this.sharedCtx.clearRect(0, 0, this.sharedCanvas.width, this.sharedCanvas.height);
		this._updateAllLayerFunc && this._updateAllLayerFunc();
	}

	moveEnd() {
		// console.log("moveEnd");
		if (this.initX >= 0) return;

		this.initX = 0;
		this._updateAllLayerFunc && this.drawSurpass();
	}
}

module.exports = new wxSurpassModule();