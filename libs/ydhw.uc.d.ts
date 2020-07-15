declare namespace IYDHW {
    export namespace UC {
        export interface IUCSDK {

        }
        export interface IUCPlatform {

        }

        
        export interface ISDK extends IUCSDK, ICommonSDK { }
        export interface IPlatform extends IUCPlatform, ICommonPlatform { }
    }
}