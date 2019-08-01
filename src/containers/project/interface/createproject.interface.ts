import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface ICreateProjectStore {
  step:number,
  stepOneStatus:number,
  stepTwoStatus:number,
  stepThreeStatus:number,
  createContent:ICreateContent,
  searchList:IMemberList[],
  teamList:ITeamList[],
  createProject:()=>Promise<boolean>,
  modifyProject:(params:string[])=>Promise<boolean>,
  getProject: (projId:string)=>Promise<boolean>,
  getTeamList:()=>Promise<boolean>,
  searchMemberList:(memberEmail:string)=>Promise<boolean>,
  inviteMember:(memberId:string)=>Promise<boolean>,
  modifyMemberRole:(memberId:string,role:string)=>Promise<boolean>
}


export interface ICreateProjectProps  extends RouteComponentProps{
  createproject:ICreateProjectStore,
  common:ICommonStore,
  intl:any
}

export interface ICreateContent {
  projId:string,
  projName:string, 
  projTitle:string,  
  projType:string, 
  projCoverUrl:string, 
  projBrief:string,  
  videoBriefUrl:string, 
  projDetail:string,  
  connectEmail:string,
  officialWeb:string,  
  community:string,
  projState:string,
  projSubState:string,
  role:string
}

export interface IMemberList {
  userId:string,
  username:string,
  email:string,
  headIconUrl:string
}

export interface ITeamList {
  userId:string,
  username:string,
  headIconUrl:string,
  role:string,// admin或member
  authenticationState:string // not为未认证，person为个人认证，company为企业认证
}