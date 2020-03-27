
//协议 
if (!Array.prototype.shuffle) {
  Array.prototype.shuffle = function () {
    for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
  };
}


/**
 * 百度SDK
 */
class bdplatform 
{
/**
 * 平台配置
 */
  constructor() {
    /*****平台配置******************************************** */
    this.AppID = "17008570";
    //正常标准广告
    this.NormalAdunits = [
      "6580232",
      "6580230",
      "6580229",
      "6580225",
      "6580224",
    ];
    //弹窗
    this.OtherAdunits = [
        
    ];
     /*** 成功结算 */
    
     /*** 离线双倍奖励激励视频 */
    this.VideoAd1 = "6580222";
    /*** 金币获取激励视频 */
    this.VideoAd2 = "6580147";
    /**签到双倍奖励视频 */
    this.VideoAd3 = "6580146";
    /**再来一份视频奖励 */
    this.VideoAd4 = "6580145";
    /**转盘获取次数奖励 */
    this.VideoAd5 = "6580144";
    /**转盘双倍奖励视频 */
    this.VideoAd6= "6580143";
    /**金币不足视频 */
    this.VideoAd7= "6580142";
    /**复活激励视频 */
    this.VideoAd8= "6580010";
    /**结算双倍奖励视频 */
    this.VideoAd9= "6580006";  //OK
    
    /************************************************* */

    this.appSid="e3e02a8c";
    let that = this;
    let shareFunc =  swan.onShareAppMessage;
    shareFunc(() => ({
      title: '炎炎夏日，你确定不来清凉一夏么？',
      imageUrl: 'wxlocal/share1.jpg'
    }));
    //右上角menu转发
    swan.showShareMenu({});

    //是否开启震动
    this.isOpenVibration = true;
    
    this.shareFailCnt = 0;
    this.adUnitId = null;
    // this.lastShareDate = this.getLastShareDate();
    // this.todayShareCount = this.getTodayShareCount();
   
  }

  /**登录 */
  login(cb) 
  { 
    swan.login({
            success:res =>
            {
              let data = {};
              if (res.code)
               {
                data.code = 0;
                data.wxcode = res.code;
                console.log("bd.login sucess res.code="+res.code);
               }
              else
              {
                console.log('bd.login ！' + res.errMsg);
                data.code = -1;
                data.msg = res.errMsg;
              }
              cb && cb(data);

              
            },
            fail(res) 
            {
              console.log('bd.login fail ！' + res.errMsg);
              let data = {};
              data.code = -1;
              data.msg = res.errMsg;
              cb && cb(data);
            }
        }
      );
  }

  /**检查用户登录状态是否有效 */
  checkSession()
  {
    swan.checkSession(
      {
      success: res => {
          console.log('登录态有效');
      },
      fail: function () 
      {
          console.log('登录态无效');
      }
  });
  }


  /**获取小游戏启动参数 */
  launchInfo()
  {
    return swan.getLaunchOptionsSync()
  }

  /**加载 */
  startLoading(_callback) 
  {
      let that = this;
      that._loadingCallback = _callback;
  }
  
  onLoading(_percent)
  {
      let that = this;
      if (that._loadingCallback) {
        that._loadingCallback(_percent);
        return true;
      }
      return false;
  }

    /**退出小游戏 */
  exitMiniProgram() 
  {
     console.log("退出小游戏");
  }
  


    /**跳转小程序 进入另一个 */
  navigateToMiniProgram(_data)
  {
      if (swan.navigateToMiniProgram) 
      {
        let successCallback = _data.success;
        _data.success = function (res) {
          window["UserData"].instance.removeNavAppId(_data.appId);
          if (successCallback && typeof (successCallback) == "function") 
          {
            successCallback(res);
          }
        }
        swan.navigateToMiniProgram(_data);
      }
  }

    /**跳转小程序 返回上一个小程序   暂时还没  等待验证 */
  navigateBackMiniProgram(data)
  {
      let callback = data.success
      data.success = function (res) {
          if (successCallback && typeof (successCallback) == "function") 
          {
              successCallback(true);
          }
      }

      data.fail = function (res) {
          if (successCallback && typeof (successCallback) == "function") 
          {
              successCallback(false);
          }
      }

      swan.navigateBackMiniProgram(data);
  }

