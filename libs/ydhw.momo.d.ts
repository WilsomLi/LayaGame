declare namespace IYDHW {
    export namespace Momo {
        export interface IMomoSDK {

        }
        export interface IMomoPlatform {

        }

        export interface ISDK extends IMomoSDK, ICommonSDK { }
        export interface IPlatform extends IMomoPlatform, ICommonPlatform { }
    }
}