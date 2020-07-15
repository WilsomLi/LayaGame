declare namespace IYDHW {
    export namespace Baidu {

        export interface IBaiduSDK {
   
        }

        export interface IBaiduPlatform {

        }

        export interface ISDK extends IBaiduSDK, ICommonSDK { }
        export interface IPlatform extends IBaiduPlatform, ICommonPlatform { }
    }
}