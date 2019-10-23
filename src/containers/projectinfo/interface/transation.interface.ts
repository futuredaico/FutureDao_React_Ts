import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IProjectTransationStore
{
  projContractInfo: IProjectContractInfo | null,
  getProjContractInfoData: () => Promise<boolean>,
}


export interface IProjectInfoProps extends RouteComponentProps<{ projectId: string }>
{
  transation: IProjectTransationStore,
  common: ICommonStore,
  intl: any
}

export interface IProjectContractInfo
{
  projId: string,
  tokenName: string,    // 项目代币名称
  tokenIssueTotal: string,  // 发行总额
  tokenUnlockNotAmount: string,  // 未解锁总额
  tokenUnlockYesAmount: string,  // 已解锁总额
  fundManagePoolTotal: string,  // 治理池金额
  fundReservePoolTotal: string,  // 储备池总额
  fundReserveRatio: string,  // 存储金比例
  priceRaiseSpeed: string  // 价格增速
}

export interface IHistoryPrice
{
  buyInfo: string[],
  sellInfo: string[],
  timeInfo: string[],
}