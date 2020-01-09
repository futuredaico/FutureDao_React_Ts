// import { RouteComponentProps } from "react-router";
// import { ICommonStore } from "@/store/interface/common.interface";
export interface IMolochManagerStore
{
  proposalMenuNum: number,
  proposalPage:number,
  proposalPageSize:number,
  proposalList:IMolochProposalList[],
  proposalCount:number,
  proposalInfo:IMolochProposalDetail|null,
  proposalListItem:IMolochProposalList|null,
  proposalIndex:string,
  proposalBalance:number,
  proposalAddress:string,
  upBalance:number,
  upAddress:string,
  voteInfo:IVoteInfo,
  contractInfo:IContractInfo|null,
  getMolochProposalList:(projId: string,type?:string)=>Promise<boolean>,
  getMolochProposalDetail:(projId: string)=>Promise<boolean>,
  getTokenBalance:(projId:string,addr:string)=>Promise<boolean>,
  changeDelegateKey:(addr:string,myaddr:string)=>Promise<boolean>,
  getVoteData:(projId:string,proposalIndex:string,addr:string)=>Promise<boolean>,
  applyYesVote:(proposalIndex:string,myaddr:string)=>Promise<boolean>,
  applyNoVote:(proposalIndex:string,myaddr:string)=>Promise<boolean>,
  processProposal:(proposalIndex:string,myaddr:string)=>Promise<boolean>,
  getContractInfo:(projId:string)=>Promise<boolean>,
  quitShares:(value:number,myaddr:string)=>Promise<boolean>,
  getUpStreamData:(projId:string,addr:string)=>Promise<boolean>
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
  timestamp:number, // 创建提案时间
  voteYesCount:number, // 赞成票数
  voteNotCount:number, // 反对票数
  hasVote:boolean, // 是否投票
  proposalState:string // 提案状态
  handleState:string, // 处理状态，0为未处理，1为已处理
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
  applicant:string,  // 受益人地址
  applicantUsername:string,  // 受益人名称
  applicantHeadIconUrl:string // 受益人头像
}
export enum ProposalType {
  // voting = '10151', // 投票中
  // showing = '10152', // 公示中
  // pass = '10153', // 已通过
  // fail = '10154', // 未通过
  // aborted = '10155', // 已终止

  PreVote = "10150",      // 预发布
  Voting = "10151",       // 投票中
  Noting = "10152",       // 公示中
  PassYes = "10153",      // 已通过
  PassNot = "10154",     // 未通过
  Aborted = "10155",      // 已终止
  HandleTimeOut = "10156",      // 处理超时

}
export interface IVoteInfo {
  voteCount:string,
  voteType:string, // 1表示赞成，2表示反对，空表示未投票
  balance:string
}
export interface IContractInfo{
  periodDuration:string, // 周期区间，单位，秒
  votingPeriodLength:string, // 投票周期
  notingPeriodLength:string, // 公示周期
  cancelPeriodLength:string, // 终止周期
  contractHashs:IContractHash[]
}
export interface IContractHash{
  name:string,
  hash:string
}