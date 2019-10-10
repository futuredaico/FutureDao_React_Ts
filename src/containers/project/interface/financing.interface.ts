import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IProjectStore } from "./project.interface";
import { IPersonEditStore } from "@/containers/personalcenter/interface/personedit.interface";
import { ITeemoWalletStore } from "@/store/interface/teemowallet.interface";
import { IMetaMastWalletStore } from "@/store/interface/metamaskwallet.interface";

export interface IFinancingStore {
  step: number,
  stepOneStatus: number,
  stepTwoStatus: number,
  stepThreeStatus: number,
  financingContent: IFinancingContent,
  financingProject: () => Promise<boolean>
}


export interface IFinancingProps extends RouteComponentProps<{ projectId: string }> {
  project: IProjectStore,
  financing: IFinancingStore,
  common: ICommonStore,
  personedit:IPersonEditStore,
  teemowallet:ITeemoWalletStore,
  metamaskwallet:IMetaMastWalletStore,
  intl: any
}

export interface IFinancingContent {
  financingType: string,
  blockType: string,
  assetType: string,
  managerAddr: string,
  assetName: string,
  assetSimpleName: string,
  isSaveAsset: string,
  saveAsset: ISaveAsset
}

export interface ISaveAsset {
  address: string,
  info: IInfo[]
}
export interface IInfo {
  amt?: number,
  days?: number
}
export interface IRewardFrom {
  rewardId: string,
  rewardName: string,
  rewardDesc: string,
  price: string,
  limitFlag: string,
  limitMax: string,
  distributeTimeFlag: string,
  distributeTime: string,
  distributeWay: string,
  note: string
}