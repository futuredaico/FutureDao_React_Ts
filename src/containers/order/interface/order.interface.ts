import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IProjectInfoStore } from "@/containers/projectinfo/interface/projectinfo.interface";
import { IProjectTransationStore } from "@/containers/projectinfo/interface/transation.interface";
import { IMetaMastWalletStore } from "@/store/interface/metamaskwallet.interface";
import { ITeemoWalletStore } from "@/store/interface/teemowallet.interface";
export interface IOrderStore {
    orderMenu:number,
    projId:string,
    rewardId:string,
    rewardDetail:IRewardDetail|null,
    orderId:string,
    hash:string,
    orderInfo:ICreateOrderInfo|null,
    timeTen:NodeJS.Timer | null,
    getRewardInfo:(rewardId:string)=>Promise<boolean>,
    createOrder:(buyCount:string,getCount:string,name:string,tel:string,addr:string,email:string,msg:string)=>Promise<boolean>,
    confirmBuyOrder:(txid:string)=>Promise<boolean>,
    cancelBuyOrder:(orderId:string)=>Promise<boolean>,
    getBuyOrder:(projId:string,orderId:string)=>Promise<boolean>,
    getTradeHash:(projId:string)=>Promise<boolean>
  }
  
  
  export interface IOrderProps extends RouteComponentProps<{ projectId: string }>{
    order:IOrderStore,
    common:ICommonStore,
    projectinfo: IProjectInfoStore,
    transation: IProjectTransationStore,
    teemowallet:ITeemoWalletStore,
    metamaskwallet:IMetaMastWalletStore,
    intl:any
  }

  export interface IRewardDetail
{
  rewardId: string,  // 回报信息Id
  rewardName: string,  // 回报名称
  rewardDesc: string, // 回报详情
  price: string,    // 价格
  activeState:string,  // 是否有效,'0'无效，‘1’有效
  distributeTimeFlag: string, // 预计发放时间 0为不定期，1为定期
  distributeTimeFixYes: string, // 定期
  distributeTimeFixNot: string, // 不定期
  distributeWay: string, // 发放方式，0为虚拟发放，1为实物发放
  fundName: string, // 单位
  hasSellCount: number // 已出售数量
  limitFlag: string,  // 是否限量 0为不限量，1为限量
  limitMax: string, // 限量数量
  note: string, // 特殊说明  
  projId: string, // 项目ID  
}
export interface ICreateOrderInfo {
  orderId:string,
  orderState:string,  // 订单状态
  price:string  // 订单单价
  priceUnit:string, // 价格单位
  projId:string, //
  time:number, // 创建时间
  totalCost:string // 价格总数
}