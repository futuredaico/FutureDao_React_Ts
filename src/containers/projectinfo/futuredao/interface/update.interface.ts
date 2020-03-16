import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IDiscussList } from "./projectinfo.interface";
export interface IProjectUpdateStore
{
    projUpdateList: IProjectUpdate[],
    updateId: string,
    updateInfo: IProjUpdateInfo | null,
    updateDiscussList: IDiscussList[],
    getUpdateData: () => Promise<boolean>,
    getUpdateInfo: () => Promise<boolean>,
    deletUpdateInfo: () => Promise<boolean>,
    getUpdateDiscussList: (discussId: string) => Promise<boolean>,
    sendUpdateDiscuss: (prevousId: string, discussStr: string) => Promise<boolean>,
    sendUpdateZan: (discussId: string) => Promise<boolean>,
    getUpdateDiscussReplyList: (childId: string) => Promise<[]>,
    sendUpdateZanInfo: () => Promise<boolean>,
}


export interface IProjectUpdateProps extends RouteComponentProps<{ projectId: string }>
{
    update: IProjectUpdateStore,
    common: ICommonStore,
    intl: any
}

export interface IProjectUpdate
{
    updateId: string,
    updateTitle: string,
    updateDetail: string,
    lastUpdateTime: number,
    discussCount: number,
    zanCount: number
}
export interface IProjUpdateInfo
{
    updateTitle: string,  // 更新标题
    updateDetail: string, // 更新内容
    lastUpdatorId: string, // 最近更新者ID
    lastUpdateTime: number,// 最近更新时间
    discussCount: number, // 评论统计
    zanCount: number,  // 点赞统计
    username: string,
    headIconUrl: string,
    isMember: boolean,  // 是否是成员
    rank: number,
    isZan: boolean
}
