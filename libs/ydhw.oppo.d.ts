declare namespace IYDHW {
    export namespace Oppo {
        export interface IOppoSDK {
/**
             * 是否已创建桌面图标，oppo专属
             * 
             * @param caller 
             * @param onSuccess 
             * @param onFail 
             * @param onComplete 
             */
            HasShortcutInstalled(caller: any, onSuccess: (result: any) => void, onFail?: (error: any) => void, onComplete?: () => void): void;


            /**
             * 安卓桌面图标，oppo专属
             * 
             * @param caller 
             * @param onSuccess 
             * @param onFail 
             * @param onComplete 
             */
            InstallShortcut(caller: any, onSuccess: () => void, onFail?: (error: any) => void, onComplete?: () => void): void;

            /**
             * 原生广告创建
             */
            CreateNativeAd(caller: any,method: (...args: any[]) => void): void;

            /**
             * 上报广告曝光，一个广告只有一次上报有效
             */
            ShowNativeAd(): void;

            /**
             * 上报广告点击，一个广告只有一次上报有效
             */
            ClickNativeAd(): void;
        }

        export interface IOppoPlatform {
            HasShortcutInstalled(caller: any, onSuccess: (result: any) => void, onFail?: (error: any) => void, onComplete?: () => void): void;

            InstallShortcut(caller: any, onSuccess: () => void, onFail?: (error: any) => void, onComplete?: () => void): void;

            CreateNativeAd(adUnitId: string, caller: any,onCreate: () => void,  method: (...args: any[]) => void): void;
            
            /**
             * 上报广告曝光，一个广告只有一次上报有效，nativeId 为 load 方法获取的广告数据的 adId 字段
             */
            ShowNativeAd(nativeId: string): void;

            /**
             * 上报广告点击，一个广告只有一次上报有效，nativeId 为 load 方法获取的广告数据的 adId 字段
             */
            ClickNativeAd(nativeId: string): void;
        }


        export interface ISDK extends IOppoSDK, ICommonSDK { }
        export interface IPlatform extends IOppoPlatform, ICommonPlatform { }
    }
}

declare var ydhw_oppo: IYDHW.Oppo.ISDK;