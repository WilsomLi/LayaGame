declare namespace IYDHW {
    
    export namespace Alipay {
        export interface IAlipaySDK {

        }

        export interface IAlipayPlatform {

        }

        export interface ISDK extends IAlipaySDK, ICommonSDK { }
        export interface IPlatform extends IAlipayPlatform, ICommonPlatform { }
    }
}