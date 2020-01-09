import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IMetaMaskWalletStore } from "@/store/interface/metamaskwallet.interface";
import { ITeemoWalletStore } from "@/store/interface/teemowallet.interface";
import { IMolochManagerStore } from "./molochmanager.interface";
export interface IMolochInfoStore
{
  menuNum: number,
  isShowUpdateInfo: boolean,
  projInfo: IMolochInfo | null,
  projId: string,
  projUpdateCount: number,
  projMemberList: IProjectMember[],
  memberPage:number,
  memberPageSize:number,
  projDiscussList: IDiscussList[],
  isShowManagerInfo: boolean,
  getMolochProjInfo: (projId: string) => Promise<boolean>,
  getMemberData: () => Promise<boolean>,
  getMolochDiscussList: () => Promise<boolean>,
  sendMolochDiscuss: (prevousId: string, discussStr: string) => Promise<boolean>,
  sendMolochZan: (discussId: string) => Promise<boolean>,
  getMolochDiscussReplyList: (childId: string) => Promise<[]>
}


export interface IMolochInfoProps extends RouteComponentProps<{ projectId: string }>
{
  molochinfo: IMolochInfoStore,
  common: ICommonStore,
  molochmanager: IMolochManagerStore,
  teemowallet:ITeemoWalletStore,
  metamaskwallet:IMetaMaskWalletStore,
  intl: any
}

export interface IMolochInfo
{
  projId:string, // 项目Id
  projName: string, // 项目名称
  // projTitle: string, // 项目标题
  projType: string, // 项目类型
  projBrief:string, // 项目简介
  projDetail: string, // 项目详情
  projCoverUrl: string, // 项目封面
  fundTotal:string, // 资产
  fundSymbol:string, // 单位
  shares:number,
  valuePerShare:string, // 每股
  officailWeb:string, // 官网
  discussCount:number,
  member:number, // 成员总数
  votePeriod:string, // 投票时长，单位秒
  notePeriod:string, // 公示时长，单位秒
  cancelPreriod:string // 取消期时长，单位秒
  startTime:number // 项目创建时间
  projVersion:string, // 项目版本
  contractHash:string, // 项目合约地址
  contractName:string, // 项目合约名称
  summonerAddress:string, // 项目创建者
}

export interface IProjectMember
{
  username: string,
  headIconUrl: string,
  address:string,
  shares:number
}

export interface IDiscussInfo
{
  discussId: string, // 当前评论ID
  discussContent: string, // 评论内容
  userId: string, // 评论者ID
  zanCount: number, // 赞数
  time: number, // 评论时间
  username: string, // 评论者
  headIconUrl: string, // 评论者头像
  subSize: number // 回复数
  isZan: boolean, // 是否点赞  
  isShowReply: boolean // 是否展开回复
}

export interface IDiscussList extends IDiscussInfo
{
  preDiscussId: string,  // 上一个评论的ID
  rootId: string, // 回复评论ID
  childredList: IDiscussReplyList[]
}

export interface IDiscussReplyList extends IDiscussInfo
{
  preUserId: string, // 被回复人ID
  preUsername: string // 被回复人名称
}
