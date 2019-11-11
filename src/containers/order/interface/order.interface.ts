import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IOrderStore {
    orderMenu:number,
    projId:string,
    rewardId:string,
    rewardDetail:IRewardDetail|null,
    getRewardInfo:(rewardId:string)=>Promise<boolean>,
  }
  
  
  export interface IOrderProps extends RouteComponentProps<{ projectId: string }>{
    order:IOrderStore,
    common:ICommonStore,
    intl:any
  }

  export interface IRewardDetail
{
  // activeState:string,  // 是否有效
  distributeTimeFlag: string, // 预计发放时间 0为不定期，1为定期
  distributeTimeFixYes: string, // 定期
  distributeTimeFixNot: string, // 不定期
  distributeWay: string, // 发放方式，0为虚拟发放，1为实物发放
  fundName: string, // 单位
  hasSellCount: number // 已出售数量
  limitFlag: string,  // 是否限量 0为不限量，1为限量
  limitMax: string, // 限量数量
  note: string, // 特殊说明
  price: string,    // 价格
  projId: string, // 项目ID
  rewardId: string,  // 回报信息Id
  rewardName: string,  // 回报名称
  rewardDesc: string, // 回报详情
}