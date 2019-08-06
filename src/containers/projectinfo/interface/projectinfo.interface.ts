import { RouteComponentProps } from "react-router";
export interface IProjectInfoStore {
    menuNum:number,
    isShowUpdateInfo:boolean,
    projInfo:IProjectInfo|null,
    getProjInfo:(projId:string)=>Promise<boolean>
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