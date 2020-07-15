declare namespace IYDHW {
    export namespace Xiaomi {
        export interface IXiaomiSDK {

        }
        export interface IXiaomiPlatform {

        }

        export interface ISDK extends IXiaomiSDK, ICommonSDK { }
        export interface IPlatform extends IXiaomiPlatform, ICommonPlatform { }
    }
}