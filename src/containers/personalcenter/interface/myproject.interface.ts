

import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IMyProjectStore
{
  manageCount: number,
  manageList:IProjManagerList[],
  managerPage:number,
  managerPageSize:number,
  attentionCount:number,
  attentionList:IProjAttentionList[],
  attentionPage:number,
  attentionPageSize:number,
  getManagerData:()=>Promise<boolean>,
  getAttentionData:()=>Promise<boolean>,
  getSomethingCount:()=>Promise<boolean>
}

export interface IMyProjectProps  extends RouteComponentProps
{
  myproject: IMyProjectStore,
  common:ICommonStore,
  intl: any
}
export interface IProjManagerList {
  projId:string,
  projName:string,
  projTitle:string,
  projType:string,
  projConverUrl:string,
  supportCount:number,
  projState:string,
  projSubState:string
}
export interface IProjAttentionList extends IProjManagerList{
  lastUpdateTime:number
}