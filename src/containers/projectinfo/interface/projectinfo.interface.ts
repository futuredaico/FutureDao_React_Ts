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
    getProjInfo:(projId:string)=>Promise<boolean>,
    startAttention:()=>Promise<boolean>,
    cancelAttention:()=>Promise<boolean>,
    startSupport:()=>Promise<boolean>,
    getUpdateData:()=>Promise<boolean>,
    getTeamData:()=>Promise<boolean>,
    getUpdateInfo:()=>Promise<boolean>,
    deletUpdateInfo:()=>Promise<boolean>,
  }
  
  
  export interface IProjectInfoProps extends RouteComponentProps<{ projectId: string }>{
    projectinfo:IProjectInfoStore,
    common:ICommonStore,
    intl:any
  }

  export interface IProjectInfo{
    projName:string,
    projTitle:string,
    projType:string,
    projConverUrl:string,
    projBrief:string,
    projDetail:string,
    supportCount:number,
    isSupport:boolean,
    isStar:boolean
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
    rank:number
  }
  export interface IProjectTeam{
    username:string,
    headIconUrl:string,
    brief:string
  }
  export interface IDiscussList{
    preDiscussId:string,  // 上一个评论的ID
    discussId:string, // 当前评论ID
    discussContent:string, // 评论内容
    userId:string, // 评论者ID
    zanCount:number, // 赞数
    time:number, // 评论时间
    username:string, // 评论者
    headIconUrl:string, // 评论者头像
    subSize:number // 回复数
  }