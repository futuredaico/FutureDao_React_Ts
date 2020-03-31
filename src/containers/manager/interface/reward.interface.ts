import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface IRewardStore
{
    rewardContent: IRewardContent,
    getRewardData: () => Promise<boolean>,
    setReward: () => Promise<boolean>,
}

export interface IRewardProps extends RouteComponentProps<{ projectId: string }>
{
    reward: IRewardStore,
    common: ICommonStore,
    intl: any
}
export interface IRewardInfo
{
    rewardId: string,  // 回报信息Id
    rewardName: string,  // 回报名称
    rewardDesc: string,  // 回报详情
    price: string,    // 价格
    priceUnits:string, // 价格单位
    limitFlag: string,  // 是否限量 0为不限量，1为限量
    limitMax: string, // 限量数量
    distributeTimeFlag: string, // 预计发放时间 0为不定期，1为定期
    distributeTimeFixYes: string, // 定期
    distributeTimeFixNot: string, // 不定期
    distributeWay: string, // 发放方式，0为虚拟发放，1为实物发放
    note: string, // 特殊说明
    tokenSymbol: string, // 单位
    // hasSellCount: number // 已出售数量
}
export interface IRewardContent
{
    connectorName: string,
    connectorTel: string,
    info: IRewardInfo[]
}