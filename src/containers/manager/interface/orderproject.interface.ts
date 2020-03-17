

import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IProjectStore } from "./project.interface";
import { IOrderStore } from "@/containers/order/interface/order.interface";
export interface IOrderProjectStore
{
  orderMenu:number,
  isShowOprojInfo:boolean,
  orderProjCount: number,
  orderProjList:IOrderProjectList[],
  orderProjPage:number,
  orderProjPageSize:number,  
  orderProjDetail:IOrderProjectDetail|null,
  exportLink:string,
  buyName:string,
  orderStr:string,
  sendType:number,
  orderType:string,
  getOrderProjectList:(sendFlag:number,buyName:string,orderStr:string,sendType:number)=>Promise<boolean>,
  getOrderProjectDetail:(projId:string,orderId:string)=>Promise<boolean>,
  exportFile:(projId:string)=>Promise<boolean>,
  sendGoods:(projId: string,orderId:string,note:string)=>Promise<boolean>,
}

export interface IOrderProjectProps  extends RouteComponentProps<{ projectId: string }>
{
  orderproject: IOrderProjectStore,
  common:ICommonStore,
  project: IProjectStore,
  order:IOrderStore,
  intl: any
}
export interface IOrderProjectList {
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
  time:number,
  connectorName:string,
}
export interface IOrderProjectDetail extends IOrderProjectList{
  connectorAddress:string,
  connectorEmail:string,
  connectorMessage:string,  
  connectorTel:string,
  senderName:string,
  senderNote:string,
  senderTel:string,
}