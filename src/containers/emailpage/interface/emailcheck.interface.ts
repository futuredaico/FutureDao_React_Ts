import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IEmailCheckStore{
    proInfo:ISimpleInfo|null,
    verifyRegister:(username:string,email:string,code:string)=>Promise<boolean>,
    verifyInvify:(username:string,email:string,projId:string,code:string,res:string) =>Promise<boolean>
    getProInfo:(projId:string)=>Promise<boolean>
}

export interface IEmailCheckProps extends RouteComponentProps{
    emailcheck:IEmailCheckStore,
    common:ICommonStore,
    intl:any
}
export interface ISimpleInfo{
    projName:string,
    adminHeadIconUrl:string,
    adminUsername:string
}