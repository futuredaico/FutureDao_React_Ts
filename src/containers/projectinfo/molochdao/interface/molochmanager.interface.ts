// import { RouteComponentProps } from "react-router";
// import { ICommonStore } from "@/store/interface/common.interface";
export interface IMolochManagerStore
{
  proposalMenuNum: string,
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
  getMolochProposalList:(projId: string)=>Promise<boolean>,
  getMolochProposalDetail:(projId: string)=>Promise<boolean>,
  getTokenBalance:(projId:string,addr:string)=>Promise<boolean>,
  changeDelegateKey:(addr:string,myaddr:string)=>Promise<boolean>,
  getVoteData:(projId:string,proposalIndex:string,addr:string)=>Promise<boolean>,
  applyYesVote:(proposalIndex:string,myaddr:string)=>Promise<boolean>,
  applyNoVote:(proposalIndex:string,myaddr:string)=>Promise<boolean>,
  processProposal:(proposalIndex:string,myaddr:string)=>Promise<boolean>,
  getContractInfo:(projId:string)=>Promise<boolean>,
  quitShares:(value:number,myaddr:string)=>Promise<boolean>,
  getUpStreamData:(projId:string,addr:string)=>Promise<boolean>,
  sponsorProposal:(proposalIndex: string, myaddr: string,assetHash:string,depositNum:string)=>Promise<boolean>,
  applyYesVoteV2:(proposalIndex:string,myaddr:string)=>Promise<boolean>,
  applyNoVoteV2:(proposalIndex:string,myaddr:string)=>Promise<boolean>,
  processProposalV2:(proposalIndex:string,myaddr:string)=>Promise<boolean>,
  quitSharesV2:(value:number,myaddr:string)=>Promise<boolean>,

}


// export interface IMolochManagerProps extends RouteComponentProps<{ projectId: string }>
// {
//   manager: IMolochManagerStore,
//   common: ICommonStore,
//   intl: any
// }

export interface IMolochProposalList extends IMolochProposalBase{
  timestamp:number, // 创建提案时间
  voteYesCount:number, // 赞成票数
  voteNotCount:number, // 反对票数
  hasVote:boolean, // 是否投票
  proposalState:string // 提案状态
  handleState:string, // 处理状态，0为未处理，1为已处理
  isMine:boolean // 提案是否是自己的
}
export interface IMolochProposalDetail extends IMolochProposalBase {  
  proposer:string, // 提案者
  username:string, // 提案者用户名
  headIconUrl:string, // 提案者头像
  proposalDetail:string, // 提案详情
  applicant:string,  // 受益人地址
  applicantUsername:string,  // 受益人名称
  applicantHeadIconUrl:string // 受益人头像  
}
export interface IMolochProposalBase {
  projId:string,
  proposalIndex:string,// 提案索引
  proposalQueueIndex:string, // 正式提案的标记
  proposalTitle:string,// 提案标题
  version:string,   // 版本
  sharesRequested:string, // 申请的股份数量（可投票）  
  lootRequested:number,// 申请的股份数量（不可投票）
  tributeOffered:string, // 贡献的资产数量
  tributeOfferedSymbol:string, // 贡献的资产简称
  paymentRequested:number, // 申请的资产数量
  paymentRequestedSymbol:string, // 申请的资产简称
  startingPeriod:number // 提案在当前项目处理的时间段位置
}
export enum ProposalType {
  PreVote = "10150",      // 预发布
  Voting = "10151",       // 投票中
  Noting = "10152",       // 公示中
  PassYes = "10153",      // 已通过
  PassNot = "10154",     // 未通过
  Aborted = "10155",      // 已终止
  WaitHandle = "10156",   // 处理期
  HandleTimeOut = "10157",      // 处理超时
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
  emergencyExitWait:string,// 处理期周期
  contractHashs:IContractHash[]
}
export interface IContractHash{
  name:string,
  hash:string
}