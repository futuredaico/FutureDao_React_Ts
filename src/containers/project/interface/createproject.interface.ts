import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface ICreateProjectStore {
  step:number,
  stepOneStatus:number,
  stepTwoStatus:number,
  stepThreeStatus:number,
  createContent:ICreateContent,
  createProject:()=>Promise<boolean>,
  modifyProject:(params:string[])=>Promise<boolean>,
  getProject: (projId:string)=>Promise<boolean>,
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
}