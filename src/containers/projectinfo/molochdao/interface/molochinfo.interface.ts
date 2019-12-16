import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IMetaMastWalletStore } from "@/store/interface/metamaskwallet.interface";
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
  priceInfo:IProjAssetPrice|null,  // 代币的价格
  rewardList:IProjReward[],  // 礼包列表
  reserveData: IProjReserveToken | null,    // 预留代币数据
  buyPrice:string,
  sellPrice:string,
  hashList:IContractHash[],
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
  metamaskwallet:IMetaMastWalletStore,
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
  valuePerShare:number, // 每股
  officailWeb:string, // 官网
  discussCount:number,
  member:number, // 成员总数
  votePeriod:string, // 投票时长，单位秒
  notePreriod:string, // 公示时长，单位秒
  cancelPreriod:string // 取消期时长，单位秒
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

export interface IHistoryPrice
{
  buyInfo: string[],
  sellInfo: string[],
  timeInfo: string[],
}

export interface IProjAssetPrice
{
  ob_fundAmt: string, // 购买代币花费eth数量
  ob_tokenAmt: string, // 购买代币数量
  os_fundAmt: string, // 出售代币花费eth数量
  os_tokenAmt: string, // 出售代币数量
}
export interface IProjReward
{
  rewardId: string,  // 回报信息Id
  rewardName: string,  // 回报名称
  rewardDesc: string, // 回报详情
  price: string,    // 价格
  limitFlag: string,  // 是否限量 0为不限量，1为限量
  limitMax: string, // 限量数量
  distributeTimeFlag: string, // 预计发放时间 0为不定期，1为定期
  distributeTimeFixYes: string, // 定期
  distributeTimeFixNot: string, // 不定期
  distributeWay: string, // 发放方式，0为虚拟发放，1为实物发放
  note: string, // 特殊说明
  projId: string, // 项目ID
  fundName: string, // 单位
  hasSellCount: number // 已出售数量
  rewardPrice:string  // 计算出可获得的礼包
}

export interface IProjReserveToken
{
  lockTotal: string,  // 锁定总额
  count: number,
  list: IProjReserveList[]
}
export interface IProjReserveList
{
  tokenAmt: string,  // 代币数量
  timestamp: string,  // 到期时间
  order: number,  // 第几批次
  unlockFlag: string,  // 解锁标识，true为已解锁，false为未解锁
}
export interface IContractHash {
  contractHash:string,   // 合约hash
  contractName:string,   // 合约作用名
  projId:string
}