declare namespace IYDHW {
    export namespace Web {
        export interface IWebSDK {

        }
        export interface IWebPlatform {

        }

        export interface ISDK extends IWebSDK, ICommonSDK { }
        export interface IPlatform extends IWebPlatform, ICommonPlatform { }
    }
}