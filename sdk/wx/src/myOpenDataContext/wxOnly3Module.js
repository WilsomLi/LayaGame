const Utils = require("wxUtils")

class wxOnly3Module {
	constructor() {
		this.init();
	}

	// 初始化;
	init(){
		this.gameDatas = null;
		this.config = null;

		// 公共画布;
		this.sharedCanvas = wx.getSharedCanvas();
		this.sharedCtx = this.sharedCanvas.getContext('2d');

		// 排行榜的画布;
		this.canvas = wx.createCanvas();
		this.canvasCtx = this.canvas.getContext('2d');
	}

	// 重置排行榜画布大小;
	resetCanvasSize(width, height){
		this.canvas.width = width;
		this.canvas.height = height; 
	}

	// 设置配置;
	setConfigData(data){
		this.config = data;
	}

	// 设置游戏数据;
	setGameData(data){
		this.gameDatas = data;
	}

	// 展示排行榜;
	showLayer(configData, listData, updateAllLayerFunc){
		this._updateAllLayerFunc = updateAllLayerFunc;

		this.setConfigData(configData);
		this.setGameData(listData);

		// 重置排行榜大小;
		this.resetCanvasSize(this.sharedCanvas.width, this.sharedCanvas.height);

		// if(this.config.isNewPass){
			const gameOverData = this.getOnly3Data();
			// 开始绘制排行榜;
			this.drawOnly3View(gameOverData);
		// }
		// else{
		// 	const gameOverData = this.getOnly1Data();
		// 	// 开始绘制排行榜;
		// 	this.drawOnly3View(gameOverData);
		// }
	}

	// 获取自己的排行;
	getOnly1Data(){
		const data = [];
		const ownerData = Utils.getOwnerData();
		data.push(this.getFormatData(ownerData));
		return data;
	}

	// 获取最后三人的排行;
	getOnly3Data(){
		const data = [];
		const ownerData = Utils.getOwnerData();
		for(var i = 0; i < this.gameDatas.length; i++){
			if(this.gameDatas[i].nickname === ownerData.nickName){ // 名字相同则为同一个人;
				ownerData.KVDataList = this.gameDatas[i].KVDataList;
				data.push(this.getFormatData(this.gameDatas[i + 1] || this.getNullData()))
				data.push(this.getFormatData(this.gameDatas[i]))
				data.push(this.getFormatData(this.gameDatas[i - 1] || this.getNullData()))
				return data;
			}
		}

		data.push(this.getNullData());
		data.push(this.getFormatData(ownerData));
		data.push(this.getNullData());
		return data;
	}
	
	getFormatData(data){
		if(data){
			const _value = Utils.getValueByKey(data, this.config.KEY);
			const desc = this.config.gameOver_desc.replace(`%s`, _value);
			return {avatarUrl : data.avatarUrl, desc : desc, avatarBgUrl: this.config.gameOver_userPhoto_bgUrl};
		}else{
			return {};
		}
	}

	getNullData(){
		return {avatarUrl : this.config.userPhoto_Default_ImgUrl, desc : "", avatarBgUrl: this.config.gameOver_userPhoto_bgUrl};
	}

