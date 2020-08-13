/**
 * 对象转为网页参数，若非对象，则保留原格式
 * @param {*} obj 
 * @returns {String}
 */
var toUrlParam = function (obj) {
	var str = '', i;
	if (typeof obj === 'object') {
		var entries = Object.entries(obj);
		for (i = 0, len = entries.length; i < len; i++) {
			entries[i] = entries[i].join('=');
		}
		str = entries.join('&');
	}
	else if (obj !== void 0 && obj !== null)
		str += obj;
	return str;
};

/**
* 随机时间，取整至半秒
* @param {Number} min 最少秒数
* @param {Number} max 最大秒数
*/
var randTime = function (min, max) {
	var time = Math.random() * (max - min) + min;
	var inti = time | 0;
	var deci = ((time - inti) * 3 | 0) / 2;
	return inti + deci;
};

/**
* 获取经过的天数
* @param {Number} time 时间，单位毫秒
*/
var getDay = function (time) {
	return (time / 3600000 + 8) / 24 | 0;   // 时间零点是从早上8点开始的，因此加上8
};

/**
* 检测两个毫秒数是否同一天
* @param {Number} time0 时间，单位毫秒
* @param {Number} time1 时间，单位毫秒
* @returns {Boolean} 
*/
var isSameDay = function (time0, time1) {
	return getDay(time0) == getDay(time1);
};

/**
 * 数组内随机元素
 * @param {Array} array 
 */
var randInArr = function (array) {
	return array[array.length * Math.random() | 0];
};

/**
 * 默认的失败提示
 */
var defTips = {
	tips: [
		'分享失败,请分享到其他群',
		'该群已分享过，请换个群',
		'分享失败,请重试'
	],
	prob: [
		40,
		40,
		20
	]
};

/**
 * 获取失败提示
 * @param {tips: string[], prob: number[]} tips
 */
var getFailTip = function (tips) {
	var tips = tips || defTips;
	var array = tips.tips, prob = tips.prob;
	var rand = Math.random() * 100, i = 0, sum = 0, end = prob.length - 1;
	for (; i < end; i++) {
		sum += prob[i];
		if (rand < sum)
			break;
	}
	return array[i] || '分享失败,请分享到其他群';	// i小于等于2，如果配置的格式异常（概率长度大于tips长度）采取默认
};

/**
 * 获取当前分享时长对应的概率
 * @param {{times: number[], rands: number[]}, tips: {tips: string[], prob: number[]}} shareTime
 * @param {number} during 
 * @returns {number}
 */
var getShareRand = function (shareTime, during) {
	var rand;
	if (shareTime) {
		var i = 0, times = shareTime.times;
		for (var len = times.length; i < len; i++) {
			if (times[i] * 1000 > during) {
				break;
			}
		}
		rand = shareTime.rands[i];
	}
	return isNaN(rand) ? during >= 3000 : rand;
};

