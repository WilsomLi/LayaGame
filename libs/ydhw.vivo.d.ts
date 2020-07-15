declare namespace IYDHW {
    export namespace Vivo {
        export interface IVivoSDK {

        }
        export interface IVivoPlatform {

        }

        export interface ISDK extends IVivoSDK, ICommonSDK { }
        export interface IPlatform extends IVivoPlatform, ICommonPlatform { }
    }
}