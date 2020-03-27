/**
 * 添加get set 方法
 * @param {*} obj 
 * @param {String} attr 
 * @param {{get:Function, set:Function}} value 
 */
var getset = function (obj, attr, value) {
    Object.defineProperty(obj, attr, {
        get: value.get,
        set: value.set,
        enumerable: false,
        configurable: true
    });
};

/**
 * XM工具类，最低平台版本1050
 * 首包的体积限制是10MB，超过10MB的资源需要在进入游戏后进行下载
 */

window.platform = new ((function () {
    //console.log('====================window.platform ========================>');
    function xmplatform() {

        /*****平台配置******************************************** */
        this.AppID = "2882303761518203100";
        this.Version = "1.0.1"
        //APPKEY:5921820324100;
        //this.AppSecret="egmYJr0FgOZLSjDAb90Olg==";

        /******************************************************** */

        qg.setEnableDebug({ enableDebug: false });   // 启动调试，正式时不需要
        this.isOpenVibration = true;    // 是否打开震动
        this.isShowBanner = false;      // 是否能显示banner
        this.banner = null;
        this.isCloseVideoAd = false;    //是否已经关闭了视频
    }

    var _proto = xmplatform.prototype;

    /**
     * 登录
     * @param {Function} call
     */
    _proto.login = function(call){


    }

    _proto.initAd = function(){
        // 登陆后初始化广告

    }

  /**
     * 获取启动参数
     */
    _proto.launchInfo = qg.getLaunchOptionsSync

    /**
     * 小游戏返回前台
     * @param {Function} call 
     */
    _proto.onShow = function (call) {
        console.log('====================window.platform ========================>0000000000000000');
        //typeof call === 'function' && xm.onShow(call);
       
    }

   /**
     * 小游戏隐藏到后台
     * @param {Function} call 
     */
    _proto.onHide = function (call) {
        typeof call === 'function' && qg.onHide(call);
    }

    /**
     * 分享，*不支持
     */
    _proto.onShare = function () {
    }

    /**
     * 小程序跳转，*待定
     */
    _proto.navigateToMiniProgram = function () {
    }

      /**
     * 设置banner显示或隐藏
     * @param {Boolean} bool 
     */
    _proto.setBannerVisible = function (bool) {
        var banner = this.banner;
        banner && (bool ? banner.show() : banner.hide());
    }

    
    /**
     * 短振动
     */
    _proto.vibrateShort = qg.vibrateShort

    /**
     * 常振动
     */
    _proto.vibrateLong = qg.vibrateLong

    /**
     * 获取设备信息
     */
    _proto.getSystemInfoSync = qg.getSystemInfoSync

    /**
     * 进度
     */
    getset(_proto, 'progress', {
        set: function (v) {
            qg.setLoadingProgress({ progress: v })
        }
    });

    
    /**
     * 跳转其他游戏
     * @param {Object}   dataObj   数据
     */
    _proto.navigateToMiniProgram = function(dataObj)
    { 
        if(dataObj && dataObj.path)
        {
            qg.navigateToMiniGame({
                pkgName:dataObj.path,
                // pkgName : "ydhw.qwpk2.nearme.gamecenter",
                success : function(){
                    dataObj.success && dataObj.success(true)
                },
                fail:function(res){
                    console.log("navigateToMiniGame fail res = ", res)
                    dataObj.fail && dataObj.fail()
                }
            })
        }
    }

    return xmplatform;
}) )

// 其它处理

/**
 * 参数转字符串
 * @param {IArguments} array 
 * @returns {String}
 */
var toStr = function (array) {
    var str = '';
    if (array.length == 1 && typeof array[0] !== 'object')
        str += array[0];
    else
        str = JSON.stringify(array);
    return str;
};


    
/**
 * 重写console方法
 * @param {*} obj 
 * @param {String} attr 
 */
var rewrite = function (obj, attr) {
    var func = obj[attr];
    obj[attr] = function () {
        func.call(obj, toStr(arguments));
    };
};
rewrite(console, 'log');
rewrite(console, 'warn');
rewrite(console, 'error');