declare var DDSDK_Render:{
	getTryDlg():any;
	getTryBtn():any;
	getAniAD():any;
	getBKAD():any
	getHotGames():any
	getFavAD(row:number,col:number,type?:number):any;
	createListView():any;
}

declare var DDSDK:{
	init(cb:Function):void;
	setAccount(account: string): void;
	logEnable(bEnable:boolean):void;
	logTag(event: string, extra: Object): void;
	logEvent(event: string, extra: Object): void;
	OnShareAppMessage(cb:Function):void;
	ShareAppMessage(obj:Object):void;
	setResLoadCallback(cb:Function):void;
	setRewardCB(cb:Function):void;
	setOpenAppCB(cb:Function):void;
	setChannel(channel:string):void;
	getChannel():string;
	getIPInfo(cb:Function):string;
	isWx():boolean;
	getRender():any;
	ajax(url: string,obj:any,succ:Function,fail:Function);
	openApp(appId: string, path: string, extraData?: string):void;
}