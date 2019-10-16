import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IProjectStore } from "./project.interface";
import { IPersonEditStore } from "@/containers/personalcenter/interface/personedit.interface";
import { ITeemoWalletStore } from "@/store/interface/teemowallet.interface";
import { IMetaMastWalletStore } from "@/store/interface/metamaskwallet.interface";

export interface IFinancingStore
{
  step: number,
  stepOneStatus: number,
  stepTwoStatus: number,
  stepThreeStatus: number,
  financingContent: IFinancingContent,
  rewardContent:IRewardContent,
  financingProject: () => Promise<boolean>,
  getContractData: () => Promise<boolean>,
  getRewardData: () => Promise<boolean>,
  setReward:() => Promise<boolean>,
}


export interface IFinancingProps extends RouteComponentProps<{ projectId: string }>
{
  project: IProjectStore,
  financing: IFinancingStore,
  common: ICommonStore,
  personedit: IPersonEditStore,
  teemowallet: ITeemoWalletStore,
  metamaskwallet: IMetaMastWalletStore,
  intl: any
}

export interface IFinancingContent
{
  projId: string
  type: string,                 // 融资类型
  platform: string,             // 选择区块链
  tokenName: string,            // 融资的代币
  adminAddress: string,         // 管理员地址
  projTokenName: string,        // 代币名称
  projTokenSymbol: string,      // 代币简称
  reserveTokenFlag: string,     // 是否预留代币
  reserveTokenInfo: ISaveAsset, // 预留代币详情
  deployContractFlag:string,    // 发布合约标记，3为未操作，4为处理中，5为已完成
  rewardSetFlag:string,         // 回报标记，同上
  ratioSetFlag:string,          // 融资信息标记，同上
  financeStartFlag:string       // 启动融资标记，同上
}

export interface ISaveAsset
{
  address: string,
  info: IInfo[]
}
export interface IInfo
{
  amt?: number,
  days?: number
}
export interface IRewardInfo
{
  rewardId: string,
  rewardName: string,
  rewardDesc: string,
  price: string,
  limitFlag: string,
  limitMax: string,
  distributeTimeFlag: string,
  distributeTimeFixYes: string,
  distributeTimeFixNot:string,
  distributeWay: string,
  note: string,
  giftTokenName:string,
  hasSellCount:number
}
export interface IRewardContent{
  connectorName:string,
  connectTel:string,
  info:IRewardInfo[]
}