	// 绘制3人排行界面;
	drawOnly3View(overData){
		const _ctx = this.canvasCtx;
		const gameOverData = overData;
		
		const scale = this.sharedCanvas.width/this.config.designContentsize.width

		const fontSize = this.config.gameOver_desc_fontsize

		const item_width = this.config.gameOver_userPhoto_contentsize.width*scale
		const item_height = this.config.gameOver_userPhoto_contentsize.height*scale

		const item_scale = this.config.gameOver_userphoto_other_scale;

		const centerPx = this.sharedCanvas.width/2 - item_width/2;
		const centerPy = this.sharedCanvas.height/2 - item_height/2;

		const starPx = centerPx + this.config.gameOver_userPhoto_pos.x
		const starPy = centerPy - this.config.gameOver_userPhoto_pos.y

		for(var i = 0; i < gameOverData.length; i++){
			var index = i;
			const _data = gameOverData[index];
			if(gameOverData.length === 1){
				index = 1;
			}

			const width = index === 1 ? item_width : item_width*item_scale;
			const height = index === 1 ? item_height : item_height*item_scale;

			var offset_x = 0;
			var offset_y = 0;
			if(index === 0){
				offset_x = -(width + this.config.gameOver_userphoto_interval);
			}
			else if(index === 2){
				offset_x = item_width + this.config.gameOver_userphoto_interval;
			}

			// 头像横向对齐;
			if(this.config.gameOver_avatar_horizon_align_type === 0){ // 顶部对齐;

			}
			else if(this.config.gameOver_avatar_horizon_align_type === 1 && index !== 1){ // 居中对齐;
				offset_y = (item_height - height)/2;
			}
			else if(this.config.gameOver_avatar_horizon_align_type === 2 && index !== 1){ // 底部对齐;
				offset_y = item_height - height;
			}

			const px = starPx + offset_x;
			const py = starPy + offset_y;
			if(_data){ // 有数据;
				// 绘制头像;
				const drawAvatar = function(i){
					const _avatarUrl = _data.avatarUrl;
					if(_avatarUrl){

						Utils.drawImage(_avatarUrl, (_img)=>{
							if(this.config.gameOver_userPhoto_Type === 0){ // 正方形;
								_ctx.drawImage(_img, px, py, width, height);
							}
							else if(this.config.gameOver_userPhoto_Type == 1){
								_ctx.save() //保存上下文
								_ctx.beginPath()//开始绘制
								_ctx.arc(px + width/2, py + height/2, width/2, 0, 2 * Math.PI, false)//画一个圆
								_ctx.clip()
								_ctx.drawImage(_img, px, py, width, height);
								_ctx.restore()//恢复上下文  接下来可以进行其他绘制操作
							}
							// 向下绘制;
							drawAvatarBg();
						})
					}else{
						// 向下绘制;
						drawAvatarBg();
					}
				}.bind(this)

				// 绘制头像背景;
				const drawAvatarBg = function(){
					const _avatarBgUrl = _data.avatarBgUrl;
					if(_avatarBgUrl){
						Utils.drawImage(_avatarBgUrl, (_img)=>{
							_ctx.drawImage(_img, px, py, width, height);
							// 向下绘制;
							drawDesc();
						})
					}else{
						// 向下绘制;
						drawDesc();
					}
				}.bind(this)

				// 绘制文字;
				const drawDesc = function(){
					const _desc = _data.desc;
					const labelIndex = index;

					// 文字对齐:
					var font_offset_x = labelIndex === 1 ? item_width/2 : width/2;
					var font_offset_y = 0;
					if(this.config.gameOver_descToPhoto_align_type === 0){ // 文字始终贴近头像下方;
						font_offset_y = height + fontSize/2
					}
					else if(this.config.gameOver_descToPhoto_align_type === 1){ // 文字始终贴近头像上方;
						font_offset_y = -fontSize/2
					}
					else if(this.config.gameOver_descToPhoto_align_type === 2){ // 文字向下对齐;
						font_offset_y = height + fontSize/2
						if(labelIndex !== 1){
							font_offset_y += (item_height - height)/2;
						}
					}
					else if(this.config.gameOver_descToPhoto_align_type === 3){ // 文字向上对齐;
						font_offset_y -= fontSize/2
						if(labelIndex !== 1){
							font_offset_y -= (item_height - height)/2;
						}
					}

					let fontColor = null;
					if(labelIndex === 1){
						fontColor = this.config.gameOver_desc_color
					}
					else{
						fontColor = this.config.gameOver_desc_other_color
					}

					Utils.drawLabel(_ctx, _desc, px + font_offset_x + this.config.gameOver_desc_offset.x, py + font_offset_y + this.config.gameOver_desc_offset.y, fontSize, fontColor, "center" ,this.config.gameOver_desc_bold, this.config.gameOver_desc_isItalic, this.config.gameOver_desc_fontFamily);
					
					this._updateAllLayerFunc();
				}.bind(this);
				drawAvatar();
			}
		}
	}
	
	// 刷新界面;
	_updateDrawCanvas(){
		if(this._updateAllLayerFunc==null) return;
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
	}

	// 清除排行榜;
	clear(){
		if(this._updateAllLayerFunc==null) return;
		this._updateAllLayerFunc = null;
		this.setConfigData(null);
		this.setGameData(null);
		this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.clearShareCanvas();
	}

	clearShareCanvas(){
		this.sharedCtx.clearRect(0, 0, this.sharedCanvas.width, this.sharedCanvas.height);
		this._updateAllLayerFunc&&this._updateAllLayerFunc();
	}
}

module.exports = new wxOnly3Module();