window.platform = new ((function () {
	var WxgamePlatform = function () {
		this.platType = 2001;
		//// 根据游戏来进行修改 ////
		this.appId = "wx3081deb3d8205f2b";
		this.version = "1.0.0";
		this.hasVideo = true;
		this.isDebug = false;	// 是否调试阶段，正式版删除
		// 视频ID列表
		this.adUnitIds = [
		];
		// bannerID列表
		this.banners = [
		];
		/************************************************* */
		var shareFunc = wx.aldOnShareAppMessage || wx.onShareAppMessage;
		shareFunc(function () {
			return {
				title: '快来一起玩吧~',
				imageUrl: 'wxlocal/share1.jpg'
			};
		});
		// 右上角menu转发
		wx.showShareMenu({});
		// 默认分享票据，有群排行才需要
		wx.updateShareMenu({ withShareTicket: true });
		// 执行分享回调
		var self = this;
		wx.onShow(function () {
			var call = self.shareCallback;
			call && call();
		});
		// 获取竖屏版系统信息
		var call = function () {
			let info = wx.getSystemInfoSync();
			if (info.windowHeight > info.windowWidth) {
				self.sysInfo = info;
			}
			else {
				setTimeout(call, 200);
			}
		};
		call();
	};

	var _proto = WxgamePlatform.prototype;

	//// 外部方法 ////

	/**
	 * 微信登陆。
	 * 获取code。
	 */
	_proto.login = function (cb) {
		var param = {};
		if (cb) {
			param.success = function (res) {
				var data = {};
				if (res.code) {
					data.code = 0;
					data.wxcode = res.code;
				} else {
					console.log('登录失败！' + res.errMsg);
					data.code = -1;
					data.msg = res.errMsg;
				}
				cb(data);
			};
			param.fail = function (res) {
				var data = {};
				data.code = -1;
				data.msg = res.errMsg;
				cb && cb(data);
			}
		}
		wx.login(param);
	}

	/**
	 * 获取小游戏启动参数
	 */
	_proto.launchInfo = wx.getLaunchOptionsSync

	/**
	 * 获取系统信息
	 */
	_proto.getSystemInfoSync = function () {
		return this.sysInfo;
	}

	/**
	 * 退出游戏
	 */
	_proto.exitMiniProgram = wx.exitMiniProgram

	/**
	 * 切置前台
	 * @param {Function} call 
	 */
	_proto.onShow = function (call) {
		call && wx.onShow(call);
	}

	/**
	 * 切置后台
	 * @param {Function} call 
	 */
	_proto.onHide = function (call) {
		call && wx.onHide(call);
	}

	/**
	 * 纯拉起分享，若需要分享回调，在调用该方法后重写shareCallback函数
	 * @returns {Boolean}
	 */
	_proto.showShare = function (data) {
		var self = this, bool = !self._isSharing;
		if (bool) {
			var param = {};
			// 防止点太快
			self._isSharing = true;
			setTimeout(function () {
				self._isSharing = false;
			}, 350);
			// 分享参数
			param.title = data.title;
			param.imageUrl = data.imageUrl;
			param.query = toUrlParam(data.query);
			// 延迟大概一帧发起分享
			setTimeout(function () {
				// 根据分享类型选择分享
				var aldShare = data.aldShare;
				var callFunc = wx[aldShare ? 'aldShareAppMessage' : 'shareAppMessage'];
				callFunc && callFunc(param);
			}, 16);
		}
		return bool;
	}

	/**
	 * 新分享策略
	 * @param {*} data 
	 */
	_proto.shareType = function (data) {
		var self = this;
		if (self.showShare(data)) {
			// 拉起分享的时间
			var pushTime = Date.now();
			var shareTime = data.shareTime;
			/**
			 * 定义分享回调，记得用完即删
			 */
			self.shareCallback = function () {
				self.shareCallback = null;
				// 两个回调
				var shareFun = data.success;
				var shareFailFun = data.fail;
				var sucCall = function () {
					shareFun && shareFun();
				};
				var failCall = function (title) {
					shareFailFun && shareFailFun(title);
				};
				// 事件处理
				setTimeout(function () {
					var during = Date.now() - pushTime;
					var rand = getShareRand(shareTime, during);
					console.log('实际拉起时长', during, '拉起时长的策略', shareTime, '成功概率', rand);
					// 分享时长固定
					if (Math.random() <= rand)
						sucCall();
					else
						failCall(getFailTip(shareTime.tips));
				}, 100);
			};
		}
	}

	/**
	 * 分享
	 * @param {*} data 
	 */
	_proto.onShare = function (data) {
		this.shareType(data);
	}

	/**
	 * 创建激励视频
	 * @param type 视频类型
	 * @param finishCall 结束回调
	 * @param preload 预加载不显示
	 */
	_proto.createRewardedVideoAd = function (type, finishCall, preload) {
		var self = this;
		var createCall = wx.createRewardedVideoAd;
		if (createCall) {
			var adUnitIds = self.adUnitIds;
			var adUnitId = adUnitIds[type] || randInArr(adUnitIds);
			if (adUnitId) {
				var videoAd = createCall({ adUnitId: adUnitId });
				if (videoAd) {
					/**
					 * 结束回调
					 * @param {*} res 
					 */
					var onClose = function (res) {
						if (!isClear) {
							var bool = !!(res && res.isEnded);  // 用户点击了关闭广告按钮
							finishCall && finishCall(bool);
							clear();
						}
					};
					/**
					 * 错误回调
					 * @param {*} res 
					 */
					var onError = function (res) {
						if (!isClear) {
							var code = res && res.errCode || 1;
							console.log("video error code:", code, res);
							self.hasVideo = false;
							finishCall && finishCall(false, code);
							// 等待并恢复
							setTimeout(function () {
								self.hasVideo = true;
							}, 10000);
							clear();
						}
					};
					/**
					 * 清理回调
					 */
					var clear = function () {
						isClear = true;
						videoAd.offClose(onClose);
						videoAd.offError(onError);
					};
					/**
					 * 是否已清理
					 */
					var isClear = false;
					videoAd.onClose(onClose);
					videoAd.onError(onError);
					// 加载完自动播放
					videoAd.load().then(function () {
						preload || videoAd.show();
					}).catch(onError);
				}
				return videoAd;
			}
			else {
				finishCall && finishCall(true);
			}
		}
		else
			self.hasVideo = false;
	}

	/**
     * 创建底部banner
     * @param {String} adUnitId 
     */
	_proto.createBannerAd = function (adUnitId, finishCall, keepTime, small) {
		var self = this;
		var createCall = wx.createBannerAd;
		if (!createCall)
			return;
		var now = Date.now();
		var call = function (bool) {
			finishCall && finishCall(bool);
		};
		var sysInfo = self.sysInfo;
		bannerAd = self.bannerAd;
		// 调整时长
		if (!(keepTime > 0)) {
			keepTime = self.bannerKeep;
		}
		self.$banVisible = true;
		// 刷新时长
		if (bannerAd && (now - self._lastBannerTime < keepTime)) {
			// 自适应
			var style = bannerAd.style, sw = sysInfo.windowWidth;
			var width = style.width = sw * (small ? 0.85 : 1);
			style.left = (sw - width) / 2;
			// 误触需要，延迟显示
			self.setBannerVisible(true);
		}
		else {
			// 设置位置
			var o = Math.floor,
				sw = sysInfo.windowWidth,
				sh = sysInfo.windowHeight,
				scale = sh / sw;
			// 销毁旧的
			self.closeBannerAd();
			self._lastBannerTime = now;
			// 创建banner
			bannerAd = createCall({
				adUnitId: adUnitId,
				style: {
					left: 0,
					top: 0,
					width: sw * (small ? 0.85 : 1)
				}
			});
			bannerAd.onResize(function (e) {
				var top = sh - e.height;
				if (scale >= 2) {
					top -= 12;
				}
				var style = bannerAd.style;
				var model = sysInfo.model.toLowerCase();
				var stageH = Laya.stage.height;
				style.top = top;
				style.left = (sw - style.realWidth) * 0.5;
				if (model.indexOf('iphone x') > -1) {
					var sub = 156;
					if (model.indexOf('xs') > -1) {
						sub += 10;
					}
					top = Math.min(sh - sub, top);
				}
				self.bannerY = Math.min(top * stageH / sh, stageH - 200);
			});
			bannerAd.onError(function (res) {
				console.log("createBannerAd err", res);
				// 报错，延迟刷新
				if (res.errCode == 1004) {
					self.closeBannerAd();
					setTimeout(function () {
						self.refreshBanner(keepTime);
					}, 2000);
				}
				call(false);
			});
			bannerAd.onLoad(function () {
				if (self.bannerAd) {
					var bool = self.$banVisible;
					self.setBannerVisible(bool);
					bool && call(true);
				}
			});
			self.bannerAd = bannerAd;
		}
		// 自动刷新功能
		clearTimeout(self.$timeout);
		self.$timeout = setTimeout(function () {
			self.refreshBanner(keepTime, small);
		}, keepTime);
	}

	/**
	 * 刷新banner
	 * @param keepTime 刷新时间
	 */
	_proto.refreshBanner = function (keepTime, small) {
		var self = this;
		if (self.$banVisible) {
			self._lastBannerTime = 0;
			self.createBannerAd(randInArr(self.banners), null, keepTime, small);
		}
	}

	/**
     * 显示或隐藏banner
     * @param {Boolean} visible 
     */
	_proto.setBannerVisible = function (visible) {
		var self = this, bannerAd = self.bannerAd;
		self.$banVisible = visible;
		if (bannerAd) {
			visible ? bannerAd.show() : bannerAd.hide();
		}
	}

	/**
	 * 关闭banner
	 */
	_proto.closeBannerAd = function () {
		var bannerAd = this.bannerAd;
		if (bannerAd) {
			bannerAd.destroy();
			this.bannerAd = null;
		}
	}

	/**
	 * 小程序跳转
	 */
	_proto.navigateToMiniProgram = wx.navigateToMiniProgram

	/**
	 * 获取网络状态
	 * @param {Function} call 
	 */
	_proto.getNetworkType = function (call) {
		call && wx.getNetworkType({
			success: function (res) {
				call(res.networkType);
			}
		});
	}

	/**
	 * 短震动
	 */
	_proto.vibrateShort = wx.vibrateShort

	/**
	 * 长震动
	 */
	_proto.vibrateLong = wx.vibrateLong

	/**
	 * 设置玩家云数据
	 * @param {*} datas 
	 */
	_proto.setUserCloudStorage = function (datas) {
		var call = wx.setUserCloudStorage;
		call && call({
			KVDataList: datas
		});
	}

	/**
	 * 向子域推送消息
	 */
	_proto.postMessage = wx.postMessage

	/**
	 * 显示loading
	 */
	_proto.showLoading = function () {
		wx.showLoading({
			mask: true
		});
	}

	/**
	 * 关闭loading
	 */
	_proto.hideLoading = wx.hideLoading

	/**
	 * 获取胶囊位置
	 */
	_proto.getMenuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect

	/**
	 * 分包加载
	 * @param {String} name 包名
	 * @param {Function} update 更新函数
	 * @returns {Promise<Boolean>}
	 */
	_proto.loadSubpackage = function (name, update) {
		var call = wx.loadSubpackage;
		return new Promise(function (resolve) {
			if (call) {
				var task = call({
					name: name,
					success: function () {
						resolve(true);
					},
					fail: function () {
						resolve(false);
					}
				});
				update && task.onProgressUpdate(function (res) {
					update(res.progress);
				});
			}
			else
				resolve(false);
		})
	}

	/**
	 * 模态窗口
	 */
	_proto.showModal = wx.showModal

	/**
	 * 客服消息
	 */
	_proto.openCustomer = wx.openCustomerServiceConversation

	/**
	 * 创建用户信息授权按钮
	 * @param {*} obj 
	 */
	_proto.createUserInfoButton = function (src, x, y, width, height) {
		var round = Math.round;
		var info = wx.getSystemInfoSync();
		var pRatio = info.windowWidth / 750;
		return wx.createUserInfoButton({
			type: 'image',
			image: src,
			style: {
				left: round(x * pRatio),
				top: round(y * pRatio),
				width: round(width * pRatio),
				height: round(height * pRatio)
			},
			withCredentials: false,
			lang: 'zh_CN'
		});
	}

	/**
	 * 订阅消息
	 * @param sucCall 执行成功回调
	 */
	_proto.requestSubscribeMessage = function (sucCall) {
		var call = wx.requestSubscribeMessage;
		if (call) {
			var uid = 'M1U-wcvYQPN55LeYQL_LSH5yYG3-Y_EMez3R3frYqUw';	// 根据游戏自行修改
			call({
				tmplIds: [uid],
				success: function (res) {
					sucCall(res[uid] === 'accept');
				},
				fail: function (res) {
					console.log('订阅消息拉取失败', res);
				}
			});
		}
	}

	return WxgamePlatform;
})());