    /**创建底部剧中 Banner    adUnitId:标识   finishCallback:完成回调     */
  createBannerAd(_adUnitId, _finishCallback)
  {
    if(swan.createBannerAd==null)
    {
      return null;
    };
    if (this.bannerAd)
    {
      this.bannerAd.destroy();
    }

  const {windowWidth,windowHeight,} = swan.getSystemInfoSync();
        let self = this
        var o = Math.floor;
        var sysInfo = swan.getSystemInfoSync();

        var r = o(1 * sysInfo.windowWidth), n = o((sysInfo.windowWidth - r) / 2), d = sysInfo.screenHeight;
        var top = d - o(r / 3.4) - (d - r / 0.5625) / 2 + 10;
       
        var bannerAd =swan.createBannerAd({
          adUnitId: _adUnitId,
          appSid:this.appSid,
          style: {
              left: n+40,   //+ 向右偏移    -向左偏移
              top: top+80,  //  +向下 偏移   -向上偏移
              width: r-80
          }
      });

  // 回调里再次调整尺寸，要确保不要触发死循环！！！
  bannerAd.onResize(size => 
    {
      if (scale < 2) {
        top = sysInfo.windowHeight - e.height-32;
      } else {
        top = sysInfo.windowHeight - e.height - 32;
      }
      if (bannerAd) {
        bannerAd.style.top = top;
        bannerAd.style.left = (sysInfo.windowWidth - bannerAd.style.realWidth) * 0.5;
      }
  });

  bannerAd.onLoad(() => 
  {
      bannerAd.show().then(()=>
      { 
        console.log("加载成功  开始展示");
        _finishCallback && _finishCallback();
      }).catch(err => 
        {
              console.log('广告组件出现问题', err);
        })
  });
  this.bannerAd = bannerAd
  return bannerAd 
  }

  //关闭广告
  closeBannerAd()
  { 
    if (!this.bannerAd)
    {
      return;
    } 
    this.bannerAd.destroy();
    this.bannerAd = null;
    this.adUnitId = null;
  };

  //设置广告的显示与隐藏
  setBannerVisible(visible)
  {
    if (!this.bannerAd)
    {
      return;
    } 

    if (visible) 
    {
      this.bannerAd.show();
    } 
    else 
    {
      this.bannerAd.hide();
    }
  }

  //视频广告 是否预加载  需要在plantfrom中添加
  createRewardedVideoAd(_adUnitId, callback)
  {

    if(!swan.createRewardedVideoAd)
    {  
      return;
    
    };

    //回调
  
  

    let videoItemInfo = 
    {
      adUnitId: _adUnitId,
      appSid: this.appSid
  }

  if(!this.videoAdInfo)
  {
      this.videoAdInfo = {}
      this.videoAdInfo.ins =  swan.createRewardedVideoAd(videoItemInfo);
  }
  else
  {
    console.log(" 有视频广告信息");
      this.videoAdInfo.ins.offError(this.videoAdInfo.error)
      this.videoAdInfo.ins.offLoad(this.videoAdInfo.load)
      this.videoAdInfo.ins.offClose(this.videoAdInfo.close)
  }


    let onLoad = function()
    {
        console.log('视频广告加载成功');
    }

    let onError = function(errCode, errMsg)
    { 
        console.log(`createRewardedVideoAd  errCode = ${errCode}, ${errMsg}`)
        callback && callback(false)
    }

    let onClose = function(res)
    {
        if(res && res.isEnded)
        {
            console.log("视频看完了，发放奖励")
            window["TaskAchMgr"].instance.refreshProgress(1, 2, 1);
            callback && callback(true)
        }
        else
        {
            console.log("视频没看完")
            callback && callback(false)
        }
    };
    this.videoAdInfo.error = onError
    this.videoAdInfo.load = onLoad
    this.videoAdInfo.close = onClose

    let videoAd = this.videoAdInfo.ins;
    if (videoAd) 
    {

      videoAd.load().then(()=>
      {
        console.log('广告显示成功');
        videoAd.show().then(onLoad).catch(err=>{ videoAd.load().then(()=>
          {
            videoAd.show().then(()=>
            {
              console.log('广告显示成功');
            });
          });});
      }).catch(err=>
        {  console.log("视频加载失败 重新加载一边");
          videoAd.load().then(()=>
          {
            videoAd.show().then(()=>
            {
              console.log('广告显示成功');
            });
          });
          onsole.log('广告组件出现问题 重新加载一次', err);
        })
        videoAd.onError(onError)
        videoAd.onClose(onClose)
    }
    return videoAd;
  }

  /**
   * 百度授权
   */
  authorize( call)
  {
    console.log("baidu authorize===");
    function p()
    {
        //异步 同步
        return new Promise(function(resolve, reject)
        {
            //设置 获取用户在该小游戏中已授权过的权限
            swan.getSetting({
                success:function(res)
                {
                    if(res && res.userInfo)
                    {
                        console.log("小游戏中已授权过的权限")
                        call && call(true)      //已经授权过了
                    }
                    else
                    {
                        resolve()
                    }
                },
                fail:function()
                {
                    console.log("小游戏未授权过权限")
                    call && call(false)
                },
            })
        })
    }

    p().then(function()
    { 
      //授权小游戏使用某项功能或获取用户的某些数据
      btnClick(e) 
      {
        let scope = e.currentTarget.id;
        swan.authorize({
            scope,
            success: res => {
                swan.showToast({
                    title: '授权成功'
                });
            },
            fail: err => {
                swan.showToast({
                    title: '授权失败'
                });
                console.log('authorize fail', err);
            }
        });
      }
    })
  };
 

  /**小游戏返回前台 */
  onShow(_callback)
  {
    swan.onShow(function (_param)
     {
      if (_callback) {
        _callback(_param);
      }
    })
  }

  /**小游戏退到后台 */
  onHide(_callback)
  {
    swan.onHide(function (_param) 
    {
      if (_callback) 
      {
        _callback(_param);
      }
    })
  }


