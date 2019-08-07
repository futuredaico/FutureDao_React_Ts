import { RouteComponentProps } from "react-router";
export interface IProjectInfoStore {
    menuNum:number,
    isShowUpdateInfo:boolean,
    projInfo:IProjectInfo|null,
    projId:string,
    projUpdateList:IProjectUpdate[],
    projTeamList:IProjectTeam[],
    updateInfo:IProjectUpdate|null
    getProjInfo:(projId:string)=>Promise<boolean>,
    startAttention:()=>Promise<boolean>,
    cancelAttention:()=>Promise<boolean>,
    startSupport:()=>Promise<boolean>,
    getUpdateData:()=>Promise<boolean>,
    getTeamData:()=>Promise<boolean>,
  }
  
  
  export interface IProjectInfoProps extends RouteComponentProps<{ projectId: string }>{
    projectinfo:IProjectInfoStore,
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
  export interface IProjectTeam{
    username:string,
    headIconUrl:string,
    brief:string
  }