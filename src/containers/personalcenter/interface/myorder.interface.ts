

import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IOrderStore } from "@/containers/order/interface/order.interface";
import { IProjectTransationStore } from "@/containers/projectinfo/interface/transation.interface";
export interface IMyOrderStore
{
  isShowInfo:boolean,
  orderCount: number,
  orderList:IOrderList[],
  orderPage:number,
  orderPageSize:number,  
  timeSet:NodeJS.Timer | null,
  orderDetail:IOrderDetail|null
  getMyOrderList:()=>Promise<boolean>,
  getMyOrderDetail:(projId:string,orderId:string)=>Promise<boolean>
}

export interface IMyOrderProps  extends RouteComponentProps
{
  myorder: IMyOrderStore,
  common:ICommonStore,
  order:IOrderStore,
  transation:IProjectTransationStore,
  intl: any
}
export interface IOrderList {
  projId:string,
  orderId:string,
  rewardId:string,
  amount:string,
  orderState:string,
  price:string,
  priceUnit:string,
  projName:string,
  rewardName:string,
  totalCost:string,
  totalCostUnit:string,
  time:number
}
export interface IOrderDetail extends IOrderList{
  connectorAddress:string,
  connectorEmail:string,
  connectorMessage:string,
  connectorName:string,
  connectorTel:string,
  senderName:string,
  senderNote:string,
  senderTel:string,
}