import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IProjectInfoStore {
    menuNum:number,
    isShowUpdateInfo:boolean,
    projInfo:IProjectInfo|null,
    projId:string,
    projUpdateCount:number
    projUpdateList:IProjectUpdate[],
    projTeamList:IProjectTeam[],
    updateId:string,
    updateInfo:IProjUpdateInfo|null,
    projDiscussList:IDiscussList[],
    // projDiscussReplyList:IDiscussReplyList[],
    updateDiscussList:IDiscussList[],
    // updateDiscussReplyList:IDiscussReplyList[],
    getProjInfo:(projId:string)=>Promise<boolean>,
    startAttention:()=>Promise<boolean>,
    cancelAttention:()=>Promise<boolean>,
    startSupport:()=>Promise<boolean>,
    getUpdateData:()=>Promise<boolean>,
    getTeamData:()=>Promise<boolean>,
    getUpdateInfo:()=>Promise<boolean>,
    deletUpdateInfo:()=>Promise<boolean>,
    getProjDiscussList:(discussId:string)=>Promise<boolean>,
    sendProjDiscuss:(prevousId:string,discussStr:string)=>Promise<boolean>,
    getUpdateDiscussList:(discussId:string)=>Promise<boolean>,
    sendUpdateDiscuss:(prevousId:string,discussStr:string)=>Promise<boolean>,
    sendProZan:(discussId:string)=>Promise<boolean>,
    sendUpdateZan:(discussId:string)=>Promise<boolean>,
    getProjDiscussReplyList:(childId:string) => Promise<[]>,
    getUpdateDiscussReplyList:(childId:string) => Promise<[]>,
    sendUpdateZanInfo:()=>Promise<boolean>,
  }
  
  
  export interface IProjectInfoProps extends RouteComponentProps<{ projectId: string }>{
    projectinfo:IProjectInfoStore,
    common:ICommonStore,
    intl:any
  }

  export interface IProjectInfo{
    projName:string, // 项目名称
    projTitle:string, // 项目标题
    projType:string, // 项目类型
    projConverUrl:string, // 项目封面
    projBrief:string, // 项目简介
    projDetail:string, // 项目详情
    supportCount:number, // 看好人数
    isSupport:boolean, // 是否看好
    isStar:boolean, // 是否关注
    projVideoUrl:string, // 视频
    discussCount:number, // 留言人数
    updateCount:number, // 更新条数
    time:number // 创建时间
  }

  export interface IProjectUpdate{
    updateId:string,
    updateTitle:string,
    updateDetail:string,
    lastUpdateTime:number,
    discussCount:number,
    zanCount:number
  }
  export interface IProjUpdateInfo{
    updateTitle:string,
    updateDetail:string,
    lastUpdatorId:string,
    lastUpdateTime:number,
    discussCount:number,
    zanCount:number,
    username:string,
    headIconUrl:string,
    isMember:boolean,
    rank:number,
    isZan:boolean
  }
  export interface IProjectTeam{
    username:string,
    headIconUrl:string,
    brief:string
  }

  export interface IDiscussInfo{
    discussId:string, // 当前评论ID
    discussContent:string, // 评论内容
    userId:string, // 评论者ID
    zanCount:number, // 赞数
    time:number, // 评论时间
    username:string, // 评论者
    headIconUrl:string, // 评论者头像
    subSize:number // 回复数
    isZan:boolean, // 是否点赞
    isShowReply:boolean // 是否展开回复
  }

  export interface IDiscussList extends IDiscussInfo{
    preDiscussId:string,  // 上一个评论的ID
    childrenId:string, // 回复评论ID
    childredList:IDiscussReplyList[]
  }

  export interface IDiscussReplyList extends IDiscussInfo{
    preUserId:string, // 被回复人ID
    preUsername:string // 被回复人名称
  }