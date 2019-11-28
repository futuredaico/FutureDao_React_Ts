import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IProjectUpdateStore } from "./update.interface";
import { IProjectTransationStore } from "./transation.interface";
import { IMetaMastWalletStore } from "@/store/interface/metamaskwallet.interface";
import { ITeemoWalletStore } from "@/store/interface/teemowallet.interface";
export interface IMolochoInfoStore
{
  menuNum: number,
  isShowUpdateInfo: boolean,
  projInfo: IMolochoInfo | null,
  projId: string,
  projUpdateCount: number,
  projTeamList: IProjectTeam[],
  projDiscussList: IDiscussList[],
  isShowManagerInfo: boolean,
  priceInfo:IProjAssetPrice|null,  // 代币的价格
  rewardList:IProjReward[],  // 礼包列表
  reserveData: IProjReserveToken | null,    // 预留代币数据
  buyPrice:string,
  sellPrice:string,
  hashList:IContractHash[],
  getProjInfo: (projId: string) => Promise<boolean>,
  startAttention: () => Promise<boolean>,
  cancelAttention: () => Promise<boolean>,
  startSupport: () => Promise<boolean>,
  getTeamData: () => Promise<boolean>,
  getProjDiscussList: (discussId: string) => Promise<boolean>,
  sendProjDiscuss: (prevousId: string, discussStr: string) => Promise<boolean>,
  sendProZan: (discussId: string) => Promise<boolean>,
  getProjDiscussReplyList: (childId: string) => Promise<[]>,
  getTokenPriceData:()=>Promise<boolean>,
  getRewardData:()=>Promise<boolean>,
  getReserveTokenData:()=>Promise<boolean>,
  computeCurrentBuyPrice:()=>void,
  computeCurrentSellPrice:()=>void,
  getContractHash:()=>Promise<boolean>
}


export interface IMolochoInfoProps extends RouteComponentProps<{ projectId: string }>
{
  projectinfo: IMolochoInfoStore,
  update: IProjectUpdateStore,
  transation: IProjectTransationStore,
  common: ICommonStore,
  teemowallet:ITeemoWalletStore,
  metamaskwallet:IMetaMastWalletStore,
  intl: any
}

export interface IMolochoInfo
{
  projName: string, // 项目名称
  projTitle: string, // 项目标题
  projType: string, // 项目类型
  projConverUrl: string, // 项目封面
  projBrief: string, // 项目简介
  projDetail: string, // 项目详情
  supportCount: number, // 看好人数
  isSupport: boolean, // 是否看好
  isStar: boolean, // 是否关注
  projVideoUrl: string, // 视频
  discussCount: number, // 留言人数
  updateCount: number, // 更新条数
  time: number // 创建时间
  hasIssueAmt: string, // 已发行
  hasSellAmt: string // 已出售
  projState: string, // 一级状态
  projSubState: string, // 二级状态
  hasSupport: string, // 支持人数
  type:string, // 众筹类型
  platform:string, // 上链类型
  fundName:string, // 单位
  fundReservePoolTotal:string // 储备池资金
}

export interface IProjectTeam
{
  username: string,
  headIconUrl: string,
  brief: string
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
  childrenId: string, // 回复评论ID
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