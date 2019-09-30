import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IProjectStore } from "./project.interface";

export interface IFinancingStore {
  step: number,
  stepOneStatus: number,
  stepTwoStatus: number,
  stepThreeStatus: number,
  financingContent:IFinancingContent
}


export interface IFinancingProps extends RouteComponentProps<{ projectId: string }> {
  project:IProjectStore,
  financing: IFinancingStore,
  common: ICommonStore,
  intl: any
}

export interface IFinancingContent {
  financingType:string,
  blockType:string,
  assetType:string,
  managerAddr:string,
  assetName:string,
  assetSimpleName:string,
  isSaveAsset:string,
  saveAsset:ISaveAsset[]
}

export interface ISaveAsset {
  address:string,
  info:IInfo[]
}
export interface IInfo{
  amt:number,
  day:number
}