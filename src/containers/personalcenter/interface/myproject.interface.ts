

import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IMyProjectStore
{
  manageCount: number,
  manageList: IMyprojectList[],
  managerPage: number,
  managerPageSize: number,
  attentionCount: number,
  attentionList: IMyprojectList[],
  attentionPage: number,
  attentionPageSize: number,
  joinCount: number,
  joinList: IMyprojectList[],
  joinPage: number,
  joinPageSize: number,
  getManagerData: () => Promise<boolean>,
  getAttentionData: () => Promise<boolean>,
  getSomethingCount: () => Promise<boolean>,
  getAtJoinData: () => Promise<boolean>,
}

export interface IMyProjectProps extends RouteComponentProps
{
  myproject: IMyProjectStore,
  common: ICommonStore,
  intl: any
}
export interface IMyprojectList
{
  projId: string,
  projName: string, // 标题
  projType: string, // future 或moloch 类型
  projBrief: string,  // 简介
  projCoverUrl: string,  // 封面
  projState: string, // ideapub // 状态 Moloch无
  shares: number, // 股数
  members: number // 成员数
}