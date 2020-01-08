import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IMetaMaskWalletStore } from "@/store/interface/metamaskwallet.interface";

export interface IProjectStore {
  isEdit: boolean,
  menuNum: number,
  projId: string,
  updateId: string,
  deleteMember: (projId: string) => Promise<boolean>
}

export interface ICreateProjectStore {
  createStatus: number,
  createContent: ICreateContent,
  projectID: string,
  createProject: () => Promise<boolean>,
  getTokenInfo: (token: string) => Promise<{
    symbol: string;
    decimals: string;
  }>
}


export interface ICreateProjectProps extends RouteComponentProps<{ projectId: string }> {
  project: IProjectStore,
  createproject: ICreateProjectStore,
  common: ICommonStore,
  metamaskwallet: IMetaMaskWalletStore,
  intl: any
}

export interface ICreateContent {
  version: string;                // 版本
  projectName: string;            // 项目名称
  projectBrief: string;           // 项目简介
  projectDetail: string,          // 文本编辑内容 详情
  projectConverUrl: string;       // 项目封面URL
  officialWebUrl: string;         // 官网URL
  approvedToken: string;          // 允许交易的token
  approvedTokenSymbol?: string      // token的简称
  approvedDecimals?: number         // token 精度
  periodDuration: number;         // 区间段的时间 测试网默认一个区间时段是120秒 2分钟
  votingPeriodLength: number;     // 投票有多少个区间段
  gracePeriodLength: number;      // 公示有多少个区间段
  abortWindow: number;            // 撤回投票的窗口期
  proposalDeposit: number;        // 提议的押金
  dilutionBound?: number;          // 如果出现大规模混乱，投赞成票的选民将有义务支付最高乘数
  processingReward: number;       // 处理提案的人所得到的奖励
}

export interface IMemberList {
  userId: string,
  username: string,
  email: string,
  headIconUrl: string
}

export interface ITeamList {
  userId: string,
  username: string,
  headIconUrl: string,
  role: string,// admin或member
  authenticationState: string // not为未认证，person为个人认证，company为企业认证
}
