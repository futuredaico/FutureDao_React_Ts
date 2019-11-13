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
  timer: NodeJS.Timer | null
  financingContent: IFinancingContent | null,
  rewardContent: IRewardContent,
  totalAmt: number,
  totalDays: number,
  poolTotal: number,
  ratio: string,
  financingProject: () => Promise<boolean>,
  getContractData: () => Promise<boolean>,
  getRewardData: () => Promise<boolean>,
  setReward: () => Promise<boolean>,
  getFinanceFund: () => Promise<boolean>,
  getReserveFund: () => Promise<boolean>,
  saveReserveFundRatio: (ratio: string) => Promise<boolean>,
  startFanance: () => Promise<boolean>
}


export interface IFinancingProps extends RouteComponentProps<{ projectId: string }> {
  project: IProjectStore,
  financing: IFinancingStore,
  common: ICommonStore,
  personedit: IPersonEditStore,
  teemowallet: ITeemoWalletStore,
  metamaskwallet: IMetaMastWalletStore,
  intl: any
}

export interface IFinancingContent {
  projId: string
  type: string,                 // 融资类型
  platform: string,             // 选择区块链
  fundName: string,            // 融资的代币
  adminAddress: string,         // 管理员地址
  tokenName: string,        // 代币名称
  tokenSymbol: string,      // 代币简称
  reserveTokenFlag: string,     // 是否预留代币
  reserveTokenInfo: ISaveAsset[], // 预留代币详情
  deployContractFlag: string,    // 发布合约标记，3为未操作，4为处理中，5为已完成
  rewardSetFlag: string,         // 回报标记，同上
  ratioSetFlag: string,          // 融资信息标记，同上
  financeStartFlag: string       // 启动融资标记，同上
  reserveTokenSetFlag:string     // 是否发布成功可设置参数 4为处理中，5为完成
}

export interface ISaveAsset {
  address: string,
  info: IInfo[]
}
export interface IInfo {
  amt?: number,
  days?: number
}
export interface IRewardInfo {
  rewardId: string,  // 回报信息Id
  rewardName: string,  // 回报名称
  rewardDesc: string,  // 回报详情
  price: string,    // 价格
  limitFlag: string,  // 是否限量 0为不限量，1为限量
  limitMax: string, // 限量数量
  distributeTimeFlag: string, // 预计发放时间 0为不定期，1为定期
  distributeTimeFixYes: string, // 定期
  distributeTimeFixNot: string, // 不定期
  distributeWay: string, // 发放方式，0为虚拟发放，1为实物发放
  note: string, // 特殊说明
  fundName: string, // 单位
  hasSellCount: number // 已出售数量
}
export interface IRewardContent {
  connectorName: string,
  connectorTel: string,
  info: IRewardInfo[]
}