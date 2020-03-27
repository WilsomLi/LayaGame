class wxUtils {
	constructor() {
        this.images = {};
        this.selfUserInfo = null;
    }
    
    get_keyList(data){
        return data !== '' ? data.split(',') : '';
    }

    /**
     * 排序;
     * @param {数组数据} data 
     */
    data_sort(data, keyList){

        // 测试数据;
        //  this.pushTestData(data);

        if(!data || data.length === 0){
            const ownerData = this.getOwnerData()
            data.push(ownerData)
        }
        
        const sortByKeyName = (a, b, sortIndex)=>{
            if(keyList[sortIndex]){
                const valueA = this.getValueByKey(a, keyList[sortIndex]);
                const valueB = this.getValueByKey(b, keyList[sortIndex]);
                
                if(valueA === valueB){
                    sortIndex ++;
                    return sortByKeyName(a, b, sortIndex)
                }else{
                    return valueB - valueA;
                }
            }
            return 0;
        }

        let newData = data.sort((a, b)=>{
            let sortIndex = 0;
            return sortByKeyName(a, b, sortIndex)
       
        })

        return newData
    }

    pushTestData(data){
        // 测试数据部分;
        for (let i = 0; i < 20; i++) {
            data.push(
                {openid: "ondwC1WSH9excjEzJcbuO6DWa1Qk",
                nickname: "茶鹿" + i,
                avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLOb3WKqRE8hch14DUibuibgibNY3JVoibVMQtEnreicYwWYBlFibTHefD9uzV7pBO6Hbeewh2WWzxZAjHw/132",
                KVDataList: [{key: "user_id", value: i+1},{key: "ladder", value: 1}, {key: "score", value: "1012000000000" + i}, {key : "ladderName", value: "黑色英短猫"},{key:"ladderUrl",value:"Challenger_01.png"} ]
            })
        }
        // data.push(
        //     {openid: "ondwC1WSH9excjEzJcbuO6DWa1Qk",
        //     nickname: "茶鹿" + 20,
        //     avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLOb3WKqRE8hch14DUibuibgibNY3JVoibVMQtEnreicYwWYBlFibTHefD9uzV7pBO6Hbeewh2WWzxZAjHw/132",
        //     KVDataList: [{key: "level", value: 1}, {key: "money", value: "120023000000000" + 10}, {key : "name", value: "黑色英短猫"}]
        // })
        // data.push(
        //     {openid: "ondwC1WSH9excjEzJcbuO6DWa1Qk",
        //     nickname: "茶鹿" + 22,
        //     avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLOb3WKqRE8hch14DUibuibgibNY3JVoibVMQtEnreicYwWYBlFibTHefD9uzV7pBO6Hbeewh2WWzxZAjHw/132",
        //     KVDataList: [{key: "level", value: 1}, {key: "money", value: "14043000000000" + 7}, {key : "name", value: "黑色英短猫"}]
        // })
        // data.push(
        //     {openid: "ondwC1WSH9excjEzJcbuO6DWa1Qk",
        //     nickname: "茶鹿" + 21,
        //     avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLOb3WKqRE8hch14DUibuibgibNY3JVoibVMQtEnreicYwWYBlFibTHefD9uzV7pBO6Hbeewh2WWzxZAjHw/132",
        //     KVDataList: [{key: "level", value: 1}, {key: "money", value: "13042002230000" + 9}, {key : "name", value: "黑色英短猫"}]
        // })
    }
    
    /**
     * 
     * @param {微信获取的数值列表 : {openid:xx, nickname:xx, avatarUrl:xx, KVDataList:xx}} data 
     * @param {获取参数值的key  : money} key 
     * @param {默认值 : ''} defaultStr 
     */
    getValueByKey(data, key, defaultStr){
        if(data[key]){
            return (data[key] || 0);
        }
        const list = data.KVDataList
        if(list){
            for(var i in list){
                if(list[i].key === key){
                    return (list[i].value || 0);
                }
            }
        }
        if(defaultStr !== null && defaultStr !== undefined){
            return defaultStr;
        }
        return 0;
    }
    
    /**
     * 根据地址绘制图片;
     * @param {路径 string} path 
     * @param {绘制回调 callback} cb 
     */
    loadImage(path, cb){
        const _img = wx.createImage();
        _img.onload = () => {
            cb(_img);
        };
        _img.src = path;
    }
    
	/**
	 * 绘制文本;
	 * @param {绘制图层} ctx 
	 * @param {文字内容 string} txt 
	 * @param {坐标x int} px 
	 * @param {坐标y int} py 
	 * @param {文字大小 int} fontsize 
	 * @param {颜色 string} color 
	 * @param {水平对齐方式 string} textAlign 
	 * @param {基线 string} baseLine 
	 * @param {是否加粗 string} bold 
	 * @param {斜线 string} italic 
	 * @param {文字名 string} fontName //Helvetica
	 */
	drawLabel(ctx, txt, px, py, fontsize = 22, color = "#fff", textAlign = "center", bold = "", italic = "", fontName = "Microsoft YaHei"){
        if(textAlign === 0){
            textAlign = "left"
        }
        else if(textAlign === 1){
            textAlign = "right"
        }
        else if(textAlign === 2){
            textAlign = "center"
        }

        ctx.fillStyle = color;
        ctx.textAlign = textAlign;
        ctx.baseLine = "middle";
        ctx.font = `${bold}` + ' ' + `${italic}` + ' ' + `${fontsize}` + 'px ' + `${fontName}`;
        ctx.fillText(txt, px, py + fontsize/2);
    }
    
    /**
     * 获取昵称;
     * @param {名字 string} name
     * @param {最大字数 int} maxCnt
     */
	getNickname(name, maxCnt){
        if(typeof name === "string"){
            const nick = name.length <= maxCnt ? name : name.substr(0, maxCnt) + "...";
            return nick;
        }
        return name;
    }
    
    /**
     * 获取分数;
     * @param {单一的数据 object} data 
     */
	getScore(data){
		if(data.KVDataList){
			if(data.KVDataList[0]){
				if(data.KVDataList[0].value){
					return data.KVDataList[0].value
				}
			}
		}
		return 0;
	}

    /**
     * 绘制填充图块;
     * @param {画布层 2d} ctx 
     * @param {颜色 string} color 
     * @param {位置x int} px 
     * @param {位置y int} py 
     * @param {宽度 int} width 
     * @param {高度 int} height 
     */
    drawFillRect(ctx, color = "#fff", px, py, width, height){
		ctx.fillStyle = color;
		ctx.fillRect(px, py, width, height);
    }

    // 获取数据;
    getNicksData(userData, keys){
        let nicks = [];
        for(var i = 0; i < keys.length; i++){
            const keyname = keys[i]
            if(userData[keyname]){
                nicks.push(userData[keyname])
            }else{
                const keyValue = this.getValueByKey(userData, keyname)
                nicks.push(keyValue)
            }
        }
        return nicks;
    }

    saveOwnerData(data){
        data.nickname = data.nickName
        this.ownerData = data;
    }

    getOwnerData(){
        return this.ownerData;
    }

    setCurMaxScore(score){
        this.curMaxScore = score;
    }

    getCurMaxScore(){
        return this.curMaxScore;
    }

    getDevicePixelRatio(){
        wx.getSystemInfo({
            success(res) {
              console.log(res.pixelRatio);
              return res.pixelRatio;
            }
        })
    }


}

module.exports = new wxUtils();