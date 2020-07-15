declare namespace IYDHW {
    export namespace Qutoutiao {
        export interface IQutoutiaoCommerce {

        }
        export interface IQutoutiaoPlatform {

        }

        export interface ISDK extends IQutoutiaoCommerce, ICommonSDK { }
        export interface IPlatform extends IQutoutiaoPlatform, ICommonPlatform { }
    }
}