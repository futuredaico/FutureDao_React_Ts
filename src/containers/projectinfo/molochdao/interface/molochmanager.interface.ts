// import { RouteComponentProps } from "react-router";
// import { ICommonStore } from "@/store/interface/common.interface";
export interface IMolochManagerStore
{
  menuNum: number,
}


// export interface IMolochManagerProps extends RouteComponentProps<{ projectId: string }>
// {
//   manager: IMolochManagerStore,
//   common: ICommonStore,
//   intl: any
// }

export interface IMolochProposalList {
  projId:string,
  proposalIndex:string, // 提案索引
  proposalTitle:string, // 提案标题
  sharesRequested:string, // 要求股份
  tokenTribute:string, // 贡献股份数量
  tokenTributeSymbol:string, // 贡献股份单位
  timestamp:number, // 创建时间
  yesShares:string, // 赞成票数
  noShares:string, // 反对票数
  hasVote:boolean, // 是否投票
  proposalState:string // 提案状态
}
export interface IMolochProposalDetail {
  projId:string,
  proposalIndex:string,// 提案索引
  proposalTitle:string,// 提案标题
  proposer:string, // 提案者
  username:string, // 提案者用户名
  headIconUrl:string, // 提案者头像
  proposalDetail:string, // 提案详情
  sharesRequested:string, // 要求股份
  tokenTribute:string, // 贡献股份数量
  tokenTributeSymbol:string, // 贡献股份单位
  tokenReceiver:string // 股份接收者
}
export enum IProposalType {
  voting = '10151', // 投票中
  showing = '10152', // 公示中
  pass = '10153', // 已通过
  fail = '10154', // 未通过
}