  /**主动分享 */
  onShare(call)
  { 
    if(!call)
    {
      return ;
    };
    swan.shareAppMessage(
      {
        title: '炎炎夏日，你确定不来清凉一夏么？',//转发标题，不传则默认使用后台配置或当前小游戏的名称。
        //imageUrl: 'wxlocal/share1.jpg',//转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径，显示图片长宽比推荐 5:4
        success() 
        {
            console.log('分享成功');
            console.log('分享成功');
            // call && call(true)
            //显示分享成功的消息提示框
             swan.showToast({
                 title:"分享成功",
                 //duration:2000,
                 icon:"none"
            })
        },
        fail(e) {
          swan.showToast({
            title:"分享失败",
            //duration:2000,
            icon:"none"
        })
            console.log('分享失败');
        }
    })
  };
  /**短震动 */
  vibrateShort()
  {
    swan.vibrateShort();
  }

  /**长震动 */
  vibrateLong()
  {
    swan.vibrateLong();
  }

  /**获取设备信息 同步 */
  getSystemInfoSync()
  {
    let data= swan.getSystemInfoSync();
    console.log('手机品牌信息：', data.brand);
  }


  /**显示Loading提示框  */
  showLoading()
  { 
    swan.showLoading(
      {
          title: title,
          success()
          {
              call && call(true)
          },
          fail()
          {
              call && call(false)
          }
       })
  };
  /**隐藏 loading 提示框 */
  hideLoading()
  {
    swan.hideLoading(
      {
        success()
        {
          console.log("隐藏加载提示框 成功");
        },
        fail()
        {
          console.log("隐藏加载提示框 失败");
        }
      })

  };
  /**视频组件控制 */
  createVideo()
  {
    //swan.createVideoContext 创建并返回 video 上下文 videoContext 对象。通过 videoId 跟一个 video 组件绑定，通过它可以操作一个 video 组件
    //console.log("创建视频")
  };

  /**退出视频控制 */
  videoHide()
  {

    // VideoContext.play;
    // VideoContext.pause;
    // VideoContext.seek;
    // VideoContext.sendDanmu;
    // VideoContext.showStatusBar;
    //console.log("退出视频控制");

  };

  /**获取玩家信息 */
  getUserInfo()
  {
    let p = new Promise((resolve, reject) => {
    swan.getUserInfo(
      {
       // withCredentials: false,                       //是否需要返回敏感数据
        success: function (res) 
        {
            var userInfo = res.userInfo
            this.setData(
              {
              nickname: userInfo.nickName || '百度网友',
              imageSrc: userInfo.avatarUrl || '../../images/avator.png',
              nameColor: 'active'
              });
            resolve(userInfo);
        },
        fail:function (res) 
        {
          console.log(err);
          swan.showToast(
            {
              title: '请先授权'
            });
        }
      })
    });

    p().then(function(res)
    {
        console.log("getUserInfo res ==== ", res)
    });
  };

    /**是否支持卖量 */
    isGeneralize()
    {
      return false;
    };

    /**是否只有视频 没有分享 */
    isOnlyVideo()
    {
      return true;
    }

    
      /**是否至此录屏 */
      isPlatformSupportRecord ()
      {
        return false;
      }
  
      //停止录屏
      stopRecorder()
      {
        console.log("录屏功能");
      }
    

    // // 获取今日日期
    // getTodayDate() {
    //   var myDate = new Date();
    //   var year = myDate.getFullYear();
    //   var month = myDate.getMonth() + 1;
    //   var date = myDate.getDate();
    //   var today = '' + year + '_' + month + '_' + date;
    //   return today;
    // }

    //   // 分享日期
    //   getLastShareDate() {
    //     if (this.lastShareDate) return this.lastShareDate;

    //     var lastShareDate = window.localStorage.getItem('LastShareDate');
    //     if (lastShareDate === '' || lastShareDate === null || lastShareDate === undefined) {
    //       lastShareDate = '0';
    //     }
    //     return lastShareDate;
    //   }

    //   // 刷新分享日期
    //   updateLastShareDate() {
    //     var today = this.getTodayDate();
    //     if (this.lastShareDate !== today) {
    //       window.localStorage.setItem('LastShareDate', today);
    //     }
    //   }

    //   // 获取今日分享次数
    //   getTodayShareCount() {
    //     if (this.todayShareCount !== null && this.todayShareCount !== undefined) return this.todayShareCount;
    //     if (this.getLastShareDate() !== this.getTodayDate()) {
    //       this.updateLastShareDate();
    //       this.setTodayShareCount(0);
    //       return 0;
    //     }
    //     let cnt = window.localStorage.getItem('TodayShareCount');
    //     if (cnt === '' || cnt === null || cnt === undefined) {
    //       cnt = '0';
    //     }
    //     return parseInt(cnt);
    //   };

      // // 设置分享次数
      // setTodayShareCount(cnt) {
      //   this.todayShareCount = cnt;
      //   window.localStorage.setItem('TodayShareCount', '' + cnt);
      //   this.updateLastShareDate();
      // }

  

}

window.platform = new bdplatform();